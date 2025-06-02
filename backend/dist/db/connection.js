"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});
exports.default = sequelize;
