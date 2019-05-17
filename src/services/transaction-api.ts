import {TransactionDraft} from "../domain/transaction-draft";
import {Transaction} from "../domain/transaction";
import {TokenHolder} from "./TokenHolder";

export default class TransactionApi{
    static updateTransaction(ledgerId: number,transactionId : number, updatedTransaction : Transaction):Promise<void>{
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${TokenHolder.getToken()}`);
        headers.set("Content-Type", "application/json");
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify(updatedTransaction),
            headers: headers
        };
        return fetch(`/api/ledgers/${ledgerId}/transactions/${transactionId}`, fetchData).then()
    }
    static createTransaction(ledgerId: number,transactionDraft : TransactionDraft):Promise<number>{
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${TokenHolder.getToken()}`);
        headers.set("Content-Type", "application/json");
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(transactionDraft),
            headers: headers
        };
        return fetch(`/api/ledgers/${ledgerId}/transactions/`, fetchData)
            .then(response => response.json()
                .then(function(id:number){return id;})
            );
    }
}
