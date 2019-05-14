import * as React from "react";
import './ledger-list.css'
import {Ledger} from "../../domain/ledger";
import {List, ListItem} from "@material-ui/core";
import {Link} from "react-router-dom";

const ledgers: Ledger[] = [
    {
        title: "Amsterdam",
        transactions: [
            {total: 50, payments: [
                    {amount: 50, user: {name: 'Rafael'}}
                ], name: 'Chipsy King'},
            {total: 60, payments:[
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
                    return <ListItem key={index}>
                        <Link to={`/ledger/${index}`}>{value.title}</Link>
                    </ListItem>
                })}
            </List>
        );
    }
}
