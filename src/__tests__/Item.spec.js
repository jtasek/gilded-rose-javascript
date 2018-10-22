import { Item } from '../Item'

it('Item should be defined', function() {
  let item = new Item()

  expect(item).toBeDefined()
})

it('quality should be undefined when not specified in the constructor', function() {
  let item = new Item()

  expect(item.quality).toBeUndefined()
})

it('sellIn should be undefined when not specified in the constructor', function() {
  let item = new Item()

  expect(item.sellIn).toBeUndefined()
})

it('name should be undefined when not specified in the constructor', function() {
  let item = new Item()

  expect(item.name).toBeUndefined()
})

it('quality should be defined when specified in the constructor', function() {
  let item = new Item('foo', 0, 1)

  expect(item.quality).toBe(1)
})

it('sellIn should be defined when specified in the constructor', function() {
  let item = new Item('foo', 1, 0)

  expect(item.sellIn).toBe(1)
})

it('name should be defined when specified in the constructor', function() {
  let item = new Item('foo')

  expect(item.name).toBe('foo')
})