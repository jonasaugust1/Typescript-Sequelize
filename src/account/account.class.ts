export class Account {
    private number;
    private agency;
    private balance: number;

    constructor(number: string, agency: string) {
        this.number = number;
        this.agency = agency;
        this.balance = 0;
    }

    getNumber(){
        return this.number
    }

    setNumber(value: string) {
        this.number = value
    }

    getAgency(){
        return this.agency
    }

    setAgency(value: string){
        this.agency = value
    }

    getBalance(){
        return this.balance
    }

    deposit(value: number) {
        this.balance += value
    }

    withdraw(value: number) {
        if(this.balance > value) {
            this.balance -= value
        } else {
            console.log('Não há saldo suficiente para sacar')
        }
    }

}