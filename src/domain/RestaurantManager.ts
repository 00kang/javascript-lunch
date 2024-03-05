type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

interface Restaurant {
  category: Category;
  name: string;
  distance: 5 | 10 | 15 | 20 | 30;
  description?: string;
  link?: string;
}
