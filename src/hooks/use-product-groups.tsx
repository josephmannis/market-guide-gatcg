import productGroups from '../data/product-groups.json';

export type ProductGroup = {
  id: string;
  name: string;
  key: string;
};

export function useProductGroups() {
  function isExcluded(g: ProductGroup): boolean {
    const excludedNames: string[] = [];

    return excludedNames.some((n) => g.name.includes(n));
  }

  const groups = (productGroups as ProductGroup[])
    .filter((g) => !isExcluded(g))
    .sort((a, b) => a.name.localeCompare(b.name));
  return { groups };
}
