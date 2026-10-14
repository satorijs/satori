import * as h from '../src/index.ts'
import { describe, test } from 'node:test'
import { expect } from 'chai'

describe('@satorijs/element', () => {
  describe('asset factory', () => {
    test('string source', () => {
      expect(h.image('https://example.com/foo.png').attrs.src)
        .to.equal('https://example.com/foo.png')
    })

    test('Buffer source', () => {
      expect(h.image(Buffer.from([1, 2, 3])).attrs.src)
        .to.equal('base64://AQID')
    })

    test('ArrayBuffer source', () => {
      expect(h.image(Uint8Array.from([1, 2, 3]).buffer).attrs.src)
        .to.equal('base64://AQID')
    })

    test('Uint8Array view', () => {
      const buffer = Uint8Array.from([0, 0, 1, 2, 3, 0]).buffer
      expect(h.image(new Uint8Array(buffer, 2, 3)).attrs.src)
        .to.equal('base64://AQID')
    })

    test('DataView', () => {
      const buffer = Uint8Array.from([0, 0, 1, 2, 3, 0]).buffer
      expect(h.image(new DataView(buffer, 2, 3)).attrs.src)
        .to.equal('base64://AQID')
    })

    test('mime type', () => {
      const buffer = Uint8Array.from([0, 0, 1, 2, 3, 0]).buffer
      expect(h.file(new Uint8Array(buffer, 2, 3), 'image/png').attrs.src)
        .to.equal('data:image/png;base64,AQID')
    })
  })
})
