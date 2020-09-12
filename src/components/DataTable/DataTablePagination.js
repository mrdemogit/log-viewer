import React from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';

const { Flex, Icon, Box, Text } = require('@chakra-ui/core');

const generatePaginationElements = (currentPage, pagesNo) => {
  if (currentPage - 5 < 0) {
    return [
      ...Array.from({ length: 6 > pagesNo ? pagesNo : 6 }, (_, i) => i + 1),
      '...',
      pagesNo,
    ];
  }
  if (currentPage + 4 > pagesNo) {
    const start = pagesNo - 5;
    return [
      1,
      '...',
      ...Array.from({ length: 6 > pagesNo ? pagesNo : 6 }, (_, i) => i + start),
    ];
  }
  return [
    1,
    '...',
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    '...',
    pagesNo,
  ];
};

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
    {generatePaginationElements(currentPage, pagesNo).map((pageNo, idx) => {
      return (
        <Box
          key={pageNo + idx}
          p={2}
          onClick={pageNo !== '...' ? () => onChangePage(pageNo) : identity}
        >
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
