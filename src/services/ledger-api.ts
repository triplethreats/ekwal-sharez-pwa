import {Ledger} from "../domain/ledger";

export default class LedgerApi {
    static getLedgers(mail: string): Promise<Ledger[]> {
        return fetch("/api/ledgers").then(response => response.json());
    }

    static getLedger(mail: string, ledgerId: number): Promise<Ledger> {
        return fetch(`/api/ledgers/${ledgerId}`).then(response => response.json());
    }
}
