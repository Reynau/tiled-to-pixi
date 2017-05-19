const path = require('path')
const TileSet = require('./TileSet')
const TileLayer = require('./TileLayer')
const CollisionLayer = require('./CollisionLayer')

class TiledMap extends PIXI.Container {
  constructor (resourceId) {
    super()

    let resource = PIXI.loader.resources[resourceId]
    let route = path.dirname(resource.url)

    this.setDataProperties(resource.data)

    this.backgroundLayer = this.createBackgroundLayer()
    this.addLayer(this.backgroundLayer)

    this.setDataTileSets(resource.data, route)
    this.setDataLayers(resource.data)
  }

  setDataProperties (data) {
    for (let property in data) {
      if (data.hasOwnProperty(property)) {
        this[property] = data[property]
      }
    }
  }

  createBackgroundLayer () {
    let background = new PIXI.Graphics()
    background.beginFill(0x000000, 0)
    background.drawRect(0, 0, this.width * this.tileWidth, this.height * this.tileHeight)
    background.endFill()
    return background
  }

  setDataTileSets (data, route) {
    this.tileSets = []
    data.tileSets.forEach(function (tileSetData) {
      this.tileSets.push(new TileSet(route, tileSetData))
    }, this)
  }

  setDataLayers (data) {
    data.layers.forEach(function (layerData) {
      switch (layerData.type) {
        case 'tile':
          switch (layerData.name) {
            case "Collisions":
              this.layers['CollisionLayer'] = new CollisionLayer(layerData)
              break
            default:
              let tileLayer = new TileLayer(layerData, this.tileSets)
              this.layers[layerData.name] = tileLayer
              this.addLayer(tileLayer)
              break
          }
          break
        default:
          this.layers[layerData.name] = layerData
      }
    }, this)
  }

  addLayer (layer) {
    this.addChild(layer)
  }
}

module.exports = TiledMap