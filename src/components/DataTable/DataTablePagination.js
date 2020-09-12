import React from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';

const { Flex, Icon, Box, Text } = require('@chakra-ui/core');

const DataTablePagination = ({ currentPage, pagesNo, onChangePage }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    userSelect="none"
    cursor="pointer"
  >
    {
      <Icon
        size={3}
        data-testid="left-arrow"
        name="arrow-left"
        color={currentPage === 1 && 'gray.400'}
        onClick={
          currentPage !== 1 ? () => onChangePage(currentPage - 1) : identity
        }
      />
    }
    {Array.from({ length: pagesNo }, (_, idx) => {
      const pageNo = idx + 1;
      return (
        <Box key={pageNo} p={2} onClick={() => onChangePage(pageNo)}>
          <Text
            color={currentPage === pageNo && 'cyan.600'}
            fontSize="lg"
            fontWeight={currentPage === pageNo ? 'bold' : 'medium'}
          >
            {pageNo}
          </Text>
        </Box>
      );
    })}
    {
      <Icon
        size={3}
        data-testid="right-arrow"
        name="arrow-right"
        color={currentPage === pagesNo && 'gray.400'}
        onClick={
          currentPage !== pagesNo
            ? () => onChangePage(currentPage + 1)
            : identity
        }
      />
    }
  </Flex>
);

DataTablePagination.propTypes = {
  currentPage: PropTypes.number,
  pagesNo: PropTypes.number,
  onChangePage: PropTypes.func,
};

export default DataTablePagination;
