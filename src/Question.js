import React from "react";
import { map, reduce } from "lodash";

import ListItem from "./ListItem";
import AddComment from "./AddComment";

import { setDateFormat, dateEventsToTrack } from "./helpers";

const Question = ({
  question, answer, isActive, onClickCb, activeUser, onAddCommentCb
}) => {
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
          child={
            <>
              <AddComment
                id={answer.id} cb={comment => onAddCommentCb(comment)}
              />
              { answer.comments && map(answer.comments, v => (
                <span>{v.comment}</span>
              )) }
            </>
          }
        />
      }
    </div>
  )
}

export default Question;