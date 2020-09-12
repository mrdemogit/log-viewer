import React from 'react';
import {
  fireEvent,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react';
import { render } from '@testUtils';
import DataTablePagination from '../DataTablePagination';

describe('DataTablePagination.js', () => {
  it('Render up to 10 pages', async () => {
    const { getByText } = render(
      <DataTablePagination currentPage={1} pagesNo={5} />,
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });

  it('Render current 1 with more than 10 pages', async () => {
    const { getByText } = render(
      <DataTablePagination currentPage={1} pagesNo={20} />,
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('6')).toBeInTheDocument();
    expect(getByText('...')).toBeInTheDocument();
    expect(getByText('20')).toBeInTheDocument();
  });

  it('Render current 18 with more than 10 pages', async () => {
    const { getByText, getAllByText } = render(
      <DataTablePagination currentPage={18} pagesNo={20} />,
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('...')).toBeInTheDocument();
    expect(getByText('15')).toBeInTheDocument();
    expect(getByText('16')).toBeInTheDocument();
    expect(getByText('17')).toBeInTheDocument();
    expect(getByText('18')).toBeInTheDocument();
    expect(getByText('19')).toBeInTheDocument();
    expect(getByText('20')).toBeInTheDocument();
  });

  it('Render current 10 with more than 10 pages', async () => {
    const { getByText, getAllByText } = render(
      <DataTablePagination currentPage={10} pagesNo={20} />,
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('8')).toBeInTheDocument();
    expect(getByText('9')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('11')).toBeInTheDocument();
    expect(getByText('12')).toBeInTheDocument();
    expect(getByText('20')).toBeInTheDocument();
    expect(getAllByText('...')).toHaveLength(2);
  });
});
