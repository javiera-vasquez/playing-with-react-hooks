import React from "react";
import "./ListItem.css";

const ListItem = props => {
  return (
    <div class="list-item">
      <div class="list-item__user">{props.user}</div>
      <div class="list-item__content">{props.content}</div>
    </div>
  );
};

export default ListItem;
