import {TransactionPaymentDraft} from "./transaction-payment-draft";

export interface TransactionDraft {
    name: string;
    payments: TransactionPaymentDraft[];
    total: number;
    date: Date;
}
