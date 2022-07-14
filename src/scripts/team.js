;(function () {

    const openItem = item => {
        const container = item.closest(".team__item");
        const contentBlock = container.find(".team__item-info");
        contentBlock.height('100%');
        container.addClass("active");
    }

    const closeEveryItem = container => {
        const items = container.find('.team__item-info');
        const itemContainer = container.find('.team__item');
        console.log(itemContainer);
        itemContainer.removeClass("active");
        items.height(0);
    }
    $(".team__item-title").click(e => {

        const $this = $(e.currentTarget);
        const container = $this.closest('.team__list');
        const elemContainer = $this.closest('.team__item');

        if (elemContainer.hasClass("active")) {
            closeEveryItem(container);

        } else {
            closeEveryItem(container);
            openItem($this);

        }





    });

})();