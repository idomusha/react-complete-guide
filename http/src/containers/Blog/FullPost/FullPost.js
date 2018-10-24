import React, { Component } from 'react';
import axios from '../../../axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        this.loadData();
    }

    loadData() {
        if (this.props.match.params.id) {

            if (this.state.loadedPost === null || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                .then((response) => {
                    this.setState({loadedPost: response.data})
                });
            }

        }

        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            for (let param of query.entries()) {
                console.log(param); // yields ['start', '5']
            }
        }

        if (this.props.location.hash) {
            console.log(this.props.location.hash);
        }
    }

    handleDeletePost() {
        axios.delete('/posts/' + this.props.match.params.id)
        .then((response) => {

        });
    }

    render() {
        let post = <p style={{textAlign: 'center'}}>Please select a post.</p>;

        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.handleDeletePost()} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;