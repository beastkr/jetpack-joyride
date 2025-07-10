import * as Tile from "./coin1.json";
export class CointileLoader {
    static tile: number[][][];
    static init() {
        if (!this.tile) {
            this.tile = [];
            this.tile.push([[1, 9]]);
        }
        Tile.layers.forEach((element) => {
            let tileTemp = new Array();
            for (var i = 0; i < element.data.length; i++) {
                if (i % element.width == 0) tileTemp.push([]);
                tileTemp[tileTemp.length - 1].push(element.data[i]);
            }

            this.tile.push(tileTemp);
            console.log(this.tile);
        });
    }
}
