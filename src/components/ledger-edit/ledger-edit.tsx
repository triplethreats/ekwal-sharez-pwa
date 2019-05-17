import * as React from "react";
import './ledger-edit.css';
import TextField from '@material-ui/core/TextField';
import {Redirect, RouteComponentProps} from "react-router";
import LedgerApi from "../../services/ledger-api";
import Grid from '@material-ui/core/Grid';
import {Ledger} from "../../domain/ledger";
import {Link} from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import Button from "@material-ui/core/Button";
import {LedgerDraft} from "../../domain/ledger-draft";
import {LedgerUserDraft} from "../../domain/ledger-user-draft";
import ListItem from "@material-ui/core/ListItem";
import TransactionApi from "../../services/transaction-api";
import SaveIcon from "@material-ui/core/SvgIcon/SvgIcon";


interface State {
    ledger: Ledger;
    ledgerDraft : LedgerDraft;
    usersDraft : LedgerUserDraft[];
    success: boolean;
    idLedger: number;
    newPage : boolean;
}

interface MatchParams {
    idLegder: number;

}

export default class LedgerEdit extends React.Component<RouteComponentProps, State> {
    state: State = {success: true} as State;

    componentWillMount(): void {
        const {idLegder} = this.props.match.params as MatchParams;
        if(window.location.pathname === "/ledgers/new"){
            this.setState({
                newPage: true,
                usersDraft:[],
                ledgerDraft:{title:"",description:"",users:[]}
            });
        }else {
            LedgerApi.getLedger("", idLegder).then(ledger => {
                this.setState({
                    ledger: ledger,
                    idLedger: idLegder,
                    usersDraft:[],
                    success: true
                });
            }).catch(reason => {
                this.setState({
                    success: false
                });
            });
        }
    }

    render() {
        console.log("state",this.state)
        /*if(this.state.newPage){
            return (
                <div>
                    <Grid item xs={12}><TextField
                        label="Title"
                        value=""
                        margin="normal"
                    /></Grid>
                    <Grid item xs={12}><TextField
                        label="Description"
                        value=""
                        margin="normal"
                    /></Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={(e) => { this.state.usersDraft.push({name:""}); this.setState(this.state) }} >
                            Add
                        </Button>
                        {this.state.hasOwnProperty("ledger") ? this.state.ledger.users.map((value, index) => {
                            return <Grid item xs={12}><TextField
                                defaultValue={value.name}
                                margin="normal"
                                onChange={(e)=>{this.state.ledger.users[index].name = e.target.value; console.log("toto",this.state)}}
                            /></Grid>
                        }):""}
                        {this.state.usersDraft.map((value, index) => {
                            return <Grid item xs={12}><TextField
                                defaultValue={value.name}
                                margin="normal"
                                onChange={(e)=>{this.state.usersDraft[index].name = e.target.value; console.log("toto",this.state)}}
                            /></Grid>
                        })}
                    </Grid>
                    <Button variant="contained" component={props => <Link {...props} to={`/ledgers/${this.state.idLedger}/transactions`}/>} >
                        <ArrowBackIosIcon/>
                    </Button>
                </div>
            );
        }
        else */if (!this.state.success) {
            return <Redirect to={"/"}/>
        } else if (!this.state.ledger && !this.state.newPage) {
            return <p>Loading...</p>
        } else {
            return (
                <div>
                    <Grid item xs={12}><TextField
                        label="Title"
                        value={this.state.newPage ? this.state.ledgerDraft.title : this.state.ledger.title}
                        margin="normal"
                        onChange={(e)=>{
                           if(this.state.newPage){
                                this.state.ledgerDraft.title = e.target.value;
                           }else{
                               this.state.ledger.title = e.target.value;
                           }
                           this.setState(this.state);
                        }}
                    /></Grid>
                    <Grid item xs={12}><TextField
                        label="Description"
                        value={this.state.newPage ? this.state.ledgerDraft.description : this.state.ledger.description}
                        margin="normal"
                        onChange={(e)=>{
                            if(this.state.newPage){
                                this.state.ledgerDraft.description = e.target.value;
                            }else{
                                this.state.ledger.description = e.target.value;
                            }
                            this.setState(this.state);
                        }}
                    /></Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={(e) => { this.state.usersDraft.push({name:""}); this.setState(this.state) }} >
                            Add
                        </Button>
                        {this.state.hasOwnProperty("ledger") ? this.state.ledger.users.map((value, index) => {
                            return <Grid item xs={12}><TextField
                                defaultValue={value.name}
                                margin="normal"
                                onChange={(e)=>{this.state.ledger.users[index].name = e.target.value; console.log("toto",this.state)}}
                            /></Grid>
                        }):""}
                        {this.state.usersDraft.map((value, index) => {
                            return <Grid item xs={12}><TextField
                                defaultValue={value.name}
                                margin="normal"
                                onChange={(e)=>{this.state.usersDraft[index].name = e.target.value; console.log("toto",this.state)}}
                            /></Grid>
                        })}
                    </Grid>
                    <Button variant="contained" onClick={() => {
                        if(this.state.newPage){
                            this.state.ledgerDraft.users = this.state.usersDraft;
                            console.log(this.state.ledgerDraft)
                            LedgerApi.createLedger(this.state.ledgerDraft);
                        }else {
                            LedgerApi.updateLedger(this.state.idLedger, this.state.ledger, this.state.usersDraft);
                        }
                    }}>
                        <SaveIcon/>
                        {this.state.newPage ? "Create" :"Save"}
                    </Button>
                    <Button variant="contained" component={props => <Link {...props} to={`/ledgers/${this.state.idLedger}/transactions`}/>} >
                        <ArrowBackIosIcon/>
                    </Button>
                </div>
            );
        }
    }
};
