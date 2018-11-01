import React, { useState } from "react";
import { map, find, reduce } from "lodash";

import answersRespose from "./api/answers";
import questionsRespose from "./api/questions";
import usersRespose from "./api/users";
import commentsRespose from "./api/comments";

import { mergeCollection, setDateFormat, dateEventsToTrack } from "./helpers";
import ListItem from "./ListItem";

const Question = ({question, answer}) => {
  const getlastEdit = (list, events = dateEventsToTrack) => {
    return setDateFormat(
      reduce(events, (acc, e) => list[e] !== null ? list[e] : acc, undefined)
    )
  }

  return (
    <div className="">
      <ListItem
        type={'question'}
        user={question.user.name}
        content={question.questionText}
        date={getlastEdit(question)}
      />
      { answer &&
        <ListItem
          type={'awnser'}
          user={answer.user.name}
          content={answer.answerText}
          date={getlastEdit(answer)}
        />
      }
    </div>
  )
}

const Questions = () => {
  const [answers] = useState(mergeCollection(answersRespose, usersRespose));
  const [questions] = useState(mergeCollection(questionsRespose, usersRespose));

  return (
    <div className="QuestionList">
      { map(questions, question => {
        return (
          <Question
            key={question.id}
            question={question}
            answer={find(answers, { questionId: question.id })}
          />
        );
      }) }
    </div>
  )
}

export default Questions;
