import * as PIXI from 'pixi.js'

function setTextures (tile, tileSet) {
  let textures = []
  if (tile.animations.length) {
    tile.animations.forEach(function (frame) {
      textures.push(tileSet.textures[frame.tileId])
    }, this)
  } else {
    textures.push(tileSet.textures[tile.gid - tileSet.firstGid])
  }
  return textures
}

class Tile extends PIXI.AnimatedSprite {
  constructor (tile, tileSet, horizontalFlip, verticalFlip, diagonalFlip) {
    let textures = setTextures(tile, tileSet)
    super(textures)

    this.textures = textures
    this.tileSet = tileSet
    this.setTileProperties(tile)
    this.setFlips(horizontalFlip, verticalFlip, diagonalFlip)
  }

  setTileProperties (tile) {
    for (let property in tile) {
      if (tile.hasOwnProperty(property)) {
        this[property] = tile[property]
      }
    }
  }

  setFlips (horizontalFlip, verticalFlip, diagonalFlip) {
    if (horizontalFlip) {
      this.anchor.x = 1
      this.scale.x = -1
    }

    if (verticalFlip) {
      this.anchor.y = 1
      this.scale.y = -1
    }

    if (diagonalFlip) {
      if (horizontalFlip) {
        this.anchor.x = 0
        this.scale.x = 1
        this.anchor.y = 1
        this.scale.y = 1

        this.rotation = PIXI.DEG_TO_RAD * 90
      }
      if (verticalFlip) {
        this.anchor.x = 1
        this.scale.x = 1
        this.anchor.y = 0
        this.scale.y = 1

        this.rotation = PIXI.DEG_TO_RAD * -90
      }
    }
  }
}

module.exports = Tile