import { fork, put, all, takeEvery, call } from 'redux-saga/effects';
import * as types from './actionTypes';
import axios from 'axios'
import { TodoList, LoginPayload, User, RegisterPayload, NumericPayload, TodoListPayload, TodoPayload } from '../models';
import { getBaseUrl } from '../helpers';

//#region TodoList
function* getTodoLists(action: { type: string, payload: NumericPayload }){
    try {
        const token: string = localStorage.token ?? '';
        const userId = action.payload.id;
        const history = action.payload.history;
        yield put({ type: types.GET_TODOLISTS_LOADING });
        const base: string = getBaseUrl();
        const path: string = base + 'api/Todos/GetTodoLists';
        const response = yield call(() => axios.get(path, { params: {
            userId
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
        }}));

        if(response.status === 200) {
            var results = response.data as TodoList[];
            yield put({ type: types.GET_TODOLISTS_SUCCESS, payload: results });
        }
        else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.GET_TODOLISTS_FAIL });
        }
    } catch (error) {
        yield put({ type: types.GET_TODOLISTS_FAIL });
    }
}

function* watchForGetTodoLists() {
    yield takeEvery(types.GET_TODOLISTS, getTodoLists);
}

function* saveTodoList(action: { type: string, payload: TodoListPayload }){
        const { todoList, history }= action.payload;
    try {
        const token: string = localStorage.token ?? '';
        yield put({ type: types.SAVE_TODOLIST_LOADING });        
        const base: string = getBaseUrl();
        const path: string = base + 'api/Todos/SaveTodoList';
        const response = yield call(() => axios.post(path, todoList,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Requested-With': 'XMLHttpRequest'
            }}));

        if(response.status === 200) {
            yield put({ type: types.SAVE_TODOLIST_SUCCESS });
            const payload: NumericPayload ={
                id: todoList.userId,
                history
            }
            yield put({ type: types.GET_TODOLISTS, payload: payload});
        }
        else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.SAVE_TODOLIST_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data 
        yield put({ type: types.SAVE_TODOLIST_FAIL, payload: errors});
    }
}

function* watchForSaveTodoList() {
    yield takeEvery(types.SAVE_TODOLIST, saveTodoList);
}

function* deleteTodoList(action: { type: string, payload: TodoListPayload }){
    const { todoList, history }= action.payload;
    try {
        const token: string = localStorage.token ?? '';
        yield put({ type: types.DELETE_TODOLIST_LOADING });
        const todoListId = todoList.id;
        const base: string = getBaseUrl();
        const path: string = base + 'api/Todos/DeleteTodoList';
        const response = yield call(() => axios.delete(path, {params: {
            id: todoListId
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
        }
    }));

        if(response.status === 200) {
            yield put({ type: types.DELETE_TODOLIST_SUCCESS });
            const payload: NumericPayload ={
                id: todoList.userId,
                history
            }
            yield put({ type: types.GET_TODOLISTS, payload: payload});
        }
        else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.DELETE_TODOLIST_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data
        yield put({ type: types.DELETE_TODOLIST_FAIL, payload: errors});
    }
}

function* watchForDeleteTodoList() {
    yield takeEvery(types.DELETE_TODOLIST, deleteTodoList);
}

//#endregion

//#region Todo
function* getTodos(action: { type: string, payload: NumericPayload}){
    try {
        const token: string = localStorage.token ?? '';
        const todoListId = action.payload.id;
        const history = action.payload.id;
        yield put({ type: types.GET_TODOS_FOR_LIST_LOADING });
        const base: string = getBaseUrl();
        const path: string = base + 'api/Todos/GetTodos';
        const response = yield call(() => axios.get(path, { params: {
            todoListId
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
        }
          }));

        if(response.status === 200) {
            var results = response.data as TodoList[];
            yield put({ type: types.GET_TODOS_FOR_LIST_SUCCESS, payload: results });
        }
        else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.GET_TODOS_FOR_LIST_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data;
        yield put({ type: types.GET_TODOS_FOR_LIST_FAIL, payload: errors });
    }
}

function* watchForGetTodos() {
    yield takeEvery(types.GET_TODOS_FOR_LIST, getTodos);
}

function* saveTodo(action: { type: string, payload: TodoPayload }){
    try {
        const token: string = localStorage.token ?? '';
        const { todo, history }= action.payload;
        yield put({ type: types.SAVE_TODO_LOADING });        
        const base: string = getBaseUrl();
        const path: string = base + 'api/Todos/SaveTodo';
        const response = yield call(() => axios.post(path, todo, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Requested-With': 'XMLHttpRequest'
            }
          }));

        if(response.status === 200) {
            yield put({ type: types.SAVE_TODO_SUCCESS });
            const payload: NumericPayload = {
                id: todo.todoListId,
                history
            }
            yield put({ type: types.GET_TODOS_FOR_LIST, payload: payload });
        }
        else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.SAVE_TODO_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data;
        yield put({ type: types.SAVE_TODO_FAIL, payload: errors});
    }
}

