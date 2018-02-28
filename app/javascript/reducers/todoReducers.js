import 'whatwg-fetch'

const initState = {
    input: '',
    todos: []//{text,key,completed}
}

function todos(state = initState, action){
    switch(action.type){
        case 'ADD_TODO':
            if(action.database)
                fetch('/todo_list',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'//important to add this
                    },
                    body: JSON.stringify({
                        text: action.text,
                        key: action.key,
                        completed: action.completed
                    })
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
                    fetch('/todo_list/'+todo.key,{
                        method: 'PATCH'
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
            state.todos.map((todo)=>{
                fetch('/todo_list/'+todo.key,{
                    method: 'DELETE'
                })
            })
            return {
                ...state,
                todos: []
            }
        case 'CLEAR_TOGGLE':
            state.todos.map((todo)=>{
                if(todo.completed)
                    fetch('/todo_list/'+todo.key,{
                        method: 'DELETE'
                    })
            })
            return {
                ...state,
                todos: state.todos.filter((todo)=>(!todo.completed))
            }

        default:
            return state;
    }
}

export default todos