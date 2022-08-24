"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountsRouter = void 0;
const client_class_1 = require("./../client/client.class");
const express_1 = __importDefault(require("express"));
const AccountService = __importStar(require("./account.service"));
const cc_class_1 = require("./cc.class");
const cp_class_1 = require("./cp.class");
exports.accountsRouter = express_1.default.Router();
exports.accountsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield AccountService.findAll();
        res.status(200).send(accounts);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.accountsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const account = yield AccountService.find(id);
        if (account) {
            return res.status(200).send(account);
        }
        return res.status(404).send("Account not found");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.accountsRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = new Date().valueOf();
        let client = new client_class_1.Client(req.body.name, req.body.lastName, req.body.cpf);
        let account;
        if (req.body.type == 'cc') {
            account = new cc_class_1.CC(id, req.body.number, req.body.agency, client);
        }
        else {
            account = new cp_class_1.Cp(id, req.body.number, req.body.agency, client);
        }
        const newAccount = yield AccountService.create(account);
        return res.status(201).json(newAccount);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
exports.accountsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const accountUpdate = req.body;
        const account = yield AccountService.find(id);
        if (account) {
            const updatedAccount = yield AccountService.update(id, accountUpdate);
            return res.status(200).json(updatedAccount);
        }
        const newAccount = yield AccountService.create(accountUpdate);
        return res.status(201).json(newAccount);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
exports.accountsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const account = yield AccountService.find(id);
        if (account) {
            yield AccountService.remove(id);
            return res.status(204);
        }
        return res.status(404).send("Account not found");
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
exports.accountsRouter.post("/:id/deposit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const account = yield AccountService.find(id);
        if (account) {
            const value = parseFloat(req.body.value);
            const balance = yield AccountService.deposit(id, value);
            let message = (value <= 0) ? "Error! Only deposits greater than 0" : "Deposit made";
            return res.status(201).json({ message: message, balance: balance });
        }
        return res.status(404).send("Account not found");
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
