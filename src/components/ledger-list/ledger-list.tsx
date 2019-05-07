import * as React from "react";
import './ledger-list.css'
import {Ledger} from "../../domain/ledger";
import LedgerView from "../ledger-view/ledger-view";

export default class LedgerList extends React.Component{
    render() {
        const ledgers: Ledger[] = [
            {
                transactions: [
                    {total: 50, payments: [
                        {amount: 50, user: {name: 'Rafael'}}
                        ], name: 'Chipsy King'},
                    {total: 60, payments:[
                        {amount: 60, user: {name: 'Rafael'}}
                        ], name: 'Sweetness'}],
                users: [{name: 'Rafael'}, {name: 'Arthur'}, {name: 'Kevin'}]
            }
        ];
        return (
            <div>
                {ledgers.map((value, index) => {
                    return <LedgerView key={index} ledger={value}/>
                })}
            </div>
        );
    }
}
