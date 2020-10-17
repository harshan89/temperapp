import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostList from './PostList'
import ActionList from './ActionList'
import { swapPost, timeTraveler, addAction } from './helpers'
import './styles.scss'

const SortablePostList = () => {
    const [posts, setPosts] = useState([])
    const [actions, setActions] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const _posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
                const firstFivePosts = _posts.data.slice(0, 5);
                setPosts(firstFivePosts);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    const handleTimeTravelChangeEvent = (id) => {
        try {
            let _posts = [...posts];
            let _actionsToRollback = [...actions].filter(ac => ac.id >= id);
            let _actions = [...actions].filter(ac => ac.id < id);

            _posts = timeTraveler(_actionsToRollback, _posts);
            setPosts(_posts);
            setActions(_actions);
        } catch (e) {
            console.error(e);
        }
    }

    const handlePostListChangeEvent = (index, indexMovedTo) => {
        try {
            let _posts = [...posts];
            const postId = posts[index].id;
            _posts = swapPost(index, indexMovedTo, _posts);
            setPosts(_posts);

            let _actions = [...actions];
            const action = {
                id: _actions.length,
                postId,
                fromIndex: index,
                toIndex: indexMovedTo
            }
            _actions = addAction(_actions, action);
            setActions(_actions);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex container w-full flex-wrap px-20 py-10 overflow-hidden bg-gray-50 SortablePostList">
            <div className="my-3 px-3 overflow-hidden sm:w-full md:w-full lg:w-1/2 xl:w-1/2 z-10">
                <PostList
                    posts={posts}
                    changeOrder={handlePostListChangeEvent}
                />
            </div>
            <div className="my-3 px-3 overflow-hidden sm:w-full md:w-full lg:w-1/2 xl:w-1/2 z-10">
                <div className="w-full rounded-md shadow-md bg-white">
                    <p className="text-cool-gray-900 text-xl font-semibold p-5 heading">List of actions commited</p>
                    <div className="w-full rounded-md rounded-t-none bg-gray-100 p-4 flex flex-col-reverse">
                        <ActionList
                            actions={actions}
                            timeTravel={handleTimeTravelChangeEvent}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SortablePostList;