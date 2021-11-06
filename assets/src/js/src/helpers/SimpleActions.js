/**
 * @class SimpleActions
 */
const SimpleActions = (function () {
    /**
     * @var SimpleActions
     */
    let self;

    return {
        config: {
            toggleParentClass: '.js-parent-toggle',
            activeClass: 'active'
        },

        vars: {},

        init: function (config) {
            self = this;
            self.toggleParentActive();
            self.tooltipPopup();
        },

        toggleParentActive: function() {
            $(document).on('click', self.config.toggleParentClass, function(){
                if ($(this).parent().hasClass(self.config.activeClass)) {
                    $(this).parent().removeClass(self.config.activeClass);
                } else {
                    $(this).parent().addClass(self.config.activeClass);
                }
            })
            // console.log('toggleParentActive init');
        },
        tooltipPopup: function() {
            $('.js-tooltip').each(function(){
                let itemText = $(this).data('tooltip');
                $(this).prepend('<i class="tooltip-baloon">'+ itemText +'</i>');
            });
        },
        toggleActive: function(elm) {
            let activeTrigger = false;
            if (elm.hasClass(self.config.activeClass)) {
                elm.siblings().removeClass(self.config.activeClass);
                elm.removeClass(self.config.activeClass);
                activeTrigger = true;
                // console.log('close');
            } else {
                elm.siblings().removeClass(self.config.activeClass);
                elm.addClass(self.config.activeClass);
                activeTrigger = false;
                // console.log('active');
            }

            return activeTrigger;
        },
        accardionToggleActive: function(elm) {
            elm.siblings(elm).removeClass(self.config.activeClass);
            elm.addClass(self.config.activeClass);
        },
        filterToggleBtn: function (elm) {
            let activeTrigger = false;
                elm.parent().siblings().children().removeClass(self.config.activeClass);
            if (elm.hasClass(self.config.activeClass)) {
                elm.removeClass(self.config.activeClass);
                activeTrigger = true;
            } else {
                elm.addClass(self.config.activeClass);
                activeTrigger = false;
            }
            return activeTrigger;
        },
    }
})();
