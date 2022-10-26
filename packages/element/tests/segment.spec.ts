import Element from '../src'
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

  it('mismatched tags', () => {
    expect(Element.parse('1<foo>2<bar attr>3', true).toString()).to.equal('1&lt;foo&gt;2&lt;bar attr&gt;3')
    expect(Element.parse('1<foo>2<bar>3</foo>4', true).toString()).to.equal('1<foo>2&lt;bar&gt;3</foo>4')
    expect(Element.parse('1<foo/>4', true).toString()).to.equal('1<foo/>4')
  })

  it('Element.toString()', () => {
    expect(Element('img', { src: 'https://test.com/?foo=1&bar=2' }).toString())
      .to.equal('<img src="https://test.com/?foo=1&amp;bar=2"/>')
    expect(Element('tag', { foo: '', bar: null, qux: false }, 'text').toString())
      .to.equal('<tag foo no-qux>text</tag>')
    expect(Element.normalize('<tag foo no-qux>bar</tag>').toString(true)).to.equal('bar')
  })

  describe('Selectors', () => {
    const selectIds = (source: string, query: string) => Element.select(source, query).map(el => el.attrs.id)

    it('type selector', () => {
      expect(selectIds('<a id="1"><a id="2"></a></a>', 'a')).to.deep.equal(['1', '2'])
      expect(selectIds('<a id="1"><b id="2"></b></a>', 'b')).to.deep.equal(['2'])
      expect(selectIds('<a id="1"><b id="2"></b></a>', 'c')).to.deep.equal([])
    })

    it('descendant', () => {
      expect(selectIds('<a id="1"><b id="2"><c id="3"></c></b></a>', 'b>c')).to.deep.equal(['3'])
      expect(selectIds('<a id="1"><b id="2"><c id="3"></c></b></a>', 'a c')).to.deep.equal(['3'])
      expect(selectIds('<a id="1"><b id="2"><c id="3"></c></b></a>', 'a>c')).to.deep.equal([])
      expect(selectIds('<a id="1"><b id="2"></b><c id="3"></c></a>', 'b c')).to.deep.equal([])
      expect(selectIds('<a id="1"><b id="2"></b><c id="3"></c></a>', 'a>c')).to.deep.equal(['3'])
    })

    it('sibling', () => {
      expect(selectIds('<a id="2"></a><b id="3"></b><b id="4"></b>', 'a+b')).to.deep.equal(['3'])
      expect(selectIds('<a id="2"></a><b id="3"></b><b id="4"></b>', 'a~b')).to.deep.equal(['3', '4'])
    })
  })
})
