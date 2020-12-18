function showMarkers(minValue, maxValue) {
    $(".filter_marker").hide().filter(function () {
        var value = parseInt($(this).data("percentage"), 10);
        return value >= minValue && value <= maxValue;
    }).show();
}

$(function () {
    var options = {
        range: true,
        min: 0,
        max: 100,
        values: [0, 100],
        slide: function (event, ui) {
            var min = ui.values[0],
                max = ui.values[1];

            $("#amount").val(min + "%" + " - " + max + "%");
            showMarkers(min, max);
        }
    }, min, max;

    $("#slider-range").slider(options);

    min = $("#slider-range").slider("values", 0);
    max = $("#slider-range").slider("values", 1);

    $("#amount").val(min + "%" + " - " + max + "%");

    showMarkers(min, max);
});