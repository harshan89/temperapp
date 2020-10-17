import React from 'react';
import PropTypes from 'prop-types';

const Action = (props) => {
    const { action, timeTravel } = props;
    return (
        <div className="w-full rounded-md bg-white border-b bor border-solid border-gray-300 flex items-center justify-between p-2">
            <p className="text-sm">Moved post {action.postId} from index {action.fromIndex} to index {action.toIndex}</p>
            <button className="bg-green-400 hover:bg-green-500 py-2 px-4 rounded focus:outline-none" onClick={() => timeTravel(action.id)}>
                Time travel
            </button>
        </div>
    )
}

Action.propTypes = {
    action: PropTypes.shape({
        postId: PropTypes.number.isRequired,
        fromIndex: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    }),
    timeTravel: PropTypes.func.isRequired
}

export default Action;