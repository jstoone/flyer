import * as PIXI from 'pixi.js';

export default class Flyer
{
    constructor()
    {
        this.config = {
            width: 930,
            height: 180,

            containerSelector: '#flyer',
            backgroundColor: 0xe3e3e3,
            transparent: false,
        }

        this.banner    = new Banner();
        this.loader    = PIXI.Loader.shared;
        this.renderer  = new PIXI.Application(this.config);
        this.container = document.querySelector(this.config.containerSelector);

        this.banner.core    = this;
        this.loader.baseUrl = 'images/';
    }

    init()
    {
        this.loader
            .add(this.banner.loadQueue)
            .load((loader, resources) => {
                this.assetsLoaded(resources);
            });
    }

    assetsLoaded(resources)
    {
        // Convert downloaded resources into sprites
        var resources = this.prepareResources(resources) || {};

        // Add the canvas to the document
        this.container.appendChild(this.renderer.view);

        // Set the assets for the main banner
        this.banner.assets = resources;

        // prepare the stage
        this.prepareStage();
    }

    prepareStage()
    {
        this.banner.init();
        this.banner.start();
    }

    prepareResources(resources)
    {
        const finalAssets = {};

        for (var key in resources) {
            const resource = resources[key];
            const hasExtension = key.indexOf('.') >= 0;

            // skip loop if the property is from prototype
            if ( ! resources.hasOwnProperty(key)) {
                continue;
            }

            if(hasExtension) {
                key = key.split('.')[0];
            }

            finalAssets[key] = new PIXI.Sprite(resource.texture);
        }

        return finalAssets;
    }
}
