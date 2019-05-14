import * as React from "react";
import {Transaction} from "../../domain/transaction";
import {Grid, Typography} from "@material-ui/core";

const TransactionView: React.FunctionComponent<{
    transaction: Transaction
}> = (props) => {
    return (
        <Grid container direction={"row"}>
            <Grid item container xs={6} direction={"column"} style={{textAlign: "start"}}>
                <Grid item xs>
                    <Typography variant={"h6"}>{props.transaction.name}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography inline={true} variant={"subtitle1"}>Paid by <Typography inline={true} variant={"subtitle2"}>{props.transaction.payments[0].user.name}</Typography></Typography>
                </Grid>
                <Grid item xs/>
            </Grid>
            <Grid item container xs={6} direction={"column"} style={{textAlign: "end"}}>
                <Grid item xs>
                    <Typography variant={"h6"}>{props.transaction.total}€</Typography>
                </Grid>
                <Grid item xs>{props.transaction.date.toDateString()}</Grid>
                <Grid item xs/>
            </Grid>
        </Grid>
    );
};

export default TransactionView;
