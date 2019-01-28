const QUALITY_MAX = 50;
const QUALITY_MIN = 0;
const SELLIN_FIRST_TRESHOLD = 10;
const SELLIN_SECOND_TRESHOLD = 5;
const DEGRADE_SPEED = 1;

const BRIE_NAME = 'Aged Brie';
const CONCERT_NAME = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS_NAME = 'Sulfuras, Hand of Ragnaros';

function increaseQuality(item) {
    if (item.quality < QUALITY_MAX) {
        item.quality = item.quality + 1;
    }
}

function decreaseQuality(item, speed = DEGRADE_SPEED) {
    item.quality = item.quality > QUALITY_MIN + speed ? item.quality - speed : QUALITY_MIN;
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
        decreaseSellIn(item);
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
        decreaseSellIn(item);
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

function conjuredStrategy(item) {
    if (item.name.startsWith("Conjured")) {
        decreaseSellIn(item);
        const speed = DEGRADE_SPEED * 2;

        decreaseQuality(item, speed);

        if (isExpired(item)) {
            decreaseQuality(item, speed);
        }

        return true;
    }
    return false;
}

function defaultStrategy(item) {
    decreaseSellIn(item);
    decreaseQuality(item);

    if (isExpired(item)) {
        decreaseQuality(item);
    }

    return true;
}

function sulfurasStrategy(item) {
    return item.name === SULFURAS_NAME;
}

const strategies = [sulfurasStrategy, brieStrategy, concertStrategy, conjuredStrategy];

function updateItem(item) {
    strategies.find(strategy => strategy(item)) || defaultStrategy(item);
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