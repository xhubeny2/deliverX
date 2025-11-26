import { withTryCatch } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

export async function getUser(email: string) {
  async function fn() {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  return withTryCatch(fn, 'Failed to fetch user data:', null);
}
