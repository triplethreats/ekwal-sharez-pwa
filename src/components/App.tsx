import React from 'react';
import './App.css';
import LedgerList from "./ledger-list/ledger-list";
import Header from "./header/header";
import {BrowserRouter, Route} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <main>
                    <Route path={"/"}>
                        <h1>Hello</h1>
                    </Route>
                    <Route path={"/ledgers"} component={LedgerList}/>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
