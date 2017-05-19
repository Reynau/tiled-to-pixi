// const Container = PIXI.Container
const path = require('path')
const TileSet = require('./TileSet')
const TileLayer = require('./TileLayer')
const CollisionLayer = require('./CollisionLayer')

class TiledMap extends PIXI.Container {
  constructor (resourceUrl) {
    super(this)

    let route = path.dirname(resourceUrl)
    let data = PIXI.loader.resources[resourceUrl].data

    this.setDataProperties(data)

    this.background = this.createNewBackground()
    this.addLayer(this.background)

    this.setDataTileSets(data, route)
    this.setDataLayer(data)
  }

  setDataProperties (data) {
    for (let property in data) {
      if (data.hasOwnProperty(property)) {
        this[property] = data[property]
      }
    }
  }

  createNewBackground () {
    let background = new PIXI.Graphics()
    background.beginFill(0x000000, 0)
    background.drawRect(0, 0, this.width * this.tileWidth, this.height * this.tileHeight)
    background.endFill()
    return background
  }

  setDataTileSets (data, route) {
    this.tileSets = []
    data.tileSets.forEach(function (tilesetData) {
      this.tileSets.push(new TileSet(route, tilesetData))
    }, this)
  }

  setDataLayer (data) {
    data.layers.forEach(function (layerData) {
      switch (layerData.type) {
        case 'tile':
          switch (layerData.name) {
            case "Collisions":
              this.layers['CollisionLayer'] = new CollisionLayer(layerData)
              break
            default:
              this.layers[layerData.name] = new TileLayer(layerData, this.tileSets)
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