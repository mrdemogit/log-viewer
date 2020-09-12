import { Box, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ data, rowKey = 'id', columns = [], customRowStyle }) => {
  if (!data?.length) {
    return (
      <Flex>
        <Text>No data available</Text>
      </Flex>
    );
  }

  return (
    <Box minWidth="800px">
      <Flex p={1}>
        {columns.map(({ label, flex = 1 }) => (
          <Box px={1} key={label} flex={flex}>
            <Text
              fontSize="10px"
              textTransform="uppercase"
              fontWeight="bold"
              color="gray.800"
            >
              {label}
            </Text>
          </Box>
        ))}
      </Flex>
      {data.map((row) => {
        return (
          <Flex
            key={row[rowKey]}
            bg="white"
            p={1}
            my={1}
            borderRadius="md"
            fontSize="sm"
            color="gray.800"
            {...(customRowStyle ? customRowStyle(row) : {})}
          >
            {columns.map(({ key, format, flex = 1, customCellStyle }) => (
              <Box
                flex={flex}
                key={key}
                px={1}
                {...(customCellStyle ? customCellStyle(row) : {})}
              >
                {format ? format(row) : row[key]}
              </Box>
            ))}
          </Flex>
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
