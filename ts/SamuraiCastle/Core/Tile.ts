/**
 * Created by ElephantHunter on 12/5/2014.
 */
module SamuraiCastle.Core {
    export class Tile {
        private _board:Board;
        private _x:number;
        private _y:number;
        private _color:PlayerColor;

        get x():number {
            return this._x;
        }

        get y():number {
            return this._y;
        }

        get color():PlayerColor {
            return this._color;
        }

        set color(color:PlayerColor) {
            this._color = color;
        }

        constructor (board:Board, x:number, y:number, color:PlayerColor) {
            this._x = x;
            this._y = y;
            this._color = color;
            this._board = board;
        }

        public getAdjacent():Tile[] {
            return null;
        }

        public toString():string {
            return this.x.toString() + ", " + this.y.toString() + " -- " + this.color;
        }
    }
}