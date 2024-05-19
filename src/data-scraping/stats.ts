import cardGroupMap from '../data/group-card-map.json';
import productGroups from '../data/product-groups.json';
import _ from 'lodash';
import { writeFileSync } from 'node:fs';
function makeCsv(headers: string[], data: string[][]): string {
  let csvContent = headers.join(',');
  csvContent += '\r\n';
  // "data:text/csv;charset=utf-8,";

  data.forEach(function (rowArray) {
    const row = rowArray.join(',');
    csvContent += row + '\r\n';
  });

  return csvContent;
}

function getCollectionPrice() {
  const groups = ['23338', '23212', '23128'];
  const rarities = ['Common', 'Uncommon', 'Rare', 'Super Rare', 'Ultra Rare'];
  const totalPrices = {};
  let fullPrice = 0;

  for (const rarity of rarities) {
    for (const groupId of groups) {
      const cards = cardGroupMap[groupId];

      const materialCards = cards
        .filter((c) => c.isMaterial)
        .filter((c) => c.rarity === rarity)
        .map((c) => {
          const p = c.normalPrices.marketPrice ?? c.normalPrices.midPrice ?? 0;
          return p;
        });

      const normalCards = cards
        .filter((c) => !c.isMaterial)
        .filter((c) => c.rarity === rarity)
        .map((c) => {
          const p = c.normalPrices.marketPrice ?? c.normalPrices.midPrice ?? 0;
          return p * 4;
        });

      const gid = productGroups.find((g) => g.id === groupId).name;

      if (!totalPrices[gid]) {
        totalPrices[gid] = {};
      }

      totalPrices[gid][rarity] =
        (totalPrices[gid][rarity] ?? 0) + Math.round(_.sum(materialCards)) + Math.round(_.sum(normalCards));

      fullPrice += Math.round(_.sum(materialCards)) + Math.round(_.sum(normalCards));
    }
  }
  console.log(totalPrices);
  console.log(fullPrice);
}

function getFoilsInOrder() {
  const groups = ['23338', '23212', '23128'];
  let foilCards: { name: string; price: number }[] = [];

  for (const groupId of groups) {
    const cards = cardGroupMap[groupId];
    foilCards = foilCards.concat(
      cards
        .filter((c) => !!c.foilPrices.midPrice)
        .map((c) => ({
          name: c.name,
          price: c.foilPrices.midPrice,
        }))
    );
  }

  const prunedPrices: string[][] = foilCards
    .filter((c) => c.price <= 3)
    .sort((a, b) => a.price - b.price)
    .map((c) => [c.name, c.price.toString(10)]);

  writeFileSync('foilprices.csv', makeCsv(['name', 'price'], prunedPrices), 'utf-8');
}

getFoilsInOrder();
