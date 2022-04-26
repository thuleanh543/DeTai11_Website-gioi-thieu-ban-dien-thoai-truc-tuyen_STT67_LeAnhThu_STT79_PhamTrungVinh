/* <!-------------------------FOOTER----------------------------- --> */
function addRow(product, index) {
    var table = document.getElementById("datarow");

    var row = `
    <tr>
        <td class="text-center" >${++i}</td>
        <td class="text-center" >
            <img src="${product.url}" class="img-product">
        </td>
        <td class="text-center" >${product.name}</td>
        <td class="text-center">${product.price}</td>
        <td class="text-center d-flex justify-content-center">
            <input style="width: 45px; border: none; outline: none;" type="number" 
            class="d-block" name="number" id="number" value="${product.orderQty}" onchange ="totalPrice();" min="1">
        </td>
        <td class="text-center">${product.price * product.orderQty}</td>
        <td class="text-center">
            <a id="${product.id}" class="btn btn-danger btn-delete-sanpham">
                <i class="fa fa-trash" aria-hidden="true"></i> Xóa
            </a>
        </td>
    </tr>
`;
    var newRow = table.insertRow(table.length);
    newRow.innerHTML = row;
}
// xoa 1 item carrt
var removeByAttr = function(arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i] &&
            arr[i].hasOwnProperty(attr) &&
            (arguments.length > 2 && arr[i][attr] === value)) {
            arr.splice(i, 1);
        }
    }
    totalProduct();
    return arr;
}

function deleteItemInCart(productID) {
    removeByAttr(userNow.productID, "id", productID);
    var userLogin = userNow;
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
}
// khi thay đổi số lượng sản phẩm
function whenChageQty() {
    var numbers = document.querySelectorAll("#datarow #number");
    var products = userNow.productID;
    for (var number in numbers) {
        if (numbers.hasOwnProperty(number)) {
            products[number].n = numbers[number].value;
            // console.log(numbers[number].value);
        }
    }
    var userLogin = userNow;
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
}

// tổng giá 
var totalPrice = function() {
    var table = document.getElementById("datarow");
    var deletes = document.querySelectorAll(".btn-delete-sanpham");
    var totalPr = 0;
    for (var i = 0; i < table.rows.length; ++i) {
        var quantity = table.rows[i].cells[4].querySelector("input").value;
        var price = table.rows[i].cells[3].innerText;
        var total = quantity * price;
        table.rows[i].cells[5].innerText = total;
        totalPr += total;
        deletes[i].onclick = () => {
            table.deleteRow(--i);
            totalPrice();
            deleteItemInCart(deletes[i].id);
        }
    }
    document.getElementById("totalPrice").innerText = totalPr;
    return totalPr;
}


//timkiem

var btnSearch = document.querySelector(".search__btn");
var inputSearch = document.getElementById("search");

inputSearch.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        dataSearch();
    }
})

function dataSearch() {
    var text = document.getElementById("search").value.toLowerCase();
    var products = dataProducts.filter(function(product) {
        return product.name.toLowerCase().includes(text);
    });
    localStorage.setItem("filterActive", 4);
    localStorage.setItem('searchProducts', JSON.stringify(products));
    window.location = "../html/trangchu.html";
}

btnSearch.addEventListener("click", function(e) {
    e.preventDefault();
    dataSearch();
});

var btnPro = document.getElementById("btnProduct");
btnPro.addEventListener("click", function(event) {
    localStorage.setItem("filterActive", "0");
});

function sortFilter(n) {
    if (n == 3) {
        dataProducts.sort(function(data1, data2) {
            return data1.price - data2.price;
        });
        pushProduct(dataProducts);
    }
    if (n == 4) {
        var products = JSON.parse(localStorage.getItem("searchProducts"));
        pushProduct(products);
    } else {
        pushProduct(dataProducts, 30);
    }
}

//  sự kiện khi ấn vào giỏ hàng
var cart = document.querySelector(".cart-link");

