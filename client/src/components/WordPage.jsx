import { useState } from "react";

function WordPage({ onLogout, updateWord, word }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    updateWord(input);
  }

  return (
    <>
      <h1 className="stored-word">{word}</h1>
      <form className="form-word" onSubmit={handleSubmit}>
        <input
          className="input-word"
          type="text"
          name="newWord"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="button-submit" type="submit">
          Update
        </button>
      </form>
      <button className="button-logout" type="button" onClick={onLogout}>
        Logout
      </button>
    </>
  );
}

export default WordPage;