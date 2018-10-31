import React, { useState } from "react";
import { map, reduce, find } from "lodash";

import answersRespose from "./api/answers";
import questionsRespose from "./api/questions";
import usersRespose from "./api/users";
import commentsRespose from "./api/comments";

import ListItem from "./ListItem";

const mergeCollection = (collection, users) =>
  reduce(
    collection,
    (acc, item) => ({
      ...acc,
      [item.id]: {
        ...item,
        user: find(users, user => item.creatorId === user.id)
      }
    }),
    {}
  );

const List = () => {
  const [answers] = useState(mergeCollection(answersRespose, usersRespose));
  const [questions] = useState(mergeCollection(questionsRespose, usersRespose));

  return (
    map(questions, question => {
      return (
        <ListItem user={question.user.name} content={question.questionText} />
      );
    })
  )
}

export default List;
