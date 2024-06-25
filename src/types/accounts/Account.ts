export default interface Account {
  id: number;
  fullName: string;
  phoneNumber: string;
  avatarUrl: string;
  email: string;
  roleName: string;
  status: number;
  createdDate: string;
}

export enum AccountStatus {
  UnVerify = 1,
  Verify = 2,
  Ban = 3,
  Delete = 4,
}
