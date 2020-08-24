import React, { Component } from 'react';
import { TodoList, Todo } from '../models';
import  TodoLists  from './TodoLists';
import AddComponent from './AddComponent';
import { Todos } from './Todos';
import { TodoAppState } from '../store/reducer';
import { connect } from 'react-redux';
import {saveTodo, saveTodoList, deleteTodo, deleteTodoList, getTodoLists, getTodosForList, updateTodo, clearTodos} from './../store/actions'

interface LocalState {
    selectedTodoList: TodoList
}

interface StoreState {
    todoLists: Array<TodoList>,
    todosForSelectedTodoList: Array<Todo>
}
interface DispatchProps {
    saveTodo: typeof saveTodo,
    saveTodoList: typeof saveTodoList,
    deleteTodo: typeof deleteTodo,
    deleteTodoList: typeof deleteTodoList,
    getTodoLists: typeof getTodoLists,
    getTodosForList: typeof getTodosForList,
    updateTodo: typeof updateTodo,
    clearTodos: typeof clearTodos
}


interface ComponentProps {}

type Props = StoreState & LocalState & DispatchProps & ComponentProps;
class Home extends Component<Props, LocalState> {
  state: LocalState = {
      selectedTodoList: {
          title: '',
          userId: 0
      }
  }
    componentDidMount(){
        if(!this.props.todoLists || !(this.props.todoLists.length > 0)){
            this.props.getTodoLists()
        }    
    }
    componentDidUpdate(){
        if(this.state.selectedTodoList.id !== undefined){
            let check = this.props.todoLists.filter((todoList: TodoList) => {
                return todoList.id === this.state.selectedTodoList.id;
            });
            if(!check){
                this.setState({
                    selectedTodoList: {
                        title: '',
                        userId: 0,
                        id: undefined
                    }
                });
                this.props.clearTodos();
            }
        }    
    }
  

  handleSelectTodoList = (todoList: TodoList) => {    
    this.setState({
        selectedTodoList: todoList
    });
    this.props.getTodosForList(todoList.id ?? 0)
  }
  deleteTodoList = (todoList: TodoList) => {
    this.props.deleteTodoList(todoList);
  }
  addTodoList = (content: string) => {
    const todoList: TodoList ={
        title: content,
        userId: 0
    };
    this.props.saveTodoList(todoList);
  }
  deleteTodo = (todo: Todo) => {
    this.props.deleteTodo(todo);
  }
  addTodo = (content: string) => {
    const todo: Todo ={
        content: content,
        todoListId: this.state.selectedTodoList.id ?? 0,
        checked: false
    };
    this.props.saveTodo(todo);
  }
  checkTodo = (todo: Todo) => {   
      todo.checked = !todo.checked; 
    this.props.updateTodo(todo);
  }

  
  render(){
    return (
        <>
            <h1 className="center blue-text"> Todo's</h1>
            <TodoLists todoLists={this.props.todoLists} deleteTodoList={this.deleteTodoList} handleSelect={this.handleSelectTodoList}/>     
            <AddComponent addFunc={this.addTodoList} placeholder={"Add new Todo list:"}/>
            {
                this.state.selectedTodoList.id && this.state.selectedTodoList.id !== 0 && this.props.todosForSelectedTodoList.length && this.props.todosForSelectedTodoList.length > 0 ? 
                <Todos todos={this.props.todosForSelectedTodoList } deleteTodo={this.deleteTodo} checkTodo={this.checkTodo}/> :
                <></>
            } 
            {
                this.state.selectedTodoList.id && this.state.selectedTodoList.id !== 0 ?
                <AddComponent addFunc={this.addTodo} placeholder={"Add new Todo:"}/> :
                <></>
            }           
            
        </>      
    );
  }
  
}

function mapStateToProps(state: TodoAppState, props: any){
    return {
        todoLists: state.todoLists,
        todosForSelectedTodoList: state.todosForSelectedTodoList
    }
}
const container = connect(
    mapStateToProps,
    {
    saveTodo,
    saveTodoList,
    deleteTodo,
    deleteTodoList,
    getTodoLists,
    getTodosForList,
    updateTodo,
    clearTodos
}
)(Home)

export default container;
