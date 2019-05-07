import * as React from "react";
import {Transaction} from "../../domain/transaction";

const TransactionView: React.FunctionComponent<{
    transaction: Transaction
}> = (props) => {
    return (
        <div>
            <h3>{props.transaction.name}</h3>
            {props.transaction.total}
        </div>
    );
};

export default TransactionView;
