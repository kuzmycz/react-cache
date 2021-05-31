import React  from 'react'

import {Cache} from '../dist';
import Address from './components/address/address.component'
import { CacheLog } from './cache-log';


const Component = ({initialValue, name}) => {

  return ( <div>
      <div>Test</div>
      <Cache values={initialValue} name={name} >
        <Address value={'buyer'}/>
        <CacheLog display={true}/>
      </Cache>
    </div>
  )
}


const App = () => {

  return (
    <div>
      <Component initialValue={{title: 'Dr', firstName: 'John', buyer: {street: '3 Apple way'}}}/>
    </div>
  )
};

export default App;
