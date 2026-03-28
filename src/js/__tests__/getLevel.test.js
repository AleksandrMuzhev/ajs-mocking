import getLevel from '../getLevel';
import fetchData from '../http';

// Мокаем модуль http
jest.mock('../http');

describe('getLevel', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  test('should return level when response status is ok', () => {
    const mockResponse = {
      status: 'ok',
      level: 42
    };
    
    // Мокаем возвращаемое значение fetchData
    fetchData.mockReturnValue(mockResponse);
    
    const result = getLevel(1);
    
    expect(fetchData).toHaveBeenCalledWith('https://server/user/1');
    expect(result).toBe('Ваш текущий уровень: 42');
  });
  
  test('should return error message when response status is not ok', () => {
    const mockResponse = {
      status: 'error',
    };
    
    fetchData.mockReturnValue(mockResponse);
    
    const result = getLevel(2);
    
    expect(fetchData).toHaveBeenCalledWith('https://server/user/2');
    expect(result).toBe('Информация об уровне временно недоступна');
  });
  
  test('should handle response without level property', () => {
    const mockResponse = {
      status: 'ok',
    };
    
    fetchData.mockReturnValue(mockResponse);
    
    const result = getLevel(3);
    
    expect(result).toBe('Ваш текущий уровень: undefined');
  });
  
  test('should handle different userId', () => {
    const mockResponse = {
      status: 'ok',
      level: 100
    };
    
    fetchData.mockReturnValue(mockResponse);
    
    const result = getLevel(999);
    
    expect(fetchData).toHaveBeenCalledWith('https://server/user/999');
    expect(result).toBe('Ваш текущий уровень: 100');
  });
});