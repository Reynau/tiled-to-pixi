const PIXI = require('pixi.js')
const TiledMap = require('./../src/TiledMap')

const app = new PIXI.Application()
document.body.appendChild(app.view)

PIXI.loader
  .add('assets/overworld.png') // Tileset to render both maps

  .add('TestMap1', 'maps/testmap1.tmx')
  .add('TestMap2', 'maps/testmap2.tmx')

  .use(TiledMap.middleware)

  .load(function (loader, resources) {
  	// Generate the containers for both maps
    let map1 = new TiledMap('TestMap1')
    let map2 = new TiledMap('TestMap2')

    app.stage.addChild(map1)
    //app.stage.addChild(map2)
    
    app.start()
  })