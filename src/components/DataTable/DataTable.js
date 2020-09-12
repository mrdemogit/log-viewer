import React, { useEffect, useMemo, useState } from 'react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import FilterInput from './FilterInput';
import DataTableRow from './DataTableRow';
import DataTableLabel, { sortDirections } from './DataTableLabel';
import { isEmpty, sort, identity, descend, ascend, prop } from 'ramda';
import DataTablePagination from './DataTablePagination';
import { omit } from 'ramda';

const filterStringPredicate = (filters) => (data) => {
  return Object.keys(filters).every((filterKey) => {
    const filterValue = filters[filterKey];
    return data[filterKey].toLowerCase().includes(filterValue.trim());
  });
};

const sortByPropCaseInsensitive = (key, direction) => {
  if (direction === sortDirections.DESC) {
    return sort(descend(prop(key)));
  }
  if (direction === sortDirections.ASC) {
    return sort(ascend(prop(key)));
  }
  return identity;
};

const DataTable = ({
  data,
  isLoading,
  rowKey = 'id',
  columns = [],
  customRowStyle,
  rowsPerPage: defaultRowsPerPage = 20,
  onChangeData = identity,
  onChangePage = identity,
  onChangeFilter = identity,
  onChangeSorting = identity,
}) => {
  const [filters, setFilters] = useState({});
  const [sortDirection, setSortDirection] = useState(null);

  const [{ rowsPerPage, currentPage }, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: defaultRowsPerPage,
  });

  const handleCurrentPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    onChangePage(page);
  };

  const handleFilter = ({ name, value }) => {
    handleCurrentPage(1);
    const newFilters = !value
      ? omit([name], filters)
      : { ...filters, [name]: value };
    setFilters(newFilters);
    onChangeFilter(newFilters);
  };

  const handleSorting = ({ value, key }) => {
    handleCurrentPage(1);
    setSortDirection(value ? { key, value } : null);
    onChangeSorting({ value, key });
  };

  const filteredData = useMemo(
    () => data?.filter(filterStringPredicate(filters)),
    [data, filters],
  );

  useEffect(() => {
    if (!isEmpty(filters)) {
      onChangeData(filteredData);
    } else {
      onChangeData([]);
    }
  }, [onChangeData, filteredData, filters]);

  const sortedData = useMemo(
    () =>
      sortDirection
        ? sortByPropCaseInsensitive(
            sortDirection.key,
            sortDirection.value,
          )(filteredData)
        : filteredData,
    [filteredData, sortDirection],
  );

  const lastRow = currentPage * rowsPerPage;
  const paginatedData = useMemo(
    () => sortedData?.slice(lastRow - rowsPerPage, lastRow),
    [lastRow, rowsPerPage, sortedData],
  );

  const totalRecords = sortedData?.length;
  const pagesNo = Math.ceil(totalRecords / rowsPerPage);

  const isEmptyTable = !isLoading && !filteredData?.length;

  return (
    <Box minWidth="800px">
      <Flex p={1}>
        {columns.map(({ label, key, filter, flex = 1 }) => (
          <Box px={1} key={label} flex={flex}>
            <DataTableLabel
              sortDirection={
                sortDirection?.key === key ? sortDirection.value : null
              }
              onClick={
                isLoading ? identity : (value) => handleSorting({ value, key })
              }
            >
              {label}
            </DataTableLabel>
            {filter && <FilterInput onChange={handleFilter} name={key} />}
          </Box>
        ))}
      </Flex>

      {isLoading && (
        <Flex justifyContent="center" alignItems="center">
          <Spinner data-testid="spinner" size="xl" />
        </Flex>
      )}
      {isEmptyTable && (
        <Flex justifyContent="center" alignItems="center">
          <Text>Data not found</Text>
        </Flex>
      )}
      {paginatedData?.map((row) => {
        return (
          <DataTableRow
            key={row[rowKey]}
            row={row}
            columns={columns}
            customRowStyle={customRowStyle}
          />
        );
      })}

      {!isLoading && (
        <DataTablePagination
          currentPage={currentPage}
          pagesNo={pagesNo}
          onChangePage={handleCurrentPage}
        />
      )}
    </Box>
  );
};

DataTable.propTypes = {
  rowKey: PropTypes.string,
  customRowStyle: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      format: PropTypes.func,
      flex: PropTypes.number,
      customCellStyle: PropTypes.func,
    }),
  ),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeFilter: PropTypes.func,
  onChangeSorting: PropTypes.func,
  onChangeData: PropTypes.func,
};

export default DataTable;
