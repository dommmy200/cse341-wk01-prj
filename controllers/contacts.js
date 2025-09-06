const database = require('../data/database');
const mongodb = require('mongodb');
const { ObjectId } = mongodb;

const getAll = async (req, res) => {
  try {
    const db = database.getDatabase();
    const contacts = await db.collection("contacts").find().toArray();

    if (!contacts) {
      return res.status(404).json({ message: "Contacts not found" });
    }

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const contactId = ObjectId.createFromHexString(req.params.id); // Convert the string in 'req.params.id' to 'ObjectId' object to easy matching
    const db = database.getDatabase();
    const contact = await db.collection("contacts").findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getAll, getSingle};