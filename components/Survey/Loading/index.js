import React from 'react'
import styles from './Loading.module.css'

const Loading = () => (
  <div className={styles.loadingIndicator}>
    <div className={styles.ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)

export default Loading
