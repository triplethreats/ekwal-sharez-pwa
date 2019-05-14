import * as React from "react";
import './ledger-list.css'
import {Ledger} from "../../domain/ledger";
import {Grid, List, ListItem, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const ledgers: Ledger[] = [
    {
        title: "Amsterdam",
        description: "Trip to Amsterdam",
        transactions: [
            {total: 50, date: new Date(Date.now()), payments: [
                    {amount: 50, user: {name: 'Rafael'}}
                ], name: 'Chipsy King'},
            {total: 60, date: new Date(Date.now()), payments:[
                    {amount: 60, user: {name: 'Rafael'}}
                ], name: 'Sweetness'}],
        users: [{name: 'Rafael'}, {name: 'Arthur'}, {name: 'Kevin'}]
    }
];

export default class LedgerList extends React.Component{
    render() {
        return (
            <List component="nav">
                {ledgers.map((value, index) => {
                    return <ListItem key={index} button component={props => <Link to={`/ledger/${index}`} {...props} />} className={"link-item"}>
                        <h2>{value.title}</h2>
                        <p>{value.description}</p>
                    </ListItem>
                })}
            </List>
        );
    }
}
