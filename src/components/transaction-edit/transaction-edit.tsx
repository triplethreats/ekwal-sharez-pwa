import * as React from "react";
import {Transaction} from "../../domain/transaction";
import TextField from '@material-ui/core/TextField';
import {Ledger} from "../../domain/ledger";
import {Redirect, RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import TransactionList from "../transaction-list/transaction-list";
import {TransactionPayment} from "../../domain/transaction-payment";
import {LedgerUser} from "../../domain/ledger-user";
import LedgerApi from "../../services/ledger-api";

interface State {
    transaction: Transaction
    users: LedgerUser[]
    success: boolean
}

interface MatchParams {
    idTransaction: number;
    idLegder: number;
}

export default class TransactionEdit extends React.Component<RouteComponentProps, State> {
    state: State = {success: true} as State;

    componentWillMount(): void {
        const {idLegder, idTransaction} = this.props.match.params as MatchParams;
        LedgerApi.getLedger("", idLegder).then(ledger => {
            this.setState({
                transaction: ledger.transactions[idTransaction],
                users: ledger.users,
                success: true
            });
            console.log("state", ledger.transactions[idTransaction]);
        }).catch(reason => {
            this.setState({
                success: false
            });
        });
    }

    render() {
        if (!this.state.success) {
            return <Redirect to={"/"}/>
        } else if (!this.state.transaction) {
            return <p>Loading...</p>
        } else {
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
                            MenuProps: {},
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
    }
};
