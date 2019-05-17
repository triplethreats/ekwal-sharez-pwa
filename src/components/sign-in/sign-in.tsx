import * as React from 'react';
import './sign-in.css';
import {Redirect, RouteComponentProps} from "react-router";
import {Button, TextField} from "@material-ui/core";
import UserApi from "../../services/user-api";
import Grid from "@material-ui/core/Grid";

interface State {
    email:string
    password:string
}

export default class SignIn extends React.Component<RouteComponentProps, State> {

    state = {email:"",password:""} as State;

    componentWillMount(): void {}

    render(){
        return (
            <div>
                <Grid item xs={12}><TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={(e)=>{
                        this.state.email = e.target.value;
                        this.setState(this.state);
                    }}
                    autoComplete="email"
                    margin="normal"
                /></Grid>
                <Grid item xs={12}><TextField
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={(e)=>{
                        this.state.password = e.target.value;
                        this.setState(this.state);
                    }}
                    margin="normal"
                /></Grid>
                <Grid item xs={12}><Button variant="contained"onClick={() => {
                    UserApi.connectUser(this.state.email,this.state.password);
                }}>
                    Sign in
                </Button></Grid>
            </div>
        );

    }
};
