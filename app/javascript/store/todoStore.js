import {createStore, applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import todos from '../reducers/todoReducers.js'

let store = createStore(todos, applyMiddleware(Thunk));

export default store