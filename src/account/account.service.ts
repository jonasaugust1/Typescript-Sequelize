import { Client } from './../client/client.class';
import { Account } from './account.class';
import { Cp } from "./cp.class";
import { CC } from "./cc.class";
import { Accounts } from "./accounts.interface";


let accounts: Accounts = {
    1: new CC(1, "01", "01", new Client("Jonas", "Araujo", "123.456.789-00")),
    2: new Cp(2, "02", "01", new Client("Joao", "Batista", "457.542.799-31"))
}

export const findAll = async (): Promise<Accounts> =>  Object.values(accounts)

export const find = async (id: number) => accounts[id];

export const create = async (newAccount: Cp | CC): Promise<Account> => {
    const id = newAccount.getId();

    accounts[id] = newAccount;

    return accounts[id];
} 

export const update = async (id: number, accountUpdate: Account): Promise<Account | null> => {
    
    const account = await find(id);

    if(!account) null;

    accounts[id] = accountUpdate;

    return accounts[id];
}

export const remove = async (id:number): Promise<void | null> => {

    const account = await find(id);

    if(!account) null

    delete accounts[id];
}

export const deposit = async (id: number, value: number): Promise<number | null> => {
    const account = await find(id);
    if(!account) null

    return account.deposit(value);
}

export const withdraw = async (id: number, value: number): Promise<number | null> => {
    const account = await find(id);
    if(!account) null

    return account.withdraw(value);
}