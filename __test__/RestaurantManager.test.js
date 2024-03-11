import RestaurantManager from '../src/domain/RestaurantManager';

describe('RestaurantManager 기능 테스트', () => {
  const RESTAURANT_A = {
    category: '분식',
    name: '맛있는 집',
    distance: 15,
  };
  const RESTAURANT_B = {
    category: '기타',
    name: '맛없는 집',
    distance: 10,
  };
  const RESTAURANT_C = {
    category: '분식',
    name: '우리할매 떡볶이',
    distance: 5,
  };
  const RESTAURANT_INFOS = [RESTAURANT_A, RESTAURANT_B, RESTAURANT_C];

  const manager = new RestaurantManager();
  beforeAll(() => {
    RESTAURANT_INFOS.forEach((info) => manager.add(info));
  });

  describe('add 기능 테스트', () => {
    test('카테고리, 이름, 거리 정보(설명, 링크)를 전달 받아 레스토랑 리스트에 저장한다.', () => {
      const RESULT = RESTAURANT_INFOS;

      expect(manager.restaurants).toEqual(RESULT);
    });
  });

  describe('filteredAndSortedByOptions 기능 테스트', () => {
    test.each([
      { category: '한식', option: 'name', result: [] },
      { category: '분식', option: 'distance', result: [RESTAURANT_C, RESTAURANT_A] },
      { category: '분식', option: 'name', result: [RESTAURANT_A, RESTAURANT_C] },
      { category: '전체', option: 'name', result: [RESTAURANT_B, RESTAURANT_A, RESTAURANT_C] },
    ])('카테고리와 옵션을 전달받아 정렬한 결과를 반환한다.', ({ category, option, result }) => {
      expect(manager.filteredAndSortedByOptions(category, option)).toEqual(result);
    });
  });
});
