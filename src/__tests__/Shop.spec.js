import { Shop } from '../Shop'
import { Item } from '../Item'

describe('Gilded Rose shop', function() {
  it('shop should be defined', function() {
    const shop = new Shop()

    expect(shop).toBeDefined()
  })

  it('shop items should be defined when not specified in constructor', function() {
    const shop = new Shop()

    expect(shop.items).toBeDefined()
  })

  it('shop items should be stored as is', function() {
    let expected = new Item('foo', 1, 1)
    const shop = new Shop([expected])
    const actual = shop.items[0]

    expect(actual).toEqual(expected)
  })

  it('shop items count should remain unchanged', function() {
    const shop = new Shop([new Item('foo', 1, 1)])

    expect(shop.items.length).toBe(1)
  })

  it('updateQuality method should not modify item name', function() {
    const shop = new Shop([new Item('foo', 1, 1)])
    const items = shop.updateQuality()

    expect(items[0].name).toEqual('foo')
  })

  it('updateQuality method should decrease the quality of an item each day', function() {
    const shop = new Shop([new Item('foo', 1, 1)])

    const items = shop.updateQuality()

    expect(items[0].quality).toBe(0)
  })

  it('updateQuality method should decrease the sellIn of an item each day', function() {
    const shop = new Shop([new Item('foo', 1, 1)])

    const items = shop.updateQuality()

    expect(items[0].sellIn).toBe(0)
  })
})
