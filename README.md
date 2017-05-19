# Tiled to Pixi
Transforms a Tiled tmx map to a Pixi container ready to usewewerw

## How to use
Load your .tmx file and the necessary assets to render the map using PIXI.Loader, and let the module do the rest!

Example code:
```javascript
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
```

## License
MIT © [Xavier Lopez Reynau](http://lopezreynau.me/)
