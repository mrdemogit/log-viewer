import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@chakra-ui/core';
import { useDebouncedCallback } from 'use-debounce';

const FilterInput = ({ name, onChange }) => {
  const [debouncedCallback] = useDebouncedCallback((filterDebounce) => {
    onChange({ name, value: filterDebounce });
  }, 500);

  return (
    <Input
      data-testid={`filter_${name}`}
      name={name}
      size="sm"
      type="text"
      onChange={(e) => {
        const value = e.target.value;
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
