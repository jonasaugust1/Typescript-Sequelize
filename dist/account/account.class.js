"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(id, number, agency, client) {
        this.id = id;
        this.number = number;
        this.agency = agency;
        this.balance = 0;
        this.client = client;
    }
    getId() {
        return this.id;
    }
    getNumber() {
        return this.number;
    }
    setNumber(value) {
        this.number = value;
    }
    getAgency() {
        return this.agency;
    }
    setAgency(value) {
        this.agency = value;
    }
    getBalance() {
        return this.balance;
    }
    deposit(value) {
        value > 0 ? this.balance += value : 0;
        return this.getBalance();
    }
    withdraw(value) {
        if (this.balance > value) {
            this.balance -= value;
        }
        else {
            console.log('Não há saldo suficiente para sacar');
        }
        return this.getBalance();
    }
}
exports.Account = Account;
