import React from 'react';
import styles from './app.module.less';
interface Props {
  count: number;
  addCount: (num: number) => void;
}
function App({ count, addCount }: Props) {
  return (
    <div className={styles.main}>
      <h2>micro-app-1</h2>
      <div>count: {count}</div>
      <button onClick={() => addCount(count + 1)}>add count</button>
    </div>
  );
}

export default App;
