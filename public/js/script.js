$(document).ready(function () {
    $("#grid-data").bootgrid({
        ajax: true,
        url: "/click/getallrecords",
        rowCount: -1
    });

    $('#add-domain').click(function () {
        $('#domain').css('border-color', '');
        $('#domain-errors').html('');

        var domainName = $.trim($('#domain').val());
        if (!/^(?!\-)(?:[a-zA-Z\d\-]{0,62}[a-zA-Z\d]\.){1,126}(?!\d+)[a-zA-Z\d]{1,63}$/.test(domainName)) {
            $('#domain').css('border-color', 'red');
            $('#domain-errors').html('Enter correct domain');

            return false;
        }

        $.ajax({
            url: '/index/adddomain',
            data: {
                domain: domainName
            },
            type: 'post',
            dataType: 'json',
            success: function (result) {
                if (result.status) {
                    var option = $('<li></li>');
                    option.html(result.domain);
                    $('#domains-list').append(option);
                } else {
                    $('#domain').css('border-color', 'red');
                    $('#domain-errors').html('Already exists');
                }
            },
            error: function () {
                $('#domain-errors').html('Some errors happen');
            }
        });
    });
});
