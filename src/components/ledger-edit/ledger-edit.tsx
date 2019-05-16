import * as React from "react";
import TextField from '@material-ui/core/TextField';
import {Redirect, RouteComponentProps} from "react-router";
import MenuItem from '@material-ui/core/MenuItem';
import LedgerApi from "../../services/ledger-api";
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {Ledger} from "../../domain/ledger";

interface State {
    ledger: Ledger;
    success: boolean;
}

interface MatchParams {
    idLegder: number;

}

export default class LedgerEdit extends React.Component<RouteComponentProps, State> {
    state: State = {success: true} as State;

    componentWillMount(): void {
        const {idLegder} = this.props.match.params as MatchParams;
        LedgerApi.getLedger("", idLegder).then(ledger => {
            this.setState({
                ledger: ledger,
                success: true
            });
        }).catch(reason => {
            this.setState({
                success: false
            });
        });
    }

    render() {
        if (!this.state.success) {
            return <Redirect to={"/"}/>
        } else if (!this.state.ledger) {
            return <p>Loading...</p>
        } else {
            return (
                <div>
                    <Grid item xs={12}><TextField
                        label="Title"
                        value={this.state.ledger.title}
                        margin="normal"
                    /></Grid>
                    <Grid item xs={12}><TextField
                        label="Description"
                        value={this.state.ledger.description}
                        margin="normal"
                    /></Grid>
                </div>
            );
        }
    }
};
