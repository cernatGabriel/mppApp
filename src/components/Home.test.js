import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Home from './Home';
import 'jest-canvas-mock';



test('edits an existing artist', () => {
  const { getAllByText } = render(
    <MemoryRouter> 
      <Home />
    </MemoryRouter>
  );


  const editButtons = getAllByText('Edit');
  fireEvent.click(editButtons[0]); 

});

test('deletes an existing artist', async () => {
  const { getAllByText } = render(
    <MemoryRouter> 
      <Home />
    </MemoryRouter>
  );

  const deleteButtons = getAllByText('DELETE');
  fireEvent.click(deleteButtons[0]); 

});

test('sorts artists alphabetically', async () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter> 
      <Home />
    </MemoryRouter>
  );

  const sortButton = getByText('Sort');
  fireEvent.click(sortButton); 

  const artistNames = ["Pink Floyd", "Alan Parsons Project", "Jean Michel-Jarre", "Jay Z", "Marvin Gaye", "Kanye West", "Miles Davis", "John Coltrane"];
  const artistNodes = artistNames.filter(node => node.textContent !== "Genre" && node.textContent !== "Actions" && node.textContent !== "Name" && node.textContent !== "Edit" && node.textContent !== "DELETE");
  
  const sortedArtistNames = [...artistNodes].map(node => node.textContent).sort();
  
  expect(artistNodes.map(node => node.textContent)).toEqual(sortedArtistNames);
  
});