/**
 * @deprecated
 * @see identity
 * @param item
 */
export const identityTrue = item => !!item;

export const identity = item => item;

export const negation = item => !item;

export const sortBy = prop => items =>
    items.sort((a, b) => a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1);

export const isActive = item => item.isActive;

export const uniqueId = (item, index, arr) =>
    arr.findIndex(current => current.id === item.id) === index;

export const by = (prop: string) => (...props: any[]) => item => props.indexOf(item[prop]) > -1;

export const byId = by('id');

export const byType = by('type');

export const sum = (a, b) => a + b;

export const or = (a, b) => item => a(item) || b(item);

export const and = (a, b) => item => a(item) && b(item);

export const isUnique = (arr) => (new Set(arr)).size === arr.length;
