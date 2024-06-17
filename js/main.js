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
    console.log("empty " + isValid);

    // console.log("empty: " + isValid);

    // Kiểm tra số ký tự Tài Khoản
    if (id === "tknv" && !isEmpty) {
      checkTaiKhoan(value, (min = 4), (max = 6), spanDiv);
      // Kiểm tra thoả điều kiện
      isValid = isValid && checkTaiKhoan(value, (min = 4), (max = 6), spanDiv);
      console.log("taikhoan " + isValid);
    }

    // Kiểm tra tên Nhân viên
    if (id === "name" && !isEmpty) {
      checkTen(value, spanDiv);
      isValid = isValid && checkTen(value, spanDiv);
      console.log("ten " + isValid);
    }

    // Kiểm tra email
    if (id === "email" && !isEmpty) {
      checkEmail(value, spanDiv);
      isValid = isValid && checkEmail(value, spanDiv);
      console.log("email " + isValid);
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
      console.log("luongcb " + isValid);
    }

    // Kiểm tra số giờ làm trong tháng
    if (id === "gioLam" && !isEmpty) {
      checkGioLam(value, (min = 80), (max = 200), spanDiv);
      isValid = isValid && checkGioLam(value, (min = 80), (max = 200), spanDiv);
      console.log("giolam " + isValid);
    }
  }
  console.log("final" + isValid);

  //   if (isValid) {
  //     return nhanVien;
  //   }

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
  arrNhanVien.push(nhanVien);
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
		<button onclick="capNhat('${tknv}')" class="btn btn-warning mt-3">Cập Nhật</button>
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

function capNhat(tknv) {}
