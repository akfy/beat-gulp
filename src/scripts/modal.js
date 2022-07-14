;(function () {
  const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach((field) => {
      field.removeClass("input-error");
      if (field.val().trim() === "") {
        console.log("empty");
        field.addClass("input-error");
      }
    });
    const errorFields = form.find(".input-error");
    return errorFields.length === 0;
  }
  $(".form").submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");

    const to = form.find("[name='to']");

    const modal = $("#modal");
    modal.removeClass("error-modal");
    const content = modal.find(".modal__content");




    const isValid = validateFields(form, [name, phone, comment, to]);
    console.log(isValid);
    if (isValid) {
      const request = $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "post",
        data: {
          name: name.val(),
          phone: phone.val(),
          comment: phone.val(),
          to: to.val()
        },



      });

      request.done((data) => {
        content.text(data.message);


      });

      request.fail(data => {
        const message = data.responseJSON.message;
        content.text(message);

        modal.addClass("error-modal");

      });
      request.always(data => {
        Fancybox.show([{
          src: "#modal",
          type: "inline",
          openSpeed: 1000,
          openEffect: 'elastic'
        }]);
      })

    }


    // Fancybox.show([{ src: "#modal", type: "inline" }]);


  });
  $(".app-submit-btn").on('click', e => {
    Fancybox.close();
  });

})();

// fancybox.close();