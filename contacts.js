const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  if (!result) {
    return;
  }
  return result;
}

async function removeContact(contactId) {
  if (!contactId) {
    console.log("Empty id. Please, enter id");
    return;
  }
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return;
  }
  const [contact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await await updateContacts(contacts);
  return newContact;
}

async function updateContacts(data) {
  const contacts = JSON.stringify(data);
  await fs.writeFile(contactsPath, contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
