/**
 * @class DefaultPage
 */
let DefaultPage = (function () {
    /**
     * @var DefaultPage
     */
    let self;

    return {
        init: function () {
            self = this;
            DetectMobile.init();
            SimpleActions.init();
            // console.log('DefaultPage init');
        }
    }
})();

