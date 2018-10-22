import { Item } from '../Item'

describe('Item class', () => {
  it('Item is defined', function() {
    let item = new Item()

    expect(item).toBeDefined()
  })

  describe('quality property', () => {
    let quality = 1

    it('quality is undefined when not specified in the constructor', function() {
      let item = new Item()

      expect(item.quality).toBeUndefined()
    })

    it('quality is defined when specified in the constructor', function() {
      let item = new Item('foo', 0, quality)

      expect(item.quality).toBe(quality)
    })
  })

  describe('sellIn property', () => {
    let sellin = 1

    it('sellIn is undefined when not specified in the constructor', function() {
      let item = new Item()

      expect(item.sellIn).toBeUndefined()
    })

    it('sellIn is defined when specified in the constructor', function() {
      let item = new Item('foo', sellin, 0)

      expect(item.sellIn).toBe(sellin)
    })
  })

  describe('name property', () => {
    let name = 'foo'

    it('name is undefined when not specified in the constructor', function() {
      let item = new Item()

      expect(item.name).toBeUndefined()
    })

    it('name is defined when specified in the constructor', function() {
      let item = new Item(name, 0, 0)

      expect(item.name).toBe(name)
    })
  })
})
