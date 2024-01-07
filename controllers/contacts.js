const Contacts = require("../models/contacts");

// listContacts - GOOD

const listContacts = async (_, res) => {
  const contact = await Contacts.find();
  res.json(contact);
};

// addContact - GOOD

const addContact = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contacts.create({ ...req.body, owner });
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// getContactById - GOOD

const getContactById = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(`Error during getContactById: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// removeContactById - GOOD

const removeContactById = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(`Error during removeContactById: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update ContactById - GOOD

const updateContactById = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(`Error during updateContact: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update Status Favorite Contact - GOOD

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
