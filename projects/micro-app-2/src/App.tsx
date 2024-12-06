import React, { useImperativeHandle } from 'react';
import styles from './app.module.less';

function App(props, ref: React.Ref<HTMLInputElement>) {
  const [val, setVal] = React.useState('');

  return (
    <div className={styles.main}>
      <h2>micro-app-2</h2>
      <input ref={ref} type="text" value={val} onChange={(e) => setVal(e.target.value)} />
    </div>
  );
}

export default React.forwardRef(App);
