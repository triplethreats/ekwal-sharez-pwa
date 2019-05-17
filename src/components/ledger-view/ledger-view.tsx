import * as React from 'react';
import './ledger-view.css';
import TransactionList from "../transaction-list/transaction-list";
import {Ledger} from "../../domain/ledger";
import {Redirect, RouteComponentProps} from "react-router";
import Typography from "@material-ui/core/Typography";
import LedgerApi from "../../services/ledger-api";
import CreateIcon from "@material-ui/icons/Create"
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import TransactionApi from "../../services/transaction-api";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

interface State {
    ledger: Ledger,
    success: boolean,
    ledgerId: number
}

interface MatchParams {
    id: number;
}

export default class LedgerView extends React.Component<RouteComponentProps, State> {

    state = {success: true} as State;

    componentWillMount(): void {
        const {id} = this.props.match.params as MatchParams;
        LedgerApi.getLedger("", id).then(ledger => {
            this.setState({ledger: ledger, success: true,ledgerId: id});
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
                    <Grid container justify="flex-end">
                        <Button variant="contained" component={props => <Link {...props} to={`/ledger/${this.state.ledgerId}`}/>} >
                            <CreateIcon/>
                            Modify
                        </Button>
                    </Grid>
                    <TransactionList transactions={this.state.ledger.transactions} ledger={this.state.ledger}/>
                </div>
            );
        }
    }
};
