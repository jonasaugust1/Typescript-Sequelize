import { Client } from "../client/client.class";

export class Account {
    private id;
    private number;
    private agency;
    private balance: number;
    public client: Client

    constructor(id: number, number: string, agency: string, client: Client) {
        this.id = id
        this.number = number;
        this.agency = agency;
        this.balance = 0;
        this.client = client;
    }

    getId(): number {
        return this.id;
    }

    getNumber(): string{
        return this.number
    }

    setNumber(value: string): void {
        this.number = value
    }

    getAgency(): string{
        return this.agency
    }

    setAgency(value: string): void{
        this.agency = value
    }

    getBalance(){
        return this.balance
    }

    deposit(value: number): number {
        value > 0 ? this.balance += value : 0
        return this.getBalance();
    }

    withdraw(value: number): number {
        if(this.balance > value) {
            this.balance -= value
        } else {
            console.log('Não há saldo suficiente para sacar')
        }

        return this.getBalance();
    }

}