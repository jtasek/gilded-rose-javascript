import * as strategies from './Strategies.js'

export function getUpdater(item) {
    return strategies.find(item.type === strategy.type) || defaultStrategy;
}