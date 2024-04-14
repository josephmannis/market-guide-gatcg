import cardMap from '../data/group-card-map.json';
import FuzzySearch from 'fuzzy-search';

export type Rarity =
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Super Rare'
  | 'Ultra Rare'
  | 'Collector Super Rare'
  | 'Collector Ultra Rare'
  | 'Promo'
  | 'Collector Promo';

export type PriceRange = {
  highPrice?: number;
  midPrice?: number;
  lowPrice?: number;
  marketPrice?: number;
};

export type CardT = {
  groupId: string;
  normalPrices: PriceRange;
  foilPrices: PriceRange;
  name: string;
  rarity?: Rarity;
  slug: string;
  imageUrl: string;
};

export type BoxT = {
  groupId: string;
  normalPrices: PriceRange;
  name: string;
};

export type ProductT = CardT;

function isBox(name: string): boolean {
  return name.includes('Booster Box') || name === 'Supporter Pack 1 Box';
}

function isPack(name: string): boolean {
  return name.includes('Booster Pack') || name === 'Supporter Pack 1';
}

function isExcluded(name: string): boolean {
  return name.includes('Starter Deck') || name.includes('Starter Kit') || name.includes('Sealed Kit');
}

function isCard(name: string): boolean {
  return !isPack(name) && !isBox(name) && !isExcluded(name);
}

export function useProducts({ setId, filter }: { setId?: string; filter?: string }) {
  const allProducts = setId ? (cardMap as unknown as Record<string, ProductT[]>)[setId] ?? [] : [];
  const cards: CardT[] = allProducts.filter((p) => isCard(p.name));
  const boxes: BoxT[] = allProducts.filter((p) => isBox(p.name));
  const packs: BoxT[] = allProducts.filter((p) => isPack(p.name));

  const search = new FuzzySearch(cards, ['name']);
  let currentCards = cards.sort(
    (a, b) =>
      (b.normalPrices.marketPrice ?? b.normalPrices.midPrice ?? 0) -
      (a.normalPrices.marketPrice ?? a.normalPrices.midPrice ?? 0)
  );

  if (filter) {
    currentCards = search.search(filter);
  }

  return {
    totalCards: cards.length,
    cards: currentCards,
    box: boxes[0],
    pack: packs[0],
  };
}
