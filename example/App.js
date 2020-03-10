import React  from 'react'

import {Cache, LogCache} from "../dist";
import Address from './components/address/address.component'

const App = () => {

  return (
    <div>
      <div>Test</div>
      <Cache values={{}}>
        <Address name={'buyer'}/>
        <LogCache display={false}/>
      </Cache>
    </div>
  )
};

export default App;
