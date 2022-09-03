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

  it('Element()', () => {
    expect(Element('img', { src: 'https://test.com/?foo=1&bar=2' }).toString()).to.equal('<img src="https://test.com/?foo=1&amp;bar=2"></img>')
    expect(Element('tag', { foo: '', bar: null, qux: false }).toString()).to.equal('<tag foo no-qux></tag>')
  })
})
