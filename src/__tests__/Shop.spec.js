import { Shop } from '../Shop'
import { Item } from '../Item'

describe('Shop class', function() {
  describe('Constructor tests', () => {
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
  })

  describe('updateQuality method tests', () => {
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

    it('quality of an item is never negative', function() {
      const shop = new Shop([new Item('foo', 1, 0)])

      const items = shop.updateQuality()

      expect(items[0].quality).toBe(0)
    })

    it('quality of an item is never more than 50', function() {
      const shop = new Shop([new Item('foo', 1, 50)])

      const items = shop.updateQuality()

      expect(items[0].quality).toBeLessThan(50)
    })

    it('"Aged Brie" quality is never more than 50', function() {
      const shop = new Shop([new Item('Aged Brie', 1, 50)])

      const items = shop.updateQuality()

      expect(items[0].quality).toBe(50)
    })

    it('"Sulfuras" never decreases in Quality', function() {
      const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 50)])

      const items = shop.updateQuality()

      expect(items[0].quality).toBe(50)
    })

    it('"Sulfuras" never decreases in Sellin', function() {
      const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 50)])

      const items = shop.updateQuality()

      expect(items[0].sellIn).toBe(1)
    })

    describe('Backstage passes', () => {
      it('"Backstage passes" Quality increases by 2 when there are 10 days or less', function() {
        const shop = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)
        ])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(2)
      })

      it('"Backstage passes" Quality increases by 3 when there are 5 days or less', function() {
        const shop = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)
        ])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(3)
      })

      it('"Backstage passes" Quality drops to 0 after the concert', function() {
        const shop = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 0, 5)
        ])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(0)
      })
    })

    it('Once the sell by date has passed, Quality degrades twice as fast', function() {
      const shop = new Shop([new Item('foo', -1, 5)])

      const items = shop.updateQuality()

      expect(items[0].quality).toBe(3)
    })
  })
})
