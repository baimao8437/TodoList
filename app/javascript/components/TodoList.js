import React from "react"
import PropTypes from "prop-types"
import {addTodo, inputTodo, toggleTodo} from '../actions/todoActions'

import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import store from '../store/todoStore.js'

class Features extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <button onClick={this.props.clearAll}>Clear All</button>
        <button onClick={this.props.clearToggle}>Clear Toggled</button>
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
  }
  todoStyle(complete){
    return (complete)?{
      textDecoration: "line-through",
      cursor: "pointer"
    }:{
      cursor: "pointer"
    }
  }
  render () {
    const list = this.props.todos.map((todo)=>(
      <li key={todo.key} style={this.todoStyle(todo.complete)} onClick={()=>this.props.handleToggleTodo(todo.key)}>{todo.text}</li>
    ))

    return (
      <div>
        <h1>Todo List</h1>
        <input type="text" onChange={(e)=>this.props.handleInputTodo(e.target.value)} value={this.props.input}></input>
        <button type="button" onClick={()=>this.props.handleAddTodo(this.props.input, this.state.counter++)}>Add</button>
        <br/>
        <ul>
          {list}
        </ul>
        <Features clearAll={this.props.clearAll} clearToggle={this.props.clearToggle}/>
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
    handleAddTodo: (text, key)=>{
      dispatch(addTodo(text, key));
      dispatch(inputTodo(''));
    },
    handleInputTodo: (text)=>{
      dispatch(inputTodo(text));
    },
    handleToggleTodo: (key)=>{
      dispatch(toggleTodo(key));
    },
    clearAll: ()=>{
      dispatch({type: 'CLEAR_ALL'});
    },
    clearToggle: ()=>{
      dispatch({type: 'CLEAR_TOGGLE'});
    }
  }
}

const TodoListPage = connect(mapStateToProps, mapDispatchToProps)(TodoList)

const TodoListApp = () => (
    <Provider store={store}>
        <TodoListPage />
    </Provider>
)

export default TodoListApp