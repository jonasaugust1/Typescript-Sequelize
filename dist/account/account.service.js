"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdraw = exports.deposit = exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
const client_class_1 = require("./../client/client.class");
const cp_class_1 = require("./cp.class");
const cc_class_1 = require("./cc.class");
let accounts = {
    1: new cc_class_1.CC(1, "01", "01", new client_class_1.Client("Jonas", "Araujo", "123.456.789-00")),
    2: new cp_class_1.Cp(2, "02", "01", new client_class_1.Client("Joao", "Batista", "457.542.799-31"))
};
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(accounts); });
exports.findAll = findAll;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () { return accounts[id]; });
exports.find = find;
const create = (newAccount) => __awaiter(void 0, void 0, void 0, function* () {
    const id = newAccount.getId();
    accounts[id] = newAccount;
    return accounts[id];
});
exports.create = create;
const update = (id, accountUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account)
        null;
    accounts[id] = accountUpdate;
    return accounts[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account)
        null;
    delete accounts[id];
});
exports.remove = remove;
const deposit = (id, value) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account)
        null;
    return account.deposit(value);
});
exports.deposit = deposit;
const withdraw = (id, value) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account)
        null;
    return account.withdraw(value);
});
exports.withdraw = withdraw;
