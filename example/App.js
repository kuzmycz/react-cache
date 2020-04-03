import React  from 'react'

import {Cache} from "../dist";
import Address from './components/address/address.component'

const App = () => {

  return (
    <div>
      <div>Test</div>
      <Cache values={{}}>
        <Address name={'buyer'}/>
      </Cache>
    </div>
  )
};

export default App;
