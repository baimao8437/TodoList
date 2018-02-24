import {createStore} from 'redux'
import todos from '../reducers/todoReducers.js'

let store = createStore(todos);

export default store