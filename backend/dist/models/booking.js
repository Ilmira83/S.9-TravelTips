"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Booking = connection_1.default.define('Booking', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    days: {
        type: sequelize_1.DataTypes.INTEGER
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    startDate: {
        type: sequelize_1.DataTypes.DATEONLY
    },
});
exports.default = Booking;
