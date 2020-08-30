import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoLists from '../components/TodoLists';
import { TodoList } from '../models';
const todoList: TodoList = {
userId: 0,
title: 'Title'
}
const list: Array<TodoList> = [todoList]
test("renders component", async () => {
const { getByText } = render(<TodoLists todoLists={list} deleteTodoList={() => {}} handleSelect={() => {}} />);
expect(getByText('Title')).toBeInTheDocument();
})