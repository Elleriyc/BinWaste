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

        // Liste des images à charger
        const images = {
            'background': 'background.png',
            'bottle': 'bottle.png',
            'bin_blue': 'bin_blue.png',
            'bin_green': 'bin_green.png',
            'bin_yellow': 'bin_yellow.png',
            'assiette_pv': 'assiette_vert.png',
            'bouteille_pl': 'bouteille_plastique.png',
            'bouteille_vp': 'bouteille_vert.png',
            'brique_lait_pa': 'brique_bleu.png',
            'carton_pa': 'carton_bleu.png',
            'dentifrice_pl': 'dentifrice_plastique.png',
            'gobelet_pl': 'gobelet_plastique.png',
            'journal_pa': 'journal_bleu.png',
            'sac_pl': 'sac_plastique.png',
            'tupperware_pl': 'tupperware_plastique.png',
            'verre_pv': 'verre_vert.png',
            'verre_c_pv': 'verre-casser_vert.png',
            'vincent_bonus': '20_100.png'
        };

        // Charger les images
        Object.entries(images).forEach(([key, path]) => {
            this.load.image(key, path);
        });

        // Charger la musique
        this.load.audio('tri', '../assets/Tris.mp3');
    }

    create ()
    {
        // Appliquer un redimensionnement uniforme à toutes les images chargées
        this.textures.each((texture, key) => {
            if (key !== '__DEFAULT') {
                // Créer une image invisible pour la texture et la redimensionner
                const image = this.add.image(10, 10, key).setVisible(false);
                image.setDisplaySize(0, 0);  // Redimensionner toutes les images à 80x80
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
