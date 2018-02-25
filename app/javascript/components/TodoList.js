import React from "react"
import PropTypes from "prop-types"

// import {connect} from 'react-redux'
import {addTodo, inputTodo, toggleTodo} from '../actions/todoActions'
import store from '../store/todoStore.js'

class Features extends React.Component {
  clearAll(){
    store.dispatch({type: 'CLEAR_ALL'});
  }
  clearToggle(){
    store.dispatch({type: 'CLEAR_TOGGLE'});
  }
  render(){
    return(
      <div>
        <button onClick={this.clearAll}>Clear All</button>
        <button onClick={this.clearToggle}>Clear Toggled</button>
      </div>
    )
  }
}

class TodoList extends React.Component {
  constructor(props){
    super(props);
    let state = store.getState();
    this.state = {
      input: state.input,
      todos: state.todos,
      counter: 0
    }
  }
  componentDidMount(){
    store.subscribe(()=>{
      let state = store.getState();
      this.setState({
        input: state.input,
        todos: state.todos
      })
    })
  }
  handleAddTodo(text, key){
    store.dispatch(addTodo(text, key));
    store.dispatch(inputTodo(''));
  }
  handleInputTodo(text){
    store.dispatch(inputTodo(text));
  }
  handleToggleTodo(key){
    store.dispatch(toggleTodo(key));
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
    const list = this.state.todos.map((todo)=>(
      <li key={todo.key} style={this.todoStyle(todo.complete)} onClick={()=>this.handleToggleTodo(todo.key)}>{todo.text}</li>
    ))

    return (
      <div>
        <h1>Todo List</h1>
        <input type="text" onChange={(e)=>this.handleInputTodo(e.target.value)} value={this.state.input}></input>
        <button type="button" onClick={()=>this.handleAddTodo(this.state.input, this.state.counter++)}>Add</button>
        <br/>
        <ul>
          {list}
        </ul>
        <Features />
      </div>
    );
  }
}
export default TodoList
/*
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
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
*/