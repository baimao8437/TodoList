import 'whatwg-fetch'

export const ADD_TODO = 'ADD_TODO';
export const INPUT_TODO = 'INPUT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const CLEAR_ALL = 'CLEAR_ALL';
export const CLEAR_TOGGLE = 'CLEAR_TOGGLE'


export function addTodo(text, key, completed, database) {
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
    return function (dispatch) {
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
}

export function inputTodo(text) {
    return {
        type: INPUT_TODO,
        text
    }
}

export function toggleTodo(key) {
    fetch('/todo_list/'+key,{
        method: 'PATCH'
    })
    return {
        type: TOGGLE_TODO,
        key
    }
}

export function clearAll(){
    fetch('/todo_list/destroy_all',{
        method: 'GET'
    })
    return {
        type: CLEAR_ALL
    }
}

export function clearToggle(keys){
    keys.forEach((key)=>{
        fetch('/todo_list/'+key,{
            method: 'DELETE'
        })
    })
    return {
        type: CLEAR_TOGGLE
    }
}