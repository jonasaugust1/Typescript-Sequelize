import { Client } from './../client/client.class';
import { Accounts } from './accounts.interface';
import express, { Request, Response } from "express";
import * as AccountService from "./account.service";
import { Account } from "./account.class";
import { CC } from "./cc.class";
import { Cp } from "./cp.class";

export const accountsRouter = express.Router();

accountsRouter.get("/", async (req: Request, res: Response) => {

    try {
       const accounts: Accounts = await AccountService.findAll();

       res.status(200).send(accounts);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
    
})

accountsRouter.get("/:id", async (req:Request, res:Response) => {

    const id: number = parseInt(req.params.id, 10);

    try {
        const account: Account = await AccountService.find(id);

        if(account){
            return res.status(200).send(account);
        }

        return res.status(404).send("Account not found")
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

accountsRouter.post("/create",async (req:Request, res:Response) => {
    
    try {
        let id = new Date().valueOf();
        let client: Client = new Client(req.body.name, req.body.lastName, req.body.cpf);

        let account: Account;

        if(req.body.type == 'cc'){
            account = new CC(id, req.body.number, req.body.agency, client);
        } else {
            account = new Cp(id, req.body.number, req.body.agency, client);
        }

        const newAccount = await AccountService.create(account);

        return res.status(201).json(newAccount);
    } catch (error: any) {
        return res.status(500).send(error.message)
    }
})

accountsRouter.put("/:id",async (req:Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const accountUpdate: Account = req.body;

        const account: Account = await AccountService.find(id);

        if(account){
            const updatedAccount = await AccountService.update(id, accountUpdate);
            return res.status(200).json(updatedAccount);
        }

        const newAccount = await AccountService.create(accountUpdate);
        return res.status(201).json(newAccount);

    } catch (error: any) {
        return res.status(500).send(error.message)
    }
})

accountsRouter.delete("/:id",  async (req:Request, res: Response) => {
    
    try {
        const id: number = parseInt(req.params.id, 10);

        const account: Account = await AccountService.find(id);

        if(account) {
            await AccountService.remove(id);

            return res.status(204);
        }

        return res.status(404).send("Account not found");
        

    } catch (error: any) {
        return res.status(500).send(error.message);
    }
})

accountsRouter.post("/:id/deposit", async (req: Request, res: Response) => {
    try {
        const id:  number = parseInt(req.params.id, 10);
        const account: Account = await AccountService.find(id);

        if(account){
            const value: number = parseFloat(req.body.value);
            const balance = await AccountService.deposit(id, value);

            let message = (value <= 0) ? "Error! Only deposits greater than 0" : "Deposit made"
            return res.status(201).json({message: message, balance: balance});
        }

        return res.status(404).send("Account not found")
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
})
