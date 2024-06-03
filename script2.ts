import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  // Create authors
  const author1 = await prisma.author.create({
    data: {
      name: "Author One",
      email: "author1@example.com",
      biography: "Biography of Author One"
    }
  });

  const author2 = await prisma.author.create({
    data: {
      name: "Author Two",
      email: "author2@example.com",
      biography: "Biography of Author Two"
    }
  });

  // Create books
  const book1 = await prisma.book.create({
    data: {
      ISBN: "978-3-16-148410-0",
      title: "Book One",
      genre: "Fiction",
      publicationYear: 2020,
      price: 19.99,
      authors: {
        create: [
          { authorId: author1.id },
          { authorId: author2.id }
        ]
      }
    }
  });

  const book2 = await prisma.book.create({
    data: {
      ISBN: "978-3-16-148411-7",
      title: "Book Two",
      genre: "Non-Fiction",
      publicationYear: 2021,
      price: 29.99,
      authors: {
        create: [
          { authorId: author1.id }
        ]
      }
    }
  });

  // Create customers
  const customer1 = await prisma.customer.create({
    data: {
      name: "Customer One",
      email: "customer1@example.com",
      address: "123 Main St"
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: "Customer Two",
      email: "customer2@example.com",
      address: "456 Elm St"
    }
  });

  // Create orders
  const order1 = await prisma.order.create({
    data: {
      customerId: customer1.id,
      orderDate: new Date(),
      orderStatus: "Shipped",
      books: {
        create: [
          { bookISBN: book1.ISBN },
          { bookISBN: book2.ISBN }
        ]
      }
    }
  });

  const order2 = await prisma.order.create({
    data: {
      customerId: customer2.id,
      orderDate: new Date(),
      orderStatus: "Processing",
      books: {
        create: [
          { bookISBN: book2.ISBN }
        ]
      }
    }
  });

  console.log("Sample data created successfully!");
}

// main().catch(e => {
//   console.error(e.message);
// }).finally(async () => {
//   await prisma.$disconnect();
// });

async function query() {
    // Example inner join: Get all orders with their related customer and books
    const ordersWithDetails = await prisma.order.findMany({
      include: {
        customer: true,
        books: {
          include: {
            book: true
          }
        }
      }
    });
    console.log("Orders with customer and book details:", JSON.stringify(ordersWithDetails, null, 2));
  
    // Example left join: Get all customers and their orders (if any)
    const customersWithOrders = await prisma.customer.findMany({
      include: {
        orders: true
      }
    });
    console.log("Customers with their orders:", JSON.stringify(customersWithOrders, null, 2));
  }
  
  query().catch(e => {
    console.error(e.message);
  }).finally(async () => {
    await prisma.$disconnect();
  });
