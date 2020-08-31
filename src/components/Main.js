import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { routerList } from '../utils/router'

import Nav from './module/Nav'
import Footer from './module/Footer'

const Main = () => {
    return(
        <Router>
            <Nav />
            <Switch>
                {
                    routerList.map((x, idx) => {
                        return <Route key={idx} path={x.path} exact component={x.component} />
                    })
                }
            </Switch>
            <Footer />
        </Router>
    )
}

export default Main