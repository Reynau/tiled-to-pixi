module.exports = class CollisionLayer {

  constructor(layer) {
    this.tilesMap = layer.tiles
    this.constructCollisionsMap()

    this.width = layer.map.width
    this.height = layer.map.height

    this.tileWidth = layer.map.tileWidth
    this.tileHeight = layer.map.tileHeight
  }

  isWalkable(x, y) {
    let posx = Math.floor(x / this.tileWidth)
    let posy = Math.floor(y / this.tileHeight)

    return this.collisionsMap[posx + posy * this.width]
  }

  constructCollisionsMap() {
    this.collisionsMap = new Array(this.tilesMap.length)

    for (let i = 0; i < this.tilesMap.length; ++i) {
      let tile = this.tilesMap[i]

      this.collisionsMap[i] = (tile === undefined)
    }
  }

  getCollidables(){
    let r=0, c=0,
        collidables = []
    for (let i = 0; i < this.tilesMap.length; ++i) {
      c = i%this.width;
      if(i%this.width==0&&i!==0)
        r++;      
      let tile = this.tilesMap[i]

      if(tile !== undefined)
        collidables.push({x: c*this.tileWidth, y: r*this.tileHeight, width: this.tileWidth, height: this.tileHeight})  
    }
    return collidables
  }
}
