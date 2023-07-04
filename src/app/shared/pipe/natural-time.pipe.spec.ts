import { NaturalTimePipe } from './natural-time.pipe';

describe('NaturalTimePipe', () => {
  it('create an instance', () => {
    const pipe = new NaturalTimePipe();
    expect(pipe).toBeTruthy();
  });
});
