export type ReceiptType = {
  secure_url: string;
  public_id: string;
};

export type OrderType = {
  address: string;
  amount: string;
  country: string;
  course: string;
  createdAt: Date;
  fullName: string;
  receipt: ReceiptType;
  state: string;
  status: "pending" | "completed";
  _id: string;
  promoPercentage: number;
  mode: "online" | "offline";
};

export type InitialOrderStateType = {
  orderLoading: string;
  orderList: "loading" | OrderType[];
  currentOrder: any;
};
