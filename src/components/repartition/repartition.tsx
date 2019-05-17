import * as React from 'react';
import './repartition.css';
import {Redirect, RouteComponentProps} from "react-router";
import LedgerApi from "../../services/ledger-api";
import {Transaction} from "../../domain/transaction";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import Button from "@material-ui/core/Button";
import {Ledger} from "../../domain/ledger";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

interface State {
    idLedger:number
    success:boolean
    transactions: Transaction[]
    ledger:Ledger
}

export default class Repartition extends React.Component<RouteComponentProps, State> {

    state: State = {success: true} as State;

    componentWillMount(): void {
        const {idLedger} = this.props.match.params as {idLedger:number};
        LedgerApi.getLedger("", idLedger).then(ledger => {
            this.setState({
                idLedger: idLedger,
                ledger:ledger,
                success: true,
            });
        }).catch(reason => {
            this.setState({
                success: false
            });
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
                    <List>
                        {this.state.ledger.transactions.map((value, index) => {
                            return(
                                <ListItem>
                                    <ListItemText primary={value.payments[0].user.name + " paid " + value.total + "€" + " for " + value.name }
                                                  secondary={"Please give " + (value.total/this.state.ledger.users.length).toFixed(2) + "€ to " + value.payments[0].user.name} />
                                </ListItem>
                            )
                        })}

                    </List>
                    <Button variant="contained"
                            component={props => <Link {...props} to={`/ledgers/${this.state.idLedger}/transactions`}/>}>
                        <ArrowBackIosIcon/>
                    </Button>
                </div>
            );
        }

    }
};
