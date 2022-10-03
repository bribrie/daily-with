// Auth
export interface User {
  name: string | null;
  uid: string | null;
}

export interface AuthState {
  user: User;
  loading: "idle" | "pending" | "succeeded" | "failed";
  isSignedIn: boolean;
  error: string;
}

export interface SignUpReq {
  email: string;
  password: string;
  centerName: string;
}

export interface SignInReq {
  email: string;
  password: string;
}

//Price
export interface PriceListType {
  type: string;
  period: string;
  title: string;
  price: string;
  delay: string;
  event: boolean;
}

export interface PriceState {
  priceList: PriceListType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export interface AddPriceReq extends PriceListType {
  userUid: string | null;
}
