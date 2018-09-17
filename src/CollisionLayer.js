module.exports = class CollisionLayer {

  constructor(layer) {
    this.constructCollisionsMap(layer.tiles)
    this.width = layer.map.width
    this.height = layer.map.height
  }

  isWalkable(x, y) {
    let posx = Math.floor(x / 16)
    let posy = Math.floor(y / 16)

    let resx = x % 16
    let resy = y % 16

    let actual = this.collisionsMap[posx + posy * this.width]

    let right = this.collisionsMap[posx + posy * this.width + 1]
    let left = this.collisionsMap[posx + posy * this.width - 1]
    let up = this.collisionsMap[posx + posy * this.width - this.width]
    let down = this.collisionsMap[posx + posy * this.width + this.width]

    let downRight = this.collisionsMap[posx + posy * this.width + this.width + 1]
    let downLeft = this.collisionsMap[posx + posy * this.width + this.width - 1]
    let upRight = this.collisionsMap[posx + posy * this.width - this.width + 1]
    let upLeft = this.collisionsMap[posx + posy * this.width - this.width - 1]

    let pwl = 6
    let pwr = 8
    let phu = 8
    let phd = 2

    return !(!actual || resx < pwl && !left || resx > pwr && !right || resy > phu && !down || resy < phd && !up ||
    resy > phu && resx > pwr && !downRight || resy > phu && resx < pwl && !downLeft ||
    resy < phd && resx > pwr && !upRight || resy < phd && resx < pwl && !upLeft)
  }

  constructCollisionsMap(tilesMap) {
    this.collisionsMap = new Array(tilesMap.length)

    for (let i = 0; i < tilesMap.length; ++i) {
      let tile = tilesMap[i]

      this.collisionsMap[i] = (tile === undefined)
    }
  }
}