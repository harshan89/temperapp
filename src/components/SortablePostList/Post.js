import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => {
    const { index, changeOrder, post } = props;
    return (
        <div className="Post">
            <div className="w-full shadow-md bg-white mb-5 rounded-md flex items-center justify-between">
                <div className="flex-1 pl-2">
                    <p className="p-6">POST {post.id} <br /> {post.title}</p>
                </div>
                <div className="flex flex-col justify-items-auto pr-6 gap-y-4">
                    {index !== 0 && <i onClick={() => changeOrder(index, index - 1)} className="cursor-pointer fa fa-angle-up text-lg text-purple-800 transform duration-500 ease-in-out hover:scale-150 hover:bold" ></i>}
                    {index !== 4 && <i onClick={() => changeOrder(index, index + 1)} className="cursor-pointer fa fa-angle-down text-lg text-purple-800 transform duration-500 ease-in-out hover:scale-150" ></i>}
                </div>
            </div>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.shape({
        "userId": PropTypes.number,
        "id": PropTypes.number.isRequired,
        "title": PropTypes.string,
        "body": PropTypes.string,
        "index": PropTypes.number
    }),
    changeOrder: PropTypes.func.isRequired
}

export default Post;