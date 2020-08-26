import { TodoList, Todo, User } from "../models";
import * as types from './actionTypes';
export interface TodoAppState {
    todoLists: TodoList[],
    todosForSelectedTodoList: Todo[],
    loading: boolean,
    error: string,
    loggedIn: boolean,
    user: User
}
export const initialUser: User = {
    id: 0,
    firstName: '',
    username: '',
    token: ''
}
export const initialState: TodoAppState = {
todoLists: [],
loading: false,
error: '',
todosForSelectedTodoList: [],
loggedIn: false,
user: initialUser
}
export function reducer(state = initialState, action: any) : TodoAppState {
    switch(action.type){
        //#region TodoList
        case types.GET_TODOLISTS_SUCCESS:
            return {
                ...state,
                todoLists: action.payload,
                loading: false,
                error: ''
            };
        case types.GET_TODOLISTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload ?? ''
            };
        case types.GET_TODOLISTS_LOADING:
            return {
                ...state,
                loading: true
            };            

            case types.SAVE_TODOLIST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: '[]'
                };
            case types.SAVE_TODOLIST_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload ?? '[]'
                };
            case types.SAVE_TODOLIST_LOADING:
                return {
                    ...state,
                    loading: true
                };

            case types.DELETE_TODOLIST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: ''
                };
            case types.DELETE_TODOLIST_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload ?? ''
                };
            case types.DELETE_TODOLIST_LOADING:
                return {
                    ...state,
                    loading: true
                };
        //#endregion
        //#region Todo
            case types.GET_TODOS_FOR_LIST_SUCCESS:
                return {
                    ...state,
                    todosForSelectedTodoList: action.payload,
                    loading: false,
                    error: ''
                };
            case types.GET_TODOS_FOR_LIST_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload ?? ''
                };
            case types.GET_TODOS_FOR_LIST_LOADING:
                return {
                    ...state,
                    loading: true
                };

            case types.SAVE_TODO_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: ''
                };
            case types.SAVE_TODO_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload ?? ''
                };
            case types.SAVE_TODO_LOADING:
                return {
                    ...state,
                    loading: true
                };

            case types.DELETE_TODO_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: ''
                };
            case types.DELETE_TODO_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload ?? ''
                };
            case types.DELETE_TODO_LOADING:
                return {
                    ...state,
                    loading: true
                };

                case types.UPDATE_TODO_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        error: ''
                    };
                case types.UPDATE_TODO_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload ?? ''
                    };
                case types.UPDATE_TODO_LOADING:
                    return {
                        ...state,
                        loading: true
                    };

                case types.CLEAR_TODOS_FOR_LIST:
                    return {
                        ...state,
                        todosForSelectedTodoList: []
                    };       
            //#endregion
        //#region Login
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loading: false,
                error: '',
                user: action.payload
            };
        case types.LOGIN_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload ?? '',
                loggedIn: false,
                user: initialUser
            };
        case types.LOGIN_USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case types.LOG_OUT_SUCCESS:
            return {
                ...state,
                user: initialUser,
                loggedIn: false
            };
        case types.CLEAR_USER:
            return {
                ...state,
                user: initialUser,
                loggedIn: false
            };                                   
        //#endregion
        //#region Register
        case types.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case types.REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.REGISTER_USER_LOADING:
            return {
                ...state,
                loading: true
            };
        //#endregion
            default:
            return state;    
    };
};
