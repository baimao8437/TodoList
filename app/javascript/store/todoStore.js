import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'
import todos from '../reducers/todoReducers.js'

const initState = {
    input: '',
    todos: []//{text,key,completed}
}

let store = createStore(todos, initState, applyMiddleware(Thunk));

export default store