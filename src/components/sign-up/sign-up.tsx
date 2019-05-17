import * as React from 'react';
import './sign-up.css';
import {Redirect, RouteComponentProps} from "react-router";
import {Button, TextField} from "@material-ui/core";

interface State {
}

export default class SignUp extends React.Component<RouteComponentProps, State> {

    state = {} as State;

    componentWillMount(): void {}

    render(){
        return (
            <div>
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    margin="normal"
                />
                <Button variant="contained">
                    Sign up
                </Button>
            </div>
        );

    }
};
