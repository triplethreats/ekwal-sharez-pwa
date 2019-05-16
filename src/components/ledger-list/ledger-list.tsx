import * as React from "react";
import './ledger-list.css'
import {Ledger} from "../../domain/ledger";
import {Link, RouteComponentProps} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LedgerApi from "../../services/ledger-api";

interface State {
    ledgers: Ledger[];
}

export default class LedgerList extends React.Component<RouteComponentProps, State>{

    state = {ledgers: []};

    componentWillMount(): void {
        LedgerApi.getLedgers("").then(ledgers => {
            this.setState({ledgers});
        });
    }

    render() {
        return (
            <List component="nav">
                {this.state.ledgers.map((value, index) => {
                    return <ListItem key={index} button component={props => <Link to={`/ledgers/${index}/transactions`} {...props} />} className={"link-item"}>
                        <h2>{value.title}</h2>
                        <p>{value.description}</p>
                    </ListItem>

                })}

            </List>
        );
    }
}
