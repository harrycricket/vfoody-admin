// Manage transactions
const transactionColumns = [
  { name: 'Thứ tự đơn hàng', uid: 'id', sortable: true },
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
  { name: 'Thứ tự cửa hàng', uid: 'id', sortable: true },
  { name: 'Tên cửa hàng', uid: 'shopName', sortable: true },
  { name: 'Tên chủ cửa hàng', uid: 'shopOwnerName', sortable: true },
  { name: 'Số điện thoại', uid: 'phoneNumber' },
  { name: 'Tổng đơn hàng', uid: 'totalOrder', sortable: true },
  { name: 'Tổng sản phẩm', uid: 'totalProduct', sortable: true },
  { name: 'Tổng doanh thu', uid: 'balance', sortable: true },
  { name: 'Trạng thái cửa hàng', uid: 'status', sortable: true },
  { name: 'Ngày đăng ký', uid: 'createdDate', sortable: true },
  { name: 'Thao tác', uid: 'actions' },
];

const shopStatus = [
  { name: 'Đang hoạt động', uid: 'Đang hoạt động' },
  { name: 'Đang đóng cửa', uid: 'Đang đóng cửa' },
  { name: 'Chưa phê duyệt', uid: 'Chưa phê duyệt' },
  { name: 'Đã bị cấm', uid: 'Đã bị cấm' },
];

// Manage accounts
const accountColumns = [
  { name: 'Thứ tự', uid: 'id', sortable: true },
  { name: 'Tên tài khoản', uid: 'fullName', sortable: true },
  { name: 'Số điện thoại', uid: 'phoneNumber' },
  { name: 'Email', uid: 'email' },
  { name: 'Loại tài khoản', uid: 'role', sortable: true },
  { name: 'Trạng thái', uid: 'status', sortable: true },
  { name: 'Ngày đăng ký', uid: 'createdDate', sortable: true },
  { name: 'Thao tác', uid: 'actions' },
];

const accountStatus = [
  { name: 'Đang hoạt động', uid: 'Đang hoạt động' },
  { name: 'Đã bị cấm', uid: 'Đã bị cấm' },
  { name: 'Chưa xác thực', uid: 'Chưa xác thực' },
];

const accountType = [
  { name: 'Khách hàng', uid: 'Khách hàng' },
  { name: 'Chủ cửa hàng', uid: 'Chủ cửa hàng' },
];

// Product Detail
const productDetail = {
  id: 1,
  shopName: 'Tiệm ăn tháng năm',
  name: 'Phở gà',
  des: 'Món phở gà thơm ngon',
  price: 45000,
  createdDate: '2024-05-21 21:07:55',
  totalOrder: 100,
  status: 'Đang bán',
  image:
    'https://v-foody.s3.ap-southeast-1.amazonaws.com/image/1716572943501-2b4a8028-27e2-44cf-8691-10de31c750cf',
};

// promotions
const PROMOTIONS_SAMPLE_LIST = [
  {
    id: 1,
    title: 'Summer Sale',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 10.0,
    minimumOrderValue: 50.0,
    maximumApplyValue: 500.0,
    amountValue: 50.0,
    applyType: 1,
    status: 1,
    startDate: new Date('2023-06-01T00:00:00'),
    endDate: new Date('2023-06-30T23:59:59'),
    usageLimit: 100,
    numberOfUsed: 10,
  },
  {
    id: 2,
    title: 'Winter Discount',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 20.0,
    minimumOrderValue: 100.0,
    maximumApplyValue: 1000.0,
    amountValue: 100.0,
    applyType: 2,
    status: 2,
    startDate: new Date('2023-12-01T00:00:00'),
    endDate: new Date('2023-12-31T23:59:59'),
    usageLimit: 200,
    numberOfUsed: 50,
  },
  {
    id: 3,
    title: 'Spring Flash Sale',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 15.0,
    minimumOrderValue: 30.0,
    maximumApplyValue: 300.0,
    amountValue: 30.0,
    applyType: 1,
    status: 1,
    startDate: new Date('2024-03-15T00:00:00'),
    endDate: new Date('2024-03-20T23:59:59'),
    usageLimit: 50,
    numberOfUsed: 5,
  },
  {
    id: 4,
    title: 'Autumn Clearance',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 25.0,
    minimumOrderValue: 75.0,
    maximumApplyValue: 750.0,
    amountValue: 75.0,
    applyType: 2,
    status: 1,
    startDate: new Date('2023-09-01T00:00:00'),
    endDate: new Date('2023-09-30T23:59:59'),
    usageLimit: 150,
    numberOfUsed: 25,
  },
  {
    id: 5,
    title: 'New Year Bash',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 30.0,
    minimumOrderValue: 200.0,
    maximumApplyValue: 1500.0,
    amountValue: 200.0,
    applyType: 1,
    status: 1,
    startDate: new Date('2024-01-01T00:00:00'),
    endDate: new Date('2024-01-10T23:59:59'),
    usageLimit: 300,
    numberOfUsed: 75,
  },
  {
    id: 6,
    title: 'Back to School',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 12.5,
    minimumOrderValue: 25.0,
    maximumApplyValue: 250.0,
    amountValue: 25.0,
    applyType: 2,
    status: 1,
    startDate: new Date('2023-08-15T00:00:00'),
    endDate: new Date('2023-08-31T23:59:59'),
    usageLimit: 80,
    numberOfUsed: 20,
  },
  {
    id: 7,
    title: 'Halloween Special',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 5.0,
    minimumOrderValue: 15.0,
    maximumApplyValue: 150.0,
    amountValue: 15.0,
    applyType: 1,
    status: 3,
    startDate: new Date('2023-10-25T00:00:00'),
    endDate: new Date('2023-10-31T23:59:59'),
    usageLimit: 60,
    numberOfUsed: 15,
  },
  {
    id: 8,
    title: 'Black Friday Deal',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 50.0,
    minimumOrderValue: 500.0,
    maximumApplyValue: 5000.0,
    amountValue: 500.0,
    applyType: 2,
    status: 2,
    startDate: new Date('2023-11-24T00:00:00'),
    endDate: new Date('2023-11-24T23:59:59'),
    usageLimit: 500,
    numberOfUsed: 100,
  },
  {
    id: 9,
    title: "Valentine's Day Offer",
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 8.0,
    minimumOrderValue: 40.0,
    maximumApplyValue: 400.0,
    amountValue: 40.0,
    applyType: 1,
    status: 1,
    startDate: new Date('2024-02-10T00:00:00'),
    endDate: new Date('2024-02-14T23:59:59'),
    usageLimit: 90,
    numberOfUsed: 30,
  },
  {
    id: 10,
    title: 'Cyber Monday Sale',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UW3VOtxCrPlSPnHEWVi_OndZbv7IzamS6g&s',
    amountRate: 35.0,
    minimumOrderValue: 150.0,
    maximumApplyValue: 1200.0,
    amountValue: 150.0,
    applyType: 2,
    status: 1,
    startDate: new Date('2023-11-27T00:00:00'),
    endDate: new Date('2023-11-27T23:59:59'),
    usageLimit: 250,
    numberOfUsed: 60,
  },
];

export {
  transactionColumns,
  transactionStatus,
  transactionDetail,
  shopColumns,
  shopStatus,
  accountColumns,
  accountStatus,
  accountType,
  productDetail,
  accountDetail,
  PROMOTIONS_SAMPLE_LIST,
};
