import productGroups from '../data/product-groups.json';

export type ProductGroup = {
  id: string;
  name: string;
  key: string;
};

export function useProductGroups() {
  const groups = (productGroups as ProductGroup[]).sort((a, b) => a.name.localeCompare(b.name));
  return { groups };
}
