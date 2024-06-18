let arrNhanVien = [];

// lấy thông tin nhân viên và lưu vào arrNhanVien

function layDuLieuNhanVien() {
  // Lay thong tin nhan vien
  let nhanVien = new NhanVien();
  //   let nhanVien = {};
  let infoTag = document.querySelectorAll(
    ".modal-body input, .modal-body select"
  );

  // Kiểm tra dữ liệu thoả điều kiện
  let isValid = true;

  for (let tag of infoTag) {
    let { id, value } = tag;
    nhanVien[id] = value;

    // DOM đến thẻ SPAN
    let spanDiv = document
      .getElementById(id)
      .parentElement.parentElement.querySelector(".form-group>span");

    //   Kiem tra validation
    emptyValidation(value, spanDiv);

    //   Kiểm tra cờ hiệu empty
    let isEmpty = emptyValidation(value, spanDiv);

    // Kiểm tra thoả điều kiện
    isValid = isValid && !isEmpty;
    // console.log("empty " + isValid);

    // console.log("empty: " + isValid);

    // Kiểm tra số ký tự Tài Khoản
    if (id === "tknv" && !isEmpty) {
      checkTaiKhoan(value, (min = 4), (max = 6), spanDiv);
      // Kiểm tra thoả điều kiện
      isValid = isValid && checkTaiKhoan(value, (min = 4), (max = 6), spanDiv);
      // console.log("taikhoan " + isValid);
    }

    // Kiểm tra tên Nhân viên
    if (id === "name" && !isEmpty) {
      checkTen(value, spanDiv);
      isValid = isValid && checkTen(value, spanDiv);
      // console.log("ten " + isValid);
    }

    // Kiểm tra email
    if (id === "email" && !isEmpty) {
      checkEmail(value, spanDiv);
      isValid = isValid && checkEmail(value, spanDiv);
      // console.log("email " + isValid);
    }

    // Kiểm tra mật khẩu
    if (id === "password" && !isEmpty) {
      checkMatKhau(value, (min = 6), (max = 10), spanDiv);
      isValid = isValid && checkMatKhau(value, (min = 6), (max = 10), spanDiv);
    }

    // Kiểm tra lương cơ bản
    if (id === "luongCB" && !isEmpty) {
      checkLuongCb(value, (min = 1000000), (max = 20000000), spanDiv);
      isValid =
        isValid &&
        checkLuongCb(value, (min = 1000000), (max = 20000000), spanDiv);
      // console.log("luongcb " + isValid);
    }

    // Kiểm tra số giờ làm trong tháng
    if (id === "gioLam" && !isEmpty) {
      checkGioLam(value, (min = 80), (max = 200), spanDiv);
      isValid = isValid && checkGioLam(value, (min = 80), (max = 200), spanDiv);
      // console.log("giolam " + isValid);
    }
  }
  // console.log("final" + isValid);

  // if (isValid) {
  //   return nhanVien;
  // }

  return nhanVien;
}

// Form Onsubmit
document.getElementById("formThongTin").onsubmit = function (e) {
  e.preventDefault();

  let nhanVien = layDuLieuNhanVien();
  if (!nhanVien) {
    return;
  }
  //   console.log(nhanVien);

  //   Thêm Nhan Viên Vào Mảng
  // Kiểm tra xem mảng có chứa phần tử nhanVien chưa
  let arrrTknv = [];
  for (let item of arrNhanVien) {
    arrrTknv.push(item.tknv);
  }
  if (arrrTknv.includes(nhanVien.tknv)) {
    return;
  } else {
    arrNhanVien.push(nhanVien);
  }

  //   console.log(arrNhanVien);

  //   Xoá các trường có trên mảng
  e.target.reset();

  //   In nhan vien ra bang
  inNhanVien();
};

