import {open} from "sqlite";
import sqlite3 from "sqlite3";

const dbPromise = open({
    filename: "./database/whats-service.db",
    driver: sqlite3.Database,
});

export { dbPromise }