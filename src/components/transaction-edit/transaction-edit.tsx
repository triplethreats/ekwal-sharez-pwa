import * as React from "react";
import './transaction-edit.css';
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
import {Link} from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import {TransactionDraft} from "../../domain/transaction-draft";


interface State {
    transaction: Transaction
    transactionDraft:TransactionDraft
    users: LedgerUser[]
    success: boolean
    idLegder: number
    idTransaction: number
    newPage: boolean
}

interface MatchParams {
    idTransaction: number;
    idLegder: number;
}

export default class TransactionEdit extends React.Component<RouteComponentProps, State> {
    state: State = {success: true} as State;

    componentWillMount(): void {
        const path = window.location.pathname;
        const pathSplit = path.split("/");
        if(pathSplit[pathSplit.length-1]==="new"){
            const {idLegder} = this.props.match.params as {idLegder: number};
            LedgerApi.getLedger("", idLegder).then(ledger => {
                this.setState({
                    newPage: true,
                    success:true,
                    idLegder: idLegder,
                    users: ledger.users,
                    transactionDraft:{name:"",payments:[{amount:0,user:ledger.users[0]}],total:0,date:new Date()}
                });
            }).catch(reason => {
                this.setState({
                    success: false
                });
            });
        }else {
            const {idLegder, idTransaction} = this.props.match.params as MatchParams;
            LedgerApi.getLedger("", idLegder).then(ledger => {
                this.setState({
                    idLegder: idLegder,
                    idTransaction: idTransaction,
                    transaction: ledger.transactions[idTransaction],
                    users: ledger.users,
                    success: true,
                    newPage: false
                });
            }).catch(reason => {
                this.setState({
                    success: false
                });
            });
        }
    }
    handleChange = (event: { target: { value: string; }; }) => {
        if(this.state.newPage){
            this.state.transactionDraft.payments[0].user.name = event.target.value;
        }else{
            this.state.transaction.payments[0].user.name = event.target.value;
        }
        this.setState(this.state);
    };
    render() {
        if (!this.state.success) {
            return <Redirect to={"/"}/>
        } else if (!this.state.transaction && !this.state.newPage) {
            return <p>Loading...</p>
        } else {
            return (
                <div>
                    <Grid item xs={12}><TextField
                        id="transaction-name"
                        label="Name"
                        value={this.state.newPage ? this.state.transactionDraft.name : this.state.transaction.name}
                        onChange={e => {
                            if(this.state.newPage){
                                this.state.transactionDraft.name = e.target.value;
                            }else {
                                this.state.transaction.name = e.target.value;
                            }
                            this.setState(this.state)}}
                        margin="normal"
                    /></Grid>
                    <Grid item xs={12}><TextField
                        id="transaction-price"
                        label="Price"
                        type="number"
                        value={this.state.newPage ? this.state.transactionDraft.total : this.state.transaction.total}
                        onChange={e => {
                            if(this.state.newPage){
                                this.state.transactionDraft.total = parseInt(e.target.value);
                                this.state.transactionDraft.payments[0].amount = parseInt(e.target.value);
                            }else {
                                this.state.transaction.total = parseInt(e.target.value);
                                this.state.transaction.payments[0].amount = parseInt(e.target.value);
                            }
                            this.setState(this.state)}}
                        margin="normal"
                    /></Grid>
                    <Grid item xs={12}><TextField
                        id="transaction-date"
                        label="Date"
                        type="date"
                        defaultValue={this.state.newPage ? this.state.transactionDraft.date.toISOString().split("T")[0] : this.state.transaction.date.toISOString().split('T')[0]}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /></Grid>
                    <InputLabel htmlFor="age-simple">Payer</InputLabel>
                    <Grid item xs={12}><Select
                        id="transaction-payer"
                        value={this.state.newPage ? this.state.transactionDraft.payments[0].user.name : this.state.transaction.payments[0].user.name}
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
                    <Grid item xs={12}><Button variant="contained" onClick={() => {
                        TransactionApi.updateTransaction(this.state.idLegder,this.state.idTransaction,this.state.transaction);
                    }}>
                        <SaveIcon/>
                        {this.state.newPage ? "Create" :"Save"}
                    </Button></Grid>
                    <Button variant="contained" component={props => <Link {...props} to={`/ledgers/${this.state.idLegder}/transactions`}/>} >
                        <ArrowBackIosIcon/>
                    </Button>
                </div>
            );
        }
    }
};
