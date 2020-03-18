import * as PIXI from 'pixi.js'

function setTextures (tile, tileSet) {
  const textures = []
  if (tile.animations.length) {
    tile.animations.forEach((frame) => textures.push(tileSet.textures[frame.tileId]))
  } else {
    textures.push(tileSet.textures[tile.gid - tileSet.firstGid])
  }
  return textures
}

class Tile extends PIXI.AnimatedSprite {
  constructor (tile, tileSet, horizontalFlip, verticalFlip, diagonalFlip) {
    const textures = setTextures(tile, tileSet)
    super(textures)

    this.textures = textures
    this.tileSet = tileSet
    this.setTileProperties(tile)
    this.setFlips(horizontalFlip, verticalFlip, diagonalFlip)
  }

  setTileProperties (tile) {
    for (const property in tile) {
      if (Object.prototype.hasOwnProperty.call(tile, property)) {
        this[property] = tile[property]
      }
    }
  }

  setFlips (horizontalFlip, verticalFlip, diagonalFlip) {
    if (horizontalFlip) this.setHorizontalFlip()
    if (verticalFlip) this.setVerticalFlip()
    if (diagonalFlip) {
      if (horizontalFlip) this.setHorizontalDiagonalFlip()
      if (verticalFlip) this.setVerticalDiagonalFlip()
    }
  }

  setHorizontalFlip () {
    this.anchor.x = 1
    this.scale.x = -1
  }

  setVerticalFlip () {
    this.anchor.y = 1
    this.scale.y = -1
  }

  setHorizontalDiagonalFlip () {
    this.anchor.x = 0
    this.scale.x = 1
    this.anchor.y = 1
    this.scale.y = 1

    this.rotation = PIXI.DEG_TO_RAD * 90
  }

  setVerticalDiagonalFlip () {
    this.anchor.x = 1
    this.scale.x = 1
    this.anchor.y = 0
    this.scale.y = 1

    this.rotation = PIXI.DEG_TO_RAD * -90
  }
}

module.exports = Tile
