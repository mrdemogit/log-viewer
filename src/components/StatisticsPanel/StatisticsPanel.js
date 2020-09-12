import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/core';

const StatisticsPanel = ({ data }) => {
  return (
    <Flex>
      {data?.map(({ label, values }, idx) => {
        const [pass, fail] = values;
        const total = pass + fail;
        const percentage = (fail / total) * 100;
        return (
          <Box
            flex={1}
            key={label}
            height="120px"
            bg="white"
            mr={idx !== data.length && 2}
            ml={idx !== 0 && 2}
            mb={10}
            borderRadius="md"
            p={2}
          >
            <Text fontSize="xs" color="gray.500">
              {label}
            </Text>
            <Flex
              mt={3}
              ml={2}
              justifyContent="space-around"
              alignItems="center"
            >
              {pass || fail ? (
                <>
                  <CircularProgress color="red" value={percentage} size={60}>
                    <CircularProgressLabel>
                      {Math.round(percentage)}%
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Box>
                    <Text>{`${pass} / ${fail}`}</Text>
                  </Box>
                </>
              ) : (
                <Box color="gray.400" mt={4}>
                  No data
                </Box>
              )}
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};

StatisticsPanel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default StatisticsPanel;
