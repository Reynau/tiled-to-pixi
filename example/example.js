import * as PIXI from 'pixi.js'
import TiledMap from './../src/TiledMap'

const app = new PIXI.Application()
document.body.appendChild(app.view)

PIXI.Loader.shared
  .add('assets/overworld.png') // Tileset to render both maps

  .add('TestMap1', 'maps/testmap1.tmx')
  .add('TestMap2', 'maps/testmap2.tmx')

  .use(TiledMap.middleware)

  .load(function (loader, resources) {
  	// Generate the containers for both maps
    let map1 = new TiledMap('TestMap1')
    let map2 = new TiledMap('TestMap2')

    console.log(map1.layers.CollisionLayer.getCollidables())

    app.stage.addChild(map1)
    //app.stage.addChild(map2)
    
    app.start()
  })