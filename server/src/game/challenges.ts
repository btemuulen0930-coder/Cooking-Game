import { Flavor, Tag } from './ingredients';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  needs: Partial<Record<Flavor, number>>; // minimum total flavor points the meal must reach
  banned: Tag[]; // ingredients with these tags cannot be used
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'spicy-lunch',
    title: 'Spicy Lunch Rush',
    description: 'A customer wants a dish with a real kick.',
    needs: { spicy: 3 },
    banned: [],
  },
  {
    id: 'heart-friendly',
    title: 'Heart-Friendly Dinner',
    description: 'Guests with heart conditions are coming. No high-sodium ingredients, but it must still taste savory.',
    needs: { umami: 3 },
    banned: ['high-sodium'],
  },
  {
    id: 'sweet-sour',
    title: 'Sweet and Sour Surprise',
    description: 'Balance sweet and sour in one dish.',
    needs: { sweet: 3, sour: 3 },
    banned: [],
  },
  {
    id: 'low-sugar-fresh',
    title: 'Fresh and Low Sugar',
    description: 'A diabetic guest wants something fresh and tangy, with no high-sugar ingredients.',
    needs: { fresh: 2, sour: 2 },
    banned: ['high-sugar'],
  },
];
