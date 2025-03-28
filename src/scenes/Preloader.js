import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        // Afficher l'image du préchargeur et une barre de progression
        this.add.image(512, 384, 'preloader');

        // Créer une barre de progression
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        // Mettre à jour la barre de progression à chaque étape
        this.load.on('progress', (progress) => {
            bar.width = 4 + (460 * progress);  // Ajuster la largeur de la barre
        });
    }

    preload ()
    {
        // Définir le chemin des assets
        this.load.setPath('assets');

        // Charger les images nécessaires pour le jeu
        this.load.image('background', 'background.png');
        this.load.image('bottle', 'bottle.png');
        this.load.image('bin_blue', 'bin_blue.png');
        this.load.image('bin_green', 'bin_green.png');
        this.load.image('bin_yellow', 'bin_yellow.png');
        this.load.image('assiette_pv', 'assiette_vert.png');
        this.load.image('bouteille_pl','bouteille_plastique.png');
        this.load.image('bouteille_vp','bouteille_vert.png');
        this.load.image('brique_lait_pa','brique_bleu.png');
        this.load.image('carton_pa','carton_bleu.png');
        this.load.image('dentifrice_pl','dentifrice_plastique.png');
        this.load.image('gobelet_pl','gobelet_plastique.png');
        this.load.image('journal_pa','journal_bleu.png');
        this.load.image('sac_pl','sac_plastique.png');
        this.load.image('tupperware_pl','tupperware_plastique.png');
        this.load.image('verre_pv','verre_vert.png');
        this.load.image('verre_c_pv','verre-casser_vert.png');
        this.load.image('vincent_bonus','20_100.png');
    }

    create ()
    {
        // Appliquer un redimensionnement uniforme à toutes les images chargées
        this.textures.each((texture, key) => {
            if (key !== '__DEFAULT') {
                // Créer une image invisible pour la texture et la redimensionner
                const image = this.add.image(0, 0, key).setVisible(false);
                image.setDisplaySize(80, 80);  // Redimensionner toutes les images à 80x80
            }
        });

        // Une fois que tout est chargé, passer à la scène suivante (ClickerGame)
        this.scene.transition({
            target: 'ClickerGame', // Assurez-vous que ce soit la bonne scène
            duration: 1000,
            moveBelow: true,
            onUpdate: (progress) => {
                this.cameras.main.setAlpha(1 - progress);  // Transition douce
            }
        });
    }
}
