import { isValidated } from "../../src/utils/functions";

describe('isValidated', () => {
    // Valid params that should pass all validation checks
    const validParams = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890'
    };
  
    it('should return true for valid input', () => {
      expect(isValidated(validParams)).toBe(true);
    });
  
    it('should return false if any field is missing', () => {
      expect(isValidated({ ...validParams, firstName: '' })).toBe(false);
      expect(isValidated({ ...validParams, lastName: '' })).toBe(false);
      expect(isValidated({ ...validParams, email: '' })).toBe(false);
      expect(isValidated({ ...validParams, phone: '' })).toBe(false);
    });
  
    it('should return false if the first or last name is too short', () => {
      expect(isValidated({ ...validParams, firstName: 'Jo' })).toBe(false);
      expect(isValidated({ ...validParams, lastName: 'Do' })).toBe(false);
    });
  
    it('should return false if names contain invalid characters', () => {
      expect(isValidated({ ...validParams, firstName: 'John3' })).toBe(false);
      expect(isValidated({ ...validParams, lastName: 'Doe-' })).toBe(false);
    });
  
    it('should return false for invalid email addresses', () => {
      expect(isValidated({ ...validParams, email: 'john.doe@' })).toBe(false);
      expect(isValidated({ ...validParams, email: 'john.doe' })).toBe(false);
      expect(isValidated({ ...validParams, email: '@example.com' })).toBe(false);
    });
  
    it('should return false for invalid phone numbers', () => {
      expect(isValidated({ ...validParams, phone: '123-456-789' })).toBe(false); // Less than 10 digits
      expect(isValidated({ ...validParams, phone: '123-456-78901' })).toBe(true); // Exact 10 digits after stripping
      expect(isValidated({ ...validParams, phone: '123-456-7890123' })).toBe(false); // More than 12 digits
    });
  });
  