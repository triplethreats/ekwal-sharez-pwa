import * as React from "react";
import './transaction-view.css';
import {Transaction} from "../../domain/transaction";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {IntlProvider, FormattedRelative} from 'react-intl';

const TransactionView: React.FunctionComponent<{
    transaction: Transaction
}> = (props) => {
    return (
        <IntlProvider locale={navigator.language}>
            <Grid container direction={"row"}>
                <Grid item container xs={6} direction={"column"} style={{textAlign: "start"}}>
                    <Grid item xs>
                        <Typography variant={"h6"} color={"primary"}>{props.transaction.name}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography inline={true} variant={"subtitle1"}>Paid by <Typography inline={true}
                                                                                            variant={"subtitle2"}>{props.transaction.payments[0].user.name}</Typography></Typography>
                    </Grid>
                    <Grid item xs/>
                </Grid>
                <Grid item container xs={6} direction={"column"} style={{textAlign: "end"}}>
                    <Grid item xs>
                        <Typography variant={"h6"} color={"primary"}>{props.transaction.total}€</Typography>
                    </Grid>
                    <Grid item xs>
                        <FormattedRelative value={props.transaction.date}/>
                    </Grid>
                    <Grid item xs/>
                </Grid>
            </Grid>
        </IntlProvider>
    );
};

export default TransactionView;
