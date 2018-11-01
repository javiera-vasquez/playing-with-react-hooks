import React, { useState } from "react";
import { map, find, reduce, toInteger } from "lodash";

import answersRespose from "./api/answers";
import questionsRespose from "./api/questions";
import usersRespose from "./api/users";
import commentsRespose from "./api/comments";

import { mergeCollection, setDateFormat, dateEventsToTrack } from "./helpers";
import ListItem from "./ListItem";

const Question = ({question, answer, isActive, onClickCb, activeUser}) => {
  const getlastEdit = (list, events = dateEventsToTrack) => {
    return setDateFormat(
      reduce(events, (acc, e) => list[e] !== null ? list[e] : acc, undefined)
    )
  }

  return (
    <div
      className={`question-wrapper ${isActive ? 'active' : ''}`}
      onClick={() => onClickCb(question.id)}
    >
      <ListItem
        type={`question`}
        active={isActive}
        user={
          activeUser.organization === question.user.organization ?
            question.user.name : question.user.organization
        }
        content={question.questionText}
        date={getlastEdit(question)}
      />
      { answer &&
        <ListItem
          type={`awnser`}
          active={isActive}
          user={
            activeUser.organization === answer.user.organization ?
            answer.user.name : answer.user.organization
          }
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
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [activeUser, setactiveUser] = useState(usersRespose[0].id);

  return (
    <>
      <div className="active-user">
        <select
          value={activeUser}
          onChange={e => setactiveUser(toInteger(e.target.value))}
        >
          { map(usersRespose, user => (
            <option value={user.id}>{user.name}</option>
          )) }
        </select>
      </div>
      <div className="questions-list">
        { map(questions, question => {
          return (
            <Question
              key={question.id}
              activeUser={find(usersRespose, { id: activeUser })}
              question={question}
              answer={find(answers, { questionId: question.id })}
              isActive={activeQuestion === question.id}
              onClickCb={id => setActiveQuestion(id)}
            />
          );
        }) }
      </div>
    </>
  )
}

export default Questions;
