# Tiled to Pixi
Transforms a Tiled tmx map to a Pixi container ready to use.

## How to use Tiled to Pixi
Load your .tmx file and the necessary assets to render the maps using PIXI.Loader, and let the module do the rest!

```javascript
import * as PIXI from 'pixi.js'
import TiledMap from 'tiled-to-pixi'

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

    app.stage.addChild(map1)
    //app.stage.addChild(map2)
    
    app.start()
  })
```

How to test this example:
> npm install  
> npm run build_example  

After that, you will find the html file in *tiled-to-pixi/example/viewer* directory

### Collision Layer
To create a Collision Layer, create a layer named "Collisions" in Tiled and use any sprite to mark a tile as collisionable. 
Then, to check collisions just call isWalkable function from CollisionLayer:

```javascript
[...]
let map = {}
PIXI.Loader.shared
  [...]
  .load(function (loader, resources) {
    map = new TiledMap('YourMapId')
    [...]
  })
[...]

if (map.layers.CollisionLayer.isWalkable(x, y)) {
  [...]
}
[...]
let collidables = map.layers.CollisionLayer.getCollidables()
[...]
```
`IsWalkable` returns false if the sprite containing (x,y) coords has been marked as collisionable, returns true otherwise.  
`GetCollidables` returns an array of all the collidable rectangles with their position relative to the map. 


You can also find a simple example in the example folder, or a more complete example at https://github.com/Reynau/the-game

## License
MIT © [Xavier Lopez Reynau](http://lopezreynau.me/)
