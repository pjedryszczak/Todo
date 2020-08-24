import React, { Component } from 'react'
import { Todo } from '../models'
import { BsTrash } from 'react-icons/bs'

interface ComponentProps{
todos: Array<Todo>,
deleteTodo: (todo: Todo) => void,
checkTodo: (todo: Todo) => void
}

export class Todos extends Component<ComponentProps> {
   
    todoList = this.props.todos.length ? this.props.todos.map(todo => {
        return(
        <div className="collection-item" key={todo.id} style={todo.checked ? {background: "azure"} : {background: "burlywood"}} onClick={(e) => this.props.checkTodo(todo)}>
            {/* <input type="checkbox" checked={todo.checked} onChange={(e) => this.handleChange.bind(this)}/> */}
                <span>{todo.content}
            <a href="#!" onClick={() => {this.props.deleteTodo(todo)}} className="secondary-content">
                            <BsTrash />
                        </a>
                        </span>
        </div>
        )
    }) : 
        <></>
    render(){
        return (
            <div className="todos collection">
                {this.todoList}
            </div>
        );
    }
    
}