export class Shop {
    constructor(items = [], updaterFactory = {}) {
        this.items = items;
        this.updaterFactory = updaterFactory;
    }

    updateItem(item) {
        const updater = this.updaterFactory(item);

        updater.update(item);
    }

    updateQuality() {
        this.items.forEach(item => this.updateItem(item));

        return this.items;
    }
}