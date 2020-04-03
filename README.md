# react-cache

> Cache content and get notified when content changes

[![NPM](https://img.shields.io/npm/v/react-cache.svg)](https://www.npmjs.com/package/react-cache) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![gzip size](https://badgen.net/bundlephobia/minzip/@kuzmycz/react-cache)](https://bundlephobia.com/result?p=@kuzmycz/react-cache)

## Install

```bash
npm install --save @kuzmycz/react-cache
```

## Usage

```tsx
import * as React from 'react'

import {Cache} from 'react-cache'

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

const Address = ({name}) => {
  const [street, setStreet] = useCacheValue(`${name}.street`)
  const [city, setCity] = useCacheValue(`${name}.city`)
  const [state, setState] = useCacheValue(`${name}.state`)
  const [country, setCountry] = useCacheValue(`${name}.country`)
  const [postcode, setPostcode] = useCacheValue(`${name}.postcode`)

  return (<div>
    <label>
      Street:
      <input type='text' value={street} onChange={(e) => setStreet(e.target.value)} />
    </label>
    <label>
      City:
      <input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
    </label>
    <label>
      State:
      <input type='text' value={state} onChange={(e) => setState(e.target.value)} />
    </label>
    <label>
      Country:
      <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
    </label>
    <label>
      Postcode:
      <input type='text' value={postcode} onChange={(e) => setPostcode(e.target.value)} />
    </label>
  </div>)
}
```

## License

MIT © [kuzmycz](https://github.com/kuzmycz)