function* watchForSaveTodo() {
    yield takeEvery(types.SAVE_TODO, saveTodo);
}

function* deleteTodo(action: { type: string, payload: TodoPayload }){
    try {
        const token: string = localStorage.token ?? '';
        const { todo, history }= action.payload;
        yield put({ type: types.DELETE_TODO_LOADING });
        const base: string = getBaseUrl();
        const path: string = base + 'api/Todos/DeleteTodo';
        const response = yield call(() => axios.delete(path, { params: {
            id: todo.id ?? 0
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
        }
    }));

        if(response.status === 200) {
            yield put({ type: types.DELETE_TODO_SUCCESS });
            const payload: NumericPayload = {
                id: todo.todoListId,
                history
            }
            yield put({ type: types.GET_TODOS_FOR_LIST, payload: payload });
        }
        else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.DELETE_TODO_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data;
        yield put({ type: types.DELETE_TODO_FAIL, payload: errors});
    }
}

function* watchForDeleteTodo() {
    yield takeEvery(types.DELETE_TODO, deleteTodo);
}

function* updateTodo(action: { type: string, payload: TodoPayload }){
    try {
        const token: string = localStorage.token ?? '';
        const { todo, history }= action.payload;
        yield put({ type: types.UPDATE_TODO_LOADING });
        const base: string = getBaseUrl();
        const path: string = base + 'api/Todos/UpdateTodo';
        const response = yield call(() => axios.put(path, todo,  {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Requested-With': 'XMLHttpRequest'
            }
          }));

        if(response.status === 200) {
            yield put({ type: types.UPDATE_TODO_SUCCESS });
            const payload: NumericPayload = {
                id: todo.todoListId,
                history
            }
            yield put({ type: types.GET_TODOS_FOR_LIST, payload: payload });
        }else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.UPDATE_TODO_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data;
        yield put({ type: types.UPDATE_TODO_FAIL, payload: errors});
    }
}

function* watchForUpdateTodo() {
    yield takeEvery(types.UPDATE_TODO, updateTodo);
}
//#endregion

//#region Log
function* login(action: { type: string, payload: LoginPayload }) {
    const model = action.payload.payload;
    const history = action.payload.history;
    const base: string = getBaseUrl();
        const path: string = base + 'api/Users/Authenticate';
    
    try {
        
        const response = yield call(() => axios.post(path, model,{
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }));
    
        if(response.status === 200) {
            var user = response.data as User;

            localStorage.setItem("token", user.token);

            yield put({ type: types.LOGIN_USER_SUCCESS, payload: user });
            history.push("/home");
        }
        else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.LOGIN_USER_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data;
        yield put({ type: types.LOGIN_USER_FAIL, payload: errors});
    }
}
function* watchForLogin() {
    yield takeEvery(types.LOGIN_USER, login);
}
function* register(action: { type: string, payload: RegisterPayload }) {
    const model = action.payload.payload;
    const history = action.payload.history;
    const base: string = getBaseUrl();
        const path: string = base + 'api/Users/Register';
    try {
        const response = yield call(() => axios.post(path, model, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }));
    
        if(response.status === 200) {
            var user = response.data as User;
            yield put({ type: types.REGISTER_USER_SUCCESS, user });
            history.push("/");
        }
        else if(response.status === 401){
            yield put({ type: types.LOG_OUT, history });
        }
        else{
            yield put({ type: types.REGISTER_USER_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data;
        yield put({ type: types.REGISTER_USER_FAIL, payload: errors});
    }
}

function* watchForRegister() {
    yield takeEvery(types.REGISTER_USER, register);
}

function* logout(action: { type: string, payload: any }) {
    const history = action.payload;   
    yield put({ type: types.LOG_OUT_SUCCESS }); 
    history.push("/");
}

function* watchForLogout() {
    yield takeEvery(types.LOG_OUT, logout);
}
//#endregion

export default function* sagas(): any {
    yield all([
        fork(watchForGetTodoLists),
        fork(watchForSaveTodoList),
        fork(watchForDeleteTodoList),
        fork(watchForGetTodos),
        fork(watchForSaveTodo),
        fork(watchForDeleteTodo),
        fork(watchForUpdateTodo),
        fork(watchForLogin),
        fork(watchForLogout),
        fork(watchForRegister)
    ])
}