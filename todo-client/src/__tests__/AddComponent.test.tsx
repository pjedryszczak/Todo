import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AddComponent from '../components/AddComponent';
test("renders component", async () => {
const { getByText } = render(<AddComponent placeholder={'placeholder'} addFunc={() => {}}/>);
expect(getByText('placeholder')).toBeInTheDocument();
})