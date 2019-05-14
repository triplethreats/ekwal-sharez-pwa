import * as React from 'react';
import './ledger-view.css';
import TransactionList from "../transaction-list/transaction-list";
import {Ledger} from "../../domain/ledger";
import {RouteComponentProps} from "react-router";

interface Props {
    ledger: Ledger
}

const ledgers: Ledger[] = [
    {
        title: "Amsterdam",
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

export default class LedgerView extends React.Component<RouteComponentProps, Props> {

    state: Props = {} as Props;

    componentWillMount(): void {
        const {id} = this.props.match.params;
        this.setState({ledger: ledgers[id]});
    }

    render() {
        return (
            <div>
                <h2>{this.state.ledger.title}</h2>
                <TransactionList transactions={this.state.ledger.transactions} />
            </div>
        );
    }
};
