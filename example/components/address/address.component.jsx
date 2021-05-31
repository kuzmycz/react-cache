import React from 'react'
import { useCacheValue } from "../../dist";

const Address = ({value}) => {
  const [street, setStreet] = useCacheValue(`${value}.street`)
  const [city, setCity] = useCacheValue(`${value}.city`)
  const [state, setState] = useCacheValue(`${value}.state`)
  const [country, setCountry] = useCacheValue(`${value}.country`)
  const [postcode, setPostcode] = useCacheValue(`${value}.postcode`)
  const [name, setName] = useCacheValue(`name`)

  return (<div>
    <label>
      Street:
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
    </label>
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

export default Address
