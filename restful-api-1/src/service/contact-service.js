import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (username, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
      username,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "contact not found");
  }

  return contact;
};

const update = async (username, request) => {
  const contact = validate(updateContactValidation, request);

  const contactExist = await prismaClient.contact.findUnique({
    where: {
      id: contact.id,
      username,
    },
  });

  if (!contactExist) {
    throw new ResponseError(404, "contact not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "contact not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const search = async (username, request) => {
  request = validate(searchContactValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username,
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          firstName: {
            contains: request.name,
          },
        },
        {
          lastName: {
            contains: request.name,
          },
        },
      ],
    });
  }

  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }

  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip,
  });

  const totalItem = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      totalItem,
      totalPage: Math.ceil(totalItem / 10), // bulatkan ke atas
    },
  };
};

export default { create, get, update, remove, search };
