(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,r){e.exports=r(26)},26:function(e,n,r){"use strict";r.r(n);var t=r(4);function a(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var i=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.config={width:930,height:180,containerSelector:"#flyer",backgroundColor:14935011,transparent:!1},this.banner=new Banner,this.loader=t.b.shared,this.renderer=new t.a(this.config),this.container=document.querySelector(this.config.containerSelector),this.banner.core=this,this.loader.baseUrl="images/"}var n,r,i;return n=e,(r=[{key:"init",value:function(){var e=this;this.loader.add(this.banner.loadQueue).load(function(n,r){e.assetsLoaded(r)})}},{key:"assetsLoaded",value:function(e){e=this.prepareResources(e)||{};this.container.appendChild(this.renderer.view),this.banner.assets=e,this.prepareStage()}},{key:"prepareStage",value:function(){this.banner.init(),this.banner.start()}},{key:"prepareResources",value:function(e){var n={};for(var r in e){var a=e[r],i=r.indexOf(".")>=0;e.hasOwnProperty(r)&&(i&&(r=r.split(".")[0]),n[r]=new t.c(a.texture))}return n}}])&&a(n.prototype,r),i&&a(n,i),e}();window.addEventListener("load",function(){(new i).init()})}},[[13,1,2]]]);