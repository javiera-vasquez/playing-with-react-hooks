import React from "react";
import { map, reduce, find } from "lodash";

import usersRespose from "./api/users";
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
            <div className="list-item__comments-wrapper">
              <AddComment
                id={question.comments.length + 1}
                cb={comment => onAddCommentCb(comment)}
                questionId={question.id}
                creatorId={activeUser.id}
              />
              { !!question.comments.length &&
                map(question.comments, comment => {
                  const user = find(usersRespose, {id: comment.creatorId});
                  if(user.organization !== activeUser.organization) return null;
                  return (
                    <div className="list-item__comments" key={comment.id}>
                    <strong>{user.name}:</strong>
                    <span>{comment.comment}</span>
                    <div className="list-item__comments__date">
                      {setDateFormat(comment.createdAt)}
                    </div>
                  </div>
                  )
                })
              }
            </div>
          }
        />
      }
    </div>
  )
}

export default Question;