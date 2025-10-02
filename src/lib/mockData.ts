export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    cuisine: 'Italian',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    image: '/src/assets/restaurant-italian.jpg',
    featured: true,
  },
  {
    id: '2',
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '30-40 min',
    deliveryFee: 3.99,
    image: '/src/assets/restaurant-sushi.jpg',
    featured: true,
  },
  {
    id: '3',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    image: '/src/assets/restaurant-mexican.jpg',
    featured: true,
  },
  {
    id: '4',
    name: 'Burger Palace',
    cuisine: 'American',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: 2.49,
    image: '/src/assets/food-burger.jpg',
  },
  {
    id: '5',
    name: 'Green Bowl',
    cuisine: 'Healthy',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    image: '/src/assets/restaurant-italian.jpg',
  },
  {
    id: '6',
    name: 'Spice Garden',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: 3.49,
    image: '/src/assets/restaurant-sushi.jpg',
  },
];

export const menuItems: MenuItem[] = [
  // Bella Italia
  {
    id: 'm1',
    restaurantId: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomato sauce, mozzarella, and basil',
    price: 12.99,
    image: '/src/assets/food-pizza.jpg',
    category: 'Pizza',
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: 'Carbonara Pasta',
    description: 'Creamy pasta with bacon and parmesan',
    price: 14.99,
    image: '/src/assets/food-pizza.jpg',
    category: 'Pasta',
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 6.99,
    image: '/src/assets/food-pizza.jpg',
    category: 'Dessert',
  },
  // Sushi Master
  {
    id: 'm4',
    restaurantId: '2',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber',
    price: 8.99,
    image: '/src/assets/restaurant-sushi.jpg',
    category: 'Rolls',
  },
  {
    id: 'm5',
    restaurantId: '2',
    name: 'Salmon Nigiri',
    description: 'Fresh salmon over seasoned rice',
    price: 10.99,
    image: '/src/assets/restaurant-sushi.jpg',
    category: 'Nigiri',
  },
  {
    id: 'm6',
    restaurantId: '2',
    name: 'Miso Soup',
    description: 'Traditional Japanese soup with tofu',
    price: 3.99,
    image: '/src/assets/restaurant-sushi.jpg',
    category: 'Soup',
  },
  // Taco Fiesta
  {
    id: 'm7',
    restaurantId: '3',
    name: 'Beef Tacos',
    description: 'Three tacos with seasoned beef, lettuce, and cheese',
    price: 9.99,
    image: '/src/assets/restaurant-mexican.jpg',
    category: 'Tacos',
  },
  {
    id: 'm8',
    restaurantId: '3',
    name: 'Chicken Burrito',
    description: 'Large burrito with grilled chicken and beans',
    price: 11.99,
    image: '/src/assets/restaurant-mexican.jpg',
    category: 'Burritos',
  },
  {
    id: 'm9',
    restaurantId: '3',
    name: 'Guacamole & Chips',
    description: 'Fresh guacamole with crispy tortilla chips',
    price: 5.99,
    image: '/src/assets/restaurant-mexican.jpg',
    category: 'Appetizers',
  },
  // Burger Palace
  {
    id: 'm10',
    restaurantId: '4',
    name: 'Classic Burger',
    description: 'Beef patty, lettuce, tomato, onion, and special sauce',
    price: 10.99,
    image: '/src/assets/food-burger.jpg',
    category: 'Burgers',
  },
  {
    id: 'm11',
    restaurantId: '4',
    name: 'Cheese Fries',
    description: 'Crispy fries topped with melted cheese',
    price: 5.99,
    image: '/src/assets/food-burger.jpg',
    category: 'Sides',
  },
];

export const cuisines = [
  'Italian',
  'Japanese',
  'Mexican',
  'American',
  'Indian',
  'Chinese',
  'Thai',
  'Healthy',
];
