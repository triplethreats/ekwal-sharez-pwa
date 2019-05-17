import {Ledger} from "../domain/ledger";
import {Transaction} from "../domain/transaction";
import {LedgerDraft} from "../domain/ledger-draft";
import {LedgerUserDraft} from "../domain/ledger-user-draft";

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
    static getLedgers(mail: string): Promise<Ledger[]> {
        return fetch("/api/ledgers")
            .then(response => response.json())
            .then((ledgers: Ledger[]) => ledgers.map(serializeLedger));
    }

    static getLedger(mail: string, ledgerId: number): Promise<Ledger> {
        return fetch(`/api/ledgers/${ledgerId}`)
            .then(response => response.json())
            .then(serializeLedger);
    }

    static updateLedger(ledgerId: number, updatedLedger: Ledger, newUsers: LedgerUserDraft[]): Promise<void>{
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify({updatedLedger:updatedLedger,newUsers:newUsers}),
            headers: new Headers()
        };
        return fetch(`/api/ledgers/${ledgerId}`, fetchData).then();
    }

    static createLedger(ledgerDraft:LedgerDraft): Promise<Ledger>{
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(ledgerDraft),
            headers: new Headers()
        };
        return fetch(`/api/ledgers/`, fetchData)
            .then(response => response.json()
                .then(function(ledger:Ledger){return ledger;})
            );
    }
}
