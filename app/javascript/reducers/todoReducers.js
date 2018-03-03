import {
    ADD_TODO,
    INPUT_TODO,
    TOGGLE_TODO,
    CLEAR_ALL,
    CLEAR_TOGGLE
} from '../actions/todoActions.js'

const ACTION_HANDLERS = {
    [ADD_TODO]: (state, { text, key, completed }) => {
        let todos = [...state['todos'], { text, key, completed }];
        return { ...state, todos };
    },
    [INPUT_TODO]: (state, { text }) => {
        let input = text;
        return { ...state, input };
    },
    [TOGGLE_TODO]: (state, { key, completed }) => {
        let todos = state['todos'].map((todo)=>((todo['key']==key)?{ ...todo, completed}: todo));
        return { ...state, todos };
    },
    [CLEAR_ALL]: (state, action) => ({ ...state, todos: []}),
    [CLEAR_TOGGLE]: (state, action) => {
        let todos = state['todos'].filter((todo)=>(!todo['completed']));
        return { ...state, todos }
    }
}

function todos(state = {}, action){
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}

export default todos