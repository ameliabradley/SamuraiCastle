var SamuraiCastle;
(function (SamuraiCastle) {
    var Core;
    (function (Core) {
        var Board = (function () {
            function Board() {
                this.aBoardTile = [];
                this.aBoardTileByPos = [];
                this.generateBoard();
                this.debugOrder();
            }
            Object.defineProperty(Board.prototype, "adjacentHexes", {
                get: function () {
                    return [
                        [1, 1],
                        [1, 0],
                        [-1, -1],
                        [-1, 0],
                        [0, -1],
                        [0, 1]
                    ];
                },
                enumerable: true,
                configurable: true
            });
            Board.prototype.tryGetHex = function (x, y) {
                if (!this.aBoardTileByPos[x]) {
                    return null;
                }
                if (!this.aBoardTileByPos[x][y]) {
                    return null;
                }
                return this.aBoardTileByPos[x][y];
            };
            // TODO: Speed this up
            Board.prototype.getAdjacent = function (x, y) {
                var _this = this;
                var aAdjacentHexes = [];
                if (!this.tryGetHex(x, y))
                    return;
                this.adjacentHexes.forEach(function (hexPos) {
                    var xDiff = hexPos[0];
                    var yDiff = hexPos[1];
                    var hex = _this.tryGetHex(x + xDiff, y + yDiff);
                    if (hex) {
                        aAdjacentHexes.push(hex);
                    }
                });
                return aAdjacentHexes;
            };
            // TODO: Speed this up
            Board.prototype.getAdjacentMatchingColor = function (x, y, aSearched, aAdjacentHexes) {
                var _this = this;
                if (aSearched === void 0) { aSearched = []; }
                if (aAdjacentHexes === void 0) { aAdjacentHexes = []; }
                var searchHex = this.tryGetHex(x, y);
                if (!searchHex)
                    return;
                this.adjacentHexes.forEach(function (hexPos) {
                    var xDiff = x + hexPos[0];
                    var yDiff = y + hexPos[1];
                    var hex = _this.tryGetHex(xDiff, yDiff);
                    if (hex && hex.color == searchHex.color) {
                        if (aSearched.indexOf(hex) !== -1) {
                            return;
                        }
                        aSearched.push(hex);
                        aAdjacentHexes.push(hex);
                        _this.getAdjacentMatchingColor(xDiff, yDiff, aSearched, aAdjacentHexes);
                    }
                });
                return aAdjacentHexes;
            };
            Board.prototype.addTile = function (x, y, color) {
                var boardTile = new Core.Tile(this, x, y, color);
                // TODO: Speed this up
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
                if (!this.aBoardTileByPos[x]) {
                    this.aBoardTileByPos[x] = [];
                }
                this.aBoardTileByPos[x][y] = boardTile;
            };
            Board.prototype.getTiles = function () {
                return this.aBoardTile;
            };
            Board.prototype.getRandomInt = function (min, max) {
                return parseInt(Math.random() * (max - min) + min);
            };
            Board.prototype.getColorFromNumber = function (iNumber) {
                switch (iNumber) {
                    case 0:
                        return 0 /* BROWN */;
                        break;
                    case 1:
                        return 2 /* DARKBROWN */;
                        break;
                    case 2:
                        return 3 /* DARKGREEN */;
                        break;
                    case 3:
                        return 1 /* GREEN */;
                        break;
                    case 4:
                        return 4 /* SAND */;
                        break;
                }
            };
            Board.prototype.generateBoard = function (iWidth, iHeight) {
                if (iWidth === void 0) { iWidth = 60; }
                if (iHeight === void 0) { iHeight = 30; }
                var start = Date.now();
                var centerX = iWidth / 2;
                var centerY = iHeight / 2;
                var distMax = Math.min(iHeight, iWidth) / 3;
                var iTotalColors = Object.keys(Core.PlayerColor).length / 2;
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
                        }
                        else {
                            value = 0;
                        }
                    }
                }
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
        var Board = SamuraiCastle.Core.Board;
        var HtmlBoard = (function () {
            function HtmlBoard() {
                this.htmlTileByPos = [];
                var s = Snap("#GameBody");
                var self = this;
                this._board = new Board();
                var jSvgCanvas = $("#GameBody");
                var iWidth = jSvgCanvas.width();
                var iHeight = jSvgCanvas.height();
                var m = new Snap.Matrix();
                m.translate(iWidth / 2, iHeight / 2);
                // Create a wrapper for all tiles
                // so they can be easily moved around as a group
                this.tiles = s.g().drag().transform(m);
                s.append(this.tiles);
                Html5.HtmlTile.prepareAsset(s, function () {
                    self._board.getTiles().forEach(function (tile, index, array) {
                        var htmlTile = new Html5.HtmlTile(self, self.tiles, tile);
                        if (!self.htmlTileByPos[tile.x]) {
                            self.htmlTileByPos[tile.x] = [];
                        }
                        self.htmlTileByPos[tile.x][tile.y] = htmlTile;
                    });
                });
            }
            HtmlBoard.prototype.getHtmlTileByTile = function (tile) {
                return this.htmlTileByPos[tile.x][tile.y];
            };
            Object.defineProperty(HtmlBoard.prototype, "board", {
                get: function () {
                    return this._board;
                },
                enumerable: true,
                configurable: true
            });
            return HtmlBoard;
        })();
        Html5.HtmlBoard = HtmlBoard;
    })(Html5 = SamuraiCastle.Html5 || (SamuraiCastle.Html5 = {}));
})(SamuraiCastle || (SamuraiCastle = {}));
/**
 * Created by ElephantHunter on 12/6/2014.
 */
