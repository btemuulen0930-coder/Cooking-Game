export type Flavor = 'salty' | 'spicy' | 'sour' | 'sweet' | 'umami' | 'fresh';

// Health tags used by challenges (e.g. a heart-friendly meal bans 'high-sodium')
export type Tag = 'high-sodium' | 'high-sugar' | 'hot';

export interface Ingredient {
  id: string;
  name: string;
  cost: number; // coins to unlock
  flavors: Partial<Record<Flavor, number>>; // the "effects" of the upgrade
  tags: Tag[];
  substitutes: string[]; // ingredient ids that can stand in for this one
  tip: string; // shown to the player as a small cooking lesson
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'salt', name: 'Salt', cost: 20,
    flavors: { salty: 3 }, tags: ['high-sodium'], substitutes: ['lemon', 'herbs'],
    tip: 'Salt boosts every other flavor, but too much sodium is hard on the heart.',
  },
  {
    id: 'pepper', name: 'Black Pepper', cost: 20,
    flavors: { spicy: 1 }, tags: [], substitutes: ['chili'],
    tip: 'Pepper adds a gentle bite without adding sodium.',
  },
  {
    id: 'lemon', name: 'Lemon Juice', cost: 30,
    flavors: { sour: 2, fresh: 1 }, tags: [], substitutes: ['vinegar'],
    tip: 'Acid brightens a dish the way salt does, a classic low-sodium trick.',
  },
  {
    id: 'herbs', name: 'Fresh Herbs', cost: 30,
    flavors: { fresh: 2 }, tags: [], substitutes: [],
    tip: 'Herbs make food taste more vibrant so you need less salt.',
  },
  {
    id: 'garlic', name: 'Garlic', cost: 40,
    flavors: { umami: 2 }, tags: [], substitutes: ['mushroom'],
    tip: 'Garlic builds savory depth with no added sodium.',
  },
  {
    id: 'mushroom', name: 'Mushrooms', cost: 50,
    flavors: { umami: 3 }, tags: [], substitutes: ['garlic'],
    tip: 'Mushrooms are packed with umami, great for replacing salty, savory flavors.',
  },
  {
    id: 'soy-sauce', name: 'Soy Sauce', cost: 40,
    flavors: { salty: 2, umami: 2 }, tags: ['high-sodium'], substitutes: ['mushroom', 'garlic'],
    tip: 'Soy sauce is very high in sodium, so it is a tricky ingredient for some diets.',
  },
  {
    id: 'chili', name: 'Chili', cost: 40,
    flavors: { spicy: 3 }, tags: ['hot'], substitutes: ['pepper'],
    tip: 'Chili adds heat, but some people cannot handle spicy food.',
  },
  {
    id: 'honey', name: 'Honey', cost: 40,
    flavors: { sweet: 3 }, tags: ['high-sugar'], substitutes: ['lemon'],
    tip: 'Honey is natural, but it is still sugar, which matters for some diets.',
  },
  {
    id: 'vinegar', name: 'Vinegar', cost: 30,
    flavors: { sour: 3 }, tags: [], substitutes: ['lemon'],
    tip: 'Vinegar adds a sharp tang, a good stand-in for lemon.',
  },
];
