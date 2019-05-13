import * as React from "react";
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {MoreVert} from '@material-ui/icons';
import './header.css'

interface State {
    anchorEl: null | HTMLElement;
}

export default class Header extends React.Component<any, State> {
    state: State = {
        anchorEl: null
    };
    closeMenu() {
        this.setState({anchorEl: null});
    }

    openMenu(event: React.MouseEvent<HTMLElement>) {
        this.setState({anchorEl: event.currentTarget});
    }

    render() {
        const {anchorEl} = this.state;
        return (
            <AppBar position={"fixed"} className={`app-bar ${this.props.className}`}>
                <img className={"header-logo"} src={"/favicon.png"} alt={"Logo"}/>
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
                        <MenuItem>Auth</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        );
    }
}
