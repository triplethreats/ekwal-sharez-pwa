import {Transaction} from "./transaction";
import {LedgerUser} from "./ledger-user";

export interface Ledger {
    transactions: Transaction[],
    users: LedgerUser[],
    title: string,
    description: string
}
