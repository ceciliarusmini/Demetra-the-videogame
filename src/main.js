import SceneWelcomeMenu from "./scenes/0_welcome_mouse.js"
import Inferno from "./scenes/Inferno.js";
import SceneGameOverGenerale from "./scenes/GameOverGenerale.js";
import Boss from "./scenes/boss.js";
import Pausa from "./scenes/pausa.js";
import Fallito from "./scenes/fallito.js";
import Crediti from "./scenes/crediti.js";
import Storia1 from "./scenes/storia1.js"
import Storia2 from "./scenes/storia2.js";
import Storia3 from "./scenes/storia3.js";
import testo1 from "./scenes/testo1.js";
import testo2 from "./scenes/testo2.js";
import testo3 from "./scenes/testo3.js";
import testo1_bis from "./scenes/testo1_bis.js";
import testo3_bis from "./scenes/testo3_bis.js";
import haivinto from "./scenes/haivinto.js";
import PausaBoss from "./scenes/pausaBoss.js";


// Configurazione di lancio del gioco
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000, // sfondo nero
    scene: [ SceneWelcomeMenu, Inferno, SceneGameOverGenerale, Boss, Pausa, Fallito, Crediti, Storia1, Storia2, Storia3, testo1, testo2, testo3, haivinto, testo1_bis, testo3_bis, PausaBoss ],
    pixelArt: true,
    parent: "game_area", // Specifica il div contenitore
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 500,
            },
            debug: false
        }
    }
};


//creiamo il gioco a partire dalla configurazione iniziale
let game = new Phaser.Game(config);

game.gameState = {
    playTime: 30,
    score: 0,
    lives: 3
}

game.gameState2 = {
    playTime: 30,
    score: 0,
    lives: 17
}

// Carichiamo la scena corrispondente all'esercizio scelto
// (se non eseguiamo questa istruzione viene creata una
// scena a partire dalla prima specificata nell'array "scene"
// della configurazione di gioco)
//game.scene.start("Boss");


