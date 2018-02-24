import React from "react"
import PropTypes from "prop-types"

// import {connect} from 'react-redux'
import {addTodo, inputTodo} from '../actions/todoActions'
import store from '../store/todoStore.js'

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
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleInputTodo = this.handleInputTodo.bind(this);
  }
  handleAddTodo(text, key){
    console.log("addtodo",text,key);
    store.dispatch(addTodo(text, key));
    store.dispatch(inputTodo(''));
  }
  handleInputTodo(text){
    store.dispatch(inputTodo(text));
  }

  render () {
    const list = this.state.todos.map((todo)=>{
      return <li key={todo.key} data-id={todo.key}>{todo.text}</li>
    })

    return (
      <div>
        <h1>Todo List</h1>
        <input type="text" onChange={(e)=>this.handleInputTodo(e.target.value)} value={this.state.input}></input>
        <button type="button" onClick={()=>this.handleAddTodo(this.state.input, this.state.counter++)}>Add</button>
        <br/>
        <ul>
          {list}
        </ul>
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