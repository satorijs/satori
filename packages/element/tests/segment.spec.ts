import { Element } from '../src'
import { expect, use } from 'chai'
import shape from 'chai-shape'

use(shape)

describe('Element API', () => {
  it('Element.escape()', () => {
    expect(Element.escape('<foo>')).to.equal('&lt;foo&gt;')
    expect(Element.escape('&quot;')).to.equal('&amp;quot;')
  })

  it('Element.unescape()', () => {
    expect(Element.unescape('&lt;foo&gt;')).to.equal('<foo>')
    expect(Element.unescape('&amp;quot;')).to.equal('&quot;')
  })

  it('Element.parse()', () => {
    expect(Element.parse('<img src="https://test.com/?foo=1&amp;bar=2"/>'))
      .to.deep.equal([Element('img', { src: 'https://test.com/?foo=1&bar=2' })])
    expect(Element.parse('<tag foo no-qux>text</tag>'))
      .to.deep.equal([Element('tag', { foo: '', bar: null, qux: false }, 'text')])
  })

  it('Element.toString()', () => {
    expect(Element('img', { src: 'https://test.com/?foo=1&bar=2' }).toString())
      .to.equal('<img src="https://test.com/?foo=1&amp;bar=2"/>')
    expect(Element('tag', { foo: '', bar: null, qux: false }, 'text').toString())
      .to.equal('<tag foo no-qux>text</tag>')
  })
})
