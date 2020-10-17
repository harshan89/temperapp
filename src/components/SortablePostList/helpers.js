/**
 * post will be change in to new possition based on given indexes
 * @param {integer} index 
 * @param {integer} indexMovedTo 
 * @param {array} _posts 
 */
const swapPost = (index, indexMovedTo, _posts) => {
    const temp = _posts[index]
    _posts[index] = _posts[indexMovedTo]
    _posts[indexMovedTo] = temp
    return _posts;
}

/**
 * post list will be reverted accoding to the given actions order, expect reversed action list
 * @param {array} _actionsToRollback 
 * @param {array} _posts 
 */
const timeTraveler = (_actionsToRollback, _posts) => {
    _actionsToRollback.forEach(ac => {
        _posts = swapPost(ac.toIndex, ac.fromIndex, _posts);
    })
    return _posts;
}
/**
 * New action will be added to the action list
 * @param {array} _actions 
 * @param {array} action 
 */
const addAction = (_actions, action) => {
    _actions.push(action)
    return _actions;
}

export {
    swapPost,
    timeTraveler,
    addAction
}