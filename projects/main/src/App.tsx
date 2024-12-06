import React, { Suspense, useEffect } from 'react';
import styles from './app.module.less';
// import MicroApp1 from '@micro-app-1/App';
import { App as MicroApp1, add } from 'microApp1/App';
// const MicroApp1 = React.lazy(() => import('microApp1/App'));
import { App as MicroApp2, getLocalname } from 'microApp2/App';
import MicroApp from './components/MicroApp';

function App() {
  useEffect(() => {
    console.log(add(1, 2), getLocalname());
  }, []);

  return (
    <div className={styles.main}>
      <h1>main</h1>
      <MicroApp1 />
      <MicroApp2 />
      {/* <Suspense fallback={'loading...'}>
        <MicroApp1 />
      </Suspense> */}
    </div>
  );
}

export default App;
