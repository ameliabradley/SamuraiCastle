/**
 * Created by ElephantHunter on 12/6/2014.
 */
module SamuraiCastle.Html5 {
    import Tile = SamuraiCastle.Core.Tile;
    import PlayerColor = SamuraiCastle.Core.PlayerColor;

    export class HtmlTile {
        static iHexSmallWidth = 52;
        static iHexHeight = 44;

        private static tiles;
        private static tileTemplate;

        private x:number;
        private y:number;
        private tileElement;

        getHexByColor(color:PlayerColor):String {
            switch (color) {
                case PlayerColor.BROWN:
                    return "#fc7100";
                case PlayerColor.GREEN:
                    return "#76fc00";
                case PlayerColor.DARKBROWN:
                    return "#b87000";
                case PlayerColor.DARKGREEN:
                    return "#79b800";
                case PlayerColor.SAND:
                    return "#fffd16";
                default:
                    return "#ff0000";
            }
        }

        static prepareAsset (paper:Paper, fnCallback:Function) {
            Snap.load("assets/hex.svg", function (f) {
                // Snap will delete any IDs when cloning
                // so we must use classes
                f.select("#hexBackground").addClass("hexBackground");

                // Grab the layer we want to use
                var groupLayer1:any = f.select("#layer1");

                // Hide pointer events on everything but the background
                // to prevent the events from triggering numerous times
                $(groupLayer1.node).children(":not(.hexBackground)").attr("pointer-events", "none");

                // Create the tile template object
                HtmlTile.tileTemplate = paper.g();
                HtmlTile.tileTemplate.append(groupLayer1);
                //HtmlTile.tileTemplate.remove();

                fnCallback();
            });
        }

        public levitate(speed:number = 500) {
            var m:any = new Snap.Matrix();
            m.translate(this.x, this.y + (-HtmlTile.iHexHeight / 8));

            this.tileElement.animate({
                transform: m
            }, speed, mina.easein);
        }

        public returnToOriginalPosition (speed:number = 500) {
            var mDefault:any = new Snap.Matrix();
            mDefault.translate(this.x, this.y);

            this.tileElement.animate({
                transform: mDefault
            }, speed, mina.easein);
        }

        constructor(htmlBoard:HtmlBoard, tiles:any, tile:Tile) {
            var self = this;

            this.x = tile.x * HtmlTile.iHexSmallWidth;
            this.y = (tile.y * HtmlTile.iHexHeight) - (tile.x * HtmlTile.iHexHeight / 2);

            var newSnap = Snap(HtmlTile.tileTemplate.clone());
            this.tileElement = newSnap.select("g");

            // Fill in the correct color for this tile
            var color = self.getHexByColor(tile.color);
            newSnap.select(".hexBackground").attr({fill: color});

            this.returnToOriginalPosition(0);

            this.tileElement.mouseover(function () {
                console.debug(tile.toString());
                var aAdjacent = htmlBoard.board.getAdjacentMatchingColor(tile.x, tile.y);
                self.levitate();
                aAdjacent.forEach((item) => {
                    htmlBoard.getHtmlTileByTile(item).levitate();
                });
            }).mouseout(function () {
                var aAdjacent = htmlBoard.board.getAdjacentMatchingColor(tile.x, tile.y);
                self.returnToOriginalPosition();
                aAdjacent.forEach((item) => {
                    htmlBoard.getHtmlTileByTile(item).returnToOriginalPosition();
                });
            });

            tiles.append(this.tileElement);
        }
    }
}