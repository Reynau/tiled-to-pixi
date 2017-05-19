const Tile = require('./Tile')

class TileLayer extends PIXI.Container {
  constructor (layer, tileSets) {
    this.setLayerProperties(layer)
    this.alpha = parseFloat(layer.opacity)
    this.setLayerTiles(layer, tileSets)
  }

  setLayerProperties (layer) {
    for (let property in layer) {
      if (layer.hasOwnProperty(property)) {
        this[property] = layer[property]
      }
    }
  }

  setLayerTiles (layer, tileSets) {
    this.tiles = []
    for (let y = 0; y < layer.map.height; y++) {
      for (let x = 0; x < layer.map.width; x++) {
        let i = x + (y * layer.map.width)

        if (layer.tiles[i] && layer.tiles[i].gid && layer.tiles[i].gid !== 0) {
          let tileSet = findTileSet(layer.tiles[i].gid, tileSets)
          let tile = new Tile(layer.tiles[i], tileSet, layer.horizontalFlips[i], layer.verticalFlips[i], layer.diagonalFlips[i])

          tile.x = x * layer.map.tileWidth
          tile.y = y * layer.map.tileHeight + (layer.map.tileHeight - tile.textures[0].height)

          tile._x = x
          tile._y = y

          if (tileSet.tileOffset) {
            tile.x += tileSet.tileOffset.x
            tile.y += tileSet.tileOffset.y
          }

          if (tile.textures.length > 1) {
            tile.animationSpeed = 1000 / 60 / tile.animations[0].duration
            tile.gotoAndPlay(0)
          }

          this.tiles.push(tile)

          this.addTile(tile)
        }
      }
    }
  }

  addTile (tile) {
    this.addChild(tile)
  }
}

function findTileSet(gid, tileSets) {
  let tileSet
  for (let i = tileSets.length - 1; i >= 0; i--) {
    tileSet = tileSets[i]
    if (tileSet.firstGid <= gid) {
      break
    }
  }
  return tileSet
}

module.exports = TileLayer