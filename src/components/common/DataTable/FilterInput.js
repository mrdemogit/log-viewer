import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@chakra-ui/core';
import { useDebouncedCallback } from 'use-debounce';

const FilterInput = ({ name, onChange }) => {
  const [debouncedCallback] = useDebouncedCallback((filterDebounce) => {
    onChange({ [name]: filterDebounce });
  }, 1000);

  return (
    <Input
      name={name}
      size="sm"
      onChange={(e) => {
        const value = e.target.value;
        console.log('FORE');
        debouncedCallback(value);
      }}
    />
  );
};

FilterInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default FilterInput;
