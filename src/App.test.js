import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Home from './components/Home';

test('renders learn react link', () => {
  render(
    <MemoryRouter> 
      <Home />
    </MemoryRouter>
  );
  
});
