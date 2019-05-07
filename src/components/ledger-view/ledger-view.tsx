import * as React from 'react';
import './ledger-view.css';
import TransactionList from "../transaction-list/transaction-list";
import {Ledger} from "../../domain/ledger";

interface Props {
    ledger: Ledger
}

export default class LedgerView extends React.Component<Props> {
    render() {
        return (
            <div>
                <h2>Amsterdam</h2>
                <TransactionList transactions={this.props.ledger.transactions} />
            </div>
        );
    }
};
