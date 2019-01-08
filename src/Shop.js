const QUALITY_MAX = 50;
const QUALITY_MIN = 0;
const SELLIN_FIRST_TRESHOLD = 10;
const SELLIN_SECOND_TRESHOLD = 5;

const BRIE_NAME = 'Aged Brie';
const CONCERT_NAME = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS_NAME = 'Sulfuras, Hand of Ragnaros';

function increaseQuality(item) {
    if (item.quality < QUALITY_MAX) {
        item.quality = item.quality + 1;
    }
}

function decreaseQuality(item) {
    if (item.quality > QUALITY_MIN) {
        item.quality = item.quality - 1;
    }
}

function decreaseSellIn(item) {
    item.sellIn = item.sellIn - 1;
}

function resetQuality(item) {
    item.quality = QUALITY_MIN;
}

function isExpired(item) {
    return item.sellIn < 0;
}

function brieStrategy(item) {
    if (item.name === BRIE_NAME) {
        increaseQuality(item);

        if (isExpired(item)) {
            increaseQuality(item);
        }

        return true;
    }

    return false;
}

function concertStrategy(item) {
    if (item.name === CONCERT_NAME) {
        increaseQuality(item);

        if (isExpired(item)) {
            resetQuality(item);
        } else {
            if (item.sellIn < SELLIN_FIRST_TRESHOLD) {
                increaseQuality(item);
            }
            if (item.sellIn < SELLIN_SECOND_TRESHOLD) {
                increaseQuality(item);
            }
        }

        return true;
    }
    return false;
}

function defaultStrategy(item) {
    decreaseQuality(item);

    if (isExpired(item)) {
        decreaseQuality(item);
    }

    return true;
}

const strategies = [brieStrategy, concertStrategy, defaultStrategy];

function updateItem(item) {
    if (item.name === SULFURAS_NAME) return;

    decreaseSellIn(item);

    strategies.find(strategy => strategy(item))
}

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => updateItem(item));

        return this.items;
    }
}