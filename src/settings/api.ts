import knex from "knex";

export const qb = knex({
  client: "mysql2",
  connection: {
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    pool: {
      min: parseInt(process.env.DATABASE_MIN_CONNECTIONS, 10) || 0,
      max: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 12,
    },
  },
});

export const sessionApiUrl = "https://tiande.ru/api/v1/session.php";
export const url = process.env.URL || "127.0.0.1";
