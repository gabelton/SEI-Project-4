import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bulma'
import 'bulma-extensions'
import './style.scss'

import SecureRoute from './components/common/SecureRoute'
import Navbar from './components/common/Navbar'
import EventsIndex from './components/events/EventsIndex'
import EventsShow from './components/events/EventsShow'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import EventsNew from './components/events/New'
import ArtistShow from './components/common/ArtistShow'
import UserProfile from './components/common/UserProfile'
import Team from './components/events/Team'
import Footer from './components/common/Footer'


class App extends React.Component {
  render(){
    console.log()
    return(
      <Router>
        <div>
          <Navbar />
          <Switch>
            <SecureRoute path="/events/new" component={EventsNew} />
            <Route path='/events/:id' component={EventsShow} />
            <Route path='/team' component={Team} />
            <Route path='/events' component={EventsIndex} />
            <Route path='/artists/:id' component={ArtistShow} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <SecureRoute path="/me" component={UserProfile} />
            <Route path='/' component={Home} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)



// <SecureRoute path="/events/:id/edit" component={EventsEdit} />
