import {BsTrash} from "react-icons/bs";
import React, { Component } from 'react'
import { TodoList, Todo } from '../models'
import { Todos } from "./Todos";


interface ComponentProps{
todoLists: Array<TodoList>,
deleteTodoList: (todoList: TodoList) => void,
handleSelect: (todoList: TodoList) => void
}
interface LocalProps {
    selectedListId?: number;
}

export default class TodoLists extends Component<ComponentProps, LocalProps> {
state: LocalProps ={
    selectedListId: undefined
}
handleSelect(todoList: TodoList){
    this.setState({
        selectedListId: todoList.id ?? 0
    });
    this.props.handleSelect(todoList);
}
handleDelete(todoList: TodoList){
    this.setState({
        selectedListId: undefined
    });
    this.props.deleteTodoList(todoList);
}
    render(){     
    const {selectedListId} = this.state;  
       let todoList = this.props.todoLists.length ? this.props.todoLists.map(todoList => {
            return(
                <div id="todoList">
                    <li className="collection-item"  key={todoList.id} id={selectedListId && selectedListId === todoList.id ? "active" : ""}>
                        <div onClick={(e) => this.handleSelect(todoList)} >
                            <span>{todoList.title}</span>
                        </div>
                        <a href="#!" onClick={() => {this.handleDelete(todoList)}} className="waves-effect waves-light red darken-1 btn" id="delete-right">
                           Delete
                        </a>                                                                       
                    </li>
                     
                     
                                       
            </div>
        )}) : 
            <p className="center">"You have no todo's left,yey!"</p>
        return (
            <ul className="todoLists collection">
                {todoList}
            </ul>
        );
    };
    
}