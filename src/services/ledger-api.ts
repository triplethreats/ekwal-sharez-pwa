import {Ledger} from "../domain/ledger";
import {Transaction} from "../domain/transaction";

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
}
