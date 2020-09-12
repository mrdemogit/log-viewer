import { Box, Flex, Spinner, Text } from '@chakra-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterInput from './FilterInput';
import DataTableRow from './DataTableRow';
import DataTableLabel, { sortDirections } from './DataTableLabel';
import { sort, identity, descend, ascend, prop } from 'ramda';

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
}) => {
  const [filters, setFilters] = useState({});
  const [sortDirection, setSortDirection] = useState(null);

  const filteredData = data?.filter(filterStringPredicate(filters));
  const sortedData = sortDirection
    ? sortByPropCaseInsensitive(
        sortDirection.key,
        sortDirection.value,
      )(filteredData)
    : filteredData;

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
              {...(isLoading
                ? {}
                : {
                    onClick: (value) =>
                      setSortDirection(value ? { key, value } : null),
                  })}
            >
              {label}
            </DataTableLabel>
            {filter && (
              <FilterInput
                onChange={(filter) =>
                  setFilters((prev) => ({ ...prev, ...filter }))
                }
                name={key}
              />
            )}
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
      {sortedData?.map((row) => {
        return (
          <DataTableRow
            key={row[rowKey]}
            row={row}
            columns={columns}
            customRowStyle={customRowStyle}
          />
        );
      })}
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
};

export default DataTable;
