import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    const result = await contactService.create(user, request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const username = req.user.username;
    const contactId = parseInt(req.params.contactId);

    const result = await contactService.get(username, contactId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, get };