cart.addEventListener("click", function(event) {
    event.preventDefault();
    if (bool) {
        Redirect("../pages/cart.html");
    } else
        alert("vui lòng đăng nhập trước");
});


// đăng ký


function checkRegister() {
    var form = document.querySelector('#frmdangky');
    var data = Object.fromEntries(new FormData(form).entries());
    var regUserName = /(?=.*[a-zA-Z_0-9])\w{6,}/; // ít nhất phải có 6 ký tự không chứa ký tự đặc biệt
    var regPassword = /^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9]{8,})$/; //phải có 8 ký tự trở lên và có ít nhất 1 số
    var regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var regName = /^([A-Z][a-z]+)(\s+[A-Z][a-z]+)+$/; // chữ cái đầu tiên phải bắt đầu bằng chữ in hoa và phải có họ và tên
    var regPhone = /[0-9]{10}/; // số điện thoại phải là số và có 10 chữ số 
    var lbUserName = document.querySelector("#lbTenDangNhap");
    var lbMatKhau = document.querySelector("#lbMatKhau");
    var lbNhapLaiMatKhau = document.querySelector("#lbNhapLaiMatKhau");
    var lbTen = document.querySelector("#lbTen");
    var lbDiaChi = document.querySelector("#lbDiaChi");
    var lbDt = document.querySelector("#lbDt");
    var lbEmail = document.querySelector("#lbEmail");
    var lbNgaySinh = document.querySelector("#lbNgaySinh");

    if (!regUserName.test(data.username)) {
        lbUserName.innerText = "Tên đăng nhập ít nhất phải có 6 ký tự không chứa ký tự đặc biệt";
        return false;
    }
    lbUserName.innerText = "";
    
    if (!regPassword.test(data.password)) {
        lbMatKhau.innerText = "Mật khẩu phải có 8 ký tự trở lên và có ít nhất 1 số";
        return false;
    }
    lbMatKhau.innerText = "";
    

    if (data.password !== data.kh_nhaplaimatkhau) {
        lbNhapLaiMatKhau.innerText = "Mật khẩu chưa khớp";
        return false;
    }
    lbNhapLaiMatKhau.innerText = "";
    

    if (!regName.test(data.kh_ten)) {
        lbTen.innerText = "Chữ cái đầu tiên phải bắt đầu bằng chữ in hoa và phải có họ và tên";
        return false;
    }
    lbTen.innerText = "";
    

    if (data.kh_diachi.trim().length == 0) {
        lbDiaChi.innerText = "Địa chỉ không được bỏ trống";
        return false;
    }
    lbDiaChi.innerText = "";
    if (!regPhone.test(data.kh_dienthoai)) {
        lbDt.innerText = "số điện thoại phải là số và có 10 chữ số ";
        return false;
    }
    lbDt.innerText = "";
    

    if (!regEmail.test(data.kh_email)) {
        lbEmail.innerText = "vui lòng điền đúng định dạng email";
        return false;
    }
    lbEmail.innerText = "";
    if (data.kh_namsinh > 2002) {
        lbNgaySinh.innerText = "bạn phải đủ 18 tuổi";
        return false;
    }
    lbNgaySinh.innerText = "";

    return true;
}




// get thông tin

var getThongTin = function(user) {
    document.getElementById("kh_ten").value = user.kh_ten;
    document.getElementById("kh_gioitinh").value = user.kh_gioitinh == 0 ? "Nam" : "Nữ";
    document.getElementById("kh_diachi").value = user.kh_diachi;
    document.getElementById("kh_dienthoai").value = user.kh_dienthoai;
    document.getElementById("kh_email").value = user.kh_email;
    document.getElementById("kh_ngaysinh").value = user.kh_ngaysinh + "/" + user.kh_thangsinh + "/" + user.kh_namsinh;
}

//  sự kiện khi ấn vào giỏ hàng
var cart = document.querySelector(".cart-link");

cart.addEventListener("click", function(event) {
    event.preventDefault();
    if (bool) {
        Redirect("../html/giohang.html");
    } else
        alert("vui lòng đăng nhập trước");
});
