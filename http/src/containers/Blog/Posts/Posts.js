import React, { Component } from 'react';
import axios from '../../../axios';
import { Link, Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        // error: false,
    };

    componentDidMount() {
        axios.get('/posts')
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map((post) => {
                    return {
                        ...post,
                        author: 'Jane'
                    };
                });
                this.setState({posts: updatedPosts});
            })
            .catch((error) => {
                console.error(error);
                // this.setState({error: true})
            });
    }

    handleSelectPost = (id) => {
        // this.setState({selectedPostId: id});
        this.props.history.push('/posts/' + id)
    };

    render () {

        let posts = <p style={{textAlign: 'center'}}>Something wend wrong.</p>;

        if (!this.state.error) {
            posts = this.state.posts.map((post => {
                return (
                    // <Link to={'/post/' + post.id}  key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.handleSelectPost(post.id)} />
                    // </Link>
                );
            }));
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>

        )
    }
}

export default Posts;