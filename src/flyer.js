class Flyer {
    constructor() {
        this.banner = new Banner();

        this.config = {
            width: 930,
            height: 180,

            containerSelector: '#flyer',
            backgroundColor: 0xe3e3e3,
            transparent: false,
            ...this.banner.config
        };

        this.loader = PIXI.Loader.shared;
        this.renderer = new PIXI.Application(this.config);
        this.container = document.querySelector(this.config.containerSelector);

        this.banner.assets = {};
        this.banner.core = this;
        this.banner.stage = this.renderer.stage;
        this.loader.baseUrl = 'images/';
    }

    init() {
        if (!this.banner.loadQueue) {
            this.prepareStage();

            return;
        }

        this.loader.add(this.banner.loadQueue).load((loader, resources) => {
            this.assetsLoaded(resources);
        });
    }

    assetsLoaded(resources) {
        // Convert downloaded resources into sprites
        var resources = this.prepareResources(resources) || {};

        // Set the assets for the main banner
        this.banner.assets = resources;

        // prepare the stage
        this.prepareStage();
    }

    prepareStage() {
        // Add the canvas to the document
        this.container.appendChild(this.renderer.view);

        // Initialize banner
        this.banner.init();

        // Start banner animation
        this.banner.start();

        // Subscribe to renderer tick events
        if (this.banner.render) {
            this.renderer.ticker.add(this.banner.render.bind(this.banner));
        }
    }

    prepareResources(resources) {
        const finalAssets = {};

        for (var key in resources) {
            const resource = resources[key];
            const hasExtension = key.indexOf('.') >= 0;

            // skip loop if the property is from prototype
            if (!resources.hasOwnProperty(key)) {
                continue;
            }

            if (hasExtension) {
                key = key.split('.')[0];
            }

            finalAssets[key] = new PIXI.Sprite(resource.texture);
        }

        return finalAssets;
    }
}
