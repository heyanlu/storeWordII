import { useReducer, useEffect } from 'react'

import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS } from "./constants";
import { checkSession, onLogin, onLogout, updateWord } from "./utils";

import LoginPage from './components/LoginPage'
import WordPage from './components/WordPage'

import './App.css'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState); 

  useEffect(() => {
    checkSession(dispatch)(); 
  }, []);

  return (
    <main>
      <div className="main-wrapper">
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <LoginPage onLogin={onLogin(dispatch)} />
        )}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <WordPage
            updateWord={updateWord(dispatch)}
            word={state.word}
            onLogout={onLogout(dispatch)}
          />
        )}
      </div>
    </main>
  )
}

export default App
