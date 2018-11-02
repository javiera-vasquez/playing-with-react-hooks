import { reduce, find } from "lodash";

export const mergeCollection = (collection, users, customProps = false) => (
  reduce(
    collection,
    (acc, item) => ({
      ...acc,
      [item.id]: {
        ...item,
        ...(customProps ? reduce(customProps, (acc, prop) => {
          return {...acc, [prop.key]: prop.cb(item)}
        }, {}) : {}),
        user: find(users, user => item.creatorId === user.id)
      }
    }),
    {}
  )
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

export const getlastEdit = (list, events = dateEventsToTrack) => {
  return setDateFormat(
    reduce(events, (acc, e) => list[e] !== null ? list[e] : acc, undefined)
  )
}