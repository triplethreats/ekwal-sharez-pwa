import {LedgerUserDraft} from "./ledger-user-draft";

export interface LedgerDraft {
    users: LedgerUserDraft[],
    title: string,
    description: string
}
