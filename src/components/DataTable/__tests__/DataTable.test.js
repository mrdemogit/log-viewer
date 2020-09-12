import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from '../DataTable';
import { theme, ThemeProvider } from '@chakra-ui/core';

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

  it('Change sorting in columns', async () => {
    const { getAllByText, getByText } = render(
      <ThemeProvider theme={theme}>
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
        />
      </ThemeProvider>,
    );

    const orderedCells = getAllByText(/extension/i);
    expect(orderedCells[0]).toHaveTextContent('bextension');
    expect(orderedCells[1]).toHaveTextContent('cextension');
    expect(orderedCells[2]).toHaveTextContent('aextension');

    act(() => {
      userEvent.click(getByText('Column1'));
    });

    const orderedCells2 = getAllByText(/extension/i);
    expect(orderedCells2[0]).toHaveTextContent('cextension');
    expect(orderedCells2[1]).toHaveTextContent('bextension');
    expect(orderedCells2[2]).toHaveTextContent('aextension');

    act(() => {
      userEvent.click(getByText('Column1'));
    });

    const orderedCells3 = getAllByText(/extension/i);
    expect(orderedCells3[0]).toHaveTextContent('aextension');
    expect(orderedCells3[1]).toHaveTextContent('bextension');
    expect(orderedCells3[2]).toHaveTextContent('cextension');

    act(() => {
      userEvent.click(getByText('Column1'));
    });

    const orderedCells4 = getAllByText(/extension/i);
    expect(orderedCells4[0]).toHaveTextContent('bextension');
    expect(orderedCells4[1]).toHaveTextContent('cextension');
    expect(orderedCells4[2]).toHaveTextContent('aextension');
  });
});
