import { CardT, Rarity } from './use-products.tsx';
import { formatUsd } from '../utils/currency.ts';

type AveragePrice = {
  C: string;
  UC: string;
  R: string;

  PR: string;
  SR: string;
  UR: string;

  CSR: string;
  CUR: string;
  CPR: string;
};

export function useAveragePrices(cards: CardT[]): AveragePrice {
  function getPrice(card: CardT): number {
    let priceSet = card.normalPrices;
    if (card.rarity?.includes('Collector')) {
      priceSet = card.foilPrices;
    }
    return priceSet.midPrice ?? priceSet.marketPrice ?? 0;
  }

  function getAveragePrice(rarity: Rarity): string {
    const cardsAtRarity = cards.filter((c) => c.rarity === rarity);
    if (cardsAtRarity.length === 0) {
      return '--';
    }

    return formatUsd(cardsAtRarity.reduce((acc, curr) => getPrice(curr) + acc, 0) / cardsAtRarity.length);
  }

  return {
    C: getAveragePrice('Common'),
    UC: getAveragePrice('Uncommon'),
    R: getAveragePrice('Rare'),

    PR: getAveragePrice('Promo'),
    SR: getAveragePrice('Super Rare'),
    UR: getAveragePrice('Ultra Rare'),

    CSR: getAveragePrice('Collector Super Rare'),
    CUR: getAveragePrice('Collector Ultra Rare'),
    CPR: getAveragePrice('Collector Promo'),
  };
}
