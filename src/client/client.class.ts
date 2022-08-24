export class Client {

    private name: string;
    private lastName: string;
    private cpf: string;

    constructor(name: string, lastName: string, cpf: string){
        this.name = name;
        this.lastName = lastName;
        this.cpf = cpf;
    }

    getName() : string{
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getLastName(): string{
        return this.lastName
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }
}