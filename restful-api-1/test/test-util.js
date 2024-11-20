import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

// USER
const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("test", 10),
      name: "test",
      token: "test",
    },
  });
};

const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

// CONTACT
const removeTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      firstName: "test",
      username: "test",
    },
  });
};

const createManyTestContact = async () => {
  for (let i = 1; i <= 15; i++) {
    await prismaClient.contact.create({
      data: {
        firstName: `test ${i}`,
        lastName: `test ${i}`,
        email: `test${i}@gmail.com`,
        phone: `08999999999${i}`,
        username: "test",
      },
    });
  }
};

const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  removeTestContact,
  createTestContact,
  createManyTestContact,
  getTestContact,
};
