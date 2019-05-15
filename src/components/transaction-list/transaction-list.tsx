import * as React from "react";
import './transaction-list.css'
import TransactionView from "../transaction-view/transaction-view";
import { Transaction } from "../../domain/transaction";
import Link from "react-router-dom/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

interface Props {
    transactions: Transaction[]
}

export default class TransactionList extends React.Component<Props> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <List>
                {this.props.transactions.map((value, index) => {
                    return (
                        <ListItem key={index} className={"link-item"} button component={props => <Link {...props} to={`/transaction/${index}`}/>} >
                            <TransactionView key={index} transaction={value}/>
                        </ListItem>
                    )
                })}
            </List>
        );
    }
};
