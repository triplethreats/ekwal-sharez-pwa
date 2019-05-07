import * as React from "react";
import './transaction-list.css'
import TransactionView from "../transaction-view/transaction-view";
import {Transaction} from "../../domain/transaction";

interface Props {
    transactions: Transaction[]
}

export default class TransactionList extends React.Component<Props> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div>
                {this.props.transactions.map((value, index) => {
                    return <TransactionView key={index} transaction={value}/>
                })}
            </div>
        );
    }
};
