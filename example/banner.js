var Banner = function() {
    this.config = {
        width: 930,
        height: 180,
    }

    this.loadQueue = [
        'carsten.png',
    ];

    this.init = function() {
        this.assets.carsten.x = this.assets.carsten.width + 10;
        this.assets.carsten.y = this.config.height / 2;
        this.assets.carsten.anchor.set(.5, .5);
        this.stage.addChild(this.assets.carsten);
    }

    this.start = function() {
        anime({
            targets: this.assets.carsten,
            duration: 2000,
            x: this.config.width / 2,
            angle: 360,
            easing: 'easeInOutBack',
        });
    }
}
