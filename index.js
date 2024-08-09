const sodium = require('sodium-native')
const b4a = require('b4a')

module.exports = async (pwd, salt) => {
  const ops = sodium.crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE
  const mem = sodium.crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE
  const output = Buffer.alloc(sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  await sodium.crypto_pwhash_scryptsalsa208sha256_async(output, b4a.from(pwd), salt, ops, mem)
  return output
}
