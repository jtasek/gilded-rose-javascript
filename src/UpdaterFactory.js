import {DefaultStrategy, strategies} from './ShopStrategies.js'

export function getUpdater(item) {
    return strategies.find((strategy) => strategy.test(item)) || DefaultStrategy;
}