import React from "react";
import "./ListItem.css";

const ListItem = ({...props}) => {
  const { type, user, content, date, active } = props;
  return (
    <div className={`list-item ${type} ${active ? 'active' : ''}` }>
      <div className="list-item__user-creation">
        <strong>{user}</strong>{date && <span>{date}</span>}
      </div>
      <div className="list-item__content">{content}</div>
    </div>
  );
};

export default ListItem;
