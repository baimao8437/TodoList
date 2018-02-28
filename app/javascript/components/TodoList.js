import React from "react"
import PropTypes from "prop-types"
import {addTodo, inputTodo, toggleTodo, clearAll, clearToggle} from '../actions/todoActions'

import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import store from '../store/todoStore.js'

class Features extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let toggleKeys = this.props.todos.filter((todo)=>(todo.completed)).map((todo)=>(todo.key))
    return(
      <div>
        <button onClick={this.props.clearAll}>Clear All</button>
        <button onClick={()=>this.props.clearToggle(toggleKeys)}>Clear Toggled</button>
      </div>
    )
  }
}

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0
    }
    this.props.initTodos.map((todo)=>{
      this.props.handleInitTodo(todo);
      this.state.counter = todo.key+1;
    })
  }
  todoStyle(completed){
    return (completed)?{
      textDecoration: "line-through",
      cursor: "pointer"
    }:{
      cursor: "pointer"
    }
  }
  render () {
    const list = this.props.todos.map((todo)=>(
      <li key={todo.key} style={this.todoStyle(todo.completed)} onClick={()=>this.props.handleToggleTodo(todo.key)}>{todo.text}</li>
    ))

    return (
      <div>
        <h1>Todo List</h1>
        <input type="text" onChange={(e)=>this.props.handleInputTodo(e.target.value)} value={this.props.input}></input>
        <button type="button" onClick={()=>this.props.handleAddTodo(this.props.input, this.state.counter++, false)}>Add</button>
        <br/>
        <ul>
          {list}
        </ul>
        <Features todos= {this.props.todos} clearAll={this.props.handleClearAll} clearToggle={this.props.handleClearToggle}/>
      </div>
    );
  }
}

const mapStateToProps= (state) => {
  return {
    input: state.input,
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInitTodo: (todo) =>{
      dispatch(addTodo(todo.text, todo.key, todo.completed, false));
    },
    handleAddTodo: (text, key, completed)=>{
      dispatch(addTodo(text, key, completed, true));
      dispatch(inputTodo(''));
    },
    handleInputTodo: (text)=>{
      dispatch(inputTodo(text));
    },
    handleToggleTodo: (key)=>{
      dispatch(toggleTodo(key));
    },
    handleClearAll: ()=>{
      dispatch(clearAll());
    },
    handleClearToggle: (keys)=>{
      dispatch(clearToggle(keys));
    }
  }
}

const TodoListPage = connect(mapStateToProps, mapDispatchToProps)(TodoList)

const TodoListApp = (props) => (
    <Provider store={store}>
        <TodoListPage initTodos={props.initTodos}/>
    </Provider>
)

export default TodoListApp