const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.error("Eroare la citirea fisierului:", error);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const idToString = String(contactId);
    const contactById = contacts.find((contact) => contact.id === idToString);
    if (contactById) {
      return contactById;
    } else {
      throw new Error(`Contactul cu ID-ul ${contactId} nu a fost găsit.`);
    }
  } catch (error) {
    console.error("Eroare:", error.message);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idToString = String(contactId);
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === idToString
    );

    if (contactIndex === -1) {
      throw new Error(
        `Contactul cu ID-ul ${contactId} nu a fost găsit in sistem.`
      );
    }

    contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Contactul cu ID-ul ${contactId} a fost eliminat cu succes.`);
  } catch (error) {
    console.error("Eroare:", error.message);
  }
}

async function addContact(body) {
  if (!body.name || !body.email || !body.phone) {
    console.error("Trebuie să completezi cu un contact");
    return;
  }
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const contacts = JSON.parse(data);
    const newContact = { id: Date.String(Date.now()), ...body };
    contacts.push(newContact);

    console.table(contacts);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contactul a fost adăugat!");
  } catch (err) {
    console.error("Eroare:", err);
  }
}

async function updateContact(contactId, body) {
  try {
    const requiredFields = ["name", "email", "phone"];
    if (!requiredFields.every((field) => body[field])) {
      console.error("Trebuie sa completezi cu datele necesare.");
      return;
    }

    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      console.error(`Contactul cu id:${contactId} nu a fost identificat!`);
      return;
    }

    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("Datele de contact au fost schimbate cu succes!");

    return updatedContact;
  } catch (error) {
    console.error("O eroare a aparut in urma modificarii contactului!", error);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
