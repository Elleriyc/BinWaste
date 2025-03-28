import { Scene } from 'phaser';

export class ClickerGame extends Scene {
    constructor() {
        super('ClickerGame');
    }

    create() {
        this.score = 0;
        this.selectedTrash = null;
        this.trashItems = [];  // Liste pour stocker tous les déchets
        this.bins = {}; // Poubelles

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        // Ajouter un arrière-plan qui prend toute la taille de la scène
        this.add.image(512, 384, 'background').setDisplaySize(1024, 768);

        // Afficher le score
        this.scoreText = this.add.text(32, 32, 'Score: 0', textStyle).setDepth(1);

        // Créer les déchets et les poubelles
        this.createTrashItems();
        this.createBins();

        // Gérer les clics sur les déchets
        this.input.on('gameobjectdown', (pointer, gameObject) => this.selectTrash(gameObject));
    }

    createTrashItems() {
        // Types de déchets à créer
        const trashTypes = ['bottle', 'assiette_pv', 'bouteille_pl', 'bouteille_vp', 'brique_lait_pa', 'carton_pa', 'dentifrice_pl'];

        // Créer plusieurs déchets dispersés sur la carte
        for (let i = 0; i < 5; i++) { // On crée 5 déchets (tu peux ajuster ce nombre)
            const x = Phaser.Math.Between(100, 924);
            const y = Phaser.Math.Between(100, 668);
            const type = trashTypes[Phaser.Math.Between(0, trashTypes.length - 1)];

            // Créer un déchet interactif
            const trash = this.add.sprite(x, y, type).setInteractive(); // Utiliser `add.sprite` au lieu de `physics.add.sprite`
            trash.type = type;
            trash.setOrigin(0.5);  // Centrer le déchet
            this.trashItems.push(trash);  // Ajouter à la liste des déchets
        }
    }

    createBins() {
        const screenWidth = this.scale.width; // Largeur de l'écran
        const binSpacing = 200; // Espacement entre les poubelles
        const startX = (screenWidth - binSpacing * 2) / 2; // Calculer la position de départ

        // Créer les poubelles avec une taille augmentée et centrées horizontalement
        this.bins = {
            blue: this.add.image(startX, 700, 'bin_blue').setInteractive().setDisplaySize(100, 100),
            green: this.add.image(startX + binSpacing, 700, 'bin_green').setInteractive().setDisplaySize(100, 100),
            yellow: this.add.image(startX + binSpacing * 2, 700, 'bin_yellow').setInteractive().setDisplaySize(100, 100)
        };

        // Ajouter des événements de clic sur les poubelles
        Object.values(this.bins).forEach(bin => {
            bin.on('pointerdown', () => this.checkTrash(bin));
        });
    }

    selectTrash(trash) {
        if (this.selectedTrash !== null) return; // Un déchet est déjà sélectionné

        this.selectedTrash = trash;
        trash.setTint(0x00ff00); // Mettre en évidence le déchet sélectionné

        // Permet de déplacer le déchet
        this.input.on('pointermove', (pointer) => {
            if (this.selectedTrash) {
                this.selectedTrash.x = pointer.x;
                this.selectedTrash.y = pointer.y;
            }
        });
    }

    checkTrash(bin) {
        if (!this.selectedTrash) return;

        // Vérifier si le déchet est correctement trié
        const isCorrect = this.selectedTrash.type === bin.texture.key.replace('bin_', '');

        if (isCorrect) {
            // Si tri correct
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
            this.selectedTrash.destroy(); // Détruire le déchet sélectionné
        } else {
            // Si tri incorrect, on passe au prochain déchet disponible
            this.selectedTrash.setTint(0xff0000); // Indiquer une erreur
            this.time.delayedCall(500, () => {
                this.selectedTrash.setTint(0xffffff); // Réinitialiser la couleur du déchet
                this.selectedTrash.x = Phaser.Math.Between(100, 924); // Replacer le déchet à un nouvel endroit
                this.selectedTrash.y = Phaser.Math.Between(100, 668);
                this.selectedTrash = null; // Réinitialiser la sélection
            });
        }

        // Créer un nouveau déchet après un délai
        this.time.delayedCall(500, () => {
            this.selectedTrash = null;
        });
    }
}
