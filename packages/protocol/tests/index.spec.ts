import * as h from '@cordisjs/element'
import { describe } from 'node:test'
import { Resource } from '../src/index.ts'
import { expect } from 'chai'

describe('@satorijs/protocol', () => {
  describe('Resource', () => {
    expect(Resource.encode('user', {
      id: '1',
      name: 'Alice',
    }).toString()).to.equal('<user id="1" name="Alice"/>')

    expect(Resource.decode(h.parse('<user id="1" name="Alice"/>')[0])).to.deep.equal({
      id: '1',
      name: 'Alice',
    })

    expect(Resource.encode('quote', {
      id: '1',
      content: '<br/>',
      quote: { id: '2' },
      user: { id: '3' },
    }).toString()).to.equal('<quote id="1"><quote id="2"/><user id="3"/><br/></quote>')

    expect(Resource.decode(h.parse('<quote id="1"><quote id="2"/><user id="3"/><br/></quote>')[0])).to.deep.equal({
      id: '1',
      content: '<br/>',
      quote: { id: '2' },
      user: { id: '3' },
    })
  })
})
