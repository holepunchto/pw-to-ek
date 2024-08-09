# Pear-ek-generator

Derive a secure encryption key from a password using the sodium's scrypt implementation.

``` javascript
  const generate = require('pear-ek-generator')
  const key = generate('password')
  console.log(key) // 102 bytes Buffer
``` 
