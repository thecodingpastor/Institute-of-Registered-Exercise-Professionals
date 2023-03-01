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
  email: string;
  phone: string;
  status: "pending" | "completed";
  _id: string;
  promoPercentage: number;
  mode: "online" | "offline";
  paymentMode: "transfer" | "card";
};

export type InitialOrderStateType = {
  orderLoading: string;
  orderList: OrderType[];
  currentOrder: any;
  hasNext: boolean;
  initialSearch: boolean;
  total: {
    total: number;
    completed: number;
    pending: number;
    paystack: number;
    transfer: number;
  };
};
