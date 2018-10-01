module.exports = class CollisionLayer {

  constructor(layer) {
    this.constructCollisionsMap(layer.tiles)

    this.width = layer.map.width
    this.height = layer.map.height

    this.tileWidth = layer.map.tileWidth
    this.tileHeight = layer.map.tileHeight
  }

  isWalkable(x, y) {
    let posx = Math.floor(x / this.tileWidth)
    let posy = Math.floor(y / this.tileHeight)

    return this.collisionsMap[posx + posy * this.width]
  }

  constructCollisionsMap(tilesMap) {
    this.collisionsMap = new Array(tilesMap.length)

    for (let i = 0; i < tilesMap.length; ++i) {
      let tile = tilesMap[i]

      this.collisionsMap[i] = (tile === undefined)
    }
  }
}