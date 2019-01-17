import React, {Component} from 'react';
import {Consumer} from '../../context';
import FormGroup from '../layout/FormGroup';
import axios from 'axios';

class AddContact extends Component {

    state = {
        name: '',
        city: '',
        phone: '',
        errors: {}
    };

    onFormChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (dispatch, e) => {
        e.preventDefault();
        const {name, city, phone} = this.state;

        if (name === '') {
            this.setState({errors: {name: 'Name is required'}})
        }
        if (city === '') {
            this.setState({errors: {city: 'City is required'}})
        }
        if (phone === '') {
            this.setState({errors: {phone: 'Phone is required'}})
        }

        const newContact = {
            name, city, phone
        };
        axios.post('https://jsonplaceholder.typicode.com/users', newContact).then(res =>
            dispatch({
                payload: res.data,
                type: 'CREATE_CONTACT'
            }));


        ;

        this.props.history.push('/');
    };

    render() {
        const {name, city, phone, errors} = this.state;

        return (
            <Consumer>
                {
                    value =>
                        <div className="card mb-3">
                            <div className="card-header">Add contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, value.dispatch)}>
                                    <FormGroup label="Name" name="name" value={name} onChange={this.onFormChange} placeholder="Name" error={errors.name}/>
                                    <FormGroup label="City" name="city" value={city} onChange={this.onFormChange} placeholder="City" error={errors.city}/>
                                    <FormGroup label="Phone" name="phone" value={phone} onChange={this.onFormChange} placeholder="Phone" error={errors.phone}/>
                                    <button type="submit" className="btn btn-primary btn-block mt-5">Submit</button>
                                </form>
                            </div>
                        </div>
                }
            </Consumer>
        )
    }


}

export default AddContact;