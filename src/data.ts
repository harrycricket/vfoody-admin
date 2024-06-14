const columns = [
  { name: 'Thứ tự đơn hàng', uid: 'orderId', sortable: true },
  { name: 'Tên cửa hàng', uid: 'shopName', sortable: true },
  { name: 'Tên khách hàng', uid: 'customerName', sortable: true },
  { name: 'Trạng thái đơn hàng', uid: 'status', sortable: true },
  { name: 'Tổng hóa đơn', uid: 'price', sortable: true },
  { name: 'Thời gian giao dịch', uid: 'orderDate', sortable: true },
  // {name: "Thao tác", uid: "actions"},
];

const rows = [
  { value: '10', uid: '10' },
  { value: '15', uid: '15' },
  { value: '20', uid: '20' },
  { value: '25', uid: '25' },
];

const status = [
  { name: 'Đã hoàn thành', uid: 'Đã hoàn thành' },
  { name: 'Đang thực hiện', uid: 'Đang thực hiện' },
  { name: 'Đã hủy', uid: 'Đã hủy' },
];

const transactions = [
  {
    id: 1,
    orderId: 1,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Harry',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-14 10:23:22',
    price: 50000,
  },
  {
    id: 2,
    orderId: 2,
    shopName: 'Mì cay SEOUL',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đang thực hiện',
    orderDate: '2024-06-12 10:23:22',
    price: 50000,
  },
  {
    id: 3,
    orderId: 3,
    shopName: 'Tiệm bánh SOULCAKE',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-10 10:23:22',
    price: 300000,
  },
  {
    id: 4,
    orderId: 4,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Harry',
    status: 'Đã hủy',
    orderDate: '2024-06-10 10:23:22',
    price: 50000,
  },
  {
    id: 5,
    orderId: 5,
    shopName: 'Bún đậu Akiso',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đang thực hiện',
    orderDate: '2024-06-09 10:23:22',
    price: 50000,
  },
  {
    id: 6,
    orderId: 6,
    shopName: 'Gà Ủ Muối HDFood',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-09 10:23:22',
    price: 300000,
  },
  {
    id: 7,
    orderId: 7,
    shopName: 'Tiệm bánh SOULCAKE',
    customerName: 'Harry',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-09 10:23:22',
    price: 50000,
  },
  {
    id: 8,
    orderId: 8,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hủy',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 9,
    orderId: 9,
    shopName: 'Bún đậu Akiso',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 300000,
  },
  {
    id: 10,
    orderId: 10,
    shopName: 'Tiệm bánh SOULCAKE',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đang thực hiện',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 11,
    orderId: 11,
    shopName: 'Gà Ủ Muối HDFood',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hủy',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 12,
    orderId: 12,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 300000,
  },
  {
    id: 13,
    orderId: 13,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đang thực hiện',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 14,
    orderId: 14,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 15,
    orderId: 15,
    shopName: 'Tiệm bánh SOULCAKE',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hủy',
    orderDate: '2024-06-08 10:23:22',
    price: 300000,
  },
  {
    id: 16,
    orderId: 16,
    shopName: 'Bún đậu Akiso',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 17,
    orderId: 17,
    shopName: 'Gà Ủ Muối HDFood',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 18,
    orderId: 18,
    shopName: 'Gà Ủ Muối HDFood',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đang thực hiện',
    orderDate: '2024-06-08 10:23:22',
    price: 300000,
  },
  {
    id: 19,
    orderId: 19,
    shopName: 'Gà Ủ Muối HDFood',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hủy',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 20,
    orderId: 20,
    shopName: 'Bún đậu Akiso',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 21,
    orderId: 21,
    shopName: 'Bún đậu Akiso',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hủy',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 22,
    orderId: 22,
    shopName: 'Bún đậu Akiso',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 300000,
  },
  {
    id: 23,
    orderId: 23,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đang thực hiện',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 24,
    orderId: 24,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 25,
    orderId: 25,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hủy',
    orderDate: '2024-06-08 10:23:22',
    price: 300000,
  },
  {
    id: 26,
    orderId: 26,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 27,
    orderId: 27,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 28,
    orderId: 28,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đang thực hiện',
    orderDate: '2024-06-08 10:23:22',
    price: 300000,
  },
  {
    id: 29,
    orderId: 29,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hủy',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 30,
    orderId: 30,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 31,
    orderId: 31,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
  {
    id: 32,
    orderId: 32,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-08 10:23:22',
    price: 50000,
  },
];

export { columns, transactions, status, rows };
