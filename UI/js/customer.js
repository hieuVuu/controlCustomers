$(document).ready(function () {
    loadData();
});
// load dữ liệu khách hàng
function loadData() {
    var data = getData()
    buildDataTableHTML(data);
    toggleModal();
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

        //formatDate
        var dateOfBirth = customer.DateOfBirth;
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

        // format money
        var numberTest = 12831229808;
        const formatMoney = (money) => {
            var moneyResult = new Intl.NumberFormat('vi-VN',
                {
                    style: 'currency',
                    currency: 'VND'
                }
            ).format(money)
            return moneyResult;
        }
        // du lieu format
        const moneyFormated = formatMoney(numberTest);
        const dateFormated = formatDateDDMMYYYY(dateOfBirth);
        var gender = (!customer.Gender) ? "Khác" : (customer.Gender === 1) ? "Nam" : "Nữ";

        var trHTML = `<tr>
                            <td>${customer.CustomerCode}</td>
                            <td>${customer.FullName}</td>
                            <td>${gender}</td>
                            <td>${dateFormated}</td>
                            <td>${customer.CustomerGroupName}</td>
                            <td>${customer.PhoneNumber}</td>
                            <td>${customer.Email}</td>
                            <td>${moneyFormated}</td>
                            <td><input type="checkbox" checked></td>

                        </tr>`;
        $(`table#customers tbody`).append(trHTML);
    })
}

// toggleModal
function toggleModal() {
    var modal = $('#modal')
    var openModal = $("#addCustomer");
    openModal.on('click', (event) => {
        event.preventDefault;
        modal.css('display', 'block');
    })
    var closeModal = $("#close-modal, #cancel");
    closeModal.on('click', (event) => {
        event.preventDefault;
        modal.css('display', 'none');
    })
}


// save info customer 
$(document).on('click', '#saveInfo', function (event) {
    event.preventDefault();
    var allInputInModal = $('#modal input');
    var infoGuest = [];

    allInputInModal.each((index, input) => {
        if (input.type === "radio" && input.checked === true) {
            infoGuest.push(input.id);
        }
        else if (input.name != "gender") {
            var dataInput = $(`#${input.id}`).val()
            infoGuest.push(dataInput);
        }
    })
    const gender = (`${infoGuest[5]}` === 'male') ? 1 : (`${infoGuest[5]}` === 'female') ? 0 : null;
    var dataCustomer = {
        "CustomerId": "af6cf153-7bdc-11eb-a896-42010a8c0002",
        "CustomerCode": `${infoGuest[0]}`,
        "FullName": `${infoGuest[3]}`,
        "Gender": `${gender}`,
        "Address": `${infoGuest[10]}`,
        "DateOfBirth": `${infoGuest[2] + "T00:00:00"}`,
        "Email": `${infoGuest[6]}`,
        "PhoneNumber": `${infoGuest[7]}`,
        "CustomerGroupId": "0cb5da7c-59cd-4953-b17e-c9adc9161663",
        "DebitAmount": null,
        "MemberCardCode": `${infoGuest[1]}`,
        "CompanyName": `${infoGuest[8]}`,
        "CompanyTaxCode": `${infoGuest[9]}`,
        "IsStopFollow": false,
        "CustomerGroupName": `${infoGuest[4]}`,
        "GenderName": `${infoGuest[5]}`,
        "MISAEntityState": 0
    };
    
    // goi service de luu lai 
    $.ajax({
        method: 'POST',
        url: "http://api.manhnv.net/api/customers",
        data: JSON.stringify(dataCustomer),
        async: false,
        contentType: 'application/json'
    }).done(function (res) {
        alert("Add customer successful!");
    }).fail(function (res) {
        alert("fail to up data");
    });
})

// sua thong tin khach hang
/*const updateData = () => {
    console.log("hello world");
}
updateData();*/