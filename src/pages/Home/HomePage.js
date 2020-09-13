import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Heading,
  Icon,
} from '@chakra-ui/core';
import React, { useCallback, useState } from 'react';
import { DataTable, StatisticsPanel } from '@components';
import { format as formatDate } from 'date-fns';
import { useSimulations } from '@queries';
import { msToTime, prepareStatsData } from './utils';

const columnsDefinition = [
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
    // eslint-disable-next-line react/prop-types
    format: ({ doesScenarioPass }) =>
      doesScenarioPass ? (
        <Icon size={5} name="check" color="green.500" />
      ) : (
        <Icon size={5} name="small-close" color="red.500" />
      ),
  },
];

const getStatsPanelData = ({
  exceedStops = [],
  exceedTime = [],
  collisions = [],
  failed = [],
}) => [
  { label: 'Exceed stops', values: exceedStops },
  { label: 'Exceed running time', values: exceedTime },
  { label: 'Collisions', values: collisions },
  { label: 'Fail Rate', values: failed },
];

const HomePage = () => {
  const { isLoading, data, error } = useSimulations();
  const [statsData, setStatsData] = useState(getStatsPanelData({}));

  const handleChangeData = useCallback((data) => {
    const normalizedValues = prepareStatsData(data);
    setStatsData(getStatsPanelData(normalizedValues));
  }, []);

  return (
    <Box>
      <Heading mb={10}>Simulation Runs</Heading>
      <StatisticsPanel data={statsData} />
      <Box overflowX="auto">
        <Box minWidth="800px">
          <DataTable
            isLoading={isLoading}
            data={data}
            columns={columnsDefinition}
            rowKey="startTime"
            onChangeData={handleChangeData}
            customRowStyle={({ doesScenarioPass }) =>
              doesScenarioPass ? { bg: 'teal.50' } : {}
            }
          />
        </Box>
        {error && (
          <Box position="absolute" bottom={10}>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>
                There was an error processing your request.
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
