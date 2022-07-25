export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  update(){
    this.sellIn -= 1
    let decay = 1
    if (this.sellIn < 0) {
      decay = decay * 2
    }
    let newQuality = this.quality - decay
    if (newQuality >= 0) {
      this.quality = newQuality
    } else {
      this.quality = 0
    }
  }
}


export class Lendario extends Item {

  constructor (nome) {
    super(nome, 0, 80)
  }
  update() {
  }

}

export class Entrada extends Item {
  update() {
    this.sellIn -= 1
    let appreciation = 1
    if (this.sellIn <= 5) {
      appreciation = 3
    } else if (this.sellIn <= 10){
      appreciation = 2
    }
    if ((this.quality + appreciation) < 50) {
      this.quality += appreciation
    } else {
      this.quality = 50
    }
    if (this.sellIn < 0) {
      this.quality = 0
    }
  }
}

export class Valorizavel extends Item {
  update() {
    this.sellIn -= 1
    if (this.quality < 50) {
      this.quality += 1
    }
  }
}

export class Conjurado extends Item {
  update() {
    this.sellIn -= 1
    let decay = 2
    if (this.sellIn < 0) {
      decay = decay * 2
    }
    let newQuality = this.quality - decay
    if (newQuality >= 0) {
      this.quality = newQuality
    } else {
      this.quality = 0
    }
  }
}



export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(Item => Item.update())
    return this.items
  }
}

function main() {
  let gr = new GildedRose()

  gr.items.push(new Item("+5 Dexterity Vest", 10, 20))
  gr.items.push(new Item("Elixir of the Mongoose", 5, 7))
  gr.items.push(new Valorizavel("Aged Brie", 2, 0))
  gr.items.push(new Entrada("Backstage passes to a TAFKAL80ETC concert", 15, 20))
  gr.items.push(new Lendario("Sulfuras, Hand of Ragnaros"))
  gr.items.push(new Conjurado("Conjured Mana Cake", 3, 6))


  for (let index = 0; index < 5; index++) {
    gr.updateQuality()
  }

  for (let item of gr.items) {
    console.log(item)
  }
}

main()
