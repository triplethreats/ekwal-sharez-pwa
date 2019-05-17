import {Ledger} from "../domain/ledger";
import {Transaction} from "../domain/transaction";
import {LedgerDraft} from "../domain/ledger-draft";
import {LedgerUserDraft} from "../domain/ledger-user-draft";
import {TokenHolder} from "./TokenHolder";

function serializeLedger(obj: any): Ledger {
    const ledger: Ledger = obj;
    ledger.transactions = obj.transactions.map(serializeTransaction);
    return ledger;
}

function serializeTransaction(obj: any): Transaction {
    const transaction: Transaction = obj;
    transaction.date = new Date(obj.date);
    return transaction;
}

export default class LedgerApi {
    static getLedgers(): Promise<Ledger[]> {
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${TokenHolder.getToken()}`);
        headers.set("Content-Type", "application/json");
        return fetch("/api/ledgers", {headers})
            .then(response => response.json())
            .then((ledgers: Ledger[]) => ledgers.map(serializeLedger));
    }

    static getLedger(ledgerId: number): Promise<Ledger> {
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${TokenHolder.getToken()}`);
        headers.set("Content-Type", "application/json");
        return fetch(`/api/ledgers/${ledgerId}`, {headers})
            .then(response => response.json())
            .then(serializeLedger);
    }

    static updateLedger(ledgerId: number, updatedLedger: Ledger, newUsers: LedgerUserDraft[]): Promise<void>{
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${TokenHolder.getToken()}`);
        headers.set("Content-Type", "application/json");
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify({updatedLedger, newUsers}),
            headers: headers
        };
        return fetch(`/api/ledgers/${ledgerId}`, fetchData).then();
    }

    static createLedger(ledgerDraft:LedgerDraft): Promise<Ledger>{
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${TokenHolder.getToken()}`);
        headers.set("Content-Type", "application/json");
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(ledgerDraft),
            headers: headers
        };
        return fetch(`/api/ledgers/`, fetchData)
            .then(response => response.json())
            .then(function(id: number){return id;});
    }
}
