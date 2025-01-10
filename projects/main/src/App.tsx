import React, { Suspense, useEffect } from 'react';
import styles from './app.module.less';
// import MicroApp1 from '@micro-app-1/App';
import { App as MicroApp1, add } from 'microApp1/App';
// const MicroApp1 = React.lazy(() => import('microApp1/App'));
// import { App as MicroApp2, getLocalname } from 'microApp2/App';

function App() {
  const [count, setCount] = React.useState(0);
  //   const microApp2Ref = React.useRef<any>(null);

  //   useEffect(() => {
  //     microApp2Ref.current.focus();
  //   }, []);

  return (
    <div className={styles.main}>
      <h1>main</h1>
      <MicroApp1 count={count} addCount={setCount} />
      {/* <MicroApp2 ref={microApp2Ref} /> */}
      {/* <Suspense fallback={'loading...'}>
        <MicroApp1 />
      </Suspense> */}
    </div>
  );
}

export default App;
