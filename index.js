// -----------Bài 1----------------
/**
 1. Input: giá trị người dùng nhập: điểm chuẩn, khu vực, đối tượng, điểm môn 1, điểm môn 2, điểm môn 3.
 2. Xử lý: 
 - Tính tổng điểm 3 môn
 - Tổng điểm 3 môn + khu vực nếu có
 - Tổng điểm 3 môn + khu vực (nếu có) + đối tượng ưu tiên (nếu có)
 - Tổng điểm >= điểm chuẩn ==> đậu, và ngược lại rớt
 3. In kết quả ra giao diện
 */
document.getElementById('btnKetQua1').onclick = function () {
  var diemChuan = document.getElementById('diemChuan').value * 1;
  //   console.log(diemChuan);
  var khuVuc = document.getElementById('khuVuc').value;
  //   console.log(khuVuc);
  var doiTuong = document.getElementById('doiTuong').value;
  //   console.log(doiTuong);
  var diemMon1 = document.getElementById('diemMon1').value * 1;
  //   console.log(diemMon1);
  var diemMon2 = document.getElementById('diemMon2').value * 1;
  //   console.log(diemMon2);
  var diemMon3 = document.getElementById('diemMon3').value * 1;
  //   console.log(diemMon3);
  var diemUuTien = 0;
  switch (khuVuc) {
    case 'A':
      diemUuTien = 2;
      break;
    case 'B':
      diemUuTien = 1;
      break;
    case 'C':
      diemUuTien = 0.5;
      break;
    default:
      diemUuTien = 0;
      break;
  }
  console.log(diemUuTien);
  switch (doiTuong) {
    case '1':
      diemUuTien += 2.5;
      break;
    case '2':
      diemUuTien += 1.5;
      break;
    case '3':
      diemUuTien = 1;
      break;
    default:
      break;
  }
  console.log(diemUuTien);
  var inFoKetQua = '';
  var total = diemMon1 + diemMon2 + diemMon3 + diemUuTien;
  if (total >= diemChuan) {
    inFoKetQua = 'Xin chúc mừng bạn đã đậu';
  } else {
    inFoKetQua = 'Rất tiếc bạn không đạt';
  }
  document.getElementById(
    'ketQua1'
  ).innerHTML = `${inFoKetQua}. Tổng điểm của bạn là: ${total}`;
};

// --------Bài 2----------------
/**
 1. Input: họ tên và số điện người dùng nhập
 2. Xử lý: 
 - Số điện <= 50 ==> tổng = số điện * 500d/kw  
 - Số điện <= 100 ==> tổng = 50kwđầu*500d/kw + (số điện -50)*650 9
 - Số điện <= 200 ==> tổng = 50kwđầu*500d/kw + 50kwKế*650 + (số điện - (50kwđầu+50kwKế))*850d/kw 
 - Số điện <= 350 ==> tổng = 50kwđầu*500d/kw + 50kwKế*650 + 100kwKế*850d/kw + (số điện - (50kwđầu+50kwKế)+100kwKế)*1100
 - Số điện còn lại:  50kwđầu*500d/kw + 50kwKế*650 + 100kwKế*850d/kw + 150*1100(số điện - (còn lại)*1300
 3. In kết quả ra giao diện
 */

document.getElementById('btnKetQua2').onclick = function () {
  var hoTen = document.getElementById('hoTen').value;
  //   console.log(hoTen);
  var soDien = document.getElementById('soDien').value * 1;
  //   console.log(soDien);
  var tienDien = 0;
  if (soDien < 0) {
    alert('số điện không tồn tại. Vui lòng nhập lại');
  } else if (soDien >= 0 && soDien <= 50) {
    tienDien = soDien * 500;
  } else if (soDien > 50 && soDien <= 100) {
    tienDien = 50 * 500 + (soDien - 50) * 650;
  } else if (soDien > 100 && soDien <= 200) {
    tienDien = 50 * 500 + 50 * 650 + (soDien - 50 - 50) * 850;
  } else if (soDien > 200 && soDien <= 350) {
    tienDien = 50 * 500 + 50 * 650 + 100 * 850 + (soDien - 200) * 1100;
  } else {
    tienDien =
      50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (soDien - 350) * 1300;
  }
  var formatTienDien = tienDien.toLocaleString({
    style: 'currency',
    currency: 'VND',
  });
  document.getElementById(
    'ketQua2'
  ).innerHTML = `Tiền điện của khách hàng ${hoTen}: ${formatTienDien}VND`;
};

