import React, { useState } from "react";

const AddComment = ({ id, cb }) => {
  const [inputValue, setImputValue] = useState('');

  return (
    <form onSubmit={e => {
      cb({
        awnserId: id,
        value: {comment: inputValue, createdAt: new Date(), }
      });
      e.preventDefault();
    }}>
      <input
        type="text"
        value={inputValue}
        onChange={e => setImputValue(e.target.value)}
        className="add-comment-input"
      />
    </form>
  )
}

export default AddComment;