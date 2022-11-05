const { Pool } = require("pg");

const prodConfig = {
  connectionString:
    "postgres://postgres:postgres@postgres.cnvhsjafipfs.ca-central-1.rds.amazonaws.com:5432/codetogive",
  ssl: false,
};

const pool = new Pool(prodConfig);

module.exports = {
  query: (text, params) => {
    console.log(pool.connectionString);
    return pool.query(text, params);
  },
};

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: false,
// });
