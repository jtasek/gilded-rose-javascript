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

export class BrieStrategy {
    test(item) {
        return item.name === BRIE_NAME;
    }

    update() {
        decreaseSellIn(item);
        increaseQuality(item);

        if (isExpired(item)) {
            increaseQuality(item);
        }
    }
}

export class ConcertStrategy {
    test(item) {
        return item.name === CONCERT_NAME;
    }

    update(item) {
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
    }
}

export class ConjuredStrategy {
    test(item) {
        return item.name.startsWith("Conjured");
    }

    update(test) {
        decreaseSellIn(item);
        const speed = DEGRADE_SPEED * 2;

        decreaseQuality(item, speed);

        if (isExpired(item)) {
            decreaseQuality(item, speed);
        }
    }
}

export class defaultStrategy {
    test(item){
        return true;
    }

    decreaseSellIn(item);
    decreaseQuality(item);

    if (isExpired(item)) {
        decreaseQuality(item);
    }
}

export function sulfurasStrategy(item) {
    return item.name === SULFURAS_NAME;
}

export const strategies = [sulfurasStrategy, brieStrategy, concertStrategy, conjuredStrategy];