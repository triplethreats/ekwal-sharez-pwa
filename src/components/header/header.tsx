import * as React from "react";
import './header.css'
import logo from "../../../public/favicon.png";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import {ifStatement} from "@babel/types";

interface State {
    anchorEl: null | HTMLElement;
    online: boolean;
}

export default class Header extends React.Component<any, State> {
    state: State = {
        anchorEl: null,
        online: false
    };

    componentWillMount(): void {
        fetch("/", {method: "HEAD"}).then(response => {
           this.setState({anchorEl: this.state.anchorEl, online: response.ok});
        });
    }

    closeMenu() {
        this.setState({anchorEl: null});
    }

    openMenu(event: React.MouseEvent<HTMLElement>) {
        this.setState({anchorEl: event.currentTarget});
    }

    render() {
        const {anchorEl, online} = this.state;
        const authButtons = [];
        if(this.state.online) {
            authButtons.push(<MenuItem button component={props => <Link {...props} to={`/sign_in`}/>}>Sign In</MenuItem>);
            authButtons.push(<MenuItem button component={props => <Link {...props} to={`/sign_up`}/>}>Sign Up</MenuItem>);
        }
        return (
            <AppBar position={"fixed"} className={`app-bar ${this.props.className}`}>
                <Link to={"/"}>
                    <img className={"header-logo"} src={logo} alt={"Logo"}/>
                </Link>
                <Typography className={"app-title"} variant={"h6"}>
                    EkwalSharez
                </Typography>
                <Toolbar className={"push-right"}>
                    <IconButton onClick={this.openMenu.bind(this)}>
                        <MoreVert />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}
                          onClose={this.closeMenu.bind(this)}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}>
                        {authButtons.map(value => {
                            return value;
                        })}
                    </Menu>
                </Toolbar>
            </AppBar>
        );
    }
}
