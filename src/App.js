import React from 'react';
import ShortPolling from './ShortPolling';
import LongPolling from './LongPolling';
import WS from './chatSoket'
import './App.css';

const App=()=>{
  return(
    // <ShortPolling/>
    // <LongPolling/>
    <WS/>
  )
}

export default App;
