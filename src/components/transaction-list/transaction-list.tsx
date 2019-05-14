import * as React from "react";
import './transaction-list.css'
import TransactionView from "../transaction-view/transaction-view";
import {Transaction} from "../../domain/transaction";
import {List, ListItem} from "@material-ui/core";
import {Link} from "react-router-dom";

interface Props {
    transactions: Transaction[]
}

export default class TransactionList extends React.Component<Props> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <List>
                {this.props.transactions.map((value, index) => {
                    return (
                        <ListItem button component={props => <Link to={`/transaction/${index}`}/>} >
                            <TransactionView key={index} transaction={value}/>
                        </ListItem>
                    )
                })}
            </List>
        );
    }
};
