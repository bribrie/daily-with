//* All
export interface GetReq {
  userUid: string | null;
}

export interface DeleteReq {
  userUid: string | null;
  id: string;
}

//* Daily Sales
export interface SalesListType {
  id: string; // 파이어베이스에서 자동 생성한 id
  date: string; //매출일
  type: string;
  newRegister: number;
  reRegister: number;
  totalSales: string;
}

export interface AddSalesItemListType {
  id: number; //length+1로 임의 생성
  date: string; //매출일
  type: string;
  newRegister: number;
  reRegister: number;
  totalSales: string;
}

export interface SalesState {
  oneMonthSalesList: SalesListType[];
  allSalesList: SalesListType[];
  addSalesItemList: AddSalesItemListType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export interface GetSalesReq extends GetReq {
  date: string;
}

export interface AddSalesReq {
  userUid: string | null;
  date: string;
  data: Omit<SalesListType, "id">[];
}

export interface EditSalesReq extends SalesListType {
  userUid: string | null;
}

//* Monthly Target
export interface TargetListType {
  id: string;
  month: string;
  type: string;
  newTarget: number;
  reRegisterTarget: number;
  totalSales: string;
}

export interface TargetState {
  targetList: TargetListType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export interface AddTargetReq extends Omit<TargetListType, "id"> {
  userUid: string | null;
}

export interface EditTargetReq extends TargetListType {
  userUid: string | null;
}

export interface DeleteTargetReq extends GetReq {
  id: string;
}

//* Visit Tracker
export interface VisitListType {
  id: string;
  date: string;
  type: string;
  offline: number;
  online: number;
  friend: number;
  telIn: number;
  naverIn: number;
  kakaoIn: number;
  totalVisit: number;
  registerVisit: number;
}

export interface VisitState {
  oneMonthVisitList: VisitListType[];
  allVisitList: VisitListType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export interface AddVisitReq extends Omit<VisitListType, "id"> {
  userUid: string | null;
}

export interface EditVisitReq extends VisitListType {
  userUid: string | null;
}
