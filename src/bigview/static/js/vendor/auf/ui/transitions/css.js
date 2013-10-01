define(function(require, exports, module){
    var Marionette = require('vendor/marionette'),
        _ = require('vendor/underscore'),
        Modernizr = require('vendor/modernizr');

    function cssTransition($el, transitionClass){


        var transitionEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
            'MozTransition'    : 'transitionend',      // only for FF < 15
            'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
        };

        var transitionEndEvent = transitionEndEventNames[Modernizr.prefixed('transition')];
        return applyStyle($el, transitionClass, transitionEndEvent);
    }

    function cssAnimation($el, animationClass){
        var animationEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',// Saf 6, Android Browser
            'MozAnimation'    : 'animationend',      // only for FF < 15
            'animation'       : 'animationend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
        };

        var animationEndEvent = animationEndEventNames[Modernizr.prefixed('animation')];
        return applyStyle($el, animationClass, animationEndEvent);
    }

    function applyStyle($el, cssClass, endEvent){
        var deferred = $.Deferred();

        $el.addClass(cssClass)
           .on(endEvent, function(){
                deferred.resolve();
           });

        return deferred.promise();
    }

    module.exports.cssTransition = cssTransition;
    module.exports.cssAnimation = cssAnimation;
});
