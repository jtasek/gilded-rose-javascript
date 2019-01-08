import { Shop } from '../Shop'
import { Item } from '../Item'

describe('Shop class', () => {
  describe('constructor tests', () => {
    it('shop is defined', () => {
      const shop = new Shop()

      expect(shop).toBeDefined()
    })

    it('shop items are defined when not specified in constructor', () => {
      const shop = new Shop()

      expect(shop.items).toBeDefined()
    })

    it('shop items are stored unchanged', () => {
      let expected = new Item('foo', 1, 1)
      const shop = new Shop([expected])
      const actual = shop.items[0]

      expect(actual).toEqual(expected)
    })

    it('shop items count remains unchanged', () => {
      const shop = new Shop([new Item('foo', 1, 1)])

      expect(shop.items.length).toBe(1)
    })
  })

  describe('updateQuality method tests', () => {
    describe('normal item', () => {
      it('name of an item is not modified', () => {
        const shop = new Shop([new Item('foo', 1, 1)])

        const items = shop.updateQuality()

        expect(items[0].name).toEqual('foo')
      })

      it('quality of an item decreases by 1 each day', () => {
        const shop = new Shop([new Item('foo', 1, 1)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(0)
      })

      it('sellIn of an item decreases by 1 each day', () => {
        const shop = new Shop([new Item('foo', 1, 1)])

        const items = shop.updateQuality()

        expect(items[0].sellIn).toBe(0)
      })

      it('quality of an item is never negative', () => {
        const shop = new Shop([new Item('foo', 1, 0)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(0)
      })

      it('quality of an item is never more than 50', () => {
        const shop = new Shop([new Item('foo', 1, 50)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBeLessThan(50)
      })

      it('quality of an item decreases by 2 when sellIn is negative', () => {
        const shop = new Shop([new Item('foo', -1, 5)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(3)
      })
    })

    describe('Aged Brie', () => {
      it('"Aged Brie" quality increases by 1 each day', () => {
        const shop = new Shop([new Item('Aged Brie', 1, 1)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(2)
      })

      it('"Aged Brie" quality increases by 1 when sellIn is negative', () => {
        const shop = new Shop([new Item('Aged Brie', -1, 1)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(2)
      })

      it('"Aged Brie" quality is never more than 50', () => {
        const shop = new Shop([new Item('Aged Brie', 1, 50)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(50)
      })
    })

    describe('Sulfuras', () => {
      it('"Sulfuras" quality never decreases', () => {
        const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 50)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(50)
      })

      it('"Sulfuras" sellIn never decreases', () => {
        const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 50)])

        const items = shop.updateQuality()

        expect(items[0].sellIn).toBe(1)
      })
    })

    describe('Backstage passes', () => {
      it('"Backstage passes" quality increases by 1 when sellIn is higher than 10', () => {
        const shop = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 11, 5)
        ])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(6)
      })

      it('"Backstage passes" quality increases by 2 when sellIn is 10 days or less', () => {
        const shop = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)
        ])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(2)
      })

      it('"Backstage passes" quality increases by 3 when sellIn is 5 days or less', () => {
        const shop = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)
        ])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(3)
      })

      it('"Backstage passes" quality drops to 0 when sellIn is 0', () => {
        const sellIn = 0
        const shop = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, 5)
        ])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(sellIn)
      })
    })

    xdescribe('Conjured', () => {
      const quality = 5

      it('"Conjured" item quality decreases by 2 each day', () => {
        const shop = new Shop([new Item('Conjured Mana Cake', 11, quality)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(quality - 2)
      })

      it('"Conjured" item quality decreases by 4 when sellIn is negative', () => {
        const shop = new Shop([new Item('Conjured Mana Cake', -1, quality)])

        const items = shop.updateQuality()

        expect(items[0].quality).toBe(quality - 4)
      })
    })
  })
})
