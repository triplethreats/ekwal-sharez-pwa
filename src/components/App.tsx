import React from 'react';
import './App.css';
import LedgerList from "./ledger-list/ledger-list";
import Header from "./header/header";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core";
import LedgerView from "./ledger-view/ledger-view";
import TransactionEdit from "./transaction-edit/transaction-edit";

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
                        <Route path={"/ledger/:idLegder/transaction/:idTransaction"} component={TransactionEdit} />
                        <Route path={"/ledgers"} component={LedgerList}/>
                        <Route path={"/ledger/:id"} component={LedgerView} />
                        <Redirect to={"/ledgers"} from={"/"} exact={true} strict={true}/>
                        <Route render={props1 => (<h2>404 Not found</h2>)}/>
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default withStyles(styles)(App);
