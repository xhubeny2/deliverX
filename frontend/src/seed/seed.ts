import { PrismaClient } from '@/prisma/generated/client';
import { deliveriesData, driversData, usersData } from './data';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function addRandomDate(): Date {
  // 80% of deliveries for today
  const useToday = Math.random() < 0.8;

  const baseDate = new Date();
  if (!useToday) {
    const offset = Math.floor(Math.random() * 3) + 1; // 1–3 days
    baseDate.setDate(baseDate.getDate() + offset);
  }

  return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 0, 0, 0, 0);
}

async function seedDeliveries() {
  console.log('Start seeding Deliveries... 🌱');

  // 1. Clean up
  await prisma.delivery.deleteMany();
  console.log('Cleaned up existing deliveries. 🧹');

  // 2. New deliveries
  for (const data of deliveriesData) {
    const dataWithDeliveryDate = {
      ...data,
      deliveryDate: addRandomDate(),
    };
    await prisma.delivery.create({ data: dataWithDeliveryDate });
  }

  console.log(`Seed completed. Created ${deliveriesData.length} Deliveries. ✅`);
}

async function seedDrivers() {
  console.log('Start seeding Drivers... 🌱');

  // 1. Clean up
  await prisma.driver.deleteMany();
  console.log('Cleaned up existing drivers. 🧹');

  // 2. New drivers
  for (const data of driversData) {
    await prisma.driver.create({ data });
  }

  console.log(`Seed completed. Created ${driversData.length} Drivers. ✅`);
}

async function seedUsers() {
  console.log('Start seeding Users... 🌱');

  // 1. Clean up
  await prisma.user.deleteMany();
  console.log('Cleaned up existing users. 🧹');

  // 2. New users
  for (const data of usersData) {
    await prisma.user.create({ data: { ...data, password: await bcrypt.hash(data.password, 10) } });
  }

  console.log(`Seed completed. Created ${usersData.length} Users. ✅`);
}

async function main() {
  await seedDeliveries();
  await seedDrivers();
  await seedUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
