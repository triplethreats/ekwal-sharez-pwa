import {Transaction} from "./transaction";
import {LedgerUser} from "./ledger-user";

export interface Ledger {
    id: number;
    transactions: Transaction[],
    users: LedgerUser[],
    title: string,
    description: string
}
