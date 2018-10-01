# Tiled to Pixi
Transforms a Tiled tmx map to a Pixi container ready to use.

## How to use Tiled to Pixi
Load your .tmx file and the necessary assets to render the map using PIXI.Loader, and let the module do the rest!

### Collision Layer
To create a Collision Layer, create a layer named "Collisions" in Tiled and use any sprite to mark a tile as collisionable. 
Then, to check collisions just call the method isWalkable from CollisionLayer:

```javascript
[...]
let map = {}
PIXI.loader
  [...]
  .load(function (loader, resources) {
    map = new TiledMap('YourMapId')
    [...]
  })
[...]
map.layers.CollisionLayer.isWalkable(x, y)
```
IsWalkable method returns false if the sprite containing (x,y) coords has been marked as collisionable, returns true otherwise.

## Example code:
```javascript
const PIXI = require('pixi.js')
const TiledMap = require('tiled-to-pixi')

const app = new PIXI.Application()
document.body.appendChild(app.view)

PIXI.loader
  .add('YourMapId', 'maps/testmap.tmx')
  .add('assets/overworld.png')

  .use(TiledMap.middleware)

  .load(function (loader, resources) {
    let map = new TiledMap('YourMapId')
    app.stage.addChild(map)
    app.start()
  })
```

You can also find a simple example in the example folder, or a more complete example at https://github.com/Reynau/the-game

## License
MIT © [Xavier Lopez Reynau](http://lopezreynau.me/)
