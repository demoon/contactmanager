import React, {Component} from 'react';

class Test extends Component{

    state ={
        title: '',
        body: ''
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(post => this.setState({title: post.title, body: post.body}));
    }

    render(){
        const {title, body} = this.state;
        return(
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        )
    }
}

export default Test;