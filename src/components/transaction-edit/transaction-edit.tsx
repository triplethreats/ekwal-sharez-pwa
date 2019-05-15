import * as React from "react";
import {Transaction} from "../../domain/transaction";
import TextField from '@material-ui/core/TextField';
import {Ledger} from "../../domain/ledger";
import {RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import TransactionList from "../transaction-list/transaction-list";
import {TransactionPayment} from "../../domain/transaction-payment";
import {LedgerUser} from "../../domain/ledger-user";

interface Props {
    transaction: Transaction
    users: LedgerUser[]
}

const ledgers: Ledger[] = [
    {
        id: 0,
        title: "Amsterdam",
        description: "Trip to Amsterdam",
        transactions: [
            {id:0,total: 50, date: new Date(Date.now()), payments: [
                    {id:0,amount: 50, user: {id:0,name: 'Rafael'}}
                ], name: 'Chipsy King'},
            {id:1,total: 60, date: new Date(Date.now()), payments:[
                    {id:1,amount: 60, user: {id:0,name: 'Rafael'}}
                ], name: 'Sweetness'}],
        users: [{id:0,name: 'Rafael'}, {id:1,name: 'Arthur'}, {id:2,name: 'Kevin'}]
    }
];

interface MatchParams {
    idTransaction: number;
    idLegder: number;
}

export default class TransactionEdit extends React.Component<RouteComponentProps, Props> {
    state: Props = {} as Props;

    componentWillMount(): void {
        const {idLegder, idTransaction} = this.props.match.params as MatchParams;
        this.setState({
            transaction: ledgers[idLegder].transactions[idTransaction],
            users: ledgers[idLegder].users
        });
        console.log("state",ledgers[idLegder].transactions[idTransaction]);
    }

    render() {
        return (
            <div>
                <TextField
                    label="Name"
                    value={this.state.transaction.name}
                    margin="normal"
                />
                <TextField
                    label="Price"
                    value={this.state.transaction.total}
                    margin="normal"
                />
                <TextField
                    label="Date"
                    type="date"
                    defaultValue={this.state.transaction.date.toISOString().split('T')[0]}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    select
                    label="Payer"
                    value={this.state.transaction.payments[0].user.name}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                        },
                    }}
                    helperText="Please select the payer"
                    margin="normal"
                >
                    {this.state.users.map(user => (
                        <option key={user.name} value={user.name}>
                            {user.name}
                        </option>
                    ))}
                </TextField>
            </div>
        );
    }
};
