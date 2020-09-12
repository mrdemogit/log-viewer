import { Box, Heading } from '@chakra-ui/core';
import React from 'react';
import { DataTable } from '@common';
import { format as formatDate } from 'date-fns';
import useSimulations from '../../queries/useSimulations';
import { msToTime } from './utils';

const columns = [
  {
    key: 'scenarioId',
    label: 'Scenario ID',
    flex: 2,
    filter: true,
  },
  { key: 'carBuild', label: 'Car Build', flex: 2, filter: true },
  {
    key: 'startTime',
    label: 'Start Time',
    format: ({ startTime }) => formatDate(startTime, 'dd-MM-yyyy HH:mm:ss.SSS'),
    flex: 2,
  },
  {
    key: 'runningTime',
    label: 'Running Time / Max Running Time',
    format: ({ runningTime, maxRunningTime }) =>
      `${msToTime(runningTime)} / ${msToTime(maxRunningTime)}`,
    flex: 2,
    customCellStyle: ({ runningTime, maxRunningTime }) =>
      runningTime > maxRunningTime ? { color: 'red.600' } : {},
  },
  {
    key: 'numberOfStops',
    label: 'Number of Stops / Max Number of Stops',
    format: ({ numberOfStops, maxNumberOfStops }) =>
      `${numberOfStops} / ${maxNumberOfStops}`,
    customCellStyle: ({ numberOfStops, maxNumberOfStops }) =>
      numberOfStops > maxNumberOfStops ? { color: 'red.600' } : {},
  },
  {
    key: 'hasCollision',
    label: 'Has Collision',
    format: ({ hasCollision }) => (hasCollision ? 'yes' : 'no'),
  },
  {
    key: 'doesScenarioPass',
    label: 'Does Scenario Pass',
    format: ({ doesScenarioPass }) => (doesScenarioPass ? 'yes' : 'no'),
  },
];

const HomePage = () => {
  const { isLoading, data } = useSimulations();

  return (
    <Box>
      <Heading mb={10}>Simulation Runs</Heading>
      <DataTable
        isLoading={isLoading}
        data={data}
        columns={columns}
        rowKey="startTime"
        customRowStyle={({ doesScenarioPass }) =>
          doesScenarioPass ? { bg: 'teal.50' } : {}
        }
      />
    </Box>
  );
};

export default HomePage;
