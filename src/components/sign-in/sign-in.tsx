import * as React from 'react';
import './sign-in.css';
import {Redirect, RouteComponentProps} from "react-router";
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/core/SvgIcon/SvgIcon";

interface State {
}

export default class SignIn extends React.Component<RouteComponentProps, State> {

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
                    Sign in
                </Button>
            </div>
        );

    }
};
