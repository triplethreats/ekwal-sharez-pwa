import {TransactionDraft} from "../domain/transaction-draft";
import {Transaction} from "../domain/transaction";

export default class TransactionApi{
    static updateTransaction(ledgerId: number,transactionId : number, updatedTransaction : Transaction):Promise<void>{
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify({updatedTransaction:updatedTransaction}),
            headers: new Headers()
        };
        return fetch(`/api/ledgers/${ledgerId}/transactions/${transactionId}`, fetchData).then()
    }
    static createTransaction(ledgerId: number,transactionDraft : TransactionDraft):Promise<number>{
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({transactionDraft:transactionDraft}),
            headers: new Headers()
        };
        return fetch(`/api/ledgers/${ledgerId}/transactions/`, fetchData)
            .then(response => response.json()
                .then(function(id:number){return id;})
            );
    }
}
