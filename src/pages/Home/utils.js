export const msToTime = (s) => {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
};

const pad = (n, z) => {
  z = z || 2;
  return ('00' + n).slice(-z);
};

export const normalizeStatsData = (data = []) => {
  const defaultState = {
    exceedStops: [0, 0],
    exceedTime: [0, 0],
    collisions: [0, 0],
    failed: [0, 0],
  };

  return (
    data.reduce(
      (
        acc,
        {
          numberOfStops,
          maxNumberOfStops,
          runningTime,
          maxRunningTime,
          hasCollision,
          doesScenarioPass,
        },
      ) => {
        const { exceedStops, exceedTime, collisions, failed } = acc;
        numberOfStops <= maxNumberOfStops ? exceedStops[0]++ : exceedStops[1]++;
        runningTime <= maxRunningTime ? exceedTime[0]++ : exceedTime[1]++;
        !hasCollision ? collisions[0]++ : collisions[1]++;
        doesScenarioPass ? failed[0]++ : failed[1]++;
        return acc;
      },
      defaultState,
    ) || defaultState
  );
};
