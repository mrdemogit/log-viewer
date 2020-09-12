// Simulate API
const defaultConfig = {
  simulationsCount: 90,
  carBuildsCount: 20,
  scenariosCount: 150,
  maxNumberOfStops: 100,
  maxRunningMs: 1000 * 60 * 60,
  earliestDate: new Date(2019, 0, 1),
};

const dataGenerator = ({
  simulationsCount,
  carBuildsCount,
  scenariosCount,
  maxNumberOfStops,
  maxRunningMs,
  earliestDate,
} = defaultConfig) => {
  let data;
  return {
    generate: () => {
      if (data) {
        console.debug('Data retrieved from cache');
        return data;
      }

      if (process.env.NODE_ENV === 'development') {
        console.debug('Generating data sets...');
      }

      const carBuilds = generateCarBuilds({ count: carBuildsCount });
      const scenarios = generateScenarios({
        count: scenariosCount,
        maxNumberOfStops,
        maxRunningMs,
      });

      const simulationRuns = [];
      for (let i = 0; i < simulationsCount; i++) {
        simulationRuns.push(
          createSimulation({
            scenarios,
            carBuilds,
            maxNumberOfStops,
            earliestDate,
            maxRunningMs,
          }),
        );
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(dataGenerator());
        console.log(
          `Generated: ${simulationRuns.length} simulations; ${scenarios.length} scenarios`,
        );
      }

      data = { simulationRuns, scenarios };
      return data;
    },
  };
};

const generateCarBuilds = ({ count }) => {
  const carBuilds = [];
  for (let i = 0; i < count; i++) {
    carBuilds.push(`car_build_${i}`);
  }
  return carBuilds;
};

const generateScenarios = ({ count, maxNumberOfStops, maxRunningMs }) => {
  const scenarios = [];

  const TEN_MINUTES = 1000 * 60 * 10;
  for (let i = 0; i < count; i++) {
    scenarios.push({
      scenarioId: `scenario_${i}`,
      maxNumberOfStops: getRandomNumber(0, maxNumberOfStops),
      maxRunningTime: getRandomNumber(TEN_MINUTES, maxRunningMs),
    });
  }
  return scenarios;
};

const createSimulation = ({
  scenarios,
  carBuilds,
  maxNumberOfStops,
  earliestDate,
  maxRunningMs,
}) => {
  const { startTime, endTime } = getRandomStartEndTimestamp({
    earliestDate,
    maxRunningMs,
  });

  return {
    startTime,
    endTime,
    scenarioId: scenarios[getRandomNumber(0, scenarios.length - 1)].scenarioId,
    carBuild: carBuilds[getRandomNumber(0, carBuilds.length - 1)],
    result: {
      numberOfStops: getRandomNumber(0, maxNumberOfStops),
      hasCollision: getRandomNumber(0, 1) === 0,
    },
  };
};

const getRandomStartEndTimestamp = ({ earliestDate, maxRunningMs }) => {
  const startTime = getRandomDate(earliestDate, new Date()).getTime();
  const endTime = getRandomNumber(startTime, startTime + maxRunningMs * 2);
  return { startTime, endTime };
};

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

export default dataGenerator();
