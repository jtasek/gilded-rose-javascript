import {getUpdater} from '../UpdaterFactory';
import {
    DefaultStrategy,
    BrieStrategy,
    ConcertStrategy,
    ConjuredStrategy,
    SulfurasStrategy
} from '../ShopStrategies';

describe('getUpdater', () => {
    it('getUpdater is defined', () => {
        expect(getUpdater).toBeDefined();
    });

    it('getUpdater returns default strategy for the generic item', () => {
        const item = {name: 'Generic item'};
        const expected = DefaultStrategy;
        const actual = getUpdater(item);

        expect(actual).toBe(expected);

        expect(DefaultStrategy.test(item)).toBeTruthy();
    });

    it('getUpdater returns brie strategy for the brie item', () => {
        const expected = BrieStrategy;
        const actual = getUpdater({name: 'Aged Brie'});

        expect(actual).toBe(expected);
    });

    it('getUpdater returns concert strategy for the concert generic item', () => {
        const expected = ConcertStrategy;
        const actual = getUpdater({name: 'Backstage passes to a TAFKAL80ETC concert'});

        expect(actual).toBe(expected);
    });

    it('getUpdater returns conjured strategy for the conjured item', () => {
        const expected = ConjuredStrategy;
        const actual = getUpdater({name: 'Conjured item'});

        expect(actual).toBe(expected);
    });

    it('getUpdater returns sulfuras strategy for the sulfuras item', () => {
        const expected = SulfurasStrategy;
        const actual = getUpdater({name: 'Sulfuras, Hand of Ragnaros'});

        expect(actual).toBe(expected);
    });
});