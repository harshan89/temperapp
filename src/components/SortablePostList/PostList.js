import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PostList = (props) => {
    const { posts, changeOrder } = props;
    return (
        <div className="PostList">
            <h2 className="text-white text-xl font-semibold mb-6">Sortable Post List</h2>
            <TransitionGroup className="ActionList">
                {
                    posts.map((post, key) => {
                        const index = key;
                        return (
                            <CSSTransition
                                key={index}
                                timeout={1000}
                                classNames="item">
                                <Post
                                    key={post.id}
                                    post={post}
                                    index={index}
                                    changeOrder={changeOrder}
                                />
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>
        </div>
    )
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    changeOrder: PropTypes.func.isRequired
}

export default PostList;