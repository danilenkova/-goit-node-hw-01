const { program } = require("commander");

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log("Contacts:");
      console.table(contacts);
      break;

    case "get":
      if (!id) {
        console.warn("\x1B[31m Empty id. Please, enter id");
        return;
      }
      const contact = await contactsOperations.getContactById(id);
      contact
        ? console.log("Find contact:", contact)
        : console.warn(`\x1B[31m Contact by id ${id} not found`);
      break;

    case "add":
      if (!name || !email || !phone) {
        console.warn(
          "\x1B[31m One or more of the contact information options is empty"
        );
        program.outputHelp();
        return;
      }
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log("Added new contact:", newContact);
      break;

    case "remove":
      if (!id) {
        console.warn("\x1B[31m Empty id. Please, enter id");
        program.outputHelp();
        return;
      }
      const removeContact = await contactsOperations.removeContact(id);
      removeContact
        ? console.log("Removed contact:", removeContact)
        : console.warn(`\x1B[31m Contact by id ${id} not found]`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!\x1b[0m");
      program.outputHelp();
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.showHelpAfterError();

program.parse(process.argv);

const opts = program.opts();

invokeAction(opts);
