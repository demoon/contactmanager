import React, {Component} from 'react';
import {Consumer} from '../../context';
import {Link} from "react-router-dom";
import axios from 'axios';

class Contact extends Component {
    state = {
        showDetails: false
    };

    showDetailsCard = () => {
        this.setState({showDetails: !this.state.showDetails});
    };

    deleteContact = (id, dispatch) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => dispatch({type:'DELETE_CONTACT',payload: id}));

    };

    render() {
        const {name, city, phone, id} = this.props.contact;
        return (
            <Consumer>
                {value => {
                    return (
                        <div className="card card-body mb-3">
                            <h4>{name}
                                <i onClick={this.showDetailsCard} className="fas fa-sort-down"></i>
                                <Link to={`/contact/edit/${id}`}><i className="fas fa-pencil-alt fa-sm" style={{cursor: 'pointer', float: 'right', color: 'black', marginLeft: '1rem'}}></i></Link>
                                <i onClick={this.deleteContact.bind(this,id,value.dispatch)} className="fas fa-times" style={{color: 'red', float: 'right'}}></i></h4>
                            {this.state.showDetails ?
                                <ul className="list-group">
                                    <li className="list-group-item">City: {city}</li>
                                    <li className="list-group-item">Tel: {phone}</li>
                                </ul>
                                : null}

                        </div>
                    )
                }}
            </Consumer>


        );
    }
}

export default Contact;