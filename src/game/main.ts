import { Game } from "phaser";
import { config } from "./config";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
