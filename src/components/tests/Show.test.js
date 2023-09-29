import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const testShow = {
    name: "test show",
    summary: "test summary",
    season: [
        {
            id:0,
            name: "Season 1",
            episode: []
        },
        {
            id: 1,
            name: "Season 2",
            episode: []
        }
    ]
}

test('renders without errors', () => {
    render(<Show show={testShow} seclectedSeason={"none"} />)
 });

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} />);
    const loading = screen.queryByTestId('season-option');
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testShow} selectedSeason={"none"} />);
    const seasonOptions = screen.queryAllByTestId('season-option')
    expect(seasonOptions).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect}/>);
    const selectOptions = screen.getByLabelText(/Select ASeason/);
    userEvent.selectOptions(select, ['1']);

    expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={testShow} seclectedSeason={"none"} />);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();
    
    rerender(<Show show={testShow} selectedSeason={1} />);
});
