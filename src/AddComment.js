import React, { useState } from "react";

const AddComment = ({ id, cb, questionId, creatorId }) => {
  const [inputValue, setImputValue] = useState('');
  return (
    <form onSubmit={e => {
      cb({
        questionId,
        value: {
          comment: inputValue, createdAt: new Date(), id, creatorId
        }
      });
      setImputValue('');
      e.preventDefault();
    }}>
      <input
        type="text"
        value={inputValue}
        onChange={e => setImputValue(e.target.value)}
        className="add-comment-input"
        placeholder="Add comment…"
      />
    </form>
  )
}

export default AddComment;