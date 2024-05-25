/**
 * Written by Mineo Okuda on 01/03/18.
 *
 * Mineo Okuda - development + design
 * https://willstyle.co.jp
 * https://github.com/min30327
 *
 * MIT license.
 */

(function (root, factory) {
  "use strict";

  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === "object") {
    // COMMONJS
    module.exports = factory();
  } else {
    // BROWSER
    root.luxy = factory();
  }
})(this, function () {
  "use strict";

  const defaults = {
    wrapper: "#luxy",
    targets: ".luxy-el",
    wrapperSpeed: 0.08,
    targetSpeed: 0.02,
    targetPercentage: 0.1,
  };

  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimationFrame;

  const cancelAnimationFrame =
    window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  /**
   * Merge two or more objects. Returns a new object.
   * @param  {...Object} objects The objects to merge together
   * @returns {Object} Merged values of defaults and options
   */
  const extend = (...objects) => {
    return objects.reduce((extended, obj) => {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          extended[prop] = obj[prop];
        }
      }
      return extended;
    }, {});
  };

  class Luxy {
    constructor() {
      this.Targets = [];
      this.wrapper = "";
      this.windowHeight = 0;
      this.wapperOffset = 0;
      this.isAnimate = false;
      this.isResize = false;
      this.scrollId = "";
      this.resizeId = "";
    }

    init(options) {
      this.settings = extend(defaults, options || {});
      this.wrapper = document.querySelector(this.settings.wrapper);

      if (!this.wrapper) {
        return false;
      }

      this.targets = document.querySelectorAll(this.settings.targets);
      document.body.style.height = `${this.wrapper.clientHeight}px`;

      this.windowHeight = window.clientHeight;
      this.attachEvent();
      this.apply(this.targets, this.wrapper);
      this.animate();
      this.resize();
    }

    apply(targets, wrapper) {
      this.wrapperInit();

      targets.forEach((target) => {
        const attr = {
          offset: target.getAttribute("data-offset"),
          speedX: target.getAttribute("data-speed-x"),
          speedY: target.getAttribute("data-speed-Y"),
          percentage: target.getAttribute("data-percentage"),
          horizontal: target.getAttribute("data-horizontal"),
        };
        this.targetsInit(target, attr);
      });
    }

    wrapperInit() {
      this.wrapper.style.width = "100%";
      this.wrapper.style.position = "fixed";
    }

    targetsInit(elm, attr) {
      this.Targets.push({
        elm: elm,
        offset: attr.offset || 0,
        horizontal: attr.horizontal || 0,
        top: 0,
        left: 0,
        speedX: attr.speedX || 1,
        speedY: attr.speedY || 1,
        percentage: attr.percentage || 0,
      });
    }

    scroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.wrapperUpdate(this.scrollTop);
      this.Targets.forEach((target) => this.targetsUpdate(target));
    }

    animate() {
      this.scroll();
      this.scrollId = requestAnimationFrame(this.animate.bind(this));
    }

    wrapperUpdate() {
      this.wapperOffset +=
        (this.scrollTop - this.wapperOffset) * this.settings.wrapperSpeed;
      this.wrapper.style.transform = `translate3d(0, ${
        Math.round(-this.wapperOffset * 100) / 100
      }px, 0)`;
    }

    targetsUpdate(target) {
      const { targetSpeed, targetPercentage } = this.settings;

      target.top +=
        (this.scrollTop * targetSpeed * target.speedY - target.top) *
        targetPercentage;
      target.left +=
        (this.scrollTop * targetSpeed * target.speedX - target.left) *
        targetPercentage;

      const offsetY =
        Math.round(
          (parseInt(target.percentage) - target.top - parseInt(target.offset)) *
            -100
        ) / 100;
      const offsetX = target.horizontal
        ? Math.round(
            (parseInt(target.percentage) -
              target.left -
              parseInt(target.offset)) *
              -100
          ) / 100
        : 0;

      target.elm.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    }

    resize() {
      this.windowHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;
      if (
        parseInt(this.wrapper.clientHeight) !==
        parseInt(document.body.style.height)
      ) {
        document.body.style.height = `${this.wrapper.clientHeight}px`;
      }
      this.resizeId = requestAnimationFrame(this.resize.bind(this));
    }

    attachEvent() {
      window.addEventListener("resize", () => {
        if (!this.isResize) {
          cancelAnimationFrame(this.resizeId);
          cancelAnimationFrame(this.scrollId);
          this.isResize = true;
          setTimeout(() => {
            this.isResize = false;
            this.resizeId = requestAnimationFrame(this.resize.bind(this));
            this.scrollId = requestAnimationFrame(this.animate.bind(this));
          }, 200);
        }
      });
    }

    cancel() {
      cancelAnimationFrame(this.resizeId);
      cancelAnimationFrame(this.scrollId);
      this.wrapper.removeAttribute("style");
      this.Targets.forEach((target) => target.elm.removeAttribute("style"));
      this.wrapper = "";
      this.Targets = [];
      this.windowHeight = 0;
      this.wapperOffset = 0;
      this.isResize = false;
      this.scrollId = "";
      this.resizeId = "";
    }
  }

  const luxy = new Luxy();
  return luxy;
});
