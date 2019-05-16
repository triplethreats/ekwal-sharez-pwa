import * as React from 'react';
import './ledger-view.css';
import TransactionList from "../transaction-list/transaction-list";
import {Ledger} from "../../domain/ledger";
import {Redirect, RouteComponentProps} from "react-router";
import Typography from "@material-ui/core/Typography";
import LedgerApi from "../../services/ledger-api";

interface State {
    ledger: Ledger,
    success: boolean
}

interface MatchParams {
    id: number;
}

export default class LedgerView extends React.Component<RouteComponentProps, State> {

    state = {success: true} as State;

    componentWillMount(): void {
        const {id} = this.props.match.params as MatchParams;
        LedgerApi.getLedger("", id).then(ledger => {
            this.setState({ledger: ledger, success: true});
        }).catch(reason => {
            this.setState({success: false});
        });
    }

    render(){
        if (!this.state.success) {
            return <Redirect to={"/"}/>
        } else if (!this.state.ledger) {
            return <p>Loading...</p>
        } else {
            return (
                <div>
                    <Typography variant={"h2"} style={{textAlign: "center"}}>{this.state.ledger.title}</Typography>
                    <TransactionList transactions={this.state.ledger.transactions} ledger={this.state.ledger}/>
                </div>
            );
        }
    }
};
