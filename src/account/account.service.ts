import { Account } from './account.class';
import { Cp } from "./cp.class";
import { CC } from "./cc.class";
import { Accounts } from "./accounts.interface";

let accounts: Accounts = {
    1: new CC("01", "01"),
    2: new Cp("02", "01")
}

export const findAll = async (): Promise<Accounts> =>  Object.values(accounts)

export const find = async (id: number) => accounts[id];

export const create = async (newAccount: Cp | CC): Promise<Account> => {
    const id = new Date().valueOf();

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