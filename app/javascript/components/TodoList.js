import React from "react"
import PropTypes from "prop-types"
import { initList, addTodo, inputTodo, toggleTodo, clearAll, clearToggle } from '../actions/todoActions'

import { connect, Provider } from 'react-redux'
import createStoreWithRailsProps from '../store/todoStore.js'


const mapStateToProps= ({ input, todos }) => {
  return { input, todos }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInitList: () =>{
      return dispatch(initList());
    },
    handleAddTodo: (text, key, completed)=>{
      dispatch(addTodo(text, key, completed));
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
    handleClearToggle: ()=>{
      dispatch(clearToggle());
    }
  }
}

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      counter: props.handleInitList()
    }
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
    const { input, todos,
      handleAddTodo, handleInputTodo, handleToggleTodo, handleClearAll, handleClearToggle
    } = this.props;

    const list = todos.map((todo)=>(
      <li key={todo.key} style={this.todoStyle(todo.completed)} onClick={()=>handleToggleTodo(todo.key)}>{todo.text}</li>
    ))

    return (
      <div>
        <h1>Todo List</h1>
        <input type="text" onChange={(e)=>handleInputTodo(e.target.value)} value={input}></input>
        <button type="button" onClick={()=>handleAddTodo(input, this.state.counter++, false)}>Add</button>
        <br/>
        <ul>
          {list}
        </ul>
        <Features todos= {todos} clearAll={handleClearAll} clearToggle={handleClearToggle}/>
      </div>
    );
  }
}

class Features extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { todos, clearAll, clearToggle } = this.props;
    return(
      <div>
        <button onClick={()=>clearAll()}>Clear All</button>
        <button onClick={()=>clearToggle()}>Clear Toggled</button>
      </div>
    )
  }
}

const TodoListPage = connect(mapStateToProps, mapDispatchToProps)(TodoList)

const TodoListApp = (props) => (
    <Provider store={createStoreWithRailsProps(props)}>
        <TodoListPage/>
    </Provider>
)

export default TodoListApp