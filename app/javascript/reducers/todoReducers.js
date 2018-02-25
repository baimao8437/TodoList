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
                    complete: action.complete
                }]
            }
        
        case 'INPUT_TODO':
            return {
                ...state,
                input: action.text
            }

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo)=>(
                    (todo.key==action.key)?{
                        ...todo,
                        complete: !todo.complete
                    }:todo
                ))
            }

        case 'CLEAR_ALL':
            return {
                ...state,
                todos: []
            }
        case 'CLEAR_TOGGLE':
            return {
                ...state,
                todos: state.todos.filter((todo)=>(!todo.complete))
            }

        default:
            return state;
    }
}

export default todos