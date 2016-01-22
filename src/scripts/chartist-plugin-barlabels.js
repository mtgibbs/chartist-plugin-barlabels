(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.ctBarLabels'] = factory();
  }
}(this, function() {

  /**
   * Chartist.js plugin to display a data label on a bar in a bar chart.
   */
  /* global Chartist */
  (function(window, document, Chartist) {
    'use strict';

    var defaultOptionsBase = {
      labelClass: 'ct-label',
      labelInterpolationFnc: Chartist.noop
    };

    var defaultOptionsHorizontalBars = {
      labelOffset: {
        x: 2,
        y: 4
      },
      textAnchor: 'start'
    }

    var defaultOptionsVerticalBars = {
      labelOffset: {
        x: 0,
        y: -2
      },
      textAnchor: 'middle'
    }

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctBarLabels = function(options) {

      return function ctBarLabels(chart) {
        if (chart instanceof Chartist.Bar) {

          options = Chartist.extend({}, defaultOptionsBase, options);
          if (chart.options.horizontalBars) {
            options = Chartist.extend({}, defaultOptionsHorizontalBars, options);
          } else {
            options = Chartist.extend({}, defaultOptionsVerticalBars, options);
          }

          chart.on('draw', function(data) {
            if (data.type === 'bar') {

              // bar value is in a different spot depending on whether or not the chart is horizontalBars
              var barValue = data.value.x === undefined ? data.value.y : data.value.x;

              data.group.elem('text', {
                x: data.x2 + options.labelOffset.x,
                y: data.y2 + options.labelOffset.y,
                style: 'text-anchor: ' + options.textAnchor
              }, options.labelClass).text(options.labelInterpolationFnc(barValue));
            }
          });
        }
      };
    };

  }(window, document, Chartist));

  return Chartist.plugins.ctBarLabels;

}));