// In thông tin nhân viên
function inNhanVien() {
  //   In dữ liệu ra html
  let thongTin = "";

  for (let nhanVien of arrNhanVien) {
    let {
      tknv,
      name,
      email,
      password,
      datepicker,
      luongCB,
      chucvu,
      gioLam,
      tongLuong,
      xepLoai,
    } = nhanVien;

    thongTin += `
    <tr>
		<td>${tknv}</td>
		<td>${name}</td>
		<td>${email}</td>
		<td>${datepicker}</td>
		<td>${chucvu}</td>
		<td>${nhanVien.tongLuong()}</td>
		<td>${nhanVien.xepLoai()}</td>
        <td>
		<button onclick="xoaNhanVien('${tknv}')" class="btn btn-danger">Xoá</button>
		<button data-toggle="modal" data-target="#myModal" onclick="capNhat('${tknv}')" class="btn btn-warning mt-3">Cập Nhật</button>
	</td>
	</tr>`;
  }

  document.getElementById("tableDanhSach").innerHTML = thongTin;
}

// Xoá thông tin nhân viên
function xoaNhanVien(tknv) {
  arrNhanVien = arrNhanVien.filter((nhanVien) => nhanVien.tknv !== tknv);

  //   In Thong tin Nhan Vien
  inNhanVien();
}

// Cập nhật thông tin nhân viên

function capNhat(tknv) {
  layThongTinLenModal(tknv);
}

// Tìm ra vị trí nhanVien
function layThongTinLenModal(tknv) {
  // Đưa thông tin lên modal
  // xác định vị trí cần cập nhật
  let itemIndex;
  itemIndex = arrNhanVien.findIndex((nhanVien) => nhanVien.tknv === tknv);

  if (itemIndex === -1) {
    return console.log("không tìm thấy phần tử");
  }
  // Gọi tra các trường chứa dữ liệu trên modal
  let infoTag = document.querySelectorAll(
    ".modal-body input, .modal-body select"
  );

  // console.log(arrNhanVien[itemIndex]);
  for (let tag of infoTag) {
    // console.log(tag);
    let key = tag.id;
    // console.log(arrNhanVien[itemIndex][key]);
    if (arrNhanVien[itemIndex][key] !== undefined) {
      tag.value = arrNhanVien[itemIndex][key];
      // console.log(tag.value);
    }
    // console.log(tag.id);
    // console.log(tknv);
    if (tag.id === "tknv") {
      tag.readOnly = true;
    }
  }
}

// Cap nhat thong tin nhan vien
document.getElementById("btnCapNhat").onclick = capNhatNhanVien;

// Thay nhanVien mới vào đúng vị trí
function capNhatNhanVien() {
  let nhanVien = layDuLieuNhanVien();
  if (!nhanVien) {
    return;
  }
  // console.log(arrNhanVien);

  let itemIndex = arrNhanVien.findIndex((item) => item.tknv === nhanVien.tknv);

  if (itemIndex !== -1) {
    arrNhanVien.splice(itemIndex, 1, nhanVien);
  } else {
    console.log("không tìm được giá trị thích hợp");
  }
  // console.log(arrNhanVien);

  // Indữ liệu lên table
  inNhanVien();
}

// Tìm nhân viên theo loại và hiển thị
document.getElementById("searchName").oninput = searchChucVu;

function searchChucVu(e) {
  // Lấy dữ liệu input
  let searchKey = document.getElementById("searchName").value;

  // Chuyển đổi dữ liệu về chuẩn

  let editKey = stringConvert(searchKey).toLowerCase();
  // console.log(editKey);

  // fillter các dữ kiện thích hợp trong mảng
  let filterNhanVien = arrNhanVien.filter((nhanVien) =>
    stringConvert(nhanVien.chucvu.toLowerCase()).includes(editKey)
  );
  // console.log(filterNhanVien);

  // In ra table filterArr
  let content = "";
  for (let nhanVien of filterNhanVien) {
    console.log(nhanVien);

    let { tknv, name, email, datepicker, chucvu } = nhanVien;

    content += `
    <tr>
		<td>${tknv}</td>
		<td>${name}</td>
		<td>${email}</td>
		<td>${datepicker}</td>
		<td>${chucvu}</td>
		<td>${nhanVien.tongLuong()}</td>
		<td>${nhanVien.xepLoai()}</td>
        <td>
		<button onclick="xoaNhanVien('${tknv}')" class="btn btn-danger">Xoá</button>
		<button data-toggle="modal" data-target="#myModal" onclick="capNhat('${tknv}')" class="btn btn-warning mt-3">Cập Nhật</button>
	</td>
	</tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}
