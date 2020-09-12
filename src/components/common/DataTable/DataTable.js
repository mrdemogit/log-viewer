import { Box, Flex, Text } from '@chakra-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterInput from './FilterInput';
import DataTableRow from './DataTableRow';

const filterStringPredicate = (filters) => (data) => {
  return Object.keys(filters).every((filterKey) => {
    const filterValue = filters[filterKey];
    return data[filterKey].toLowerCase().includes(filterValue.trim());
  });
};

const DataTable = ({ data, rowKey = 'id', columns = [], customRowStyle }) => {
  const [filters, setFilters] = useState({});

  const filteredData = data?.filter(filterStringPredicate(filters));

  return (
    <Box minWidth="800px">
      <Flex p={1}>
        {columns.map(({ label, key, filter, flex = 1 }) => (
          <Box px={1} key={label} flex={flex}>
            <Text
              fontSize="10px"
              textTransform="uppercase"
              fontWeight="bold"
              color="gray.800"
            >
              {label}
            </Text>
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
      {!filteredData?.length && (
        <Flex justifyContent="center" alignItems="center">
          <Text>Data not found</Text>
        </Flex>
      )}
      {filteredData?.map((row) => {
        return (
          <DataTableRow
            key={row.startTime}
            row={row}
            columns={columns}
            customRowStyle={customRowStyle}
            rowKey={rowKey}
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
};

export default DataTable;
