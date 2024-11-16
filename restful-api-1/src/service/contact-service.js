import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
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

export default { create, get, update, remove };
