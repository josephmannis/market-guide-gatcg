import cardGroupMap from '../data/group-card-map.json';
import productGroups from '../data/product-groups.json';
import _ from 'lodash';

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

getCollectionPrice();
