import React, { useState } from 'react';
import TestRenderer from 'react-test-renderer';

import questionsResponse from "../api/questions";
import answersRespose from "../api/answers";
import usersRespose from "../api/users";

import Question from '../Question';
import ListItem from "../ListItem";
import AddComment from "../AddComment";

describe('Init Question component', () => {
  it('Need to render()', () => {
    const component = TestRenderer.create(
      <Question
        question={{
          ...questionsResponse[0],
          user: usersRespose[0]
        }}
        answer={false}
        isActive={true}
        onClickCb={() => {}}
        activeUser={usersRespose[0]}
        onAddCommentCb={() => {}}
      />
    ).toJSON();
    expect(component).toMatchSnapshot();
  })
})

describe('Init ListItem component', () => {
  it('It render()', () => {
    const component = TestRenderer.create(
      <ListItem
        type="test"
        user="test"
        content="hola soy un test"
        date={"Oct 28, 4:27 PM"}
        active={true}
        child={<span>hola</span>}
      />
    ).toJSON();

  })
})

// Need more research
// React create app can't not handle hooks component in jest env yet
// describe('Init AddCommnet component', () => {
//   it('It render()', () => {
//     const component = TestRenderer.create(
//       <AddComment
//         id={1} cb={() =>{}} questionId={1} creatorId={1}
//       />
//     ).toJSON();
//     expect(component).toMatchSnapshot();
//   })
// })
