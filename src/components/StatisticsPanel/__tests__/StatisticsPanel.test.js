import React from 'react';
import { render } from '@testUtils';
import StatisticsPanel from '../StatisticsPanel';

describe('StatisticsPanel.js', () => {
  it('Render empty', async () => {
    const { getByText } = render(
      <StatisticsPanel data={[{ label: 'Test Label', values: [0, 0] }]} />,
    );

    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('No data')).toBeInTheDocument();
  });

  it('Render with data and empty', async () => {
    const { getByText } = render(
      <StatisticsPanel
        data={[
          { label: 'Test Label', values: [0, 0] },
          { label: 'Test Label With Data', values: [50, 50] },
        ]}
      />,
    );

    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('No data')).toBeInTheDocument();

    expect(getByText('Test Label With Data')).toBeInTheDocument();
    expect(getByText('50%')).toBeInTheDocument();
    expect(getByText('50 / 50')).toBeInTheDocument();
  });
});
