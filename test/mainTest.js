const PIXI = require('pixi.js')
const path = require('path')
const tmx = require('tmx-parser')
PIXI.extras.TiledMap = require('./../src/TiledMap')

// PIXI constants
const app = new PIXI.Application()
const loader = PIXI.loader

let map = {}

document.body.appendChild(app.view)

app.stop()
loader
  .add('TestMap', 'maps/testmap.tmx')
  .add('assets/overworld.png')

  .use(middleware)

  .load(function (loader, resources) {
    map = new PIXI.extras.TiledMap('TestMap')
    app.stage.addChild(map)
    app.start()
  })

function middleware (resource, next) {
  if (!(resource.extension === 'tmx')) return next()

  let route = path.dirname(resource.url.replace(this.baseUrl, ''))
  tmx.parse(resource.xhr.responseText, route, function (err, map) {
    if (err) throw err
    resource.data = map
    next()
  })
}