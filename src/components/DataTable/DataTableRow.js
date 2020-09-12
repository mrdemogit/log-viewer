import { Box, Flex, PseudoBox } from '@chakra-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const DataTableRow = ({ row, customRowStyle, columns }) => {
  return (
    <PseudoBox
      as={Flex}
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
    </PseudoBox>
  );
};

DataTableRow.propTypes = {
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
  row: PropTypes.shape({}),
};

export default DataTableRow;
