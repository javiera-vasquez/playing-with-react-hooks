import React, { useState } from "react";
import { map } from "lodash";

import answersRespose from "./api/answers";
import questionsRespose from "./api/questions";
import usersRespose from "./api/users";
import commentsRespose from "./api/comments";

import { mergeCollection, setDateFormat } from "./helpers";
import ListItem from "./ListItem";

const List = () => {
  const [answers] = useState(mergeCollection(answersRespose, usersRespose));
  const [questions] = useState(mergeCollection(questionsRespose, usersRespose));

  return (
    map(questions, question => {
      return (
        <span>
        <span>{setDateFormat(question.createdAt)}</span>
        <ListItem user={question.user.name} content={question.questionText} />
        </span>
      );
    })
  )
}

export default List;
