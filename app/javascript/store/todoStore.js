import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'
import todos from '../reducers/todoReducers.js'

export default (railsProps={}) => {
    const { initTodos } =railsProps;

    const initState = {
        initTodos,
        input: '',
        todos: []//{text,key,completed}
    }

    let store = createStore(todos, initState, applyMiddleware(Thunk));

    return store
}