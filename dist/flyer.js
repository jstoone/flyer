function _objectSpread(e) {
    for (var r = 1; r < arguments.length; r++) {
        var n = null != arguments[r] ? arguments[r] : {},
            t = Object.keys(n);
        'function' == typeof Object.getOwnPropertySymbols &&
            (t = t.concat(
                Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable;
                })
            )),
            t.forEach(function(r) {
                _defineProperty(e, r, n[r]);
            });
    }
    return e;
}
function _defineProperty(e, r, n) {
    return (
        r in e
            ? Object.defineProperty(e, r, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              })
            : (e[r] = n),
        e
    );
}
function _classCallCheck(e, r) {
    if (!(e instanceof r))
        throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, r) {
    for (var n = 0; n < r.length; n++) {
        var t = r[n];
        (t.enumerable = t.enumerable || !1),
            (t.configurable = !0),
            'value' in t && (t.writable = !0),
            Object.defineProperty(e, t.key, t);
    }
}
function _createClass(e, r, n) {
    return (
        r && _defineProperties(e.prototype, r), n && _defineProperties(e, n), e
    );
}
var Flyer = (function() {
    function e() {
        _classCallCheck(this, e),
            (this.banner = new Banner()),
            (this.config = _objectSpread(
                {
                    width: 930,
                    height: 180,
                    containerSelector: '#flyer',
                    backgroundColor: 14935011,
                    transparent: !1
                },
                this.banner.config
            )),
            (this.loader = PIXI.Loader.shared),
            (this.renderer = new PIXI.Application(this.config)),
            (this.container = document.querySelector(
                this.config.containerSelector
            )),
            (this.banner.assets = {}),
            (this.banner.core = this),
            (this.banner.stage = this.renderer.stage),
            (this.loader.baseUrl = 'images/');
    }
    return (
        _createClass(e, [
            {
                key: 'init',
                value: function() {
                    var e = this;
                    this.banner.loadQueue
                        ? this.loader
                              .add(this.banner.loadQueue)
                              .load(function(r, n) {
                                  e.assetsLoaded(n);
                              })
                        : this.prepareStage();
                }
            },
            {
                key: 'assetsLoaded',
                value: function(e) {
                    e = this.prepareResources(e) || {};
                    (this.banner.assets = e), this.prepareStage();
                }
            },
            {
                key: 'prepareStage',
                value: function() {
                    this.container.appendChild(this.renderer.view),
                        this.banner.init(),
                        this.banner.start(),
                        this.banner.render &&
                            this.renderer.ticker.add(
                                this.banner.render.bind(this.banner)
                            );
                }
            },
            {
                key: 'prepareResources',
                value: function(e) {
                    var r = {};
                    for (var n in e) {
                        var t = e[n],
                            a = n.indexOf('.') >= 0;
                        e.hasOwnProperty(n) &&
                            (a && (n = n.split('.')[0]),
                            (r[n] = new PIXI.Sprite(t.texture)));
                    }
                    return r;
                }
            }
        ]),
        e
    );
})();
(Flyer.random = new ((function() {
    function e() {
        _classCallCheck(this, e);
    }
    return (
        _createClass(e, [
            {
                key: 'get',
                value: function(e, r) {
                    var n = e < 0 ? -1 : 1;
                    return (
                        (e *= n),
                        (r
                            ? Math.random() * e
                            : Math.floor(Math.random() * e)) * n
                    );
                }
            },
            {
                key: 'getHuge',
                value: function() {
                    return this.get(Number.MAX_SAFE_INTEGER);
                }
            },
            {
                key: 'middle',
                value: function(e, r, n) {
                    var t = r / 2;
                    return this.range(e - t, e + t, n);
                }
            },
            {
                key: 'range',
                value: function(e, r, n) {
                    return r === e
                        ? r
                        : n
                        ? this.get(r - e, !0) + e
                        : (e < 0 && r > 0
                              ? (t = -e + r + 1)
                              : 0 === e && r > 0
                              ? (t = r + 1)
                              : e < 0 && 0 === r
                              ? ((t = e - 1), (e = 1))
                              : (t = e < 0 && r < 0 ? r - e - 1 : r - e + 1),
                          Math.floor(Math.random() * t) + e);
                    var t;
                }
            },
            {
                key: 'rangeMultiple',
                value: function(e, r, n, t) {
                    for (var a = [], i = 0; i < n; i++)
                        a.push(this.range(e, r, t));
                    return a;
                }
            },
            {
                key: 'middleMultiple',
                value: function(e, r, n, t) {
                    for (var a = [], i = 0; i < n; i++) a.push(e(e, r, t));
                    return a;
                }
            },
            {
                key: 'sign',
                value: function(e) {
                    return (e = e || 0.5), Math.random() < e ? 1 : -1;
                }
            },
            {
                key: 'chance',
                value: function(e) {
                    return Math.random() < (e || 0.5);
                }
            },
            {
                key: 'angle',
                value: function() {
                    return this.get(2 * Math.PI, !0);
                }
            },
            {
                key: 'shuffle',
                value: function(e, r) {
                    if ((r && (e = e.slice()), 0 === e.length)) return e;
                    for (var n, t, a = e.length; 0 !== a; )
                        (t = this.get(a)),
                            (n = e[(a -= 1)]),
                            (e[a] = e[t]),
                            (e[t] = n);
                    return e;
                }
            },
            {
                key: 'pick',
                value: function(e, r) {
                    if (r) {
                        var n = this.get(e.length),
                            t = e[n];
                        return e.splice(n, 1), t;
                    }
                    return e[this.get(e.length)];
                }
            },
            {
                key: 'property',
                value: function(e) {
                    var r,
                        n = 0;
                    for (var t in e) this.chance(1 / ++n) && (r = t);
                    return r;
                }
            },
            {
                key: 'set',
                value: function(e, r, n) {
                    var t,
                        a = [],
                        i = [];
                    for (t = e; t < r; t++) i.push(t);
                    for (t = 0; t < n; t++) {
                        var o = this.get(i.length);
                        a.push(i[o]), i.splice(o, 1);
                    }
                    return a;
                }
            },
            {
                key: 'distribution',
                value: function(e, r, n, t, a, i) {
                    var o = Math.floor((r - e) / n),
                        u = o / 2,
                        s = o / 4,
                        l = [];
                    t && l.push(e);
                    for (var h = 0; h < n; h++)
                        l.push(e + h * o + u + this.range(-s, s, i));
                    return a && l.push(r), l;
                }
            },
            {
                key: 'weightedProbabilityInt',
                value: function(e, r, n, t) {
                    function a() {
                        var e, r, n;
                        do {
                            n =
                                (e = 2 * this.get(1, !0) - 1) * e +
                                (r = 2 * this.get(1, !0) - 1) * r;
                        } while (n >= 1 || 0 === n);
                        return e * Math.sqrt((-2 * Math.log(n)) / n);
                    }
                    if (((t = t || 1), !(Math.random() < 0.81546)))
                        return this.range(e, r);
                    for (;;) {
                        var i = a() * t + n;
                        if (i >= e && i <= r) return i;
                    }
                }
            },
            {
                key: 'color',
                value: function() {
                    return this.get(16777215);
                }
            }
        ]),
        e
    );
})())()),
    (Flyer.color = new ((function() {
        function e() {
            _classCallCheck(this, e);
        }
        return (
            _createClass(e, [
                {
                    key: 'poundToHex',
                    value: function(e) {
                        return '0x' + parseInt(e.substr(1)).toString(16);
                    }
                },
                {
                    key: 'hexToPound',
                    value: function(e) {
                        return '#' + e.substr(2);
                    }
                },
                {
                    key: 'valueToPound',
                    value: function(e) {
                        return '#' + e.toString(16);
                    }
                },
                {
                    key: 'hexToHsl',
                    value: function(e) {
                        var r,
                            n,
                            t = this.hexToRgb(e),
                            a = t.r,
                            i = t.g,
                            o = t.b,
                            u = Math.max(a, i, o),
                            s = Math.min(a, i, o),
                            l = (u + s) / 2;
                        if (u === s) r = n = 0;
                        else {
                            var h = u - s;
                            switch (
                                ((n = l > 0.5 ? h / (2 - u - s) : h / (u + s)),
                                u)
                            ) {
                                case a:
                                    r = (i - o) / h + (i < o ? 6 : 0);
                                    break;
                                case i:
                                    r = (o - a) / h + 2;
                                    break;
                                case o:
                                    r = (a - i) / h + 4;
                            }
                            r /= 6;
                        }
                        return { h: r, s: n, l: l };
                    }
                },
                {
                    key: 'hslToHex',
                    value: function(e) {
                        var r, n, t, a, i, o;
                        function u(e, r, n) {
                            return (
                                n < 0 && (n += 1),
                                n > 1 && (n -= 1),
                                n < 1 / 6
                                    ? e + 6 * (r - e) * n
                                    : n < 0.5
                                    ? r
                                    : n < 2 / 3
                                    ? e + (r - e) * (2 / 3 - n) * 6
                                    : e
                            );
                        }
                        if (
                            (1 === arguments.length
                                ? ((a = e.h), (i = e.s), (o = e.l))
                                : ((a = arguments[0]),
                                  (i = arguments[1]),
                                  (o = arguments[2])),
                            0 === i)
                        )
                            r = n = t = o;
                        else {
                            var s = o < 0.5 ? o * (1 + i) : o + i - o * i,
                                l = 2 * o - s;
                            (r = u(l, s, a + 1 / 3)),
                                (n = u(l, s, a)),
                                (t = u(l, s, a - 1 / 3));
                        }
                        return this.rgbToHex(255 * r, 255 * n, 255 * t);
                    }
                },
                {
                    key: 'darken',
                    value: function(e, r) {
                        return this.blend(r, e, 0);
                    }
                },
                {
                    key: 'saturate',
                    value: function(e, r) {
                        r = 0 === r ? 0 : r || 10;
                        var n = this.hexToHsl(e);
                        return (
                            (n.s += r / 100),
                            (n.s = Math.min(1, Math.max(0, n.s))),
                            this.hslToHex(n)
                        );
                    }
                },
                {
                    key: 'desaturate',
                    value: function(e, r) {
                        r = 0 === r ? 0 : r || 10;
                        var n = this.hexToHsl(e);
                        return (
                            (n.s -= r / 100),
                            (n.s = Math.min(1, Math.max(0, n.s))),
                            this.hslToHex(n)
                        );
                    }
                },
                {
                    key: 'blend',
                    value: function(e, r, n) {
                        if (0 === e) return r;
                        if (1 === e) return n;
                        var t = 1 - e;
                        return (
                            ((t * (r >> 16) + e * (n >> 16)) << 16) |
                            ((t * ((r >> 8) & 255) + e * ((n >> 8) & 255)) <<
                                8) |
                            (t * (255 & r) + e * (255 & n))
                        );
                    }
                },
                {
                    key: 'hexToRgb',
                    value: function(e) {
                        if (0 === e) e = '0x000000';
                        else if ('string' != typeof e) {
                            var r = '000000' + e.toString(16);
                            e = '0x' + r.substr(r.length - 6);
                        }
                        var n = /^0x?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                            e
                        );
                        return n
                            ? {
                                  r: parseInt(n[1], 16),
                                  g: parseInt(n[2], 16),
                                  b: parseInt(n[3], 16)
                              }
                            : null;
                    }
                },
                {
                    key: 'rgbToHex',
                    value: function(e, r, n) {
                        if (1 === arguments.length)
                            if (Array.isArray(arguments[0])) {
                                var t = arguments[0];
                                (e = t[0]), (r = t[1]), (n = t[2]);
                            } else {
                                var a = e
                                    .replace(/( *rgb *\( *)|( )|(\) *;?)/, '')
                                    .split(',');
                                (e = a[0]), (r = a[1]), (n = a[2]);
                            }
                        return (
                            '0x' +
                            (
                                (1 << 24) +
                                (parseInt(e) << 16) +
                                (parseInt(r) << 8) +
                                parseInt(n)
                            )
                                .toString(16)
                                .slice(1)
                        );
                    }
                },
                {
                    key: 'random',
                    value: function(e, r) {
                        var n = Flyer.random.pick([
                            { r: 1, g: 1, b: 1 },
                            { r: 1, g: 1, b: 0 },
                            { r: 1, g: 0, b: 1 },
                            { r: 0, g: 1, b: 1 },
                            { r: 1, g: 0, b: 0 },
                            { r: 0, g: 1, b: 0 },
                            { r: 0, g: 0, b: 1 }
                        ]);
                        return (
                            (e = e || 0),
                            (r = r || 255),
                            this.rgbToHex(
                                n.r ? Flyer.random.range(e, r) : 0,
                                n.g ? Flyer.random.range(e, r) : 0,
                                n.b ? Flyer.random.range(e, r) : 0
                            )
                        );
                    }
                },
                {
                    key: 'randomHSL',
                    value: function(e, r, n, t, a, i) {
                        var o = {
                            h: Flyer.random.range(e, r),
                            s: Flyer.random.range(n, t, !0),
                            l: Flyer.random.range(a, i, !0)
                        };
                        return this.hslToHex(o);
                    }
                },
                {
                    key: 'randomGoldenRatioHSL',
                    value: function(e, r, n) {
                        for (
                            var t = Flyer.random.get(1, !0), a = [], i = 0;
                            i < e;
                            i++
                        )
                            a.push(this.hslToHex(t, r, n)),
                                (t = (t + 0.618033988749895) % 1);
                        return a;
                    }
                }
            ]),
            e
        );
    })())());
