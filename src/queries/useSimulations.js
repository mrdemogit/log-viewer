import { useEffect, useState } from 'react';
import { fetchAllSimulations } from '@api';

const normalizeData = ({ simulationRuns, scenarios }) => {
  const scenariosById = scenarios.reduce(
    (acc, item) => ({ ...acc, [item.scenarioId]: item }),
    {},
  );

  return simulationRuns.map(
    ({ scenarioId, carBuild, startTime, endTime, result }) => {
      const { numberOfStops, hasCollision } = result;
      const { maxRunningTime, maxNumberOfStops } = scenariosById[scenarioId];
      const runningTime = endTime - startTime;

      return {
        scenarioId,
        carBuild,
        startTime,
        runningTime,
        maxRunningTime,
        numberOfStops,
        maxNumberOfStops,
        hasCollision,
        doesScenarioPass:
          numberOfStops <= maxNumberOfStops &&
          runningTime <= maxRunningTime &&
          !hasCollision,
      };
    },
  );
};

const useSimulations = () => {
  const [data, setData] = useState({ isLoading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllSimulations();
        const data = normalizeData(response);
        setData({ data, isLoading: false });
      } catch (e) {
        setData({ error: e, isLoading: false });
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useSimulations;
