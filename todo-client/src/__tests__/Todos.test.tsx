import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Todos } from '../components/Todos';
import { Todo } from '../models';
const todo: Todo = {
todoListId: 0,
checked: false,
content: 'Content'
}
const list: Array<Todo> = [todo]
test("renders component", async () => {
const { getByText } = render(<Todos todos={list} deleteTodo={() => {}} checkTodo={() => {}} />);
expect(getByText('Content')).toBeInTheDocument();
})