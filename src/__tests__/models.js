import answersRespose from "../api/answers";
import usersRespose from "../api/users";

import { mergeCollection, setDateFormat, getlastEdit, dateEventsToTrack } from "../helpers";
import { initialState, questionsReducer } from "../List";

describe('Init mergeCollection tests', () => {
  it('It need to merge a collection whit the user how created that element', () => {
    const collection = mergeCollection(answersRespose, usersRespose);
    expect(collection).toBeTruthy();
    expect(collection[1]).toEqual({
      "id": 1,
      "questionId": 3,
      "displayId": 13,
      "creatorId": 3,
      "createdAt": "2018-10-19T16:23:26.913Z",
      "lastEditorId": 3,
      "lastEditedAt": "2018-10-28T20:27:50.869Z",
      "publisherId": null,
      "publishedAt": null,
      "submitterId": null,
      "submittedAt": null,
      "closerId": null,
      "closedAt": null,
      "answerText": "4!",
      "deleterId": null,
      "deletedAt": null,
      "user": { "id": 3, "name": "Carlos Carreño", "organization": "Fruna"},
    })
  })

  it('It need to handle add custom keys to the new dictionary', () => {
    const collection = mergeCollection(answersRespose, usersRespose,
      [
        {key: 'questionIdToString', cb: item => `${item.questionId}`},
        {key: 'isUndefined', cb: item => undefined}
      ]
    );

    expect(collection[1]).toHaveProperty('questionIdToString');
    expect(collection[1]).toHaveProperty('isUndefined', undefined);
  })
});

describe('Init questions reducer test', () => {
  it('It need to set an active user id', () => {
    const reducer = questionsReducer(initialState, {
      type: 'SET_ACTIVE_QUESTION', id: 3
    });
    expect(reducer).toEqual({...initialState, activeQuestion: 3})
  })

  it('It need to add comments to an specific question', () => {
    const comment = {
      comment: 'hola', createdAt: new Date(), id: 10, creatorId: 1
    };
    const reducer = questionsReducer(initialState, {
      type: 'ADD_COMMENT', questionId: 1, value: comment
    });
    expect(reducer).toEqual({
      ...initialState,
      questionsList: {
        ...initialState.questionsList, [1]: {
          ...initialState.questionsList[1],
          comments: [...initialState.questionsList[1].comments, comment]
        }
      }
    })
  })
});

describe('Init setDateFormat test', () => {
  it('It need to handle to output the correct date format of US', () => {
    expect(setDateFormat('2018-10-19T16:23:26.913Z'))
      .toBe('Oct 19, 12:23 PM');
  })

  it('It need to acept a custom locale', () => {
    expect(setDateFormat('2018-10-19T16:23:26.913Z', 'es-CL'))
      .toBe('M10 19 12:23');
  })

  it('It need to handle different time events to track', () => {
    expect(
      getlastEdit(answersRespose[1], dateEventsToTrack)
    ).toBe('Oct 28, 4:27 PM');
  })

});