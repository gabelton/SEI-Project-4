import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Select from 'react-select'
import Promise from 'bluebird'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'


class UserProfile extends React.Component {

  constructor(){
    super()

    this.state = {
      options: [],
      data: {},
      editPreferences: false,
      dropdown: false,
      defaultValue: {value: null, label: 'Select'}
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.handlePreferences = this.handlePreferences.bind(this)
    this.handleAdmissionType = this.handleAdmissionType.bind(this)
    this.editUser = this.editUser.bind(this)
    this.getContacts = this.getContacts.bind(this)
  }



  handleSelect(keywords){
    if(keywords !== null) {
      const keywordIds = keywords.map(keyword => parseInt(keyword.value))
      const data = { ...this.state.data, keyword_ids: keywordIds }
      this.setState({ data, selectedOptions: keywords })
    }
  }

  toggleDropdown(){
    this.setState({ dropdown: !this.state.dropdown })
  }

  handlePreferences(){
    this.setState({ editPreferences: true })
  }

  editUser(data){
    const token = Auth.getToken()
    axios.put('api/me', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res)=> {
        this.setState({data: {...this.state.data, user: res.data}})
      })
      .then(() => this.getContacts())
  }

  handleSave(){
    this.editUser({keyword_ids: this.state.data.keyword_ids})
    this.setState({editPreferences: false, selectedOptions: null})
  }

  handleAdmissionType(e){
    const admission = {concession: e.target.value}
    this.editUser(admission)

  }

  getContacts(){
    console.log('contacts')
    const token = Auth.getToken()
    axios.get('/api/contacts', { headers: {'Authorization': `Bearer ${token}` }})
      .then(res => {
        console.log(res.data)
        const data = {...this.state.data, contacts: res.data.users}
        this.setState({ data })
      })
  }


  componentDidMount(){
    const token = Auth.getToken()
    const headers = { headers: {'Authorization': `Bearer ${token}` }}

    Promise.props({
      user: axios.get('/api/me', {...headers}).then(res => res.data),
      contacts: axios.get('/api/contacts', {...headers}).then(res => res.data),
      keywords: axios.get('/api/keywords').then(res => res.data =  res.data.map(keyword =>{
        return {label: keyword.name, value: keyword.id}
      }))
    })
      .then(res => this.setState({ data: {...this.state.data, options: res.keywords, user: res.user, contacts: [...res.contacts.users]}}))
      .then(() =>console.log(this.state))
      .catch(err => console.log(err))
  }



  render(){
    if(!this.state.data.contacts) return null
    const { user, contacts } = this.state.data
    const admissionType = user.concession? 'Concession': 'Full'
    return(
      <section className="section user-page">
        <section className="section user-info">
          <div className="columns">
            <div className="column is-one-third-desktop has-text-centered">
              <div className="container profile-info">
                <Avatar name={user.username} value="100%" size="200" round={true} src={user.avatar} className="user-avatar"/>
                <div className="title is-2" name="username">{user.username}</div>
                <div className="subtitle" name="email">{user.email}</div>
              </div>
            </div>
            <div className="column is-two-thirds-desktop">
              <div className="container admission-preferences">
                <h1 className="title is-4 is-spaced">Admission type</h1>
                <p className="subtitle is-6">Tickets are currently displayed at <strong>{admissionType}</strong> price. <a className="subtitle is-6 has-text-link" onClick={this.toggleDropdown}>Change</a></p>
                {this.state.dropdown &&
              <form>
                <div className="control has-addons-centered">
                  <label className="radio">
                    <input type="radio" name="concession" value='true' onClick={this.handleAdmissionType}/>
                  Concession
                  </label>
                  <label className="radio">
                    <input type="radio" name="concession" value='false' onClick={this.handleAdmissionType}/>
                  Full Price
                  </label>
                </div>
              </form>}
                <hr className='line-break' />
                <div className="columns">
                  <div className="column">
                    <h2 className="title is-4">Your preferences</h2>
                    {user.keywords.length === 0 && <p>You have no preferences set up yet...</p>}
                    <div className="tags are-medium">
                      {user.keywords.map(keyword =>
                        <span className="tag is-dark is-rounded" key={keyword.id}>{keyword.name}</span>
                      )}
                    </div>
                    <div className="column">
                      {!this.state.editPreferences && <button className="button" onClick={this.handlePreferences}>Add more preferences</button>}
                    </div>
                    {this.state.editPreferences &&
                  <div>
                    <h2 className="title is-4 is-spaced">Add preferences</h2>
                    <p className="subtitle is-6">Set type of exhibitions you would like to be displayed in your recomended list</p>
                    <div>
                      <Select
                        isMulti
                        name="keywords"
                        options={this.state.data.options}
                        onChange={this.handleSelect}
                      />
                      <button className="button is-light" onClick={this.handleSave}>Save</button>
                    </div>
                  </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section contacts">
          {contacts.length > 0 && <div className="container has-text-centered contacts">
            <h2 className="title heading-section is-3">Other users with similar taste</h2>
            <div className="columns">
              {contacts.map(contact =>
                <div className="column has-text-centered" key={contact.id}>
                  <figure className="image is-128x128">
                    <img src={contact.avatar} />
                  </figure>
                  <h1 className="title is-4">{contact.username}</h1>
                  {contact.matches.map(keyword =>
                    <p key={keyword.id}>{keyword.name}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          }
        </section>
        <section className="section events-created">
          <h2 className="title is-3 heading-section has-text-centered">Events created by you</h2>
          <div className="tile is-ancestor">
            {user.events.map(exhibition=>
              <div key={exhibition.id} className="tile is-2 baby">
                <Link to={`/events/${exhibition.id}`}>
                  <figure >
                    <img src={exhibition.image} alt={exhibition.name} />
                  </figure>
                </Link>
                <h1 className="title is-6">{exhibition.name}</h1>
                <p className="date"> {`${exhibition.start_date} - ${exhibition.end_date}`}</p>
                <p>{exhibition.venue}</p>
              </div>
            )}
            {user.events.length < 4 && <div className="column new-event-link is-one-quarter-desktop">
              <p>This looks a bit empty</p>
              <Link to='/events/new'><p>add a new event</p></Link>
            </div>}
          </div>
        </section>
      </section>
    )
  }
}


export default UserProfile
