import React, { useState } from 'react'
import { useReducer } from 'react'

import lightLogo from './lightLogo.inline.svg'
import Questions from './Questions'
import Results from './Results'
import styles from './Survey.module.css'

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

const Survey = ({ data, pass }) => {
  const [state, dispatch] = useReducer(reducer, createInitialState(data))
  const [result, setResult] = useState()

  async function handleSubmit() {
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
      console.log({ data })

      setResult(data)
    } catch (error) {
      console.log('something went wrong')
    }
  }

  function handleTopicClick(topicId) {
    if (state.remainingCoins) {
      dispatch(upvoteAction(topicId))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <img src={lightLogo} alt="wunnle" />
        </header>
        {result ? (
          <Results result={result} />
        ) : (
          <Questions
            {...state}
            handleReset={() => dispatch({ type: 'RESET' })}
            handleSubmit={handleSubmit}
            handleTopicClick={handleTopicClick}
          />
        )}
      </div>
    </div>
  )
}

export default Survey
