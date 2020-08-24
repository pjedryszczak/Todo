import * as types from './actionTypes';
import { TodoList, Todo } from '../models';

export function getTodoLists(){
    return { type: types.GET_TODOLISTS };
}

export function saveTodoList(payload: TodoList){
    return { type: types.SAVE_TODOLIST, payload };
}

export function deleteTodoList(payload: TodoList){
    return { type: types.DELETE_TODOLIST, payload };
}

export function getTodosForList(payload: number){
    return { type: types.GET_TODOS_FOR_LIST, payload };
}

export function saveTodo(payload: Todo){
    return { type: types.SAVE_TODO, payload };
}

export function deleteTodo(payload: Todo){
    return { type: types.DELETE_TODO, payload };
}
export function updateTodo(payload: Todo){
    return { type: types.UPDATE_TODO, payload };
}
export function clearTodos(){
    return { type: types.CLEAR_TODOS_FOR_LIST };
}