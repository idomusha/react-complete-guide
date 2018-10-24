import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import name from '../../hoc/asyncComponent';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts/" exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                // pathname: this.props.match.url + '/new-post',    // relative
                                pathname: '/new-post',                              // absolute
                                hash: '#submit',
                                search: '?quick-submit=true',
                            }}>New post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <Posts/>} />*/}
                <Switch>
                    <Route path="/posts" component={Posts} />
                    <Route path="/new-post" component={AsyncNewPost} />
                    <Route render={() => <h1>Not found</h1>} />
                    {/*<Redirect from="/" to="/posts" />*/}
                </Switch>

            </div>
        );
    }
}

export default Blog;