// -------------Bài tập 3---------------
/**
 1. Input: họ tên và tổng thu nhập 1 năm, số người phụ thuộc
 2. Xử lý: 
 - Thuế thu nhập=  Tổng thu nhập năm - 4.000.000 - số người phụ thuộc * 1.600.000
 - tiền thuế <= 60tr  ==> tiền thuế * 5%
 - tiền thuế <= 120tr  ==> tiền thuế * 10%
 - tiền thuế <= 210tr  ==> tiền thuế * 15%
 - tiền thuế <= 384tr  ==> tiền thuế * 20%
 - tiền thuế <= 624tr  ==> tiền thuế * 25%
 - tiền thuế <= 960tr  ==> tiền thuế * 30%
 - tiền thuế > 960tr  ==> tiền thuế * 35%thuế * thuế suất
 3. In kết quả ra giao diện
 */
// Bậc thuế
const bacThue_1 = 60e6;
const bacThue_2 = 120e6;
const bacThue_3 = 210e6;
const bacThue_4 = 384e6;
const bacThue_5 = 624e6;
const bacThue_6 = 960e6;
// Thuế suất
const thueSuat_1 = 0.05;
const thueSuat_2 = 0.1;
const thueSuat_3 = 0.15;
const thueSuat_4 = 0.2;
const thueSuat_5 = 0.25;
const thueSuat_6 = 0.3;
const thueSuat_7 = 0.35;
document.getElementById('btnKetQua3').onclick = function () {
  var name = document.getElementById('name').value;
  var thuNhap = document.getElementById('thuNhap').value * 1;
  var soNguoi = document.getElementById('soNguoi').value * 1;
  var thuNhapChiuThue = thuNhap - 4e6 - soNguoi * 1600000;
  //   console.log(thuNhapChiuThue);
  var hienThi = document.getElementById('ketQua3');
  //   console.log(thuNhapChiuThue, name);
  var thueThuNhap = 0;
  if (thuNhapChiuThue < 0) {
    alert('Tổng thu nhập của bạn là âm nên không cần đóng thuế');
  } else if (thuNhapChiuThue > 0 && thuNhapChiuThue <= bacThue_1) {
    thueThuNhap = thuNhapChiuThue * thueSuat_1;
    // console.log(thueThuNhap);
  } else if (thuNhapChiuThue > bacThue_1 && thuNhapChiuThue <= bacThue_2) {
    thueThuNhap = thuNhapChiuThue * thueSuat_2;
  } else if (thuNhapChiuThue > bacThue_2 && thuNhapChiuThue <= bacThue_3) {
    thueThuNhap = thuNhapChiuThue * thueSuat_3;
  } else if (thuNhapChiuThue > bacThue_3 && thuNhapChiuThue <= bacThue_4) {
    thueThuNhap = thuNhapChiuThue * thueSuat_4;
  } else if (thuNhapChiuThue > bacThue_4 && thuNhapChiuThue <= bacThue_5) {
    thueThuNhap = thuNhapChiuThue * thueSuat_5;
  } else if (thuNhapChiuThue > bacThue_5 && thuNhapChiuThue <= bacThue_6) {
    thueThuNhap = thuNhapChiuThue * thueSuat_6;
  } else if (thuNhapChiuThue > bacThue_6) {
    thueThuNhap = thuNhapChiuThue * thueSuat_7;
  }
  console.log(thueThuNhap);
  var formatThue = thueThuNhap.toLocaleString({
    style: 'currency',
    currency: 'VND',
  });
  hienThi.innerHTML = `Thuế cá nhân của ${name} là ${formatThue}VND`;
};
