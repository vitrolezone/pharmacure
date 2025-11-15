import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create test user
  const user = await prisma.user.upsert({
    where: { email: 'test@pharmify.com' },
    update: {},
    create: {
      email: 'test@pharmify.com',
      name: 'Test User',
      password: '$2a$10$placeholder', // In production, use proper hashing
      role: 'customer',
      phone: '+1234567890',
    },
  });

  console.log('✅ Created test user:', user.email);

  // Create sample pharmacies (Mumbai area coordinates)
  const pharmacies = [
    {
      name: 'MedPlus Pharmacy',
      address: '123 MG Road, Mumbai, Maharashtra 400001',
      latitude: 19.0760,
      longitude: 72.8777,
      phone: '+91-22-12345678',
      verified: true,
      rating: 4.5,
      ratingCount: 120,
      deliveryFee: 30,
      minOrderValue: 100,
      estimatedDeliveryMinutes: 30,
    },
    {
      name: 'Apollo Pharmacy',
      address: '456 Bandra West, Mumbai, Maharashtra 400050',
      latitude: 19.0596,
      longitude: 72.8295,
      phone: '+91-22-23456789',
      verified: true,
      rating: 4.7,
      ratingCount: 200,
      deliveryFee: 40,
      minOrderValue: 150,
      estimatedDeliveryMinutes: 25,
    },
    {
      name: 'Wellness Forever',
      address: '789 Andheri East, Mumbai, Maharashtra 400069',
      latitude: 19.1136,
      longitude: 72.8697,
      phone: '+91-22-34567890',
      verified: true,
      rating: 4.3,
      ratingCount: 85,
      deliveryFee: 35,
      minOrderValue: 200,
      estimatedDeliveryMinutes: 45,
    },
    {
      name: '1mg Pharmacy',
      address: '321 Powai, Mumbai, Maharashtra 400076',
      latitude: 19.1183,
      longitude: 72.9067,
      phone: '+91-22-45678901',
      verified: true,
      rating: 4.6,
      ratingCount: 300,
      deliveryFee: 25,
      minOrderValue: 50,
      estimatedDeliveryMinutes: 20,
    },
  ];

  const createdPharmacies = [];
  for (const pharmacyData of pharmacies) {
    const pharmacy = await prisma.pharmacy.upsert({
      where: { id: `pharmacy-${pharmacyData.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: pharmacyData,
    });
    createdPharmacies.push(pharmacy);
    console.log(`✅ Created pharmacy: ${pharmacy.name}`);
  }

  // Create sample products
  const products = [
    {
      name: 'Paracetamol 500mg',
      brand: 'Crocin',
      genericName: 'Acetaminophen',
      description: 'Pain reliever and fever reducer',
      rxRequired: false,
      dosage: '500mg tablet',
      manufacturer: 'GSK',
      sideEffects: 'Rare: skin rash, allergic reactions',
      interactions: 'May interact with blood thinners',
    },
    {
      name: 'Ibuprofen 400mg',
      brand: 'Brufen',
      genericName: 'Ibuprofen',
      description: 'Non-steroidal anti-inflammatory drug',
      rxRequired: false,
      dosage: '400mg tablet',
      manufacturer: 'Abbott',
      sideEffects: 'Stomach upset, dizziness',
      interactions: 'Avoid with other NSAIDs',
    },
    {
      name: 'Amoxicillin 500mg',
      brand: 'Amoxil',
      genericName: 'Amoxicillin',
      description: 'Antibiotic for bacterial infections',
      rxRequired: true,
      dosage: '500mg capsule',
      manufacturer: 'Cipla',
      sideEffects: 'Diarrhea, nausea',
      interactions: 'May reduce effectiveness of birth control',
    },
    {
      name: 'Metformin 500mg',
      brand: 'Glycomet',
      genericName: 'Metformin',
      description: 'Oral diabetes medication',
      rxRequired: true,
      dosage: '500mg tablet',
      manufacturer: 'USV',
      sideEffects: 'Nausea, stomach upset',
      interactions: 'May interact with alcohol',
    },
    {
      name: 'Cetirizine 10mg',
      brand: 'Zyrtec',
      genericName: 'Cetirizine',
      description: 'Antihistamine for allergies',
      rxRequired: false,
      dosage: '10mg tablet',
      manufacturer: 'Johnson & Johnson',
      sideEffects: 'Drowsiness, dry mouth',
      interactions: 'May enhance effects of alcohol',
    },
  ];

  const createdProducts = [];
  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { id: `product-${productData.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: productData,
    });
    createdProducts.push(product);
    console.log(`✅ Created product: ${product.name}`);
  }

  // Create inventory for each pharmacy-product combination
  for (const pharmacy of createdPharmacies) {
    for (const product of createdProducts) {
      const basePrice = Math.random() * 200 + 50; // Random price between 50-250
      const price = Math.round(basePrice * 100) / 100;
      const quantity = Math.floor(Math.random() * 100) + 10;

      await prisma.inventory.upsert({
        where: {
          pharmacyId_productId: {
            pharmacyId: pharmacy.id,
            productId: product.id,
          },
        },
        update: {
          price,
          quantity,
          lastSyncAt: new Date(),
        },
        create: {
          pharmacyId: pharmacy.id,
          productId: product.id,
          price,
          quantity,
          lastSyncAt: new Date(),
        },
      });
    }
  }

  console.log('✅ Created inventory entries');

  // Create sample address for user
  await prisma.address.upsert({
    where: { id: 'address-1' },
    update: {},
    create: {
      id: 'address-1',
      userId: user.id,
      label: 'Home',
      street: '123 Test Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'IN',
      latitude: 19.0760,
      longitude: 72.8777,
      isDefault: true,
    },
  });

  console.log('✅ Created sample address');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

