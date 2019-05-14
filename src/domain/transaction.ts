import {TransactionPayment} from "./transaction-payment";

export interface Transaction {
    name: string;
    payments: TransactionPayment[];
    total: number;
    date: Date;
}
