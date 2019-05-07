import {LedgerUser} from "./ledger-user";

export interface TransactionPayment {
    amount: number;
    user: LedgerUser;
}
