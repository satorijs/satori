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

  describe('Element.parse()', () => {
    it('basic support', () => {
      expect(Element.parse('<img src="https://test.com/?foo=1&amp;bar=2"/>'))
        .to.deep.equal([Element('img', { src: 'https://test.com/?foo=1&bar=2' })])
      expect(Element.parse(`<tag foo="'" bar='"'>text</tag>`))
        .to.deep.equal([Element('tag', { foo: "'", bar: '"' }, 'text')])
      expect(Element.parse('<tag no-foo bar-qux>text</tag>'))
        .to.deep.equal([Element('tag', { foo: false, barQux: true }, 'text')])
    })

    it('mismatched tags', () => {
      expect(Element.parse('1<foo>2<bar attr>3').join('')).to.equal('1&lt;foo&gt;2&lt;bar attr&gt;3')
      expect(Element.parse('1<foo>2<bar>3</foo>4').join('')).to.equal('1<foo>2&lt;bar&gt;3</foo>4')
      expect(Element.parse('1<foo/>4').join('')).to.equal('1<foo/>4')
      expect(Element.parse('1</foo>4').join('')).to.equal('1&lt;/foo&gt;4')
    })

    it('interpolate', () => {
      expect(Element.parse('<tag bar={bar}>1{foo}1</tag>', { foo: 233, bar: 666 }))
        .to.deep.equal([Element('tag', { bar: 666 }, '1', '233', '1')])
      expect(Element.parse('<tag>&gt;{"&gt;"}</tag>', {}))
        .to.deep.equal([Element('tag', '>', '&gt;')])
      expect(Element.parse('<tag>{0}{1+1}</tag>', [233, 666]))
        .to.deep.equal([Element('tag', '233', '2')])
    })

    it('whitespace', () => {
      expect(Element.parse(`<>
        <foo> 1 </foo>
        <!-- comment -->
        2
      </>`).join('')).to.equal('<template><foo> 1 </foo>2</template>')
    })
  })

  describe('Element.toString()', () => {
    it('basic support', () => {
      expect(Element('img', { src: 'https://test.com/?foo=1&bar=2' }).toString())
        .to.equal('<img src="https://test.com/?foo=1&amp;bar=2"/>')
      expect(Element('tag', { foo: false, barQux: true }, 'text').toString())
        .to.equal('<tag no-foo bar-qux>text</tag>')
      expect(Element('template', Element.parse('<tag foo>bar</tag>')).toString(true)).to.equal('bar')
    })

    it('validate children', () => {
      expect(() => Element('tag', {}, {} as any)).to.throw()
      expect(Element('tag', ['123', null, Element('span', '456')]).toString())
        .to.equal('<tag>123<span>456</span></tag>')
      expect(Element('tag', { children: '789' }).toString())
        .to.equal('<tag>789</tag>')
    })
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
