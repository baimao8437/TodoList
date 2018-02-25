export function addTodo(text, key, completed, database){
    return {
        type: 'ADD_TODO',
        text,
        key,
        completed,
        database
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
        type:'TOGGLE_TODO',
        key
    }
}