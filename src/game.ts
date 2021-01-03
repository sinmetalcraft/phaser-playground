import 'phaser';

export default class Demo extends Phaser.Scene
{
    rt: any;
    layer: any;

    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.image('tiles', 'assets/tilemaps/tiles/tmw_desert_spacing.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/desert.json');
    }

    create ()
    {
        var map = this.make.tilemap({ key: 'map' });

        var tiles = map.addTilesetImage('Desert', 'tiles');

        this.layer = map.createLayer('Ground', tiles, 0, 0).setVisible(false);

        this.rt = this.add.renderTexture(0, 0, 800, 600);
    }

    update ()
    {
        this.rt.clear();

        this.rt.draw(this.layer);
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo
};

const game = new Phaser.Game(config);
