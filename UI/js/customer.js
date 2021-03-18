$(document).ready(function () {
     loadData();
});
 // load dữ liệu khách hàng
function loadData() { 
    var data = getData()
    buildDataTableHTML(data);
}
 //hàm thực hiện lấy dữ liệu
function getData() {
    var customers = null;
    $.ajax({
        method: 'GET',
        url: 'http://api.manhnv.net/api/customers',
        data: null,
        async: false,
        contentType: 'application/json'
    }).done((response) => {     
        customers = response
    }).fail((response) => {
        alert("Không thể lấy dữ liệu từ API")
    })
    return customers
}

function buildDataTableHTML(data) {
    $('table#customers tbody').html('');
    $.each(data, function (index, customer) {
        // formatGender
        if (!customer.Gender) {
            return customer.GenderName="Khác";
        }
        var dateOfBirth = customer.DateOfBirth;
        //formatDate
        const formatDateDDMMYYYY = (date) => {
            if (!date) {
                return date = "";
            }
            var newDate = new Date(date);
            var dayStr = newDate.getDate();
            var monthStr = newDate.getMonth() + 1;
            if (dayStr < 10) {
                dayStr = `0${dayStr}`;
            }
            if (monthStr < 10) {
                monthStr = `0${monthStr}`;
            }
            var yearStr = newDate.getFullYear();
            newDate = `${dayStr}/${monthStr}/${yearStr}`
            return newDate;
        }
        const dateFormated = formatDateDDMMYYYY(dateOfBirth);
        var trHTML = `<tr>
                            <td>${customer.CustomerCode}</td>
                            <td>${customer.FullName}</td>
                            <td>${customer.GenderName}</td>
                            <td>${dateFormated}</td>
                            <td>${customer.CustomerGroupName}</td>
                            <td>${customer.PhoneNumber}</td>
                            <td>${customer.Email}</td>
                            <td>${customer.Gender}</td>
                            <td>${customer.Address}</td>

                        </tr>`;
        $(`table#customers tbody`).append(trHTML);
    })
}

// toggleModal
function toggleModal() {
    var modal = document.getElementById("modal");
    var closeModal = document.getElementById("close-modal");
    var openModal = document.getElementById("addCustomer");
    openModal.addEventListener("click", (event) => {
        event.preventDefault();
        modal.style.display = "block";
    })
    closeModal.addEventListener("click", (event) => {
        event.preventDefault();
        modal.style.display ="none";
    })
}
toggleModal();

// save info customer 
$(document).on('click', '#saveInfo', function (event) {
    event.preventDefault();
    var allInputInModal = $('#modal input');
    var infoGuest = [];
    allInputInModal.each((index, input) => {    
        var inputSelect = $(`#${input.id}`);
        infoGuest.push(inputSelect.val());
    })
    console.log(infoGuest);
    console.log(infoGuest[6].checked === true);

/*    // goi service de luu lai 
    $.ajax({
        method: 'POST',
        url: "http://api.manhnv.net/api/customers",
        data: JSON.stringify(newCustomer),
        async: false,
        contentType: 'application/json'
    }).done(function (res) {
        alert(res);
    }).fail(function () {
        alert("fail to load data");
    });*/
})

