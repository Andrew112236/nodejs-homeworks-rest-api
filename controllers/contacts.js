const Contacts = require("../models/contacts");

// listContacts

const listContacts = async (_, res) => {
  const contact = await Contacts.find();
  res.json(contact);
};

// addContact

const addContact = async (req, res) => {
  const newContact = new Contacts(req.body);
  const result = await newContact.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

// getContactById

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const getContact = await Contacts.findById(contactId).exec();

  if (!getContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Nu s-a gasit!",
    });
  }
  res.status(200).json(getContact);
};

// removeContactById

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const removeContact = await Contacts.findByIdAndDelete(contactId);

  if (!removeContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Nu a fost gasit!",
    });
  }
  res.status(200).json({ mesage: "Contactul a fost sters!" });
};

// update ContactById

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  const updateContact = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    {
      new: true,
    }
  );

  if (!updateContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Nu s-a gasit!",
    });
  }
  res.json(updateContact);
};

// update Status Favorite Contact

const updateFavorite = (req, res) => {
  const { contactId } = req.params;

  Contacts.findOneAndUpdate({ _id: contactId }, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Nu s-a gasit!" });
      }

      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({
        code: 500,
        message: "Eroare la actualizarea starii.",
        error: error.message,
      });
    });
};

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContactById,
  updateContactById,
  updateFavorite,
};
