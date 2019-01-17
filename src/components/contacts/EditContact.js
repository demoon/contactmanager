import React, {Component} from 'react';
import {Consumer} from '../../context';
import FormGroup from '../layout/FormGroup';
import axios from 'axios';

class EditContact extends Component {

    state = {
        name: '',
        city: '',
        phone: '',
        errors: {}
    };

    async componentDidMount(){
        const {id} = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(
        res =>
        this.setState({
            name: res.data.name,
            phone: res.data.phone
        })
        );

    }

    onFormChange = (e) => this.setState({[e.target.name]: e.target.value});

     onSubmit = async (dispatch, e) => {
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

        const updatedContact = {
            name,
            city,
            phone
        };
        const {id} = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updatedContact);


        dispatch({
          type: 'UPDATE_CONTACT',
          payload: res.data
        });

        this.props.history.push('/');
    };

    render() {
        const {name, city, phone, errors} = this.state;

        return (
            <Consumer>
                {
                    value =>
                        <div className="card mb-3">
                            <div className="card-header">Edit contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, value.dispatch)}>
                                    <FormGroup label="Name" name="name" value={name} onChange={this.onFormChange} placeholder="Name" error={errors.name}/>
                                    <FormGroup label="City" name="city" value={city} onChange={this.onFormChange} placeholder="City" error={errors.city}/>
                                    <FormGroup label="Phone" name="phone" value={phone} onChange={this.onFormChange} placeholder="Phone" error={errors.phone}/>
                                    <button type="submit" className="btn btn-primary btn-block mt-5">Edit contact</button>
                                </form>
                            </div>
                        </div>
                }
            </Consumer>
        )
    }


}

export default EditContact;