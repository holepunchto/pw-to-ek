const generate = require('./index.js')
const test = require('brittle')
const b4a = require('b4a')
const sodium = require('sodium-native')

test('generate from password', t => {
  const r1 = generate('password')
  const r2 = generate('password')
  const r3 = generate('another-password')

  t.is(r1.length, sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  t.is(r2.length, sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  t.is(r3.length, sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  t.ok(b4a.equals(r1, r2))
  t.ok(!b4a.equals(r1, r3))
})

test('generate from null errors', t => {
  try {
    generate(null)
  } catch (err) {
    t.pass()
  }
})
