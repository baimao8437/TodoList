export function addTodo(text, key){
    return {
        type: 'ADD_TODO',
        text,
        key
    }
}

export function inputTodo(text) {
    return {
        type: 'INPUT_TODO',
        text
    }
}