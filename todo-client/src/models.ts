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

 