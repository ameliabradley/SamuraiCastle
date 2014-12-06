/**
 * Created by ElephantHunter on 12/5/2014.
 */
module SamuraiCastle.Html5 {
    import PlayerColor = SamuraiCastle.Core.PlayerColor;
    import Board = SamuraiCastle.Core.Board;

    export class HtmlBoard {
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

        constructor() {
            var s = Snap("#GameBody");
            var self = this;

            Snap.load("assets/hex.svg", function (f) {
                f.select("#hexBackground").addClass("hexBackground");

                var iHexSmallWidth = 52;
                var iHexHeight = 44;
                var g:any = f.select("#layer1");
                $(g.node).children(":not(.hexBackground)").attr("pointer-events", "none");

                var tile = s.g();
                tile.append(g);

                var tiles = s.g();
                s.append(tiles);

                var board = new Board();
                board.getTiles().forEach((item, index, array) => {
                    var newSnap = Snap(tile.clone());
                    var tileClone:any = newSnap.select("g");
                    var iX = item.x * iHexSmallWidth;
                    var iY = (item.y * iHexHeight) - (item.x * iHexHeight / 2);

                    var color = self.getHexByColor(item.color);
                    newSnap.select(".hexBackground").attr({fill: color});
                    //console.debug(color.toString());

                    var mDefault:any = new Snap.Matrix();
                    mDefault.translate(iX, iY);
                    tileClone.animate({
                        transform: mDefault
                    }, 0);
                    
                    tileClone.mouseover(function () {
                        console.debug(item.toString());
                        var m:any = new Snap.Matrix();
                        m.translate(iX, iY + (-iHexHeight / 3));

                        tileClone.animate({
                            transform: m
                        }, 500, mina.easein);
                    }).mouseout(function () {
                        tileClone.animate({
                            transform: mDefault
                        }, 500, mina.easein);
                    });

                    tiles.append(tileClone);
                });

                var jSvgCanvas = $("#GameBody");
                var iWidth = jSvgCanvas.width();
                var iHeight = jSvgCanvas.height();

                var m:any = new Snap.Matrix();
                m.translate(iWidth / 2, iHeight / 2);

                tile.remove();
                tiles.transform(m);
                tiles.drag();
            });
        }
    }
}