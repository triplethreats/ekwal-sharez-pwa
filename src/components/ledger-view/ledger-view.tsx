import * as React from 'react';
import './ledger-view.css';
import TransactionList from "../transaction-list/transaction-list";
import {Ledger} from "../../domain/ledger";
import {RouteComponentProps} from "react-router";
import Typography from "@material-ui/core/Typography";

interface Props {
    ledger: Ledger
}

const ledgers: Ledger[] = [
    {
        title: "Amsterdam",
        description: "Trip to Amsterdam",
        transactions: [
            {total: 50, date: new Date(Date.now()), payments: [
                    {amount: 50, user: {name: 'Rafael'}}
                ], name: 'Chipsy King'},
            {total: 60, date: new Date(Date.now()), payments:[
                    {amount: 60, user: {name: 'Rafael'}}
                ], name: 'Sweetness'}],
        users: [{name: 'Rafael'}, {name: 'Arthur'}, {name: 'Kevin'}]
    }
];

interface MatchParams {
    id: number;
}

export default class LedgerView extends React.Component<RouteComponentProps, Props> {

    state: Props = {} as Props;

    componentWillMount(): void {
        const {id} = this.props.match.params as {id: number};
        this.setState({ledger: ledgers[id]});
    }

    render() {
        return (
            <div>
                <Typography variant={"h2"} style={{textAlign: "center"}}>{this.state.ledger.title}</Typography>
                <TransactionList transactions={this.state.ledger.transactions} />
            </div>
        );
    }
};
