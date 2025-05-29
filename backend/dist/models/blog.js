"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Blog = connection_1.default.define('Blog', {
    userID: {
        type: sequelize_1.DataTypes.STRING
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    destination: {
        type: sequelize_1.DataTypes.STRING
    },
    country: {
        type: sequelize_1.DataTypes.STRING
    },
    city: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    travelers: {
        type: sequelize_1.DataTypes.INTEGER
    },
    costs: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    month: {
        type: sequelize_1.DataTypes.STRING
    },
    year: {
        type: sequelize_1.DataTypes.STRING
    },
    nDays: {
        type: sequelize_1.DataTypes.INTEGER
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.default = Blog;
