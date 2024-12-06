import React from 'react';
interface Props {
    count: number;
    addCount: (num: number) => void;
}
declare function App({ count, addCount }: Props): React.JSX.Element;
export default App;
