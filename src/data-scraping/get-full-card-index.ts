import { ProductGroup } from '../hooks/use-product-groups.tsx';
import { writeFileSync } from 'node:fs';
import { PriceRange, ProductT, Rarity } from '../hooks/use-products.tsx';
import { format } from 'date-fns/format';

const grandArchiveCategoryId = 74;

const groupUrl = `https://tcgcsv.com/${grandArchiveCategoryId}/groups`;
const productPricesUrl = (groupId: string) => `https://tcgcsv.com/${grandArchiveCategoryId}/${groupId}/prices`;
const productInfoUrl = (groupId: string) => `https://tcgcsv.com/${grandArchiveCategoryId}/${groupId}/products`;

export type GroupApiData = {
  totalItems: number;
  success: boolean;
  errors: string[];
  results: {
    groupId: number; // "Set ID"
    name: string; // ex. Mercurial Heart
    abbreviation: string; // ex. MRC
    publishedOn: string; // DateTime
    modifiedOn: string; // DateTime
    categoryId: number; // Gonna be 74.
  }[];
};

// In this context, it's usually a card
export type ProductApiData = {
  totalItems: number;
  success: boolean;
  errors: string[];
  results: {
    productId: number;
    name: string; // 'Accepted Contract';
    cleanName: string; // 'Accepted Contract';
    imageUrl: string; // 'https://tcgplayer-cdn.tcgplayer.com/product/494129_200w.jpg';
    categoryId: number; // 74;
    groupId: number; // 23123;
    url: string; // 'https://www.tcgplayer.com/product/494129/grand-archive-dawn-of-ashes-1st-edition-accepted-contract';
    modifiedOn: string; // '2023-04-28T04:03:10.867';
    imageCount: string; // 1;
    presaleInfo: {
      isPresale: string; // false;
      releasedOn: string; // '2023-04-28T00:00:00';
      note: string | null; // null;
    };
    isMaterial: boolean;
    // Find stuff like Rarity in here
    extendedData: {
      name: string;
      displayName: string;
      value: string;
    }[];
  }[];
};

type ProductPriceApiData = {
  success: boolean;
  errors: string[];
  results: {
    productId: number; //494129;
    lowPrice: number; // 0.4;
    midPrice: number; // 0.48;
    highPrice: number; // 0.63;
    marketPrice: number; // 0.4;
    subTypeName: 'Normal' | 'Foil';
  }[];
};

async function getGroups(): Promise<GroupApiData> {
  return await (await fetch(groupUrl)).json();
}

async function getCardsForGroup(groupId: string): Promise<ProductT[]> {
  const products: ProductApiData = await (await fetch(productInfoUrl(groupId))).json();
  const prices: ProductPriceApiData = await (await fetch(productPricesUrl(groupId))).json();

  return products.results.map((result) => {
    const normalPrices: PriceRange =
      prices.results.find((p) => p.productId === result.productId && p.subTypeName === 'Normal') ?? {};
    const foilPrices: PriceRange =
      prices.results.find((p) => p.productId === result.productId && p.subTypeName === 'Foil') ?? {};

    return {
      groupId,
      normalPrices,
      foilPrices,
      rarity: result.extendedData.find((v) => v.name === 'Rarity')?.value as Rarity,
      name: result.cleanName,
      imageUrl: result.imageUrl,
      slug: '',
      tcgPlayerUrl: result.url,
      isMaterial: !!result.extendedData.find((v) => v.name === 'MemoryCost'),
    };
  });
}

async function doJob() {
  const groups = await getGroups();

  const productGroups: ProductGroup[] = groups.results.map((g) => ({
    id: g.groupId.toString(),
    name: g.name,
    key: g.abbreviation,
  }));

  const productCardMap: Record<string, ProductT[]> = {};

  for (const group of productGroups) {
    console.log(`Getting cards for ${group.name}`);
    const cards = await getCardsForGroup(group.id);
    productCardMap[group.id] = cards;
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }

  const lastUpdate = format(new Date(), 'M/d/yyyy @ h:m a');

  writeFileSync('../data/product-groups.json', JSON.stringify(productGroups));
  writeFileSync('../data/group-card-map.json', JSON.stringify(productCardMap));
  writeFileSync('../data/update-log.json', JSON.stringify({ lastUpdate }));
}

doJob();
