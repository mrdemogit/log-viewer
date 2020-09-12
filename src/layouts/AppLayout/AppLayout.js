import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

const AppLayout = ({ children }) => {
  return (
    <Box px={[1, 1, 5, 10]} maxWidth={1200} mx="auto" my={[2, 4, 5, 10]}>
      {children}
    </Box>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
