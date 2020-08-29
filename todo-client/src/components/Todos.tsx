import React, { Component } from 'react'
import { Todo } from '../models'
interface ComponentProps{
todos: Array<Todo>,
deleteTodo: (todo: Todo) => void,
checkTodo: (todo: Todo) => void
}

export class Todos extends Component<ComponentProps> {    
    render(){
        let todoList = this.props.todos.length ? this.props.todos.map(todo => {
            return(
                <div id="todo">
                    <li className="collection-item" key={todo.id}>
                        <div onClick={(e) => this.props.checkTodo(todo)}>
                            <span style={todo.checked ? {textDecorationLine: 'line-through'} : {}}>{todo.content}</span>
                        </div> 
                    <a href="#!" onClick={() => {this.props.deleteTodo(todo)}} className="waves-effect waves-light red darken-1 btn" id="delete-right">
                                Delete
                            </a>
                     </li>
                </div>
            )
        }) : 
            <></>
        return (
            <ul className="todos collection">
                {todoList}
            </ul>
        );
    }    
}



