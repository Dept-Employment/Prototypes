; (function ($, window, document, undefined) {

    var customFunction = function (options) {
        if (options.actionName === "Index" && options.controllerName === "Calendar" && options.areaName === "Calendar") {
            downloadfile();
        }
    };

    function downloadfile() {

        var urlControl = $("#DownloadUrl");

        if (urlControl.length) {
            urlControl.each(function () {
                var url = $(this).val();
                if (url != undefined && url !== '') {
                    url = url.replace(/.*?\//, '/'); // Quick XSS protection, only allow site relative urls.
                   // window.setTimeout(function () {
                        $.fileDownload(url,
                            {
                                httpMethod: "POST"
                            })
                            .done(function () { })
                            .fail(function () { $.zeusValidate.addError("Failed to download file."); });
                  //  },
                   //     500); // Set 500ms delay to allow page to display
                }
            });
        }
    }

    $(document).ready(function () {
        var body = $('body');

        var options = {};

/*        options.actionName = body.data($.zeusDataTypes.ActionName);
        options.controllerName = body.data($.zeusDataTypes.ControllerName);
        options.areaName = body.data($.zeusDataTypes.AreaName);*/

        customFunction(options);

        //hide popovers if clicking outside the calendar events and timeslots
        $('body').click(function (e) {
            //console.log($(e.target));

            if ($(e.target).hasClass("fc-time-grid-event") == false && $(e.target).hasClass("fc-title") == false && $(e.target).hasClass("fc-time-grid") == false &&
                $(e.target).hasClass("fc-list-item") == false && $(e.target).hasClass("fc-bg") == false && $(e.target).hasClass("fc-content") == false &&
                $(e.target).hasClass("fc-widget-content") == false && $(e.target).hasClass("fc-highlight-container") == false && $(e.target).hasClass("fc-highlight") == false &&
                $(e.target).parents('.fc-list-item').length == false && $(e.target).parents('.popover').length == false && $(e.target).parents('.fc-event-container').length == false &&
                $(e.target).parents('.fc-highlight-container').length == false && $(e.target).parents('.fc-widget-content').length == false) {
                $('.popover').popover('hide');
                openPopover = null;
                openNewDate = null;
            }

        });
    });

})(jQuery, window, document);