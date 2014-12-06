/**
 * Created by ElephantHunter on 12/5/2014.
 */
module SamuraiCastle {
    export class Tile {
        private _x:Number;
        private _y:Number;
        private _color:PlayerColor;

        get x():Number {
            return this._x;
        }

        get y():Number {
            return this._y;
        }

        constructor (x:Number, y:Number) {
            this._x = x;
            this._y = y;
        }
    }
}