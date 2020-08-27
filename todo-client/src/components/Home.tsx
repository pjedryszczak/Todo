import React, { Component } from 'react';
import { TodoList, Todo, User, NumericPayload, TodoListPayload, TodoPayload } from '../models';
import  TodoLists  from './TodoLists';
import AddComponent from './AddComponent';
import { Todos } from './Todos';
import { TodoAppState } from '../store/reducer';
import { connect } from 'react-redux';
import {saveTodo, saveTodoList, deleteTodo, deleteTodoList, getTodoListsForUser, getTodosForList, updateTodo, clearTodos} from './../store/actions'
import { RouteComponentProps } from 'react-router-dom';

interface LocalState {
    selectedTodoList?: TodoList,
    todoListLocal: Array<TodoList>,
    todosForSelectedTodoListLocal: Array<Todo>,
    user: User
}

interface StoreState {
    todoLists: Array<TodoList>,
    todosForSelectedTodoList: Array<Todo>,
    user: User
}
interface DispatchProps {
    saveTodo: typeof saveTodo,
    saveTodoList: typeof saveTodoList,
    deleteTodo: typeof deleteTodo,
    deleteTodoList: typeof deleteTodoList,
    getTodoListsForUser: typeof getTodoListsForUser,
    getTodosForList: typeof getTodosForList,
    updateTodo: typeof updateTodo,
    clearTodos: typeof clearTodos
}


interface ComponentProps {}

type Props = StoreState & LocalState & DispatchProps & ComponentProps & RouteComponentProps;
class Home extends Component<Props, LocalState> {
  state: LocalState = {
      todoListLocal: [],
      todosForSelectedTodoListLocal: [],
      user: this.props.user
  }
    componentDidMount(){
        if((!this.props.todoLists || !(this.props.todoLists.length > 0)) && this.state.user.id !== 0){
            const payload: NumericPayload = {
                history: this.props.history,
                id:this.state.user.id
            };
            this.props.getTodoListsForUser(payload)
        }    
        this.setState({

        })
    }
    static getDerivedStateFromProps(props: StoreState, state: LocalState) {
        
            return {
                todoListLocal: props.todoLists,
                todosForSelectedTodoListLocal: props.todosForSelectedTodoList,
                userLocal: props.user
            };          
      }
  

  handleSelectTodoList = (todoList: TodoList) => {    
    this.setState({
        selectedTodoList: todoList
    });
    const payload: NumericPayload = {
        history: this.props.history,
        id: todoList.id ?? 0
    };
    this.props.getTodosForList(payload)
  }
  deleteTodoList = (todoList: TodoList) => {

    if(todoList.id === this.state.selectedTodoList?.id){
        this.setState({
            selectedTodoList: undefined
        });
        this.props.clearTodos();
    }
    const payload: TodoListPayload = {
        history: this.props.history,
        todoList
    };
    this.props.deleteTodoList(payload);
  }
  addTodoList = (content: string) => {
    const todoList: TodoList ={
        title: content,
        userId: this.props.user.id
    };
    const payload: TodoListPayload = {
        history: this.props.history,
        todoList
    };
    this.props.saveTodoList(payload);
  }
  deleteTodo = (todo: Todo) => {
    const payload: TodoPayload = {
        history: this.props.history,
        todo
    };
    this.props.deleteTodo(payload);
  }
  addTodo = (content: string) => {
    const todo: Todo ={
        content: content,
        todoListId: this.state.selectedTodoList?.id ?? 0,
        checked: false
    };
    const payload: TodoPayload = {
        history: this.props.history,
        todo
    };
    this.props.saveTodo(payload);
  }
  checkTodo = (todo: Todo) => {   
      todo.checked = !todo.checked; 
      const payload: TodoPayload = {
        history: this.props.history,
        todo
    };
    this.props.updateTodo(payload);
  }

  
  render(){
    return (
        <>
            <h1 className="center blue-text"> Todo's</h1>
            <TodoLists todoLists={this.state.todoListLocal} deleteTodoList={this.deleteTodoList} handleSelect={this.handleSelectTodoList}/>     
            <AddComponent addFunc={this.addTodoList} placeholder={"Add new Todo list:"}/>
            {
                this.state.selectedTodoList?.id && this.state.selectedTodoList.id !== 0 && this.state.todosForSelectedTodoListLocal.length && this.state.todosForSelectedTodoListLocal.length > 0 ? 
                <Todos todos={this.state.todosForSelectedTodoListLocal } deleteTodo={this.deleteTodo} checkTodo={this.checkTodo}/> :
                <></>
            } 
            {
                this.state.selectedTodoList?.id && this.state.selectedTodoList.id !== 0 ?
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
        todosForSelectedTodoList: state.todosForSelectedTodoList,
        user: state.user
    }
}
const container = connect(
    mapStateToProps,
    {
    saveTodo,
    saveTodoList,
    deleteTodo,
    deleteTodoList,
    getTodoListsForUser,
    getTodosForList,
    updateTodo,
    clearTodos
}
)(Home)

export default container;
