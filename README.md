# Prisma/PostgreSQL Crash Course

Welcome to the Prisma/PostgreSQL crash course by Mani Tahriri! This guide will help you set up a basic Prisma project with PostgreSQL, create database relationships, and run some queries.

## Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running


## Step 1: Install Dependencies

First, create a new project directory and navigate into it. Then, run the following command to initialize a new Node.js project and install the necessary dependencies:

```bash
npm init -y
npm i --save-dev prisma typescript ts-node @types/node nodemon
npm i @prisma/client
```
## Step 2: Understand the Scenario

An online bookstore wants to develop a database system to manage their inventory, customers, and orders. The bookstore sells a wide variety of books, including novels, textbooks, and children's books. The management wants to track the information about books, authors, customers, and orders to improve their business operations.

## Step 3: Draw ER-Diagram

Based on the Scenario we set enteties and attributes of each enteties. Then we draw relationships.
![3 Jun 2024 at 00_15](https://github.com/Manimit10/prisma-hello-world/assets/56443638/3e943027-369b-4447-90cf-2d78cd019f44)


## Step 4: Create Database Using `psql`
Open your PostgreSQL shell (psql) and run the following commands to create a new database:
```
CREATE DATABASE bookstore;
\c bookstore
```
## Step 5: Initialize Prisma
Run the following command to initialize Prisma in your project:
``npx prisma init`` 
This will create a prisma directory with a schema.prisma file and a ``.env`` file. Update the DATABASE_URL in the .env file to match your PostgreSQL connection string:
```
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/bookstore"
```
## Step 6: Define the Schema
Look at the file `schema.prisma` in prisma folder.

## Step 7: Create the Database Tables
Run the following commands to create the database tables based on the schema definition:
```
npx prisma migrate dev --name init
npx prisma generate
```

## Step 8: Populate the Database
We create a script2.ts file that contains `main()` and `query()` functions. If you run main function it will populate add some sample data to the database.
to run it you can use
```
npx nodemon script.ts

```

## Step 9: Query the Database
We create a script2.ts file that contains `main()` and `query()` functions. If you run query function it will show up some information from the database.
to run it you can use
```
npx nodemon script.ts

```

# Let's learn one-to-many and many-to-many relationships

## One-to-Many Relationship
In a one-to-many relationship, a single record in one table can be related to multiple records in another table. For example, a Customer can place multiple Orders, but each Order belongs to a single Customer.

```
model Customer {
  id      Int     @id @default(autoincrement())
  name    String
  email   String  @unique
  address String
  orders  Order[]
}

model Order {
  id         Int      @id @default(autoincrement())
  orderDate  DateTime
  orderStatus String
  customerId Int
  customer   Customer @relation(fields: [customerId], references: [id])
}


```
## Many-to-Many Relationship
In a many-to-many relationship, multiple records in one table can be related to multiple records in another table. For example, a Book can have multiple Authors, and an Author can write multiple Books.
```
model Book {
  ISBN            String     @id
  title           String
  genre           String
  publicationYear Int
  price           Float
  authors         AuthorBook[]
}

model Author {
  id       Int          @id @default(autoincrement())
  name     String
  email    String       @unique
  biography String
  books    AuthorBook[]
}

model AuthorBook {
  authorId Int
  bookISBN String
  author   Author @relation(fields: [authorId], references: [id])
  book     Book   @relation(fields: [bookISBN], references: [ISBN])

  @@id([authorId, bookISBN])
}
```















