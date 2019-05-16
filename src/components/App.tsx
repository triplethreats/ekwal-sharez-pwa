import React from 'react';
import './App.css';
import LedgerList from "./ledger-list/ledger-list";
import Header from "./header/header";
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core";
import LedgerView from "./ledger-view/ledger-view";
import TransactionEdit from "./transaction-edit/transaction-edit";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import LedgerEdit from "./ledger-edit/ledger-edit";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";

const headerHeight = "8vh";
const footerHeight = "4vh";
const contentMargins = "20vw";

const styles = (theme: Theme) => createStyles({
    header: {
        height: headerHeight,
        lineHeight: headerHeight
    },
    main: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100vw - 2 * ${contentMargins})`,
            margin: `0 ${contentMargins}`,
        },
        top: headerHeight,
        height: `calc(100vh - ${headerHeight} - ${footerHeight})`,
        position: "fixed",
        backgroundColor: 'white',
        width: '100vw'
    }
});

interface Props extends WithStyles<typeof styles> {

}

function App(props: Props) {
    const {classes} = props;
    return (
        <BrowserRouter>
            <div className="App">
                <Header className={classes.header}/>
                <main className={classes.main}>
                    <Switch>
                        <Route path={"/ledgers/:idLegder/transaction/:idTransaction"} component={TransactionEdit} />
                        <Route path={"/ledgers/:id/transactions"} component={LedgerView} />
                        <Route path={"/ledgers/:idLegder/"} component={LedgerEdit} />
                        <Route path={"/ledgers"} component={LedgerList}/>
                        <Route path={"/sign_in"} component={SignIn}/>
                        <Route path={"/sign_up"} component={SignUp}/>
                        <Route path={"/"} component={LedgerList}/>
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default withStyles(styles)(App);
