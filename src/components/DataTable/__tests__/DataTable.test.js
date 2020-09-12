import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import DataTable from '../DataTable';

describe('DataTable.js', () => {
  it('Render empty', async () => {
    const { getByText } = render(
      <DataTable data={[]} columns={[]} isLoading={false} />,
    );

    expect(getByText('Data not found')).toBeInTheDocument();
  });

  it('Render loading', async () => {
    const { getByTestId } = render(<DataTable isLoading={true} />);

    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('Renders datatable with right data', async () => {
    const { getByText } = render(
      <DataTable
        rowKey="col1"
        data={[{ col1: 'col1Value', col2: 'col2Value' }]}
        columns={[
          { label: 'Column1', key: 'col1' },
          {
            label: 'Column2',
            key: 'col2',
            format: ({ col2 }) => col2 + 'extension',
          },
        ]}
      />,
    );

    expect(getByText('Column1')).toBeInTheDocument();
    expect(getByText('Column2')).toBeInTheDocument();
    expect(getByText('col1Value')).toBeInTheDocument();
    expect(getByText('col2Valueextension')).toBeInTheDocument();
  });

  it('Change filter value', async () => {
    const { getByTestId, getByText, queryAllByText } = render(
      <DataTable
        rowKey="col1"
        data={[
          { col1: 'value1', col2: 'value2' },
          { col1: 'test1', col2: 'test2' },
          { col1: 'value3', col2: 'value4' },
        ]}
        columns={[
          { label: 'Column1', key: 'col1', filter: true },
          {
            label: 'Column2',
            key: 'col2',
            format: ({ col2 }) => col2 + 'extension',
          },
        ]}
      />,
    );

    expect(getByText('value1')).toBeInTheDocument();
    expect(getByText('value3')).toBeInTheDocument();

    await fireEvent.change(getByTestId('filter_col1'), {
      target: { value: 'test' },
    });

    expect(getByText('Column1')).toBeInTheDocument();
    expect(getByText('Column2')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryAllByText(/value/i));
  });
});
