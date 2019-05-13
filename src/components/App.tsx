import React from 'react';
import './App.css';
import LedgerList from "./ledger-list/ledger-list";
import Header from "./header/header";
import {BrowserRouter, Route} from "react-router-dom";
import {createStyles, PropTypes, Theme, WithStyles, withStyles} from "@material-ui/core";

const headerHeight = "8vh";
const footerHeight = "4vh";
const contentMargins = "20vw";

//TODO: use breakpoints to hide margins on mobile : https://material-ui.com/layout/breakpoints/

const styles = (theme: Theme) => createStyles({
    header: {
        height: headerHeight
    },
    main: {
        top: headerHeight,
        height: `calc(100vh - ${headerHeight} - ${footerHeight})`,
        position: "fixed",
        width: `calc(100vw - 2 * ${contentMargins})`,
        margin: `0 ${contentMargins}`,
        backgroundColor: 'white'
    }
});

interface Props extends WithStyles<typeof  styles>{}

function App(props: Props) {
    const {classes} = props;
    return (
        <BrowserRouter>
            <div className="App">
                <Header className={classes.header}/>
                <main className={classes.main}>
                    <Route path={"/"}>
                        <h1>Hello</h1>
                    </Route>
                    <Route path={"/ledgers"} component={LedgerList}/>
                </main>
            </div>
        </BrowserRouter>
    );
}

/*App.propTypes = {
    classes: PropTypes.object.isRequired
} as any;*/

export default withStyles(styles)(App);
