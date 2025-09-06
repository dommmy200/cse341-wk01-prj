const MongoClient = require('mongodb').MongoClient;

let database;

const initDatabase = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
        database = client.db(process.env.DB_NAME);
        return callback(null, database);
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        callback(err)
    });
        
}

const getDatabase = () => {
    if (!database) {
        throw new Error("Database is not initialized. Call initDatabase first.");
    }
    return database;
}

module.exports = { initDatabase, getDatabase };