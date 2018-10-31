import React, { Component } from "react";
import { map, reduce, find } from "lodash";

import answers from "./api/answers";
import questions from "./api/questions";
import users from "./api/users";
import comments from "./api/comments";

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

const getQuestions = (questions, users) => mergeCollection(questions, users);
const getAswers = (answers, users) => mergeCollection(answers, users);

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: {},
      questions: {}
    };
  }

  componentDidMount() {
    this.setState({
      answers: getAswers(answers, users),
      questions: getQuestions(questions, users)
    });
  }

  render() {
    const { answers, questions } = this.state;
    return map(questions, question => {
      return (
        <ListItem user={question.user.name} content={question.questionText} />
      );
    });
  }
}

export default List;
