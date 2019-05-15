import {LedgerUser} from "./ledger-user";

export interface TransactionPayment {
    id: number;
    amount: number;
    user: LedgerUser;
}
