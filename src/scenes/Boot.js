import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        // Charger l'image de démarrage
        this.load.image('start_screen', 'assets/affiche.png');

        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('preloader', 'assets/preloader.png');
    }

    create ()
    {
        // Redimensionner et afficher les images chargées
        this.add.image(512, 384, 'start_screen').setDisplaySize(600, 800);
        this.textures.each((texture, key) => {
            if (key !== '__DEFAULT') {
                this.add.image(0, 0, key)
                    .setDisplaySize(100, 100) // Remplacez 100, 100 par la taille souhaitée
                    .setVisible(false);
            }
        });

        //  A global value to store the highscore in
        this.registry.set('highscore', 0);

        // this.scene.start('Preloader');

        this.input.once('pointerdown', () => {

            this.scene.start('Preloader');

        });
    }
}
