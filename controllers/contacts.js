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

const insertPosts = async (req, res) => {
    const db = database.getDatabase();
    const newPost = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      favColor: req.body.favColor,
      email: req.body.email,
      birthday: req.body.birthday
    };
    await db.collection('contacts')
        .insertOne(newPost)
        .then(result => {
        res.status(201).json(result);
        })
        .catch(err => {
        console.error("Insert error:", err);
        res.status(500).send("Error inserting post");
        });
};

const updateRecords = async (req, res) => {
    try {
        const db = database.getDatabase();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format'});
        }
        // 2️⃣ Validate body
        console.log('Incoming update body:', req.body); // Debug log
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: 'Update data cannot be empty' });
        }
        const filter = { 
            _id: new ObjectId(id)
        };
        const updateDoc = { $set: req.body };
        
        const result = await db.collection('contacts').updateOne(filter, updateDoc);
        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'No matching contact found.'
            });
        }
        res.status(200).json({
            message: `Updated ${result.modifiedCount} contact(s).`, result
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            error: `Internal Server Error!`
        });
    }
    
};

const deleteOne = async (req, res) => {
  try {
    const db = database.getDatabase();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No contact found to delete.' });
    }
    res.json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Internal Server Error!' });
  }
};

module.exports = { getAll, getSingle, insertPosts, updateRecords, deleteOne };