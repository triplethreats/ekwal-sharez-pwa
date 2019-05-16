import * as React from "react";
import {Transaction} from "../../domain/transaction";
import TextField from '@material-ui/core/TextField';
import {Redirect, RouteComponentProps} from "react-router";
import MenuItem from '@material-ui/core/MenuItem';
import {LedgerUser} from "../../domain/ledger-user";
import LedgerApi from "../../services/ledger-api";
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {Button} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import TransactionApi from "../../services/transaction-api";


interface State {
    transaction: Transaction
    users: LedgerUser[]
    success: boolean
    idLegder: number
    idTransaction: numbers
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
                idLegder: idLegder,
                idTransaction: idTransaction,
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
    handleChange = (event: { target: { value: string; }; }) => {
        let newTransaction = { ...this.state.transaction };
        newTransaction.payments[0].user.name = event.target.value;
        this.setState({ transaction: newTransaction });
    };
    render() {
        if (!this.state.success) {
            return <Redirect to={"/"}/>
        } else if (!this.state.transaction) {
            return <p>Loading...</p>
        } else {
            return (
                <div>
                    <Grid item xs={12}><TextField
                        id="transaction-name"
                        label="Name"
                        value={this.state.transaction.name}
                        onChange={e => {
                            let newTransaction = { ...this.state.transaction };
                            newTransaction.name = e.target.value;
                            this.setState({ transaction : newTransaction })}}
                        margin="normal"
                    /></Grid>
                    <Grid item xs={12}><TextField
                        id="transaction-price"
                        label="Price"
                        value={this.state.transaction.total}
                        onChange={e => {
                            let newTransaction = { ...this.state.transaction };
                            newTransaction.total = parseInt(e.target.value);
                            newTransaction.payments[0].amount = parseInt(e.target.value);
                            this.setState({ transaction : newTransaction })}}
                        margin="normal"
                    /></Grid>
                    <Grid item xs={12}><TextField
                        id="transaction-date"
                        label="Date"
                        type="date"
                        defaultValue={this.state.transaction.date.toISOString().split('T')[0]}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /></Grid>
                    <InputLabel htmlFor="age-simple">Payer</InputLabel>
                    <Grid item xs={12}><Select
                        id="transaction-payer"
                        value={this.state.transaction.payments[0].user.name}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'Payer',
                            id: 'payer-simple',
                        }}
                    >
                        {this.state.users.map(user => (
                            <MenuItem value={user.name}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select></Grid>
                    <Button variant="contained" onClick={() => {
                        TransactionApi.updateTransaction(this.state.idLegder,this.state.idTransaction,this.state.transaction);
                        console.log('onClick',this.state.transaction);
                    }}>
                        <SaveIcon/>
                        Save
                    </Button>
                </div>
            );
        }
    }
};
