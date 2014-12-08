/**
 * Created by ElephantHunter on 12/5/2014.
 */
module SamuraiCastle.Html5 {
    import PlayerColor = SamuraiCastle.Core.PlayerColor;
    import Board = SamuraiCastle.Core.Board;
    import Tile = SamuraiCastle.Core.Tile;

    export class HtmlBoard {
        private htmlTileByPos:HtmlTile[][] = [];
        private tiles:any;
        private _board;

        getHtmlTileByTile (tile:Tile):HtmlTile {
            return this.htmlTileByPos[tile.x][tile.y];
        }

        get board():Board {
            return this._board;
        }

        constructor() {
            var s = Snap("#GameBody");
            var self = this;

            this._board = new Board();
            var jSvgCanvas = $("#GameBody");
            var iWidth = jSvgCanvas.width();
            var iHeight = jSvgCanvas.height();

            var m:any = new Snap.Matrix();
            m.translate(iWidth / 2, iHeight / 2);

            // Create a wrapper for all tiles
            // so they can be easily moved around as a group
            this.tiles = s.g().drag().transform(m);
            s.append(this.tiles);

            HtmlTile.prepareAsset(s, function () {
                self._board.getTiles().forEach((tile, index, array) => {
                    var htmlTile = new HtmlTile(self, self.tiles, tile);

                    if (!self.htmlTileByPos[tile.x]) {
                        self.htmlTileByPos[tile.x] = [];
                    }

                    self.htmlTileByPos[tile.x][tile.y] = htmlTile;
                });
            });
        }
    }
}