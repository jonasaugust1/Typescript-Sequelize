"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(number, agency) {
        this.number = number;
        this.agency = agency;
        this.balance = 0;
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
        this.balance += value;
    }
    withdraw(value) {
        if (this.balance > value) {
            this.balance -= value;
        }
        else {
            console.log('Não há saldo suficiente para sacar');
        }
    }
}
exports.Account = Account;
