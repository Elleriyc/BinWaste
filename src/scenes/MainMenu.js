import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // Ajouter l'image de fond
        this.add.image(512, 384, 'background').setDisplaySize(1024, 768);

        //  Get the current highscore from the registry
        const score = this.registry.get('highscore');

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(512, 384, 'background');


        this.add.text(32, 32, `High Score: ${score}`, textStyle);

        const instructions = [
            'How many coins can you',
            'click in 10 seconds?',
            '',
            'Click to Start!'
        ]

        this.add.text(512, 550, instructions, textStyle).setAlign('center').setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('ClickerGame');

        });
    }
}
