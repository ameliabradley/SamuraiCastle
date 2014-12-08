/**
 * Created by ElephantHunter on 12/5/2014.
 */
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
                [0,-1]
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

        generateBoard () {
            this.addTile(0, 0, PlayerColor.BROWN);
            this.addTile(1, 1, PlayerColor.DARKBROWN);
            this.addTile(1, 0, PlayerColor.DARKGREEN);
            this.addTile(0, 1, PlayerColor.GREEN);
            this.addTile(-1, -1, PlayerColor.SAND);
            this.addTile(-1, 0, PlayerColor.BROWN);
            this.addTile(0, -1, PlayerColor.DARKGREEN);
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