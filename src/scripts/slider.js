;(function () {

    $(document).ready(function () {
        $('.slyder__list').bxSlider({
            nextSelector: $(".control--right"),
            prevSelector: $(".control--left"),
            // controls: true,
            prevText: '',
            nextText: '',
            pager: false
        });
    });
})();