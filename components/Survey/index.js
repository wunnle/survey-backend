import React, { useState, useEffect } from 'react'
import { useReducer } from 'react'

import lightLogo from './lightLogo.inline.svg'
import Questions from './Questions'
import Results from './Results'
import styles from './Survey.module.css'
import Loading from './Loading'

function createInitialState(surveyData) {
  return {
    totalCoins: 5,
    remainingCoins: 5,
    topics: surveyData.reduce((prev, current) => {
      const { name, topicId } = current

      return {
        ...prev,
        [topicId]: {
          name,
          topicId,
          rate: 0
        }
      }
    }, {})
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPVOTE': {
      const topic = state.topics[action.payload.topicKey]

      return {
        ...state,
        remainingCoins: state.remainingCoins - 1,
        topics: {
          ...state.topics,
          [action.payload.topicKey]: {
            ...topic,
            rate: topic.rate + 1
          }
        }
      }
    }

    case 'RESET': {
      return {
        ...state,
        remainingCoins: state.totalCoins,
        topics: Object.values(state.topics).reduce((prev, current) => {
          const { topicId, name } = current

          return {
            ...prev,
            [topicId]: {
              name,
              topicId,
              rate: 0
            }
          }
        }, {})
      }
    }

    default:
      throw new Error()
  }
}

function upvoteAction(topicKey) {
  return {
    type: 'UPVOTE',
    payload: {
      topicKey
    }
  }
}

const Wrapper = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={lightLogo} alt="wunnle" />
      </header>
      {children}
    </div>
  </div>
)

const Survey = ({ data, pass, isActive }) => {
  const [state, dispatch] = useReducer(reducer, createInitialState(data))
  const [result, setResult] = useState()
  const [isLoading, setLoading] = useState()
  const [isErred, setErred] = useState()

  useEffect(() => {
    if (!isActive) {
      setResult(data)
    }
  })

  useEffect(() => {
    if (localStorage.getItem('submittedSurvey')) {
      setResult(data)
    }
  }, [])

  async function handleSubmit() {
    setLoading(true)
    try {
      const res = await fetch('/api/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          username: 'guest',
          password: pass,
          updates: [
            {
              topicId: 1,
              rate: 1
            },
            {
              topicId: 2,
              rate: 2
            }
          ]
        })
      })
      const data = await res.json()

      setLoading(false)
      setResult(data)
      localStorage.setItem('submittedSurvey', true)
    } catch (error) {
      setLoading(false)
      setErred(true)
    }
  }

  function handleTopicClick(topicId) {
    if (state.remainingCoins) {
      dispatch(upvoteAction(topicId))
    }
  }

  if (isErred) {
    return <Wrapper>You are not authorized</Wrapper>
  }

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {result ? (
        <Results result={result} isActive={isActive} />
      ) : (
        <Questions
          {...state}
          handleReset={() => dispatch({ type: 'RESET' })}
          handleSubmit={handleSubmit}
          handleTopicClick={handleTopicClick}
        />
      )}
    </Wrapper>
  )
}

export default Survey
