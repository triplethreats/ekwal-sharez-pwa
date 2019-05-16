import * as React from 'react';
import './ledger-view.css';
import TransactionList from "../transaction-list/transaction-list";
import {Ledger} from "../../domain/ledger";
import {Redirect, RouteComponentProps} from "react-router";
import Typography from "@material-ui/core/Typography";
import LedgerApi from "../../services/ledger-api";

interface Props {
    ledger: Ledger
}

interface MatchParams {
    id: number;
}

export default class LedgerView extends React.Component<RouteComponentProps, Props> {

    state: Props = {} as Props;

    componentWillMount(): void {
        const {id} = this.props.match.params as MatchParams;
        LedgerApi.getLedger("", id).then(ledger => {
            this.setState({ledger: ledger});
        });
    }

    render(){
        if(!this.state.ledger){
            return <Redirect to='/'/>;
        }else {
            return (
                <div>
                    <Typography variant={"h2"} style={{textAlign: "center"}}>{this.state.ledger.title}</Typography>
                    <TransactionList transactions={this.state.ledger.transactions} ledger={this.state.ledger}/>
                </div>
            );
        }
    }
};
