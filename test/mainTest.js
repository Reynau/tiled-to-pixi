const PIXI = require('pixi.js')
const TiledMap = require('./../src/TiledMap')

const app = new PIXI.Application()
document.body.appendChild(app.view)

PIXI.loader
  .add('TestMap', 'maps/testmap.tmx')
  .add('assets/overworld.png')

  .use(TiledMap.middleware)

  .load(function (loader, resources) {
    let map = new TiledMap('TestMap')
    app.stage.addChild(map)
    app.start()
  })