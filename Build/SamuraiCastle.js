/**
 * Created by ElephantHunter on 12/5/2014.
 */
var SamuraiCastle;
(function (SamuraiCastle) {
    var Core;
    (function (Core) {
        var Board = (function () {
            function Board() {
                this.aBoardTile = [];
                this.generateBoard();
                this.debugOrder();
            }
            Board.prototype.addTile = function (x, y, color) {
                var boardTile = new Core.Tile(this, x, y, color);
                this.aBoardTile.push(boardTile);
                this.aBoardTile.sort(function (a, b) {
                    if (a.y > b.y) {
                        return 1;
                    }
                    else if (a.y == b.y) {
                        if (a.x < b.x) {
                            return 1;
                        }
                    }
                    return -1;
                });
            };
            Board.prototype.getTiles = function () {
                return this.aBoardTile;
            };
            Board.prototype.generateBoard = function () {
                this.addTile(0, 0, 0 /* BROWN */);
                this.addTile(1, 1, 2 /* DARKBROWN */);
                this.addTile(1, 0, 3 /* DARKGREEN */);
                this.addTile(0, 1, 1 /* GREEN */);
                this.addTile(-1, -1, 4 /* SAND */);
                this.addTile(-1, 0, 0 /* BROWN */);
                this.addTile(0, -1, 3 /* DARKGREEN */);
            };
            Board.prototype.debugOrder = function () {
                this.aBoardTile.forEach(function (boardTile) { return console.log(boardTile.toString()); });
            };
            return Board;
        })();
        Core.Board = Board;
    })(Core = SamuraiCastle.Core || (SamuraiCastle.Core = {}));
})(SamuraiCastle || (SamuraiCastle = {}));
/**
 * Created by ElephantHunter on 12/5/2014.
 */
var SamuraiCastle;
(function (SamuraiCastle) {
    var Core;
    (function (Core) {
        var Game = (function () {
            function Game() {
            }
            return Game;
        })();
        Core.Game = Game;
    })(Core = SamuraiCastle.Core || (SamuraiCastle.Core = {}));
})(SamuraiCastle || (SamuraiCastle = {}));
/**
 * Created by ElephantHunter on 12/5/2014.
 */
var SamuraiCastle;
(function (SamuraiCastle) {
    var Core;
    (function (Core) {
        (function (PlayerColor) {
            PlayerColor[PlayerColor["BROWN"] = 0] = "BROWN";
            PlayerColor[PlayerColor["GREEN"] = 1] = "GREEN";
            PlayerColor[PlayerColor["DARKBROWN"] = 2] = "DARKBROWN";
            PlayerColor[PlayerColor["DARKGREEN"] = 3] = "DARKGREEN";
            PlayerColor[PlayerColor["SAND"] = 4] = "SAND";
        })(Core.PlayerColor || (Core.PlayerColor = {}));
        var PlayerColor = Core.PlayerColor;
    })(Core = SamuraiCastle.Core || (SamuraiCastle.Core = {}));
})(SamuraiCastle || (SamuraiCastle = {}));
/**
 * Created by ElephantHunter on 12/5/2014.
 */
var SamuraiCastle;
(function (SamuraiCastle) {
    var Core;
    (function (Core) {
        var Tile = (function () {
            function Tile(board, x, y, color) {
                this._x = x;
                this._y = y;
                this._color = color;
                this._board = board;
            }
            Object.defineProperty(Tile.prototype, "x", {
                get: function () {
                    return this._x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tile.prototype, "y", {
                get: function () {
                    return this._y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tile.prototype, "color", {
                get: function () {
                    return this._color;
                },
                set: function (color) {
                    this._color = color;
                },
                enumerable: true,
                configurable: true
            });
            Tile.prototype.getAdjacent = function () {
                return null;
            };
            Tile.prototype.toString = function () {
                return this.x.toString() + ", " + this.y.toString() + " -- " + this.color;
            };
            return Tile;
        })();
        Core.Tile = Tile;
    })(Core = SamuraiCastle.Core || (SamuraiCastle.Core = {}));
})(SamuraiCastle || (SamuraiCastle = {}));
/**
 * Created by ElephantHunter on 12/5/2014.
 */
var SamuraiCastle;
(function (SamuraiCastle) {
    var Html5;
    (function (Html5) {
        var PlayerColor = SamuraiCastle.Core.PlayerColor;
        var Board = SamuraiCastle.Core.Board;
        var HtmlBoard = (function () {
            function HtmlBoard() {
                var s = Snap("#GameBody");
                var self = this;
                Snap.load("assets/hex.svg", function (f) {
                    f.select("#hexBackground").addClass("hexBackground");
                    var iHexSmallWidth = 52;
                    var iHexHeight = 44;
                    var g = f.select("#layer1");
                    $(g.node).children(":not(.hexBackground)").attr("pointer-events", "none");
                    var tile = s.g();
                    tile.append(g);
                    var tiles = s.g();
                    s.append(tiles);
                    var board = new Board();
                    board.getTiles().forEach(function (item, index, array) {
                        var newSnap = Snap(tile.clone());
                        var tileClone = newSnap.select("g");
                        var iX = item.x * iHexSmallWidth;
                        var iY = (item.y * iHexHeight) - (item.x * iHexHeight / 2);
                        var color = self.getHexByColor(item.color);
                        newSnap.select(".hexBackground").attr({ fill: color });
                        //console.debug(color.toString());
                        var mDefault = new Snap.Matrix();
                        mDefault.translate(iX, iY);
                        tileClone.animate({
                            transform: mDefault
                        }, 0);
                        tileClone.mouseover(function () {
                            console.debug(item.toString());
                            var m = new Snap.Matrix();
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
                    var m = new Snap.Matrix();
                    m.translate(iWidth / 2, iHeight / 2);
                    tile.remove();
                    tiles.transform(m);
                    tiles.drag();
                });
            }
            HtmlBoard.prototype.getHexByColor = function (color) {
                switch (color) {
                    case 0 /* BROWN */:
                        return "#fc7100";
                    case 1 /* GREEN */:
                        return "#76fc00";
                    case 2 /* DARKBROWN */:
                        return "#b87000";
                    case 3 /* DARKGREEN */:
                        return "#79b800";
                    case 4 /* SAND */:
                        return "#fffd16";
                    default:
                        return "#ff0000";
                }
            };
            return HtmlBoard;
        })();
        Html5.HtmlBoard = HtmlBoard;
    })(Html5 = SamuraiCastle.Html5 || (SamuraiCastle.Html5 = {}));
})(SamuraiCastle || (SamuraiCastle = {}));
