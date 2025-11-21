import { PrismaClient } from '@/../generated/prisma/client';
import { deliveriesData } from './data';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding Deliveries... 🌱');

  // 1. Clean up
  await prisma.delivery.deleteMany();
  console.log('Cleaned up existing deliveries. 🧹');

  // 2. New deliveries
  for (const data of deliveriesData) {
    const delivery = await prisma.delivery.create({ data });
    console.log(`Created Delivery with ID: ${delivery.id} (Ord. n.: ${delivery.orderNumber})`);
  }

  console.log(`Seed completed. Created ${deliveriesData.length} Deliveries. ✅`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
