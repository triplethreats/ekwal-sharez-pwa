import * as React from "react";
import './transaction-list.css'
import TransactionView from "../transaction-view/transaction-view";
import { Transaction } from "../../domain/transaction";
import {Ledger} from "../../domain/ledger";
import {Link} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

interface Props {
    transactions: Transaction[],
    ledger: Ledger
}

export default class TransactionList extends React.Component<Props> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <List>
                {this.props.transactions.map((value, index) => {
                    return (
                        <ListItem key={index} className={"link-item"} button component={props => <Link {...props} to={`/ledger/${this.props.ledger.id}/transaction/${index}`}/>} >
                            <TransactionView key={index} transaction={value}/>
                        </ListItem>
                    )
                })}
            </List>
        );
    }
};
