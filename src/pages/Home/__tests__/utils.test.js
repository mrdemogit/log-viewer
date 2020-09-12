import { msToTime } from '../utils';

describe('utils.test.js', () => {
  it('Check conversion milliseconds to HH:mm:ss.TTT format', () => {
    const justMillis = msToTime(993);
    const fullTime = msToTime(91341341);

    expect(justMillis).toBe('00:00:00.993');
    expect(fullTime).toBe('25:22:21.341');
  });
});
