import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//Switch permite que apenas uma rota seja chamada por momento, mesmo que o caminho delas for semelhante

import Logon from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
            </Switch>

            <Route path="/profile" component={Profile} />
            <Route path="/incidents/new" component={NewIncident} />
        </BrowserRouter>
    )
}