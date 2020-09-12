import { Flex, Icon, Text } from '@chakra-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

export const sortDirections = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const DataTableLabel = ({ children, onClick, sortDirection }) => {
  const handleClick = () => {
    let newSortDirection;
    if (!sortDirection) {
      newSortDirection = sortDirections.ASC;
    } else if (sortDirection === sortDirections.ASC) {
      newSortDirection = sortDirections.DESC;
    } else {
      newSortDirection = null;
    }
    onClick && onClick(newSortDirection);
  };
  return (
    <Flex
      justifyContent="space-between"
      onClick={handleClick}
      cursor="pointer"
      userSelect="none"
    >
      <Text
        fontSize="10px"
        textTransform="uppercase"
        fontWeight="bold"
        color="gray.800"
      >
        {children}
      </Text>
      {sortDirection && (
        <Icon
          size={3}
          name={
            sortDirection === sortDirections.ASC
              ? 'triangle-up'
              : 'triangle-down'
          }
        ></Icon>
      )}
    </Flex>
  );
};

DataTableLabel.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  sortDirection: PropTypes.string,
};

export default DataTableLabel;
