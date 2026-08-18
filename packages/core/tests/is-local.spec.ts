import { describe } from 'node:test'
import { expect } from 'chai'
import { isLocal } from '../src/index.ts'

describe('@satorijs/core isLocal()', () => {
  for (const url of [
    'data:text/plain,hello',
    'file:///tmp/example.txt',
    'satori:qq/123/message',
    'http://localhost:3000/file',
    'https://service.local/file',
    'http://10.0.0.1/file',
    'http://172.16.0.1/file',
    'http://192.168.0.1/file',
    'http://[::1]/file',
  ]) {
    expect(isLocal(url), url).to.be.true
  }

  for (const url of [
    'https://example.com/file',
    'https://cdn.discordapp.com/file',
  ]) {
    expect(isLocal(url), url).to.be.false
  }
})
