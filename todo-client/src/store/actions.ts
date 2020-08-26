import * as types from './actionTypes';
import { TodoList, Todo, LoginPayload, RegisterPayload } from '../models';

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

export function login(payload: LoginPayload){
    return { type: types.LOGIN_USER, payload };
}
export function logout(){
    return { type: types.LOG_OUT };
}
export function register(payload: RegisterPayload){
    return { type: types.REGISTER_USER, payload };
}

