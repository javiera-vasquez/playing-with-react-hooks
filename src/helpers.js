import { reduce, find } from "lodash";

export const mergeCollection = (collection, users, props = {}) =>
  reduce(
    collection,
    (acc, item) => ({
      ...acc,
      [item.id]: {
        ...item,
        ...props,
        user: find(users, user => item.creatorId === user.id)
      }
    }),
    {}
  );

export const setDateFormat = (dateToFormat, locale = 'en-US') => {
  if(!dateToFormat) return null;
  const options = {
    month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
  };
  const date = new Date(dateToFormat);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export const dateEventsToTrack = [
  'createdAt', 'lastEditedAt', 'publishedAt', 'submittedAt', 'closedAt'
];