import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAddressValidation } from "../validation/address-valdiation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (username, contactId, request) => {
  // validasi data contact apakah valid
  contactId = validate(getContactValidation, contactId);

  // cek data contact di db
  const contactExist = await prismaClient.contact.findUnique({
    where: {
      id: contactId,
      username,
    },
  });

  // jika data contact tidak ada
  if (!contactExist) {
    throw new ResponseError(404, "contact not found");
  }

  // validasi data address apakah valid
  const address = validate(createAddressValidation, request);
  // asign data contactId ke object address
  address.contactId = contactId;

  // proses create data address
  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
    },
  });
};

export default { create };
