const initState = {
    input: '',
    todos: []//{text,key,complete}
}

function todos(state = initState, action){
    switch(action.type){
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, {
                    text: action.text,
                    key: action.key,
                    complete: false
                }]
            }
        
        case 'INPUT_TODO':
            return {
                ...state,
                input: action.text
            }

        default:
            return state;
    }
}

export default todos