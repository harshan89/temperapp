import React from 'react';
import { swapPost, timeTraveler, addAction } from './components/SortablePostList/helpers';

let actions = []
let posts = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    "userId": 1,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  }
]
let postsListState = [];
postsListState[0] = [...posts]; // 0th index would be initial state of posts
let expectedActionsList = [
  {
    id: 0,
    postId: 1,
    fromIndex: 1,
    toIndex: 2
  },
  {
    id: 1,
    postId: 5,
    fromIndex: 4,
    toIndex: 3
  },
  {
    id: 2,
    postId: 3,
    fromIndex: 2,
    toIndex: 3
  },
  {
    id: 3,
    postId: 4,
    fromIndex: 4,
    toIndex: 3
  },
  {
    id: 4,
    postId: 4,
    fromIndex: 4,
    toIndex: 3
  }
];

describe("Sortable Post List & Action List Creation", () => {

  /**
   * Let's make five moments to the post list
   * We create actions according to each movement { action id will be action array length as we used in the project }
   * post list state changes will push to the postsListState[] array on each movement
   * 
   */

  // post list state 1
  test("Move post 1 down", () => {
    posts = swapPost(0, 1, posts)
    expect(posts[0].id).toBe(2)
    expect(posts[1].id).toBe(1)
    const action = {
      id: actions.length,
      postId: 1,
      fromIndex: 0,
      toIndex: 1
    }
    postsListState[1] = [...posts];
    addAction(actions, action)
    expect(actions[0].id).toBe(expectedActionsList[0].id)
  })

  // post list state 2
  test("Move post 5 up", () => {
    posts = swapPost(4, 3, posts)
    expect(posts[3].id).toBe(5)
    expect(posts[4].id).toBe(4)

    const action = {
      id: actions.length,
      postId: 5,
      fromIndex: 4,
      toIndex: 3
    }
    postsListState[2] = [...posts];
    addAction(actions, action)
    expect(actions[1].id).toBe(expectedActionsList[1].id)
  })

  // post list state 3
  test("Move post 3 down", () => {
    posts = swapPost(2, 3, posts)
    expect(posts[2].id).toBe(5)
    expect(posts[3].id).toBe(3)

    const action = {
      id: actions.length,
      postId: 3,
      fromIndex: 2,
      toIndex: 3
    }
    postsListState[3] = [...posts];
    addAction(actions, action)
    expect(actions[2].id).toBe(expectedActionsList[2].id)
  })

  // post list state 4
  test("Move post 4 up", () => {
    posts = swapPost(4, 3, posts)
    expect(posts[3].id).toBe(4)
    expect(posts[4].id).toBe(3)

    const action = {
      id: actions.length,
      postId: 4,
      fromIndex: 4,
      toIndex: 3
    }
    postsListState[4] = [...posts];
    addAction(actions, action)
    expect(actions[3].id).toBe(expectedActionsList[3].id)
  })

  // post list state 5
  test("Move post 5 up", () => {
    posts = swapPost(2, 1, posts)
    expect(posts[1].id).toBe(5)
    expect(posts[2].id).toBe(1)

    const action = {
      id: actions.length,
      postId: 5,
      fromIndex: 2,
      toIndex: 1
    }
    postsListState[5] = [...posts];
    addAction(actions, action)
    expect(actions[4].id).toBe(expectedActionsList[4].id)
  })

})

describe("Time Travel With List of Actions Commited", () => {

  test("Roll back post list to initial state", () => {
    let _actions = [...actions]
    let _posts = [...posts]
    _actions = _actions.reverse()
    _posts = timeTraveler(_actions, _posts)
    expect(_posts).toEqual(postsListState[0])
  })

  test("Roll back post list to state 4", () => {
    let _actions = [...actions]
    let _posts = [...posts]
    _actions = _actions.reverse().slice(0, 1); // last action we made
    _posts = timeTraveler(_actions, _posts)
    expect(_posts).toEqual(postsListState[4]) // compare with state 4
  })

  test("Roll back post list to state 2", () => {
    let _actions = [...actions]
    let _posts = [...posts]
    _actions = _actions.reverse().slice(0, 3); // last 3 action we made
    _posts = timeTraveler(_actions, _posts)
    expect(_posts).toEqual(postsListState[2]) // compare with state 2
  })

  test("Roll back post list to initial state in multiple actions", () => {
    let _actions = [...actions] // currant actions
    _actions.reverse();
    let _posts = [...posts] // currant state
    let selectedActions = []

    /**
     * REVERT TO THE STATE 4
     * Now we are in post list state 5 to revert the post list in to state 4 we have to revert last 1 actions we made
     * 
     * */

    selectedActions = _actions.splice(0, 1); // last 1 actions
    _posts = timeTraveler(selectedActions, _posts)
    expect(_posts).toEqual(postsListState[4]) // compare with state 4

    /**
     * REVERT TO THE STATE 2
     * Now we are in post list state 4 will move to post list state 2, so we need to revert another 2 actions we made
     * 
     * */

    selectedActions = _actions.splice(0, 2); // get remaining last 2 actions
    _posts = timeTraveler(selectedActions, _posts)
    expect(_posts).toEqual(postsListState[2]) // compare with state 2

    /**
     * REVERT TO THE INITIAL STATE FROM CURRANT STATE
     * Now we are in post list state 4 will move to post list state 2, so we need to revert another 2 actions we made
     * 
     * */

    selectedActions = _actions // get all remaining actions
    _posts = timeTraveler(selectedActions, _posts)
    expect(_posts).toEqual(postsListState[0]) // compare with initial

  })

})
