import dataSource from './mock';

export const fetchAllSimulations = async () =>
  Promise.resolve(dataSource.generate());
