import React from "react";
import "./ListItem.css";

const ListItem = ({...props}) => {
  const { type, user, content, date } = props;
  return (
    <div class={`list-item ${type}`}>
      <div class="list-item__user-creation">
        <strong>{user}</strong>{date && <span>{date}</span>}
      </div>
      <div class="list-item__content">{content}</div>
    </div>
  );
};

export default ListItem;
