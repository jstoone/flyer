function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Flyer =
/*#__PURE__*/
function () {
  function Flyer() {
    _classCallCheck(this, Flyer);

    this.config = {
      width: 930,
      height: 180,
      containerSelector: '#flyer',
      backgroundColor: 0xe3e3e3,
      transparent: false
    };
    this.banner = new Banner();
    this.loader = PIXI.Loader.shared;
    this.renderer = new PIXI.Application(this.config);
    this.container = document.querySelector(this.config.containerSelector);
    this.banner.core = this;
    this.banner.stage = this.renderer.stage;
    this.loader.baseUrl = 'images/';
  }

  _createClass(Flyer, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.loader.add(this.banner.loadQueue).load(function (loader, resources) {
        _this.assetsLoaded(resources);
      });
    }
  }, {
    key: "assetsLoaded",
    value: function assetsLoaded(resources) {
      // Convert downloaded resources into sprites
      var resources = this.prepareResources(resources) || {}; // Add the canvas to the document

      this.container.appendChild(this.renderer.view); // Set the assets for the main banner

      this.banner.assets = resources; // prepare the stage

      this.prepareStage();
    }
  }, {
    key: "prepareStage",
    value: function prepareStage() {
      this.banner.init();
      this.banner.start();
    }
  }, {
    key: "prepareResources",
    value: function prepareResources(resources) {
      var finalAssets = {};

      for (var key in resources) {
        var resource = resources[key];
        var hasExtension = key.indexOf('.') >= 0; // skip loop if the property is from prototype

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
  }]);

  return Flyer;
}();
