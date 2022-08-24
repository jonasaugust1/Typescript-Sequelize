"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor(name, lastName, cpf) {
        this.name = name;
        this.lastName = lastName;
        this.cpf = cpf;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
}
exports.Client = Client;
