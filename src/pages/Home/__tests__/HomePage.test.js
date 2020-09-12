import React from 'react';
import HomePage from '../HomePage';
import { DataTable } from '@components';
import { render } from '@testing-library/react';

jest.mock('@components', () => ({
  DataTable: jest.fn(() => null),
}));

jest.mock('@queries', () => ({
  useSimulations: () => ({
    data: [{ scenarioId: '1', carBuild: '2' }],
    isLoading: false,
  }),
}));

jest.mock('@components');

describe('HomePage.js', () => {
  it('Renders heading', async () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('Simulation Runs')).toBeInTheDocument();
  });

  it('Renders datatable with right data', async () => {
    render(<HomePage />);

    expect(DataTable).toHaveBeenCalledWith(
      {
        isLoading: false,
        data: [{ scenarioId: '1', carBuild: '2' }],
        rowKey: 'startTime',
        columns: expect.any(Array),
        customRowStyle: expect.any(Function),
      },
      {},
    );
  });
});
