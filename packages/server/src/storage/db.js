const { DataSource }= require("typeorm");

const db = new DataSource({
  "type": "sqlite",
  "database": "store/db.sqlite",
  "entities": [
    "./dist/entity/*.js"
  ],
});

module.exports.db = db;