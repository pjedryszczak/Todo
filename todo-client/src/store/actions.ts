import * as types from './actionTypes';
import { LoginPayload, RegisterPayload, NumericPayload, TodoListPayload, TodoPayload } from '../models';

export function getTodoListsForUser(payload: NumericPayload){
    return { type: types.GET_TODOLISTS, payload };
}
export function saveTodoList(payload: TodoListPayload){
    return { type: types.SAVE_TODOLIST, payload };
}
export function deleteTodoList(payload: TodoListPayload){
    return { type: types.DELETE_TODOLIST, payload };
}
export function getTodosForList(payload: NumericPayload){
    return { type: types.GET_TODOS_FOR_LIST, payload };
}

export function saveTodo(payload: TodoPayload){
    return { type: types.SAVE_TODO, payload };
}
export function deleteTodo(payload: TodoPayload){
    return { type: types.DELETE_TODO, payload };
}
export function updateTodo(payload: TodoPayload){
    return { type: types.UPDATE_TODO, payload };
}
export function clearTodos(){
    return { type: types.CLEAR_TODOS_FOR_LIST };
}

export function login(payload: LoginPayload){
    return { type: types.LOGIN_USER, payload };
}
export function logout(payload: any){
    return { type: types.LOG_OUT };
}
export function clearUser(){
    return { type: types.CLEAR_USER };
}
export function clearError(){
    return { type: types.CLEAR_ERROR };
}
export function register(payload: RegisterPayload){
    return { type: types.REGISTER_USER, payload };
}

