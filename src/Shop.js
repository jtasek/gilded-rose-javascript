// TODO - implement new requirement
const MIN_QUALITY_LIMIT = 0
const MAX_QUALITY_LIMIT = 50

const QUALITY_UPDATE_STEP = 1
const DOUBLE_QUALITY_UPDATE_STEP = QUALITY_UPDATE_STEP * 2

const BASE_SELLIN_TRESHOLD = 0
const FIRST_SELLIN_TRESHOLD = 10
const FIRST_SELLIN_TRESHOLD_QUALITY_UPDATE_STEP = 2
const SECOND_SELLIN_TRESHOLD = 5
const SECOND_SELLIN_TRESHOLD_QUALITY_UPDATE_STEP = 3
const SELLIN_UPDATE_STEP = 1

function getQualityUpdateStep(item) {
  return item.sellIn < BASE_SELLIN_TRESHOLD
    ? DOUBLE_QUALITY_UPDATE_STEP
    : QUALITY_UPDATE_STEP
}

function decreaseSellIn(item) {
  item.sellIn -= SELLIN_UPDATE_STEP
}

function resetQuality(item) {
  item.quality = MIN_QUALITY_LIMIT
}

function increaseQuality(item, step) {
  const updateStep = step ? step : getQualityUpdateStep(item)

  item.quality =
    item.quality < MAX_QUALITY_LIMIT - updateStep
      ? item.quality + updateStep
      : MAX_QUALITY_LIMIT
}

function decreaseQuality(item) {
  const updateStep = getQualityUpdateStep(item)

  item.quality =
    item.quality > MIN_QUALITY_LIMIT + updateStep
      ? item.quality - updateStep
      : MIN_QUALITY_LIMIT
}

const defaultSellingStrategy = item => {
  decreaseQuality(item)
  decreaseSellIn(item)
}

const cheeseSellingStrategy = item => {
  increaseQuality(item)
  decreaseSellIn(item)
}

const concertSellingStrategy = item => {
  if (item.sellIn <= BASE_SELLIN_TRESHOLD) {
    resetQuality(item)
  } else if (item.sellIn <= SECOND_SELLIN_TRESHOLD) {
    increaseQuality(item, SECOND_SELLIN_TRESHOLD_QUALITY_UPDATE_STEP)
  } else if (item.sellIn <= FIRST_SELLIN_TRESHOLD) {
    increaseQuality(item, FIRST_SELLIN_TRESHOLD_QUALITY_UPDATE_STEP)
  } else {
    increaseQuality(item)
  }

  decreaseSellIn(item)
}

const constantSellingStrategy = item => {
  // this item doesn't age and keeps quality
}

// Map special items to concrete strategies
const sellingStrategies = {
  'Aged Brie': cheeseSellingStrategy,
  'Backstage passes to a TAFKAL80ETC concert': concertSellingStrategy,
  'Sulfuras, Hand of Ragnaros': constantSellingStrategy
}

export class Shop {
  constructor(items = []) {
    // TODO: dependency injection
    this.items = items
    this.sellingStrategies = sellingStrategies
    this.defaultSellingStrategy = defaultSellingStrategy
  }
  findSellingStrategy(item) {
    const concreteStrategy = this.sellingStrategies[item.name]
    // In case no concrete strategy is found just return default strategy
    return concreteStrategy ? concreteStrategy : this.defaultSellingStrategy
  }
  updateQuality() {
    // Iterate over all items
    return this.items.map(item => {
      const sellignStrategy = this.findSellingStrategy(item)
      // Update quality of an item with concrete selling strategy
      sellignStrategy(item)
      // Return processed item
      return item
    })
  }
}
