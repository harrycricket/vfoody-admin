// Manage transactions
const transactionColumns = [
  { name: 'Thứ tự đơn hàng', uid: 'orderId', sortable: true },
  { name: 'Tên cửa hàng', uid: 'shopName', sortable: true },
  { name: 'Tên khách hàng', uid: 'customerName', sortable: true },
  { name: 'Trạng thái đơn hàng', uid: 'status', sortable: true },
  { name: 'Tổng hóa đơn', uid: 'price', sortable: true },
  { name: 'Thời gian giao dịch', uid: 'orderDate', sortable: true },
];

const transactionStatus = [
  { name: 'Đã hoàn thành', uid: 'Đã hoàn thành' },
  { name: 'Đang thực hiện', uid: 'Đang thực hiện' },
  { name: 'Đã hủy', uid: 'Đã hủy' },
];

const transactions = [
  {
    id: 1,
    orderId: 1,
    shopName: 'Tiệm ăn tháng năm',
    customerName: 'Huỳnh Văn Phướt',
    status: 'Đã hoàn thành',
    orderDate: '2024-06-14 10:23:22',
    price: 144000,
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

const transactionDetail = {
  id: 1,
  shopName: 'Tiệm ăn tháng năm',
  customerName: 'Huỳnh Văn Phướt',
  phoneNumber: '0372548189',
  status: 'Đã hoàn thành',
  orderDate: '2024-06-14 10:23:22',
  address: 'Tòa S202 Vinhomes Grand Park',
  products: [
    {
      productId: 1,
      name: 'Bún chả thơm ngon',
      price: 50000,
      quantity: 1,
      image:
        'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716573601283-9fb9570b-a1b2-4375-bce2-a73318b1dd8e',
      question: [
        { id: 1, name: 'Nước mắm', value: 'Ít', price: 0 },
        { id: 2, name: 'Topping', value: 'Thêm 1 phần chả', price: 5000 },
        { id: 3, name: 'Rau sống', value: 'Nhiều', price: 0 },
      ],
    },
    {
      productId: 2,
      name: 'Nước chanh mát lạnh',
      price: 20000,
      quantity: 2,
      image:
        'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716573336608-02b81f10-0f34-4ad0-a0f9-759ab5cc8601',
      question: [
        { id: 1, name: 'Lượng đường', value: 'Vừa', price: 0 },
        { id: 2, name: 'Lượng đá', value: 'Bỏ riêng', price: 0 },
        { id: 3, name: 'Kích cỡ', value: 'Lớn', price: 7000 },
      ],
    },
    {
      productId: 3,
      name: 'Gỏi cuốn tươi ngon',
      price: 35000,
      quantity: 1,
      image:
        'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716573222065-3dfc243d-5e6e-44c3-89b3-f115de0bd411',
      question: [{ id: 1, name: 'Nước chấm', value: 'Sốt siêu cay', price: 0 }],
    },
  ],
  totalPrice: 144000,
  note: 'Bỏ riêng nước chanh với thức ăn',
};

// Manage shops
const shopColumns = [
  { name: 'Thứ tự cửa hàng', uid: 'shopId', sortable: true },
  { name: 'Tên cửa hàng', uid: 'shopName', sortable: true },
  { name: 'Tên chủ cửa hàng', uid: 'shopOwnerName', sortable: true },
  { name: 'Số điện thoại', uid: 'phoneNumber' },
  { name: 'Tổng đơn hàng', uid: 'totalOrder', sortable: true },
  { name: 'Tổng sản phẩm', uid: 'totalProduct', sortable: true },
  { name: 'Tổng doanh thu', uid: 'revenue', sortable: true },
  { name: 'Trạng thái cửa hàng', uid: 'status', sortable: true },
  { name: 'Ngày đăng ký', uid: 'registerDate', sortable: true },
  { name: 'Thao tác', uid: 'actions' },
];

const shopStatus = [
  { name: 'Đang hoạt động', uid: 'Đang hoạt động' },
  { name: 'Đang đóng cửa', uid: 'Đang đóng cửa' },
  { name: 'Đã bị cấm', uid: 'Đã bị cấm' },
];

const shops = [
  {
    id: 1,
    shopId: 1,
    shopName: 'Tiệm ăn tháng năm',
    shopOwnerName: 'Huỳnh Văn Phướt',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574021822-6d18826e-c040-491e-8462-141dfb7b5783',
    phoneNumber: '0912345670',
    totalOrder: 100,
    totalProduct: 50,
    status: 'Đang hoạt động',
    revenue: 10000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 2,
    shopId: 2,
    shopName: 'Mì cay SEOUL',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574183627-229fedf7-129a-46dd-96c5-f942769d90f7',
    phoneNumber: '0912345671',
    totalOrder: 85,
    totalProduct: 32,
    shopOwnerName: 'Harry Cricket',
    status: 'Đang hoạt động',
    revenue: 123000000,
    registerDate: '2024-01-12 10:23:22',
  },
  {
    id: 3,
    shopId: 3,
    shopName: 'Bún đậu Akiso',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574459999-a5ed42cc-494a-4c91-8d00-f2162746fb0f',
    phoneNumber: '0912345673',
    totalOrder: 85,
    totalProduct: 32,
    shopOwnerName: 'Huỳnh Văn Phướt',
    status: 'Đang hoạt động',
    revenue: 10000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 4,
    shopId: 4,
    shopName: 'Tiệm bánh SOULCAKE',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574309176-c2554001-d6a7-42ee-9546-bae978313ad0',
    phoneNumber: '0912345672',
    totalOrder: 85,
    totalProduct: 32,
    shopOwnerName: 'Harry Cricket',
    status: 'Đang đóng cửa',
    revenue: 78000000,
    registerDate: '2024-01-12 10:23:22',
  },
  {
    id: 5,
    shopId: 5,
    shopName: 'Bún đậu Akiso',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574459999-a5ed42cc-494a-4c91-8d00-f2162746fb0f',
    phoneNumber: '0912345673',
    totalOrder: 92,
    totalProduct: 36,
    shopOwnerName: 'Huỳnh Văn Phướt',
    status: 'Đã bị cấm',
    revenue: 10000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 6,
    shopId: 6,
    shopName: 'Tiệm bánh SOULCAKE',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574309176-c2554001-d6a7-42ee-9546-bae978313ad0',
    phoneNumber: '0912345672',
    totalOrder: 92,
    totalProduct: 36,
    shopOwnerName: 'Harry Cricket',
    status: 'Đang đóng cửa',
    revenue: 78000000,
    registerDate: '2024-01-12 10:23:22',
  },
  {
    id: 7,
    shopId: 7,
    shopName: 'Tiệm ăn tháng năm',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574021822-6d18826e-c040-491e-8462-141dfb7b5783',
    phoneNumber: '0912345670',
    totalOrder: 92,
    totalProduct: 36,
    shopOwnerName: 'Huỳnh Văn Phướt',
    status: 'Đang hoạt động',
    revenue: 10000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 8,
    shopId: 8,
    shopName: 'Gà Ủ Muối HDFood',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574615289-6aa0c59b-e2a8-4d3d-bf04-d5d35dc54411',
    phoneNumber: '0912345674',
    totalOrder: 144,
    totalProduct: 64,
    shopOwnerName: 'Harry Cricket',
    status: 'Đã bị cấm',
    revenue: 92000000,
    registerDate: '2024-01-12 10:23:22',
  },
  {
    id: 9,
    shopId: 9,
    shopName: 'Tiệm ăn tháng năm',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574021822-6d18826e-c040-491e-8462-141dfb7b5783',
    phoneNumber: '0912345670',
    totalOrder: 144,
    totalProduct: 64,
    shopOwnerName: 'Huỳnh Văn Phướt',
    status: 'Đang hoạt động',
    revenue: 108000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 10,
    shopId: 10,
    shopName: 'Gà Ủ Muối HDFood',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574615289-6aa0c59b-e2a8-4d3d-bf04-d5d35dc54411',
    phoneNumber: '0912345674',
    totalOrder: 144,
    totalProduct: 64,
    shopOwnerName: 'Harry Cricket',
    status: 'Đang đóng cửa',
    revenue: 92000000,
    registerDate: '2024-01-12 10:23:22',
  },
  {
    id: 11,
    shopId: 11,
    shopName: 'Tiệm ăn tháng năm',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574021822-6d18826e-c040-491e-8462-141dfb7b5783',
    phoneNumber: '0912345670',
    totalOrder: 100,
    totalProduct: 50,
    shopOwnerName: 'Huỳnh Văn Phướt',
    status: 'Đang hoạt động',
    revenue: 1080000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 12,
    shopId: 12,
    shopName: 'Mì cay SEOUL',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574183627-229fedf7-129a-46dd-96c5-f942769d90f7',
    phoneNumber: '0912345671',
    totalOrder: 100,
    totalProduct: 50,
    shopOwnerName: 'Harry Cricket',
    status: 'Đang đóng cửa',
    revenue: 123000000,
    registerDate: '2024-01-12 10:23:22',
  },
  {
    id: 13,
    shopId: 13,
    shopName: 'Tiệm ăn tháng năm',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574021822-6d18826e-c040-491e-8462-141dfb7b5783',
    phoneNumber: '0912345670',
    totalOrder: 100,
    totalProduct: 50,
    shopOwnerName: 'Huỳnh Văn Phướt',
    status: 'Đang hoạt động',
    revenue: 1080000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 14,
    shopId: 14,
    shopName: 'Mì cay SEOUL',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574183627-229fedf7-129a-46dd-96c5-f942769d90f7',
    phoneNumber: '0912345671',
    totalOrder: 100,
    totalProduct: 50,
    shopOwnerName: 'Harry Cricket',
    status: 'Đang đóng cửa',
    revenue: 123000000,
    registerDate: '2024-01-12 10:23:22',
  },
  {
    id: 15,
    shopId: 15,
    shopName: 'Tiệm ăn tháng năm',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574021822-6d18826e-c040-491e-8462-141dfb7b5783',
    phoneNumber: '0912345670',
    totalOrder: 100,
    totalProduct: 50,
    shopOwnerName: 'Huỳnh Văn Phướt',
    status: 'Đang hoạt động',
    revenue: 10000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 16,
    shopId: 16,
    shopName: 'Mì cay SEOUL',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574183627-229fedf7-129a-46dd-96c5-f942769d90f7',
    phoneNumber: '0912345671',
    totalOrder: 100,
    totalProduct: 50,
    shopOwnerName: 'Harry Cricket',
    status: 'Đã bị cấm',
    revenue: 123000000,
    registerDate: '2024-01-12 10:23:22',
  },
  {
    id: 17,
    shopId: 17,
    shopName: 'Tiệm ăn tháng năm',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574021822-6d18826e-c040-491e-8462-141dfb7b5783',
    phoneNumber: '0912345670',
    totalOrder: 100,
    totalProduct: 50,
    shopOwnerName: 'Huỳnh Văn Phướt',
    status: 'Đã bị cấm',
    revenue: 10000000,
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 18,
    shopId: 18,
    shopName: 'Mì cay SEOUL',
    logoUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574183627-229fedf7-129a-46dd-96c5-f942769d90f7',
    phoneNumber: '0912345671',
    totalOrder: 100,
    totalProduct: 50,
    shopOwnerName: 'Harry Cricket',
    status: 'Đã bị cấm',
    revenue: 123000000,
    registerDate: '2024-01-12 10:23:22',
  },
];

const shopInformation = {
  id: 1,
  shopName: 'Tiệm ăn tháng năm',
  shopOwnerName: 'Huỳnh Văn Phướt',
  logoUrl:
    'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574021822-6d18826e-c040-491e-8462-141dfb7b5783',
  bannerUrl:
    'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716574070180-9fe6423d-0fbb-433b-a35f-54a40df7c9c1',
  description: 'Tiệm ăn tháng năm là một trong những tiệm ăn nổi tiếng tại Vinhomes Grand Park',
  phoneNumber: '0912345670',
  totalOrder: 100,
  totalProduct: 50,
  totalRating: 100,
  star: 4.8,
  status: 'Đang hoạt động',
  registerDate: '2024-01-14 10:23:22',
  address: 'Tòa S703 Vinhomes Grand Park',
  revenue: 10000000,
};

// Manage accounts
const accountColumns = [
  { name: 'Thứ tự', uid: 'accountId', sortable: true },
  { name: 'Tên tài khoản', uid: 'accountName', sortable: true },
  { name: 'Số điện thoại', uid: 'phoneNumber' },
  { name: 'Email', uid: 'email' },
  { name: 'Loại tài khoản', uid: 'accountType', sortable: true },
  { name: 'Trạng thái', uid: 'status', sortable: true },
  { name: 'Ngày đăng ký', uid: 'registerDate', sortable: true },
  { name: 'Thao tác', uid: 'actions' },
];

const accountStatus = [
  { name: 'Đang hoạt động', uid: 'Đang hoạt động' },
  { name: 'Đã bị cấm', uid: 'Đã bị cấm' },
];

const accountType = [
  { name: 'Khách hàng', uid: 'Khách hàng' },
  { name: 'Chủ cửa hàng', uid: 'Chủ cửa hàng' },
];

const accounts = [
  {
    id: 1,
    accountId: 1,
    accountName: 'Huỳnh Văn Phướt',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717665106663-d519af0b-897f-4c92-b776-f628060e4926',
    email: 'phuothvfptu@gmail.com',
    phoneNumber: '0372485570',
    status: 'Đang hoạt động',
    accountType: 'Khách hàng',
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 2,
    accountId: 2,
    accountName: 'Đào Mai Duy Đức',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717170503136-d33db85f-e070-4db1-acec-bfe80254b503',
    email: 'ducdmd@gmail.com',
    phoneNumber: '0372485571',
    status: 'Đang hoạt động',
    accountType: 'Khách hàng',
    registerDate: '2024-02-16 10:23:22',
  },
  {
    id: 3,
    accountId: 3,
    accountName: 'Cao Nhật Thiên',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717603935701-f01fa889-f150-4128-b29d-18742eb4f6e9',
    email: 'thiencn@gmail.com',
    phoneNumber: '0372485572',
    status: 'Đã bị cấm',
    accountType: 'Khách hàng',
    registerDate: '2024-02-16 10:23:22',
  },
  {
    id: 4,
    accountId: 4,
    accountName: 'Nguyễn Văn Thống',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717603889077-2a2d60b2-29d1-4199-b21b-f257281b1b70',
    email: 'thongnv@gmail.com',
    phoneNumber: '0372485573',
    status: 'Đang hoạt động',
    accountType: 'Chủ cửa hàng',
    registerDate: '2024-02-28 10:23:22',
  },
  {
    id: 5,
    accountId: 5,
    accountName: 'Phạm Hoàng Tiến',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717603714751-9edd617e-8720-4757-af29-9ffcaa77ee22',
    email: 'tienph@gmail.com',
    phoneNumber: '0372485574',
    status: 'Đang hoạt động',
    accountType: 'Khách hàng',
    registerDate: '2024-02-28 10:23:22',
  },
  {
    id: 6,
    accountId: 6,
    accountName: 'Nguyễn Thị Hồng Lợi',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717603776995-6568d6f2-5548-4345-b1b2-eae81445879e',
    email: 'lointh@gmail.com',
    phoneNumber: '0372485575',
    status: 'Đã bị cấm',
    accountType: 'Chủ cửa hàng',
    registerDate: '2024-01-04 10:23:22',
  },
  {
    id: 7,
    accountId: 7,
    accountName: 'Hồ Kim Ngọc',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717604280125-5182844c-331e-4028-8af9-6a3cc36456b8',
    email: 'ngochk@gmail.com',
    phoneNumber: '0372485576',
    status: 'Đang hoạt động',
    accountType: 'Chủ cửa hàng',
    registerDate: '2024-01-04 10:23:22',
  },
  {
    id: 8,
    accountId: 8,
    accountName: 'Lê Nguyễn Châu Sa',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717604130883-92f2caf3-6450-4068-a88d-4ad97e3fc409',
    email: 'salnc@gmail.com',
    phoneNumber: '0372485577',
    status: 'Đang hoạt động',
    accountType: 'Chủ cửa hàng',
    registerDate: '2024-01-04 10:23:22',
  },
  {
    id: 9,
    accountId: 9,
    accountName: 'Huỳnh Văn Phướt',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717665106663-d519af0b-897f-4c92-b776-f628060e4926',
    email: 'phuothvfptu@gmail.com',
    phoneNumber: '0372485578',
    status: 'Đã bị cấm',
    accountType: 'Chủ cửa hàng',
    registerDate: '2024-01-04 10:23:22',
  },
  {
    id: 10,
    accountId: 10,
    accountName: 'Huỳnh Văn Phướt',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717665106663-d519af0b-897f-4c92-b776-f628060e4926',
    email: 'phuothvfptu@gmail.com',
    phoneNumber: '0372485579',
    status: 'Đang hoạt động',
    accountType: 'Khách hàng',
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 11,
    accountId: 11,
    accountName: 'Huỳnh Văn Phướt',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717665106663-d519af0b-897f-4c92-b776-f628060e4926',
    email: 'phuothvfptu@gmail.com',
    phoneNumber: '0372485580',
    status: 'Đang hoạt động',
    accountType: 'Chủ cửa hàng',
    registerDate: '2024-01-14 10:23:22',
  },
  {
    id: 12,
    accountId: 12,
    accountName: 'Huỳnh Văn Phướt',
    avatarUrl:
      'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717665106663-d519af0b-897f-4c92-b776-f628060e4926',
    email: 'phuothvfptu@gmail.com',
    phoneNumber: '0372485581',
    status: 'Đang hoạt động',
    accountType: 'Khách hàng',
    registerDate: '2024-01-14 10:23:22',
  },
];

const accountInformation = {
  id: 1,
  accountName: 'Huỳnh Văn Phướt',
  avatarUrl:
    'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1717665106663-d519af0b-897f-4c92-b776-f628060e4926',
  email: 'phuothvfptu@gmail.com',
  phoneNumber: '0372485570',
  status: 'Đang hoạt động',
  accountType: 'Khách hàng',
  registerDate: '2024-01-14 10:23:22',
  address: 'Tòa S703 Vinhomes Grand Park',
};

export {
  transactionColumns,
  transactionStatus,
  transactions,
  transactionDetail,
  shopColumns,
  shops,
  shopInformation,
  shopStatus,
  accountColumns,
  accounts,
  accountStatus,
  accountType,
  accountInformation,
};
