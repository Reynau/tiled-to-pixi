import * as PIXI from 'pixi.js'

class TileSet {
  constructor (route, tileSet) {
    this.setTileSetProperties(tileSet)
    this.baseTexture = PIXI.Texture.from(route + '/' + tileSet.image.source)
    this.setTileTextures()
  }

  setTileSetProperties (tileSet) {
    for (const property in tileSet) {
      if (Object.prototype.hasOwnProperty.call(tileSet, property)) {
        this[property] = tileSet[property]
      }
    }
  }

  setTileTextures () {
    this.textures = []
    for (let y = this.margin; y < this.image.height; y += this.tileHeight + this.spacing) {
      for (let x = this.margin; x < this.image.width; x += this.tileWidth + this.spacing) {
        const tileRectangle = new PIXI.Rectangle(x, y, this.tileWidth, this.tileHeight)
        this.textures.push(new PIXI.Texture(this.baseTexture, tileRectangle))
      }
    }
  }
}

module.exports = TileSet
