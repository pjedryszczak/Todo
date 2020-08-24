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
    selectedListId: number | null
}

export default class TodoLists extends Component<ComponentProps, LocalProps> {

    render(){        
       let todoList = this.props.todoLists.length ? this.props.todoLists.map(todoList => {
            return(
                <>
                    <li className="collection-item" key={todoList.id} onClick={(e) => this.props.handleSelect(todoList)}>
                        {todoList.title}
                        <a href="#!" onClick={() => {this.props.deleteTodoList(todoList)}} className="secondary-content">
                            <BsTrash />
                        </a>    
                    </li> 
            </>
        )}) : 
            <p className="center">"You have no todo's left,yey!"</p>
        return (
            <ul className="todos collection">
                {todoList}
            </ul>
        );
    };
    
}