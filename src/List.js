import React, { useState, useReducer } from "react";
import { map, find, toInteger, reduce } from "lodash";

import answersRespose from "./api/answers";
import questionsRespose from "./api/questions";
import usersRespose from "./api/users";
import commentsRespose from "./api/comments";

import { mergeCollection } from "./helpers";
import Question from "./Question";

export const initialState = {
  activeQuestion: 1,
  questionsList: mergeCollection(questionsRespose, usersRespose,
    [ {key: 'comments', cb: item => (
      reduce(commentsRespose, (acc, v) => v.questionId === item.id ?
          [...acc, v] : acc
      , [])
    )} ]
  )
}

export const questionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion: action.id
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        questionsList: {
          ...state.questionsList,
          [action.questionId]: {
            ...state.questionsList[action.questionId],
            comments: [
              ...state.questionsList[action.questionId].comments, action.value
            ]
          }
        }
      };
    default:
      return state;
  }
}

const Questions = () => {
  const [activeUser, setActiveUser] = useState(usersRespose[0].id);
  const [questions, dispatch] = useReducer(questionsReducer, initialState)
  const [answers] = useState(mergeCollection(answersRespose, usersRespose));

  return (
    <>
      <div className="active-user">
        <select
          value={activeUser}
          onChange={e => setActiveUser(toInteger(e.target.value))}
        >
          { map(usersRespose, user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          )) }
        </select>
      </div>
      <div className="questions-list">
        { map(questions.questionsList, question => (
            <Question
              key={question.id}
              activeUser={find(usersRespose, { id: activeUser })}
              question={question}
              answer={find(answers, { questionId: question.id })}
              isActive={questions.activeQuestion === question.id}
              onClickCb={id => dispatch({type: 'SET_ACTIVE_QUESTION', id})}
              onAddCommentCb={({questionId, value}) => {
                dispatch({type: 'ADD_COMMENT', questionId, value })
              }}
            />
        )) }
      </div>
    </>
  )
}

export default Questions;
