import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Home from './Home/Home';
// import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const Posts = React.lazy(() => import('./Posts/Posts'));
const NewPost = asyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true,
    }

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
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/posts" component={Posts} />
                        {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}  // Guard
                        <Route path="*" render={() => <h1>Not found</h1>} />
                        {/*<Redirect from="/" to="/posts" />*/}
                    </Switch>
                </Suspense>
            </div>
        );
    }
}

export default Blog;