import React from 'react';
import {
  fireEvent,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react';
import { render } from '@testUtils';
import userEvent from '@testing-library/user-event';
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

    expect(getByTestId('skeleton-loader')).toBeInTheDocument();
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

  it('Change sorting in columns', async () => {
    const { getAllByText, getByText } = render(
      <DataTable
        rowKey="col1"
        data={[
          { col1: 'value1', col2: 'b' },
          { col1: 'test1', col2: 'c' },
          { col1: 'value3', col2: 'a' },
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

    const orderedRows = getAllByText(/extension/i);
    expect(orderedRows[0]).toHaveTextContent('bextension');
    expect(orderedRows[1]).toHaveTextContent('cextension');
    expect(orderedRows[2]).toHaveTextContent('aextension');

    act(() => {
      userEvent.click(getByText('Column1'));
    });

    const orderedRows2 = getAllByText(/extension/i);
    expect(orderedRows2[0]).toHaveTextContent('cextension');
    expect(orderedRows2[1]).toHaveTextContent('bextension');
    expect(orderedRows2[2]).toHaveTextContent('aextension');

    act(() => {
      userEvent.click(getByText('Column1'));
    });

    const orderedRows3 = getAllByText(/extension/i);
    expect(orderedRows3[0]).toHaveTextContent('aextension');
    expect(orderedRows3[1]).toHaveTextContent('bextension');
    expect(orderedRows3[2]).toHaveTextContent('cextension');

    act(() => {
      userEvent.click(getByText('Column1'));
    });

    const orderedRows4 = getAllByText(/extension/i);
    expect(orderedRows4[0]).toHaveTextContent('bextension');
    expect(orderedRows4[1]).toHaveTextContent('cextension');
    expect(orderedRows4[2]).toHaveTextContent('aextension');
  });

  it('Change pagination - click on numbers', async () => {
    const { getAllByText, getByText } = render(
      <DataTable
        rowKey="col1"
        rowsPerPage={2}
        data={[
          { col1: 'value1', col2: 'b' },
          { col1: 'test1', col2: 'c' },
          { col1: 'value3', col2: 'a' },
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

    const orderedRows = getAllByText(/extension/i);

    expect(orderedRows).toHaveLength(2);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();

    act(() => {
      userEvent.click(getByText('2'));
    });

    const orderedRows2 = getAllByText(/extension/i);
    expect(orderedRows2).toHaveLength(1);
  });

  it('Change pagination - click on arrow', async () => {
    const { getByTestId, getByText, getAllByText } = render(
      <DataTable
        rowKey="col1"
        rowsPerPage={2}
        data={[
          { col1: 'value1', col2: 'b' },
          { col1: 'test1', col2: 'c' },
          { col1: 'value3', col2: 'a' },
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

    const orderedRows = getAllByText(/extension/i);

    expect(orderedRows).toHaveLength(2);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();

    act(() => {
      userEvent.click(getByTestId('right-arrow'));
    });

    const orderedRows2 = getAllByText(/extension/i);
    expect(orderedRows2).toHaveLength(1);

    act(() => {
      userEvent.click(getByTestId('left-arrow'));
    });

    const orderedRows3 = getAllByText(/extension/i);

    expect(orderedRows3).toHaveLength(2);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });
});
