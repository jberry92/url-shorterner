"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
var app = express_1.default();
app.listen(config_1.config.listeningPort, function () {
    console.log("Listening on port " + config_1.config.listeningPort);
});
