/**
 * post will be change in to new possition based on given indexes
 * @param {integer} index 
 * @param {integer} indexMovedTo 
 * @param {array} _posts 
 */
const swapPost = (index, indexMovedTo, _posts) => {
    try {
        const temp = _posts[index]
        _posts[index] = _posts[indexMovedTo]
        _posts[indexMovedTo] = temp
        return _posts;
    } catch (e) {
        console.log(e)
    }
}

/**
 * post list will be reverted accoding to the given actions order, expect reversed action list
 * @param {array} _actionsToRollback 
 * @param {array} _posts 
 */
const timeTraveler = (_actionsToRollback, _posts) => {
    try {
        _actionsToRollback.forEach(ac => {
            _posts = swapPost(ac.toIndex, ac.fromIndex, _posts);
        })
        return _posts;
    } catch (e) {
        console.log(e)
    }
}

/**
 * New action will be added to the action list
 * @param {array} _actions 
 * @param {Object} action 
 */
const addAction = (_actions, action) => {
    try {
        _actions.push(action)
        return _actions;
    } catch (e) {
        console.log(e)
    }
}

export {
    swapPost,
    timeTraveler,
    addAction
}