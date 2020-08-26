export interface Todo {
        id?: number,
        content: string,
        todoListId: number,
        checked: boolean
    }
export interface TodoList {
        id?: number,
        userId: number,
        title: string
    }   
export interface LoginModel {
        username: string,
        password: string
    } 
export interface RegisterModel {
        username: string,
        password: string,
        firstName: string
    }
export interface User {
        firstName: string,
        id: number,
        token: string,
        username: string 
    } 
export interface LoginPayload {
        payload: LoginModel,
        history: any
    }
export interface RegisterPayload {
        payload: RegisterModel,
        history: any
    }
export interface NumericPayload {
        id: number,
        history: any
    }
export interface TodoListPayload {
    todoList: TodoList,
    history: any
    }
export interface TodoPayload {
    todo: Todo,
    history: any
    }


 