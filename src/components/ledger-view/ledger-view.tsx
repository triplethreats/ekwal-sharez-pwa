import * as React from 'react';
import './ledger-view.css';
import TransactionList from "../transaction-list/transaction-list";
import {Ledger} from "../../domain/ledger";
import {Redirect, RouteComponentProps} from "react-router";
import Typography from "@material-ui/core/Typography";

interface Props {
    ledger: Ledger
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
    id: number;
}

export default class LedgerView extends React.Component<RouteComponentProps, Props> {

    state: Props = {} as Props;

    componentWillMount(): void {
        const {id} = this.props.match.params as MatchParams;
        const ledger = ledgers.find((ledger)=>{return (parseInt(ledger.id.toString())) === (parseInt(id.toString()))});
        if(ledger !== null && ledger !== undefined){
            this.setState({ledger: ledger});
        }
    }

    render(){
        if(this.state.ledger === null || this.state.ledger === undefined){
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
