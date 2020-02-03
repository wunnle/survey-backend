import React from 'react'

import Coin from '../Coin'
import styles from './Topic.module.css'

const Topic = ({ name, rate, handleClick }) => (
  <div className={styles.topic} onClick={handleClick}>
    <div className={styles.text}>{name}</div>
    <div className={styles.coinHolder}>
      {Array.from(Array(rate)).map((v, i) => (
        <Coin key={i} />
      ))}
    </div>
  </div>
)

export default Topic
