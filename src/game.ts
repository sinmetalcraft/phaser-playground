import 'phaser';

export default class Demo extends Phaser.Scene
{
    rt: any;
    layer: any;
    ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.image('car', 'assets/car90.png');
        this.load.image('tiles', 'assets/tilemaps/tiles/tmw_desert_spacing.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/desert2.json');
    }

    create ()
    {
        this.cameras.main.setBounds(0, 0, 1600, 1200);
        this.physics.world.setBounds(0, 0, 1600, 1200);

        this.cursors = this.input.keyboard.createCursorKeys();

        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('Desert', 'tiles');
        this.layer = map.createLayer('Ground', tiles, 0, 0).setVisible(false);
        // this.layer = map.createLayer('Ground', tiles, 0, 0);

        this.rt = this.add.renderTexture(0, 0, 1600, 1200);

        // this.ship = this.add.image(32, 32, 'car').setAngle(90).setX(400).setY(300);
        this.ship = this.physics.add.image(32, 32, 'car').setX(400).setY(300).setAngle(90).setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.ship, true, 1, 1);
    }

    update ()
    {
        this.ship.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.ship.setAngle(-90).setVelocityX(-200);
        }
        else if (this.cursors.right.isDown)
        {
            this.ship.setAngle(90).setVelocityX(200);
        }
    
        if (this.cursors.up.isDown)
        {
            this.ship.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown)
        {
            this.ship.setVelocityY(200);
        }

        this.rt.clear();

        this.rt.draw(this.layer);
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: Demo
};

const game = new Phaser.Game(config);
