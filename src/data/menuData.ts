import { MenuItem, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'starters',
    name: 'Starters',
    description: 'Start your meal with something light and delicious.'
  },
  {
    id: 'main-courses',
    name: 'Main Courses',
    description: 'Our chef\'s specialties to satisfy your hunger.'
  },
  {
    id: 'sides',
    name: 'Sides',
    description: 'Perfect accompaniments to your main dish.'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats to finish your meal.'
  },
  {
    id: 'drinks',
    name: 'Drinks',
    description: 'Refreshing beverages to quench your thirst.'
  }
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Crispy Calamari',
    description: 'Tender calamari rings lightly battered and fried, served with marinara sauce.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/6896379/pexels-photo-6896379.jpeg',
    category: 'starters',
    tags: ['seafood', 'fried', 'appetizer'],
    available: true
  },
  {
    id: '2',
    name: 'Spinach Artichoke Dip',
    description: 'Creamy blend of spinach, artichokes, and cheeses, served with tortilla chips.',
    price: 10.99,
    image: 'https://images.pexels.com/photos/5639411/pexels-photo-5639411.jpeg',
    category: 'starters',
    tags: ['vegetarian', 'cheese', 'appetizer'],
    available: true
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon fillet, grilled to perfection with lemon herb butter.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg',
    category: 'main-courses',
    tags: ['seafood', 'grilled', 'healthy'],
    available: true
  },
  {
    id: '4',
    name: 'Filet Mignon',
    description: '8oz center-cut beef tenderloin, seasoned and grilled to your liking.',
    price: 32.99,
    image: 'https://images.pexels.com/photos/8696567/pexels-photo-8696567.jpeg',
    category: 'main-courses',
    tags: ['beef', 'grilled', 'premium'],
    available: true
  },
  {
    id: '5',
    name: 'Vegetable Pasta Primavera',
    description: 'Fettuccine pasta tossed with seasonal vegetables in a light cream sauce.',
    price: 18.99,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    category: 'main-courses',
    tags: ['vegetarian', 'pasta', 'creamy'],
    available: true
  },
  {
    id: '6',
    name: 'Garlic Mashed Potatoes',
    description: 'Creamy potatoes whipped with roasted garlic and butter.',
    price: 5.99,
    image: 'https://images.pexels.com/photos/5718026/pexels-photo-5718026.jpeg',
    category: 'sides',
    tags: ['vegetarian', 'creamy'],
    available: true
  },
  {
    id: '7',
    name: 'Steamed Broccoli',
    description: 'Fresh broccoli florets steamed and seasoned with salt and pepper.',
    price: 4.99,
    image: 'https://images.pexels.com/photos/7020330/pexels-photo-7020330.jpeg',
    category: 'sides',
    tags: ['vegetarian', 'vegan', 'healthy'],
    available: true
  },
  {
    id: '8',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg',
    category: 'desserts',
    tags: ['chocolate', 'hot', 'ice cream'],
    available: true
  },
  {
    id: '9',
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake with a graham cracker crust and berry compote.',
    price: 7.99,
    image: 'https://images.pexels.com/photos/14705134/pexels-photo-14705134.jpeg',
    category: 'desserts',
    tags: ['cheesecake', 'berries'],
    available: true
  },
  {
    id: '10',
    name: 'Craft IPA',
    description: 'Local brewery\'s hoppy IPA with citrus notes (16oz).',
    price: 6.99,
    image: 'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg',
    category: 'drinks',
    tags: ['alcoholic', 'beer'],
    available: true
  },
  {
    id: '11',
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade with a hint of mint.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg',
    category: 'drinks',
    tags: ['non-alcoholic', 'refreshing'],
    available: true
  },
  {
    id: '12',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin crust.',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
    category: 'main-courses',
    tags: ['vegetarian', 'pizza', 'italian'],
    available: true
  }
];

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const getMenuItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categoryId && item.available);
};

export const getAllCategories = (): Category[] => {
  return categories;
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};