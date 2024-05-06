"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/users/user.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app routes
app.use("/api/v1/users", user_route_1.UserRoutes);
const getAController = (req, res) => {
    res.send(`<div style="background: blue; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 600px; height: 200px; margin: auto; margin-top: 50px; display: flex; flex-direction: column; justify-content: center; align-items: cenrer;"><h1 style="color: white; text-align: center;">Welcome to the assignment-2 server 🥳</h1></div>`);
};
app.get("/", getAController);
exports.default = app;
