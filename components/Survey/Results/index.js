import React from 'react'

import Coin from '../Coin'
import styles from './Results.module.css'

const Results = ({ result }) => (
  <div className={styles.content}>
    <h1 className={styles.title}>Thanks for your input</h1>
    <h2 className={styles.subtitle}>Here are the results so far:</h2>

    {Object.values(result)
      .sort((a, b) => b.rate - a.rate)
      .map((t, i) => (
        <Result {...t} index={i} key={t.topicId} />
      ))}
  </div>
)

const Result = ({ name, rate, index }) => (
  <div className={styles.result}>
    <div className={styles.topicName}>
      {index}. {name}
    </div>
    <div className={styles.topicRate}>
      {rate} <Coin />
    </div>
  </div>
)

export default Results
