import React from 'react'
import PropTypes from 'prop-types'
import { useCacheValue } from 'react-cache'

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

Address.propTypes = {
  name: PropTypes.string
}

export default Address
