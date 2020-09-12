import React from 'react';
import HomePage from '../HomePage';
import { DataTable, StatisticsPanel } from '@components';
import { render } from '@testUtils';

jest.mock('@components', () => ({
  DataTable: jest.fn(() => null),
  StatisticsPanel: jest.fn(() => null),
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
        onChangeData: expect.any(Function),
      },
      {},
    );

    expect(StatisticsPanel).toHaveBeenCalledWith(
      {
        data: [
          { label: 'Exceed stops', values: [] },
          { label: 'Exceed running time', values: [] },
          { label: 'Collisions', values: [] },
          { label: 'Fail Rate', values: [] },
        ],
      },
      {},
    );
  });
});
