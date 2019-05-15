import {TransactionPayment} from "./transaction-payment";

export interface Transaction {
    id: number;
    name: string;
    payments: TransactionPayment[];
    total: number;
    date: Date;
}
