import { Item } from "../types/type";

export function groupItemsByCategory(items: Item[]): { [key: string]: Item[] } {
  return items.reduce((acc: { [key: string]: Item[] }, item) => {
    acc[item.category] = [...(acc[item.category] || []), item]
    return acc
  }, {})
}

export function sortCategories(itemsByCategory: { [key: string]: Item[] }): [string, Item[]][] {
  return Object.entries(itemsByCategory).sort(([, itemsA], [, itemsB]) => {
    return itemsB.length - itemsA.length;
  });
}