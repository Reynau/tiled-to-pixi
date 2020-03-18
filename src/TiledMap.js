import * as PIXI from 'pixi.js'

import path from 'path'
import tmx from 'tmx-parser'

import TileSet from './TileSet'
import TileLayer from './TileLayer'
import CollisionLayer from './CollisionLayer'

class TiledMap extends PIXI.Container {

  static middleware (resource, next) {
    if (resource.extension !== 'tmx') return next()

    const xmlString = resource.xhr.responseText
    const pathToFile = resource.url

    tmx.parse(xmlString, pathToFile, (error, map) => {
      if (error) throw error

      resource.data = map
      next()
    })
  }

  constructor (resourceId) {
    super()

    let resource = PIXI.Loader.shared.resources[resourceId]
    let route = path.dirname(resource.url)

    this.setDataProperties(resource.data)
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

  setDataTileSets (data, route) {
    this.tileSets = []
    data.tileSets.forEach(
      (tileSetData) => this.tileSets.push(new TileSet(route, tileSetData))
    )
  }

  setDataLayers (data) {
    data.layers.forEach((layerData) => {
      if (layerData.type === 'tile') {
        this.setTileLayer(layerData)
        return
      }

      this.layers[layerData.name] = layerData
    })
  }

  setTileLayer (layerData) {
    if (layerData.name === "Collisions") {
      this.layers['CollisionLayer'] = new CollisionLayer(layerData)
      return
    }
    
    let tileLayer = new TileLayer(layerData, this.tileSets)
    this.layers[layerData.name] = tileLayer
    this.addLayer(tileLayer)
  }

  addLayer (layer) {
    this.addChild(layer)
  }
}

module.exports = TiledMap