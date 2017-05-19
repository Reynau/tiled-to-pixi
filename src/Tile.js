class Tile extends PIXI.extras.AnimatedSprite {
  constructor (tile, tileSet, horizontalFlip, verticalFlip, diagonalFlip) {
    super(this, textures)
    this.setTileProperties(tile)
    this.setTextures(tile, tileSet)
    this.tileSet = tileSet
    this.setFlips(horizontalFlip, verticalFlip, diagonalFlip)
  }

  setTileProperties (tile) {
    for (let property in tile) {
      if (tile.hasOwnProperty(property)) {
        this[property] = tile[property]
      }
    }
  }

  setTextures (tile, tileSet) {
    this.textures = []
    if (tile.animations.length) {
      tile.animations.forEach(function (frame) {
        this.textures.push(tileSet.textures[frame.tileId])
      }, this)
    } else {
      this.textures.push(tileSet.textures[tile.gid - tileSet.firstGid])
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