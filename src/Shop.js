const BASE_SELLIN_TRESHOLD = 0
const FIRST_SELLIN_TRESHOLD = 10
const FIRST_SELLIN_TRESHOLD_QUALITY_UPDATE_STEP = 2
const MAX_QUALITY_LIMIT = 50
const MIN_QUALITY_LIMIT = 0
const QUALITY_UPDATE_STEP = 1
const SECOND_SELLIN_TRESHOLD = 5
const SECOND_SELLIN_TRESHOLD_QUALITY_UPDATE_STEP = 3
const SELLIN_UPDATE_STEP = 1

function getQualityUpdateStep(item, step) {
  return item.sellIn < BASE_SELLIN_TRESHOLD ? step * 2 : step
}

function decreaseSellIn(item) {
  item.sellIn -= SELLIN_UPDATE_STEP
}

function resetQuality(item) {
  item.quality = MIN_QUALITY_LIMIT
}

function increaseQuality(item, step = QUALITY_UPDATE_STEP) {
  item.quality =
    item.quality < MAX_QUALITY_LIMIT - step
      ? item.quality + step
      : MAX_QUALITY_LIMIT
}

function decreaseQuality(item, step = QUALITY_UPDATE_STEP) {
  const updateStep = getQualityUpdateStep(item, step)

  item.quality =
    item.quality > MIN_QUALITY_LIMIT + updateStep
      ? item.quality - updateStep
      : MIN_QUALITY_LIMIT
}

const normalSellingStrategy = item => {
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

const conjuredSellingStrategy = item => {
  decreaseQuality(item, QUALITY_UPDATE_STEP * 2)
  decreaseSellIn(item)
}

// Map special items to concrete strategies
const sellingStrategies = {
  'Aged Brie': cheeseSellingStrategy,
  'Backstage passes': concertSellingStrategy,
  Sulfuras: constantSellingStrategy,
  Conjured: conjuredSellingStrategy
}

export class Shop {
  constructor(items = []) {
    // TODO: dependency injection
    this.items = items
    this.sellingStrategies = sellingStrategies
    this.defaultSellingStrategy = normalSellingStrategy
  }
  findSellingStrategy(item) {
    // Search for a concrete strategy for this item
    const strategyKeys = Object.keys(this.sellingStrategies).filter(key =>
      item.name.startsWith(key)
    )

    // In case no concrete strategy is found just return default strategy
    return strategyKeys.length > 0
      ? this.sellingStrategies[strategyKeys[0]]
      : this.defaultSellingStrategy
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
