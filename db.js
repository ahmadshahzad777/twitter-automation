const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(path.join(__dirname, 'sql.db'), (err) => {
    if (err) {
        return console.error('There was an error connecting to the sqlite3 database.', err);
    }
    return console.log('Successfully connected to the sqlite3 database.');
});

const id = 'id INTEGER PRIMARY KEY AUTOINCREMENT';
const message = 'message TEXT';
const files = 'files TEXT';
const tags = 'tags TEXT';
const link = 'link TEXT NOT NULL';
const date = 'time TEXT NOT NULL';
const priority = 'priority NUMBER';

let CREATE_TWEETS_TABLE = 'CREATE TABLE IF NOT EXISTS tweets (';
CREATE_TWEETS_TABLE += `${id}, `;
CREATE_TWEETS_TABLE += `${message}, `;
CREATE_TWEETS_TABLE += `${files}, `;
CREATE_TWEETS_TABLE += `${tags}, `;
CREATE_TWEETS_TABLE += `${date}, `;
CREATE_TWEETS_TABLE += priority;
CREATE_TWEETS_TABLE += ');';

let CREATE_RETWEETS_TABLE = 'CREATE TABLE IF NOT EXISTS retweets (';
CREATE_RETWEETS_TABLE += `${id}, `;
CREATE_RETWEETS_TABLE += `${link}, `;
CREATE_RETWEETS_TABLE += `${date}, `;
CREATE_RETWEETS_TABLE += priority;
CREATE_RETWEETS_TABLE += ');';

db.run(CREATE_TWEETS_TABLE, (err) => {
    if (err) {
        return console.error('There was an error creating the default sqlite3 tweets database.');
    }
    return console.log('Successfully created the default sqlite3 tweets database.');
});

db.run(CREATE_RETWEETS_TABLE, (err) => {
    if (err) {
        return console.error('There was an error creating the default sqlite3 retweets database.');
    }
    return console.log('Successfully created the default sqlite3 retweets database.');
});

module.exports = db;
