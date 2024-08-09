# Pear-ek-generator

Derive a secure encryption key from a password using the sodium's scrypt implementation.

``` javascript
 const generate = require('pear-ek-generator')
 const sodium = require('sodium-native')
 const salt = b4a.alloc(sodium.crypto_pwhash_scryptsalsa208sha256_SALTBYTES)
 const key = await generate('password', salt)
 console.log(key) // 102 bytes Buffer
``` 
