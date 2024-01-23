import { uniqueId } from '../../src/utils/uniqueId';

// Start by describing the group of tests
describe('Testing UniqueId function', () => {
  // Test case: check if it uses the provided prefix
  const preId = 'address-3';
  it('Increments the Id correctly', () => {
    const prefix = 'address-';
    const expectedId = 'address-4';
    expect(uniqueId(preId, prefix)).toEqual(expectedId);
  });

  // Test case: check if it increments the ID correctly
  it('increments the ID correctly', () => {
    const preId = 'id-5';
    const expectedId = 'id-6';
    expect(uniqueId(preId)).toBe(expectedId);
  });

  // Test case: check if it behaves correctly with non-numeric IDs
  it('behaves correctly with non-numeric IDs', () => {
    const preId = 'id-abc';
    const expectedId = 'id-1'
    expect(uniqueId(preId)).toBe(expectedId);
  });
});
