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
export interface LoginPayload {
        username: string,
        password: string
    } 
export interface RegisterPayload {
        username: string,
        password: string,
        firstName: string
    }
export interface User {
        username: string,
        userId: number,
        name: string
    }   

 