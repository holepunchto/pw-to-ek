const generate = require('./index.js')
const test = require('brittle')
const b4a = require('b4a')
const sodium = require('sodium-native')

test('generate from password', async (t) => {
  const salt = b4a.alloc(sodium.crypto_pwhash_scryptsalsa208sha256_SALTBYTES)

  const r1 = await generate('password', salt)
  const r2 = await generate('password', salt)
  const r3 = await generate('another-password', salt)

  t.is(r1.length, sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  t.is(r2.length, sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  t.is(r3.length, sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  t.ok(b4a.equals(r1, r2))
  t.ok(!b4a.equals(r1, r3))
})

test('generate from null errors', async (t) => {
  try {
    await generate(null)
  } catch (err) {
    t.pass()
  }
})

test('change salt', async (t) => {
  const saltA = b4a.alloc(sodium.crypto_pwhash_scryptsalsa208sha256_SALTBYTES)
  const saltB = b4a.alloc(sodium.crypto_pwhash_scryptsalsa208sha256_SALTBYTES)
  sodium.randombytes_buf(saltA)
  sodium.randombytes_buf(saltB)

  const r1 = await generate('password', saltA)
  const r2 = await generate('password', saltB)

  t.is(r1.length, sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  t.is(r2.length, sodium.crypto_pwhash_scryptsalsa208sha256_STRBYTES)
  t.ok(!b4a.equals(r1, r2))
})
