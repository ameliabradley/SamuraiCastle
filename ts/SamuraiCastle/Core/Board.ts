/**
 * Created by ElephantHunter on 12/5/2014.
 */
module SamuraiCastle.Core {
    export class Board {
        private aBoardTile:Tile[] = [];

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