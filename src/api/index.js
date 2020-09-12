import dataSource from './mock';

export const fetchAllSimulations = async () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(dataSource.generate()), 2000),
  );
