import 'whatwg-fetch'

export const ADD_TODO = 'ADD_TODO';
export const INPUT_TODO = 'INPUT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const CLEAR_ALL = 'CLEAR_ALL';
export const CLEAR_TOGGLE = 'CLEAR_TOGGLE'

function parseJSON(response) {
    return response.json()
}

export const addTodo = (text, key, completed, database) => dispatch => {
    if(database)
        fetch('/todo_list',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//important to add this
            },
            body: JSON.stringify({
                text,
                key,
                completed
            })
        })
    setTimeout(() => {
        dispatch({
            type: ADD_TODO,
            text,
            key,
            completed,
            database
        })
    }, 2000)
}

export const inputTodo = text => ({
        type: INPUT_TODO,
        text
})


export const toggleTodo = key => dispatch => {
    fetch('/todo_list/'+key,{ method: 'GET' })
    .then(parseJSON)
    .then((json) => {
        const completed = !json.completed;
        
        fetch('/todo_list/'+key, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed
            })
        });

        dispatch({
            type: TOGGLE_TODO,
            key,
            completed
        })
    })
}

export const clearAll = () => (dispatch, getState) => {
    const {todos} = getState();
    let ids = [];
    todos.forEach(({key})=>{ ids.push(key); })
    fetch('/todo_list/bulk_destroy', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ids
        })
    })

    dispatch({
        type: CLEAR_ALL
    })
}

export const clearToggle = () => (dispatch, getState) => {
    const {todos} = getState();
    let ids = [];
    todos.forEach(({completed, key})=>{(completed && ids.push(key))})
    fetch('/todo_list/bulk_destroy', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ids
        })
    })
    dispatch({
        type: CLEAR_TOGGLE
    })
}