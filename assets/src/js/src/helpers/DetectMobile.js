/**
 * @class DetectMobile
 */
const DetectMobile = (function () {
    /**
     * @var DetectMobile
     */
    let self;

    return {
        config: {
            responsClass: $('html'),
            isMobile: false,
            windowSizeRetina: [2560],
            windowSizeExtra: [2560, 1920],
            windowSizeDesktop: [1920, 1280],
            windowSizeIpad: [1280, 1024],
            windowSizeTablet: [1023, 768],
            windowSizeMobile: [767],
        },

        vars: {},

        init: function (config) {
            self = this;
            self.isMobileListener();
            self.responseClass();
        },
        isMobileListener: function () {
            self = this;
            self.checkBreakpoints();
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                DetectMobile.config.isMobile = true;
                return DetectMobile.config.isMobile;
            } else {
                return false;
            }
        },
        responseClass: function() {
            $(window).on('load resize', function(){
                self.checkBreakpoints();
            });
        },
        checkBreakpoints: function() {
            let screenBreakpoint = null;
            if($(window).width() > self.config.windowSizeRetina[0]) {
                self.config.responsClass.addClass('retina');
                screenBreakpoint = 'retina';
            } else {
                self.config.responsClass.removeClass('retina');
            }

            if($(window).width() <= self.config.windowSizeExtra[0] && $(window).width() > self.config.windowSizeExtra[1]) {
                self.config.responsClass.addClass('extra');
                screenBreakpoint = 'extra';
            } else {
                self.config.responsClass.removeClass('extra');
            }
            if($(window).width() <= self.config.windowSizeDesktop[0] && $(window).width() > self.config.windowSizeDesktop[1]) {
                self.config.responsClass.addClass('desktop');
                screenBreakpoint = 'desktop';
            } else {
                self.config.responsClass.removeClass('desktop');
            }
            if($(window).width() <= self.config.windowSizeIpad[0] && $(window).width() >= self.config.windowSizeIpad[1]) {
                self.config.responsClass.addClass('ipad');
                screenBreakpoint = 'ipad';
            } else {
                self.config.responsClass.removeClass('ipad');
            }

            if($(window).width() <= self.config.windowSizeTablet[0] && $(window).width() >= self.config.windowSizeTablet[1]) {
                self.config.responsClass.addClass('tablet');
                screenBreakpoint = 'tablet';
            } else {
                self.config.responsClass.removeClass('tablet');
            }

            if($(window).width() <= self.config.windowSizeMobile[0]) {
                self.config.responsClass.addClass('mobile');
                screenBreakpoint = 'mobile';
            } else {
                self.config.responsClass.removeClass('mobile');
            }
            return screenBreakpoint;
        }
    }
})();