var SamuraiCastle;
(function (SamuraiCastle) {
    var Html5;
    (function (Html5) {
        var PlayerColor = SamuraiCastle.Core.PlayerColor;
        var HtmlTile = (function () {
            function HtmlTile(htmlBoard, tiles, tile) {
                var self = this;
                this.x = tile.x * HtmlTile.iHexSmallWidth;
                this.y = (tile.y * HtmlTile.iHexHeight) - (tile.x * HtmlTile.iHexHeight / 2);
                var newSnap = Snap(HtmlTile.tileTemplate.clone());
                this.tileElement = newSnap.select("g");
                // Fill in the correct color for this tile
                var color = self.getHexByColor(tile.color);
                newSnap.select(".hexBackground").attr({ fill: color });
                this.returnToOriginalPosition(0);
                this.tileElement.mouseover(function () {
                    console.debug(tile.toString());
                    var aAdjacent = htmlBoard.board.getAdjacentMatchingColor(tile.x, tile.y);
                    self.levitate();
                    aAdjacent.forEach(function (item) {
                        htmlBoard.getHtmlTileByTile(item).levitate();
                    });
                }).mouseout(function () {
                    var aAdjacent = htmlBoard.board.getAdjacentMatchingColor(tile.x, tile.y);
                    self.returnToOriginalPosition();
                    aAdjacent.forEach(function (item) {
                        htmlBoard.getHtmlTileByTile(item).returnToOriginalPosition();
                    });
                });
                tiles.append(this.tileElement);
            }
            HtmlTile.prototype.getHexByColor = function (color) {
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
            HtmlTile.prepareAsset = function (paper, fnCallback) {
                Snap.load("assets/hex.svg", function (f) {
                    // Snap will delete any IDs when cloning
                    // so we must use classes
                    f.select("#hexBackground").addClass("hexBackground");
                    // Grab the layer we want to use
                    var groupLayer1 = f.select("#layer1");
                    // Hide pointer events on everything but the background
                    // to prevent the events from triggering numerous times
                    $(groupLayer1.node).children(":not(.hexBackground)").attr("pointer-events", "none");
                    // Create the tile template object
                    HtmlTile.tileTemplate = paper.g();
                    HtmlTile.tileTemplate.append(groupLayer1);
                    //HtmlTile.tileTemplate.remove();
                    fnCallback();
                });
            };
            HtmlTile.prototype.levitate = function (speed) {
                if (speed === void 0) { speed = 500; }
                var m = new Snap.Matrix();
                m.translate(this.x, this.y + (-HtmlTile.iHexHeight / 8));
                this.tileElement.animate({
                    transform: m
                }, speed, mina.easein);
            };
            HtmlTile.prototype.returnToOriginalPosition = function (speed) {
                if (speed === void 0) { speed = 500; }
                var mDefault = new Snap.Matrix();
                mDefault.translate(this.x, this.y);
                this.tileElement.animate({
                    transform: mDefault
                }, speed, mina.easein);
            };
            HtmlTile.iHexSmallWidth = 52;
            HtmlTile.iHexHeight = 44;
            return HtmlTile;
        })();
        Html5.HtmlTile = HtmlTile;
    })(Html5 = SamuraiCastle.Html5 || (SamuraiCastle.Html5 = {}));
})(SamuraiCastle || (SamuraiCastle = {}));
