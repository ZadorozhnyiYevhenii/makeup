import { handleSwipe } from "./swipe";


describe('handleSwipe', () => {
  const mockNextSlide = jest.fn();
  const mockPrevSlide = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls nextSlide on left swipe', () => {
    handleSwipe('left', mockNextSlide, mockPrevSlide);
    expect(mockNextSlide).toHaveBeenCalledTimes(1);
    expect(mockPrevSlide).not.toHaveBeenCalled();
  });

  test('calls prevSlide on right swipe', () => {
    handleSwipe('right', mockNextSlide, mockPrevSlide);
    expect(mockPrevSlide).toHaveBeenCalledTimes(1);
    expect(mockNextSlide).not.toHaveBeenCalled();
  });

  test('does nothing on invalid direction', () => {
    const warnMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
  
    handleSwipe('invalid', mockNextSlide, mockPrevSlide);
  
    expect(mockNextSlide).not.toHaveBeenCalled();
    expect(mockPrevSlide).not.toHaveBeenCalled();
    expect(warnMock).toHaveBeenCalledTimes(1);
    expect(warnMock).toHaveBeenCalledWith('Invalid direction: invalid');
  
    warnMock.mockRestore();
  });
});
