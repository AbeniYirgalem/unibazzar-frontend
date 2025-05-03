import React from 'react';
import ItemCard from './ItemCard';

const dummyItems = [
  {
    id: 1,
    title: 'Used Math Textbook',
    category: 'Books',
    description: 'Advanced Calculus, lightly used.',
    image: 'https://via.placeholder.com/150',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Laptop for Sale',
    category: 'Electronics',
    description: 'Core i5, 8GB RAM, 256GB SSD.',
    image: 'https://via.placeholder.com/150',
    status: 'pending'
  },
];

export default function ItemList() {
  return (
    <div className="grid gap-6">
      {dummyItems.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
