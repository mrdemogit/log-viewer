import { renderHook, act } from '@testing-library/react-hooks';
import { fetchAllSimulations } from '@api';
import useSimulations from '../useSimulations';

jest.mock('@api', () => ({
  fetchAllSimulations: jest.fn(),
}));

describe('useSimulations', () => {
  it('should return flow [loading -> normalized data] - SCENARIO FAIL', async () => {
    fetchAllSimulations.mockImplementation(() => ({
      simulationRuns: [
        {
          startTime: 1599893871105,
          endTime: 1599893891105,
          scenarioId: 'scenario1',
          carBuild: 'build1',
          result: {
            numberOfStops: 30,
            hasCollision: true,
          },
        },
      ],
      scenarios: [
        {
          scenarioId: 'scenario1',
          maxNumberOfStops: 40,
          maxRunningTime: 10000,
        },
      ],
    }));

    const { result, waitForNextUpdate } = renderHook(() => useSimulations());

    expect(result.current).toMatchObject({ isLoading: true });

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.data).toMatchObject([
      {
        carBuild: 'build1',
        doesScenarioPass: false,
        hasCollision: true,
        maxNumberOfStops: 40,
        maxRunningTime: 10000,
        numberOfStops: 30,
        runningTime: 20000,
        scenarioId: 'scenario1',
        startTime: 1599893871105,
      },
    ]);
    expect(result.current.isLoading).toEqual(false);
  });

  it('should return flow [loading -> normalized data] - SCENARIO PASS', async () => {
    fetchAllSimulations.mockImplementation(() => ({
      simulationRuns: [
        {
          startTime: 1599893871105,
          endTime: 1599893891105,
          scenarioId: 'scenario1',
          carBuild: 'build1',
          result: {
            numberOfStops: 30,
            hasCollision: false,
          },
        },
      ],
      scenarios: [
        {
          scenarioId: 'scenario1',
          maxNumberOfStops: 40,
          maxRunningTime: 10000000,
        },
      ],
    }));

    const { result, waitForNextUpdate } = renderHook(() => useSimulations());

    expect(result.current).toMatchObject({ isLoading: true });

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.data).toMatchObject([
      {
        carBuild: 'build1',
        doesScenarioPass: true,
        hasCollision: false,
        maxNumberOfStops: 40,
        maxRunningTime: 10000000,
        numberOfStops: 30,
        runningTime: 20000,
        scenarioId: 'scenario1',
        startTime: 1599893871105,
      },
    ]);
    expect(result.current.isLoading).toEqual(false);
  });

  it('should return error', async () => {
    fetchAllSimulations.mockRejectedValue(new Error("API doesn't work"));

    const { result, waitForNextUpdate } = renderHook(() => useSimulations());

    expect(result.current).toMatchObject({ isLoading: true });

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.error).toMatchObject(new Error("API doesn't work"));
    expect(result.current.isLoading).toEqual(false);
  });
});
