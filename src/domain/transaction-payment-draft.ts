import {LedgerUser} from "./ledger-user";

export interface TransactionPaymentDraft {
    amount: number;
    user: LedgerUser;
}
