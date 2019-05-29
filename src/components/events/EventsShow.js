import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
class EventsShow extends React.Component {
  constructor(){
    super()

    this.state = {}
    this.isEditable = this.isEditable.bind(this)
  }

  componentDidMount(){
    axios.get(`api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ exhibition: res.data }))
  }

  isEditable(){
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.exhibition.user.id
  }

  render(){
    if(!this.state.exhibition) return null
    const {name, image, artists, venue, area, keywords, id} = this.state.exhibition
    return(
      <section className="section">
        <div className="container">
          {this.isEditable() && <Link to={`/events/${id}/edit`} className="button is-success">Edit</Link>}
          <hr />
          <div className="columns">
            <div className="column is-half-desktop">
              <figure className="image">
                <img src={image} alt={name} />
              </figure>
            </div>
            <div className="column is-half-desktop">
              <h1 className="title is-3">{name}</h1>
              <p>{artists}</p>
              <p>{venue}</p>
              <p>{area}</p>
              <p>{keywords[0].name}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default EventsShow
