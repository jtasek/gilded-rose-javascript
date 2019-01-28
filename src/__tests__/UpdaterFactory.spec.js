import {getUpdater} from '../UpdaterFactory';
import {defaultStrategy} from '../ShopStrategies';

describe('getUpdater', () => {
    it('getUpdater is defined', () => {
        expect(getUpdater).toBeDefined();
    });

    it('getUpdater returns default strategy for a generic item', () => {
        const expected = defaultStrategy;
        const actual = getUpdater({name: 'Generic item'});

        expect(actual).toBe(expected);
    });
});