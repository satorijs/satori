import Element from '../src'
import { describe, test } from 'node:test'
import { expect, use } from 'chai'
import shape from 'chai-shape'

use(shape)

describe('Element API', () => {
  test('Element.escape()', () => {
    expect(Element.escape('<foo>')).to.equal('&lt;foo&gt;')
    expect(Element.escape('&quot;')).to.equal('&amp;quot;')
  })

  test('Element.unescape()', () => {
    expect(Element.unescape('&lt;foo&gt;')).to.equal('<foo>')
    expect(Element.unescape('&amp;quot;')).to.equal('&quot;')
  })

  describe('Element.parse()', () => {
    test('basic support', () => {
      expect(Element.parse('<img src="https://test.com/?foo=1&amp;bar=2"/>'))
        .to.deep.equal([Element('img', { src: 'https://test.com/?foo=1&bar=2' })])
      expect(Element.parse(`<tag foo="'" bar='"'>text</tag>`))
        .to.deep.equal([Element('tag', { foo: "'", bar: '"' }, 'text')])
      expect(Element.parse('<tag no-foo bar-qux>text</tag>'))
        .to.deep.equal([Element('tag', { foo: false, barQux: true }, 'text')])
    })

    test('mismatched tags', () => {
      expect(Element.parse('1<foo>2<bar attr>3').join('')).to.equal('1<foo>2<bar attr>3</bar></foo>')
      expect(Element.parse('1<foo/>4').join('')).to.equal('1<foo/>4')
      expect(Element.parse('1</foo>4').join('')).to.equal('14')
    })

    test('whitespace', () => {
      expect(Element.parse(`<>
        <foo> 1 </foo>
        <!-- comment -->
        2
      </>`).join('')).to.equal('<template><foo> 1 </foo>2</template>')
    })
  })

  describe('Interpolation', () => {
    test('interpolate', () => {
      expect(Element.parse('<tag bar={bar}>1{foo}1</tag>', { foo: 233, bar: 666 }))
        .to.deep.equal([Element('tag', { bar: 666 }, '1', '233', '1')])
      expect(Element.parse('<tag>&gt;{"&gt;"}</tag>', {}))
        .to.deep.equal([Element('tag', '>', '&gt;')])
      expect(Element.parse('<tag>{0}{1+1}</tag>', [233, 666]))
        .to.deep.equal([Element('tag', '233', '2')])
    })

    test('control flow', () => {
      expect(Element.parse('{#if foo >= 0}{foo}{:else}<p>negative</p>{/if}', { foo: 233 }))
        .to.deep.equal([Element.text('233')])
      expect(Element.parse('{#if foo >= 0}{foo}{:else}<p>negative</p>{/if}', { foo: -233 }))
        .to.deep.equal([Element('p', 'negative')])
    })

    test('#each', () => {
      expect(Element.parse('{#each arr as i}{i ** 2}{/each}', { arr: [1, 2, 3] }))
        .to.deep.equal([Element.text('1'), Element.text('4'), Element.text('9')])
    })
  })

  describe('Element.toString()', () => {
    test('basic support', () => {
      expect(Element('img', { src: 'https://test.com/?foo=1&bar=2' }).toString())
        .to.equal('<img src="https://test.com/?foo=1&amp;bar=2"/>')
      expect(Element('tag', { foo: false, barQux: true }, 'text').toString())
        .to.equal('<tag no-foo bar-qux>text</tag>')
      expect(Element('template', Element.parse('<tag foo>&lt;bar&gt;</tag>')).toString(true)).to.equal('<bar>')
    })

    test('validate children', () => {
      expect(() => Element('tag', {}, {} as any)).to.throw()
      expect(Element('tag', ['123', null, Element('span', '456')]).toString())
        .to.equal('<tag>123<span>456</span></tag>')
      expect(Element('tag', { children: '789' }).toString())
        .to.equal('<tag>789</tag>')
    })
  })

  describe('Selectors', () => {
    const selectIds = (source: string, query: string) => Element.select(source, query).map(el => el.attrs.id)

    test('type selector', () => {
      expect(selectIds('<a id="1"><a id="2"></a></a>', 'a')).to.deep.equal(['1', '2'])
      expect(selectIds('<a id="1"><b id="2"></b></a>', 'b')).to.deep.equal(['2'])
      expect(selectIds('<a id="1"><b id="2"></b></a>', 'c')).to.deep.equal([])
    })

    test('descendant', () => {
      expect(selectIds('<a id="1"><b id="2"><c id="3"></c></b></a>', 'b>c')).to.deep.equal(['3'])
      expect(selectIds('<a id="1"><b id="2"><c id="3"></c></b></a>', 'a c')).to.deep.equal(['3'])
      expect(selectIds('<a id="1"><b id="2"><c id="3"></c></b></a>', 'a>c')).to.deep.equal([])
      expect(selectIds('<a id="1"><b id="2"></b><c id="3"></c></a>', 'b c')).to.deep.equal([])
      expect(selectIds('<a id="1"><b id="2"></b><c id="3"></c></a>', 'a>c')).to.deep.equal(['3'])
    })

    test('sibling', () => {
      expect(selectIds('<a id="2"></a><b id="3"></b><b id="4"></b>', 'a+b')).to.deep.equal(['3'])
      expect(selectIds('<a id="2"></a><b id="3"></b><b id="4"></b>', 'a~b')).to.deep.equal(['3', '4'])
    })
  })
})
