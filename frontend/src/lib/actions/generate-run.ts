'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Delivery } from '@/../generated/prisma/client';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function generateOptimizedRun(
  driverId: string,
  deliveries: Pick<Delivery, 'id' | 'address' | 'deliveryDate'>[],
) {
  try {
    if (deliveries.length === 0) {
      return { success: false, message: 'No deliveries to assign.' };
    }

    // Prompt for Gemini
    // Constraints: Specific start address and 8h time limit logic
    const prompt = `
      You are a logistics expert AI. I have a list of delivery stops.
      Your task is to select the optimal set of deliveries and reorder them into the most logical and efficient driving route.

      Constraints:
      1. Start Point: The driver starts their route at "Újezd 9, Prostějov, 79601".
      2. Time Limit: The route MUST fit within an approximate 8-hour shift.
      3. Estimation Heuristic: Assume roughly 15 minutes per stop (including driving time between nearby stops in the city and handing over the package).
      4. Selection: If the total number of deliveries exceeds the 8-hour limit, SELECT ONLY the most optimal subset (geographically clustered) that fits the time limit and EXCLUDE the rest.

      Input Deliveries (JSON):
      ${JSON.stringify(deliveries)}

      Return ONLY a raw JSON array of objects for the SELECTED deliveries. Each object must have:
      - "id": The original delivery ID
      - "order": The sequence number (1, 2, 3...)
      - "reason": Short reason why this stop is next (e.g. "1.5km from previous stop")

      Do not include markdown formatting like \`\`\`json. Just the raw array.
    `;

    // Call Gemini API
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      // JSON Mode ensures we get parsable data back
      generationConfig: { responseMimeType: 'application/json' },
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse Gemini Response
    const optimizedRoute = JSON.parse(responseText);

    // Save to Database (Transaction)
    // 1. Create the Run
    // 2. Update all deliveries with the new Run ID
    await prisma.$transaction(async (tx) => {
      const newRun = await tx.run.create({
        data: {
          driverId: driverId,
          status: 'ACTIVE',
          date: new Date(),
        },
      });

      // Update each delivery to link it to the run
      // Note: If you had a 'sequence' column, you would save 'item.order' there.
      for (const item of optimizedRoute) {
        await tx.delivery.update({
          where: { id: item.id },
          data: {
            runId: newRun.id,
            status: 'IN_TRANSIT', // Assuming they start immediately
            order: item.order || null,
          },
        });
      }
    });

    revalidatePath('/dashboard');
    return { success: true, count: deliveries.length };
  } catch (error) {
    console.error('AI Optimization Failed:', error);
    return { success: false, message: 'Failed to generate route.' };
  }
}
