/**
 * Created by ElephantHunter on 12/5/2014.
 */
declare var noise:any;
module SamuraiCastle.Core {
    export class Board {
        private aBoardTile:Tile[] = [];
        private aBoardTileByPos:Tile[][] = [];

        get adjacentHexes():number[][] {
            return [
                [1,1],
                [1,0],
                [-1,-1],
                [-1,0],
                [0,-1],
                [0,1]
            ];
        }

        tryGetHex(x:number, y:number):Tile {
            if (!this.aBoardTileByPos[x]) {
                return null;
            }

            if (!this.aBoardTileByPos[x][y]) {
                return null;
            }

            return this.aBoardTileByPos[x][y];
        }

        // TODO: Speed this up
        getAdjacent(x:number, y:number):Tile[] {
            var aAdjacentHexes = [];
            if (!this.tryGetHex(x, y)) return;
            this.adjacentHexes.forEach((hexPos) => {
                var xDiff = hexPos[0];
                var yDiff = hexPos[1];
                var hex = this.tryGetHex(x + xDiff, y + yDiff);
                if (hex) {
                    aAdjacentHexes.push(hex);
                }
            });
            return aAdjacentHexes;
        }

        // TODO: Speed this up
        getAdjacentMatchingColor(x:number, y:number, aSearched:Tile[] = [], aAdjacentHexes:Tile[] = []):Tile[] {
            var searchHex = this.tryGetHex(x, y);
            if (!searchHex) return;
            this.adjacentHexes.forEach((hexPos) => {
                var xDiff = x + hexPos[0];
                var yDiff = y + hexPos[1];
                var hex = this.tryGetHex(xDiff, yDiff);
                if (hex && hex.color == searchHex.color) {
                    if (aSearched.indexOf(hex) !== -1) {
                        return;
                    }

                    aSearched.push(hex);
                    aAdjacentHexes.push(hex);
                    this.getAdjacentMatchingColor(xDiff, yDiff, aSearched, aAdjacentHexes);
                }
            });
            return aAdjacentHexes;
        }

        addTile(x:number, y:number, color:PlayerColor) {
            var boardTile = new Tile(this, x, y, color);

            // TODO: Speed this up
            this.aBoardTile.push(boardTile);
            this.aBoardTile.sort(function (a, b) {
                if (a.y > b.y) {
                    return 1;
                } else if (a.y == b.y) {
                    if (a.x < b.x) {
                        return 1;
                    }
                }

                return -1;
            });

            if (!this.aBoardTileByPos[x]) {
                this.aBoardTileByPos[x] = [];
            }

            this.aBoardTileByPos[x][y] = boardTile;
        }

        getTiles():Tile[] {
            return this.aBoardTile;
        }

        getRandomInt(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        }

        getColorFromNumber (iNumber:number):PlayerColor {
            switch (iNumber) {
                case 0:
                    return PlayerColor.BROWN;
                    break;
                case 1:
                    return PlayerColor.DARKBROWN;
                    break;
                case 2:
                    return PlayerColor.DARKGREEN;
                    break;
                case 3:
                    return PlayerColor.GREEN;
                    break;
                case 4:
                    return PlayerColor.SAND;
                    break;
            }
        }

        generateBoard (iWidth:number = 60, iHeight:number = 30) {
            var start = Date.now();
            var centerX = iWidth / 2;
            var centerY = iHeight / 2;
            var distMax = Math.min(iHeight, iWidth) / 3;

            var iTotalColors: number = Object.keys(PlayerColor).length / 2;

            noise.seed(Math.random());
            for (var x = 0; x < iWidth; x++) {
                for (var y = 0; y < iHeight; y++) {
                    var value = Math.abs(noise.perlin2(x / 5, y / 5));

                    //Simple squaring, you can use whatever math libraries are available to you to make this more readable
                    //The cool thing about squaring is that it will always give you a positive distance! (-10 * -10 = 100)
                    var distanceX = (centerX - x) * (centerX - x);
                    var distanceY = (centerY - y) * (centerY - y);

                    var distanceToCenter = Math.sqrt(distanceX + distanceY);
                    var distanceValue = distanceToCenter / distMax;
                    value = 1 - ((distanceValue) * (1 - value));

                    if (value > 0.5) {
                        var randomNumber = this.getRandomInt(0, iTotalColors - 1);
                        var randomColor = this.getColorFromNumber(randomNumber);
                        this.addTile(x - centerX, y - centerY, randomColor);
                    } else {
                        value = 0;
                    }
                }
            }
        }

        debugOrder () {
            this.aBoardTile.forEach((boardTile) => console.log(boardTile.toString()));
        }

        constructor () {
            this.generateBoard();
            this.debugOrder();
        }
    }
}