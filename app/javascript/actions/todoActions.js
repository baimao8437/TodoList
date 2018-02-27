export function addTodo(text, key, completed, database) {
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type: 'ADD_TODO',
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
        type: 'INPUT_TODO',
        text
    }
}

export function toggleTodo(key) {
    return {
        type: 'TOGGLE_TODO',
        key
    }
}