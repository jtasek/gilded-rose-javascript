import { Shop } from '../Shop';
import { Item } from '../Item';
import { getUpdater } from '../UpdaterFactory';

const QUALITY_MAX = 50;
const QUALITY_MIN = 0;
const SELLIN_FIRST_TRESHOLD = 10;
const SELLIN_SECOND_TRESHOLD = 5;

const BRIE_NAME = 'Aged Brie';
const CONCERT_NAME = 'Backstage passes to a TAFKAL80ETC concert';
const DEFAULT_NAME = 'foo';
const SULFURAS_NAME = 'Sulfuras, Hand of Ragnaros';

function getShopWithoutItems() {
  return new Shop();
}

function getShopWithItem(name= DEFAULT_NAME, sellIn= 1, quality= 1) {
  return new Shop([getItem(name, sellIn, quality)], getUpdater);
}

function getItem(name= DEFAULT_NAME, sellIn= 1, quality= 1) {
  return new Item(name, sellIn, quality);
}

describe('Shop class', () => {
  describe('constructor tests', () => {
    it('shop is defined', () => {
      const shop = getShopWithoutItems();

      expect(shop).toBeDefined();
    });

    it('shop items are defined when not specified in constructor', () => {
      const shop = getShopWithoutItems();

      expect(shop.items).toBeDefined();
    });

    it('shop items are stored unchanged', () => {
      let expected = getItem();
      const shop = new Shop([expected]);
      const actual = shop.items[0];

      expect(actual).toEqual(expected);
    });

    it('shop items count remains unchanged', () => {
      const shop = getShopWithItem();

      expect(shop.items.length).toBe(1);
    })
  });

  describe('updateQuality method tests', () => {
    describe('normal item', () => {
      it('name of an item is not modified', () => {
        const shop = getShopWithItem();

        const items = shop.updateQuality();

        expect(items[0].name).toEqual(DEFAULT_NAME);
      });

      it('quality of an item decreases by 1 each day', () => {
        const shop = getShopWithItem();

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(0)
      });

      it('sellIn of an item decreases by 1 each day', () => {
        const shop = getShopWithItem();

        const items = shop.updateQuality();

        expect(items[0].sellIn).toBe(0);
      });

      it('quality of an item is never negative', () => {
        const shop = getShopWithItem(DEFAULT_NAME, 1, QUALITY_MIN);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(QUALITY_MIN);
      });

      it('quality of an item is never more than 50', () => {
        const shop = getShopWithItem(DEFAULT_NAME, 1, QUALITY_MAX);

        const items = shop.updateQuality();

        expect(items[0].quality).toBeLessThan(QUALITY_MAX);
      });

      it('quality of an item decreases by 2 when sellIn is negative', () => {
        const shop = getShopWithItem(DEFAULT_NAME, -1, 5);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(3)
      });

        it('quality of an item never decreases when sellIn is zero or negative and quality is zero or negative', () => {
            const shop = getShopWithItem(DEFAULT_NAME, 0, QUALITY_MIN);

            const items = shop.updateQuality();

            expect(items[0].quality).toBe(QUALITY_MIN);
        })
    });

    describe('Aged Brie', () => {
      it('"Aged Brie" quality increases by 1 each day', () => {
        const shop = getShopWithItem(BRIE_NAME, 1, 1);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(2);
      });

      it('"Aged Brie" quality increases by 2 when sellIn is negative', () => {
        const shop = getShopWithItem(BRIE_NAME, -1, 1);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(3);
      });

      it('"Aged Brie" quality is never more than 50', () => {
        const shop = getShopWithItem(BRIE_NAME, 1, QUALITY_MAX);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(QUALITY_MAX);
      });

        it('"Aged Brie" quality is never more than 50 when sellIn is negative', () => {
            const shop = getShopWithItem(BRIE_NAME, -1, QUALITY_MAX);

            const items = shop.updateQuality();

            expect(items[0].quality).toBe(QUALITY_MAX);
        })

    });

    describe('Sulfuras', () => {
      it('"Sulfuras" quality never decreases', () => {
        const shop = getShopWithItem(SULFURAS_NAME, 1, QUALITY_MAX);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(QUALITY_MAX);
      });

        it('"Sulfuras" quality never decreases with sellIn is negative', () => {
          const shop = getShopWithItem(SULFURAS_NAME, -1, QUALITY_MAX);

            const items = shop.updateQuality();

            expect(items[0].quality).toBe(QUALITY_MAX)
        });

      it('"Sulfuras" sellIn never decreases', () => {
        const shop = getShopWithItem(SULFURAS_NAME, 1, QUALITY_MAX);

        const items = shop.updateQuality();

        expect(items[0].sellIn).toBe(1);
      })
    });

    describe('Backstage passes', () => {
      it('"Backstage passes" quality increases by 1 when sellIn is higher than 10', () => {
        const shop = getShopWithItem(CONCERT_NAME, 11, 5);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(6);
      });

      it('"Backstage passes" quality increases by 2 when sellIn is 10 days or less', () => {
        const shop = getShopWithItem(CONCERT_NAME, SELLIN_FIRST_TRESHOLD, 0);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(2);
      });

        it('"Backstage passes" quality increases by 1 when quality is 49 and sellIn is 10 days or less', () => {
          const shop = getShopWithItem(CONCERT_NAME, SELLIN_FIRST_TRESHOLD, 49);

            const items = shop.updateQuality();

            expect(items[0].quality).toBe(QUALITY_MAX);
        });

      it('"Backstage passes" quality increases by 3 when sellIn is 5 days or less', () => {
        const shop = getShopWithItem(CONCERT_NAME, SELLIN_SECOND_TRESHOLD, 0);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(3);
      });

        it('"Backstage passes" quality increases by 1 when quality is 49 and sellin is 5 days or less', () => {
            const shop = getShopWithItem(CONCERT_NAME, SELLIN_SECOND_TRESHOLD, 49);

            const items = shop.updateQuality();

            expect(items[0].quality).toBe(QUALITY_MAX);
        });

      it('"Backstage passes" quality drops to 0 when sellIn is 0', () => {
        const sellIn = 0;
        const shop = getShopWithItem(CONCERT_NAME, sellIn, 5);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(sellIn);
      })
    });

    describe('Conjured', () => {
      const quality = 5;

      it('"Conjured" item quality decreases by 2 each day', () => {
        const shop = getShopWithItem('Conjured Mana Cake', 11, quality);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(quality - 2);
      });

      it('"Conjured" item quality decreases by 4 when sellIn is negative', () => {
        const shop = getShopWithItem('Conjured Mana Cake', -1, quality);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(quality - 4);
      })
    })
  })
});
