// KIểm tra ô trống
function emptyValidation(value, spanDiv) {
  // Kiểm tra ô trống
  if (value === "") {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = `Vui lòng điền thông tin`;
    return true;
  } else {
    spanDiv.innerHTML = "";
    return false;
  }
}

//Kiểm tra số ký tự tài khoản
function checkTaiKhoan(value, min, max, spanDiv) {
  if ((value.length < min && value.length > 0) || value.length > max) {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = `Tài khoản từ ${min} đến ${max} ký tự`;
    return false;
  } else {
    spanDiv.innerHTML = "";
    return true;
  }
}

// Kiểm tra tên nhân viên
function checkTen(value, spanDiv) {
  if (value.split(" ").every((a) => !isNaN(a))) {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = `Tên phải là ký tự chữ`;
    return false;
  } else {
    spanDiv.innerHTML = "";
    return true;
  }
}

// Kiểm tra email
function checkEmail(value, spanDiv) {
  const validateEmail = (value) => {
    return String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  if (!validateEmail(value)) {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = `Email chưa đúng định dạng`;
    return false;
  } else {
    spanDiv.innerHTML = "";
    return true;
  }
}

// Kiểm tra mật khẩu
function checkMatKhau(value, min, max, spanDiv) {
  if (value.length >= min && value.length <= max) {
    let content = "";
    if (
      !value.match(/[A-Z]+/) ||
      !value.match(/[0-9]+/) ||
      !value.match(/[$@#&!]+/)
    ) {
      //   console.log(value);
      content = `Mật khẩu chứa ít nhất một ký tự in hoa, một ký tự số và một ký tự đặc biệt`;
      spanDiv.style.display = "block";
      spanDiv.innerHTML = content;
      return false;
    } else {
      spanDiv.innerHTML = "";
      return true;
    }
  } else {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = `Độ dài mật khẩu từ ${min} tới ${max} chữ`;
    return false;
  }
}

// Kiểm tra lương cơ bản
function checkLuongCb(value, min, max, spanDiv) {
  if (value >= min && value <= max) {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = "";
    return true;
  } else {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = `Lương cơ bản từ ${min / 1000000} triệu tới ${
      max / 1000000
    } triệu`;
    return false;
  }
}

// Kiem tra so gio lam

function checkGioLam(value, min, max, spanDiv) {
  if (value >= 80 && value <= 200) {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = "";
    return true;
  } else {
    spanDiv.style.display = "block";
    spanDiv.innerHTML = `Số giờ làm trong tháng từ ${min} đến ${max} giờ `;
    return false;
  }
}
