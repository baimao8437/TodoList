const initState = {
    input: '',
    todos: []//{text,key,completed}
}

function todos(state = initState, action){
    switch(action.type){
        case 'ADD_TODO':
            if(action.database)
                $.ajax({
                    url: '/todo_list',
                    type: 'POST',
                    data: {
                        text: action.text,
                        key: action.key,
                        completed: action.completed
                    }
                })
            return {
                ...state,
                todos: [...state.todos, {
                    text: action.text,
                    key: action.key,
                    completed: action.completed
                }]
            }
        
        case 'INPUT_TODO':
            return {
                ...state,
                input: action.text
            }

        case 'TOGGLE_TODO':
            state.todos.map((todo)=>{
                if(todo.key == action.key)
                    $.ajax({
                        url: '/todo_list/'+todo.key,
                        type: 'PATCH'
                    })
            })
            return {
                ...state,
                todos: state.todos.map((todo)=>(
                    (todo.key==action.key)?{
                        ...todo,
                        completed: !todo.completed
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
                todos: state.todos.filter((todo)=>(!todo.completed))
            }

        default:
            return state;
    }
}

export default todos