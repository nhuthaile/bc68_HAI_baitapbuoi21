class NhanVien {
  constructor(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam
  ) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = Number(luongCB);
    this.chucvu = chucvu;
    this.gioLam = Number(gioLam);
  }
  // Tính tổng lương
  tongLuong = function () {
    if (this.chucvu === "Sếp") {
      return this.luongCB * 3;
    }
    if (this.chucvu === "Trưởng phòng") {
      return this.luongCB * 2;
    }
    if (this.chucvu === "Nhân viên") {
      return this.luongCB * 1;
    }
  };

  // Xếp loại

  xepLoai = function () {
    if (this.gioLam >= 192) {
      return "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
      return "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
    }
  };
}
