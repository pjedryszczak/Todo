import { fork, put, all, takeEvery, call } from 'redux-saga/effects';
import * as types from './actionTypes';
import axios from 'axios'
import { TodoList, Todo } from '../models';

//#region TodoList
function* getTodoLists(action: { type: string }){
    try {
        yield put({ type: types.GET_TODOLISTS_LOADING });
        const path: string = 'api/Todos/GetTodoLists';
        const response = yield call(() => axios.get(path));

        if(response.status === 200) {
            var results = response.data as TodoList[];
            yield put({ type: types.GET_TODOLISTS_SUCCESS, payload: results });
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

function* saveTodoList(action: { type: string, payload: TodoList }){
    try {
        yield put({ type: types.SAVE_TODOLIST_LOADING });
        const todoList = action.payload;
        const path: string = 'api/Todos/SaveTodoList';
        const response = yield call(() => axios.post(path, todoList));

        if(response.status === 200) {
            yield put({ type: types.SAVE_TODOLIST_SUCCESS });
            yield put({ type: types.GET_TODOLISTS });
        }
        else{
            yield put({ type: types.SAVE_TODOLIST_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data as Array<string>
        yield put({ type: types.SAVE_TODOLIST_FAIL, payload: errors});
    }
}

function* watchForSaveTodoList() {
    yield takeEvery(types.SAVE_TODOLIST, saveTodoList);
}

function* deleteTodoList(action: { type: string, payload: TodoList }){
    try {
        yield put({ type: types.DELETE_TODOLIST_LOADING });
        const todoListId = action.payload.id ?? 0;
        const path: string = 'api/Todos/DeleteTodoList';
        const response = yield call(() => axios.delete(path, {params: {
            id: todoListId
        }
    }));

        if(response.status === 200) {
            yield put({ type: types.DELETE_TODOLIST_SUCCESS });
            yield put({ type: types.GET_TODOLISTS });
        }
        else{
            yield put({ type: types.DELETE_TODOLIST_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data as Array<string>
        yield put({ type: types.DELETE_TODOLIST_FAIL, payload: errors});
    }
}

function* watchForDeleteTodoList() {
    yield takeEvery(types.DELETE_TODOLIST, deleteTodoList);
}

//#endregion

//#region Todo
function* getTodos(action: { type: string, payload: number}){
    try {
        const todoListId = action.payload;
        yield put({ type: types.GET_TODOS_FOR_LIST_LOADING });
        const path: string = 'api/Todos/GetTodos';
        const response = yield call(() => axios.get(path, { params: {
            todoListId
        }}));

        if(response.status === 200) {
            var results = response.data as TodoList[];
            yield put({ type: types.GET_TODOS_FOR_LIST_SUCCESS, payload: results });
        }
        else{
            yield put({ type: types.GET_TODOS_FOR_LIST_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data as Array<string>;
        yield put({ type: types.GET_TODOS_FOR_LIST_FAIL, payload: errors });
    }
}

function* watchForGetTodos() {
    yield takeEvery(types.GET_TODOS_FOR_LIST, getTodos);
}

function* saveTodo(action: { type: string, payload: Todo }){
    try {
        yield put({ type: types.SAVE_TODO_LOADING });
        const todo = action.payload;
        const path: string = 'api/Todos/SaveTodo';
        const response = yield call(() => axios.post(path, todo));

        if(response.status === 200) {
            yield put({ type: types.SAVE_TODO_SUCCESS });
            yield put({ type: types.GET_TODOS_FOR_LIST, payload: todo.todoListId });
        }
        else{
            yield put({ type: types.SAVE_TODO_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data as Array<string>
        yield put({ type: types.SAVE_TODO_FAIL, payload: errors});
    }
}

function* watchForSaveTodo() {
    yield takeEvery(types.SAVE_TODO, saveTodo);
}

function* deleteTodo(action: { type: string, payload: Todo }){
    try {
        yield put({ type: types.DELETE_TODO_LOADING });
        const todo = action.payload;
        const path: string = 'api/Todos/DeleteTodo';
        const response = yield call(() => axios.delete(path, {params: {
            id: todo.id ?? 0
        }
    }));

        if(response.status === 200) {
            yield put({ type: types.DELETE_TODO_SUCCESS });
            yield put({ type: types.GET_TODOS_FOR_LIST, payload: todo.todoListId });
        }
        else{
            yield put({ type: types.DELETE_TODO_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data as Array<string>
        yield put({ type: types.DELETE_TODO_FAIL, payload: errors});
    }
}

function* watchForDeleteTodo() {
    yield takeEvery(types.DELETE_TODO, deleteTodo);
}

function* updateTodo(action: { type: string, payload: Todo }){
    try {
        yield put({ type: types.UPDATE_TODO_LOADING });
        const todo = action.payload;
        const path: string = 'api/Todos/UpdateTodo';
        const response = yield call(() => axios.put(path, todo));

        if(response.status === 200) {
            yield put({ type: types.UPDATE_TODO_SUCCESS });
            yield put({ type: types.GET_TODOS_FOR_LIST, payload: todo.todoListId });
        }
        else{
            yield put({ type: types.UPDATE_TODO_FAIL, payload: response.data });
        }
    } catch (error) {
        let errors = error.response.data as Array<string>
        yield put({ type: types.UPDATE_TODO_FAIL, payload: errors});
    }
}

function* watchForUpdateTodo() {
    yield takeEvery(types.UPDATE_TODO, updateTodo);
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
        fork(watchForUpdateTodo)
    ])
}