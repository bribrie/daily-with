//* Auth
export interface User {
  name: string | null;
  uid: string | null;
}

export interface AuthState {
  user: User;
  loading: "idle" | "pending" | "succeeded" | "failed";
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

//* Price
export interface PriceListType {
  id: string | undefined;
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

export interface AddPriceReq extends Omit<PriceListType, "id"> {
  userUid: string | null;
}

export interface EditPriceReq extends PriceListType {
  userUid: string | null;
}

export interface DeletePriceReq extends Pick<PriceListType, "id"> {
  userUid: string | null;
}

//* Task
export interface TaskListType {
  id: string;
  part: string | undefined;
  title: string;
  detail: string;
  day: string[];
  time: string;
  specialDate?: string | null;
}

// index signature
interface TaskState {
  task: {
    [key: string]: TaskListType[];
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const initialState: TaskState = {
  task: {
    daymorning: [],
    dayafternoon: [],
    weekend: [],
  },
  loading: "idle",
};

export interface GetTaskReq {
  userUid: string | null;
  name: string | undefined;
}

export interface AddTaskReq extends Omit<TaskListType, "id"> {
  userUid: string | null;
}

export interface EditTaskReq extends TaskListType {
  userUid: string | null;
}

export interface DeleletTaskReq extends Pick<TaskListType, "id"> {
  userUid: string | null;
}

//* Memeber
export interface MemeberListType {
  id: string;
  name: string;
  contact: string;
  introduction: string;
  role: string;
  image: File | undefined | string;
  workDay: string;
}

export interface MemberState {
  memberList: MemeberListType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export interface AddMemberReq extends Omit<MemeberListType, "id"> {
  userUid: string | null;
}

export interface GetMemberReq {
  userUid: string | null;
}

export interface EditMemberReq extends MemeberListType {
  userUid: string | null;
}

export interface DeleteMemberReq
  extends Pick<MemeberListType, "id" | "image" | "name"> {
  userUid: string | null;
}

//* Sales
export interface SalesListType {
  id?: string;
  registerType: string;
  salesType: string;
  peopleCount: string;
  totalSales: string;
}

export interface TargetListType {
  id: string;
  month: string;
  type: string;
  newTarget: number;
  reRegisterTarget: number;
  totalSales: string;
}

export interface SalesState {
  salesList: SalesListType[];
  targetList: TargetListType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export interface AddTargetReq extends Omit<TargetListType, "id"> {
  userUid: string | null;
}

export interface GetTargetReq {
  userUid: string | null;
}

export interface EditTargetReq extends TargetListType {
  userUid: string | null;
}

export interface DeleteTargetReq extends GetTargetReq {
  id: string;
}
