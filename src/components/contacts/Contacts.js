import React, {Component} from 'react';
import Contact from './Contact';
import {Consumer} from '../../context'

class Contacts extends Component {

    render() {
        return (
            <Consumer>
                {value => {
                    const {contacts} = value;
                    return (
                        <React.Fragment>
                            <h1 className="h1 display-4 mb-2"><span className="font-color: #bae7ff">Contact</span> list</h1>
                            {contacts.map(contact => <Contact key={contact.id} contact={contact}/>)}
                        </React.Fragment>)
                }}
            </Consumer>
        );
    }
}

export default Contacts