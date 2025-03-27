$("#add_user").submit(function (event) {
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })

    // Update the request URL to point to localhost:8080
    var request = {
        "url": `http://localhost:8000/api/users/${data.id}`, // Updated to use port 8080
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!");
    })
})

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        // Update the request URL to point to localhost:8080
        var request = {
            "url": `http://localhost:8000/api/users/${id}`, // Updated to use port 8080
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }
    })
}
