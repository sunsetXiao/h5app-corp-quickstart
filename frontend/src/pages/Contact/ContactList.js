import React from 'react';

import MenuBar from '../../components/MenuBar';
import ContactItem from '../../components/ContactItem';
import './ContactList.css';
import config from '../../config.js'

const host = config.host

class ContactList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contactList: []
    }
  }
  componentDidMount() {
    fetch(host + '/contact/findAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "filterInputList": [],
        "sortInput": {"field": "id", "order": "ASC"}
      })
    })
        .then(res => res.json())
        .then(result => {
          this.setState({
            contactList: result.result,
              // loading: false
          })
        })
  }

  render() {
    return (
        <div>
          <MenuBar/>
          <div className="item-list">
            {this.state.contactList.map(contact => { return (<ContactItem key={contact.id} contact={contact}/>)})}
          </div>
        </div>
    );
  }
}

export default ContactList;
