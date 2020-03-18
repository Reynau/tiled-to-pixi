class CollisionLayer {
  constructor (layer) {
    this.tilesMap = layer.tiles
    this.constructCollisionsMap()

    this.width = layer.map.width
    this.height = layer.map.height

    this.tileWidth = layer.map.tileWidth
    this.tileHeight = layer.map.tileHeight
  }

  isWalkable (x, y) {
    const posx = Math.floor(x / this.tileWidth)
    const posy = Math.floor(y / this.tileHeight)

    return this.collisionsMap[posx + posy * this.width]
  }

  constructCollisionsMap () {
    this.collisionsMap = new Array(this.tilesMap.length)

    for (let i = 0; i < this.tilesMap.length; ++i) {
      const tile = this.tilesMap[i]

      this.collisionsMap[i] = (tile === undefined)
    }
  }

  getCollidables () {
    const collidables = []

    let row = 0; let column = 0
    for (let i = 0; i < this.tilesMap.length; ++i) {
      column = i % this.width
      row = Math.floor(i / this.width)

      const tile = this.tilesMap[i]
      if (tile === undefined) continue

      const newCollidable = {
        x: column * this.tileWidth,
        y: row * this.tileHeight,
        width: this.tileWidth,
        height: this.tileHeight
      }
      collidables.push(newCollidable)
    }
    return collidables
  }
}

module.exports = CollisionLayer
