import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bulma'

import SecureRoute from './components/common/SecureRoute'
import Navbar from './components/common/Navbar'
import EventsIndex from './components/events/EventsIndex'
import EventsShow from './components/events/EventsShow'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


class App extends React.Component {
  render(){
    return(
      <Router>
        <div>
          <Navbar />
          <Switch>
            <SecureRoute path='/events/:id' component={EventsShow} />
            <Route path='/events' component={EventsIndex} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
