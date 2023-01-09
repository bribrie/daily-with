import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import { currentUser } from "redux/auth/authSlice";
import { lazy, Suspense } from "react";
import Loading from "components/layout/Loading";
import "styles/App.scss";

const Layout = lazy(() => import("components/layout/Layout"));
const AuthLayout = lazy(() => import("components/layout/AuthLayout"));
const SignInPage = lazy(() => import("pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("pages/auth/SignUpPage"));
const DashboardPage = lazy(
  () => import("components/dashboard/DashboardLayout")
);
const TaskLayout = lazy(() => import("components/task/TaskLayout"));
const TaskPage = lazy(() => import("pages/task/TaskPage"));
const TaskCreatePage = lazy(() => import("pages/task/TaskCreatePage"));
const TaskEditPage = lazy(() => import("pages/task/TaskEditPage"));
const MemberListPage = lazy(() => import("pages/member/MemberListPage"));
const MemberFormPage = lazy(() => import("pages/member/MemberFormPage"));
const MemberEditPage = lazy(() => import("pages/member/MemberEditPage"));
const PricePage = lazy(() => import("pages/price/PricePage"));
const PriceEditPage = lazy(() => import("pages/price/PriceEditPage"));
const PriceCreatePage = lazy(() => import("pages/price/PriceCreatePage"));
const SalesPage = lazy(() => import("pages/sales/SalesPage"));
const TodaySalesPage = lazy(() => import("pages/sales/TodaySalesPage"));
const AllSalesPage = lazy(() => import("pages/sales/AllSalesPage"));
const DailySalesEditPage = lazy(() => import("pages/sales/DailySalesEditPage"));
const MonthlyTargetPage = lazy(() => import("pages/sales/MonthlyTargetPage"));
const MonthlyTargetEditPage = lazy(
  () => import("pages/sales/MonthlyTargetEditPage")
);
const VisitTrackerPage = lazy(() => import("pages/sales/VisitTrackerPage"));
const VisitTrackerEditPage = lazy(
  () => import("pages/sales/VisitTrackerEditPage")
);
const CompanyLayout = lazy(() => import("components/company/CompanyLayout"));
const CompanyInfoPage = lazy(() => import("pages/company/CompanyInfoPage"));
const CompanyFormPage = lazy(() => import("pages/company/CompanyFormPage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));

function App() {
  const user = useAppSelector(currentUser);
  //로그인 상태 아닐 때
  if (!user) {
    return (
      <Suspense fallback={<Loading type="all" />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading type="all" />}>
      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="loading" element={<Loading />} />
        </Route>
        {/* Dashboard */}
        <Route element={<Layout type="dashboard" />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
        <Route element={<Layout />}>
          {/* Task */}
          <Route path="/task" element={<TaskLayout />}>
            <Route path=":name" element={<TaskPage />} />
          </Route>
          <Route path="/task/:name/create" element={<TaskCreatePage />} />
          <Route path="/task/:name/:id" element={<TaskEditPage />} />
          {/* Member */}
          <Route path="/member" element={<MemberListPage />} />
          <Route path="/member/create" element={<MemberFormPage />} />
          <Route path="/member/:id" element={<MemberEditPage />} />
          {/* Price */}
          <Route path="/price" element={<PricePage />} />
          <Route path="/price/:id" element={<PriceEditPage />} />
          <Route path="/price/create" element={<PriceCreatePage />} />
          {/* Sales */}
          <Route path="/sales" element={<SalesPage />}>
            <Route path="today" element={<TodaySalesPage />} />
            <Route path="today/:id" element={<DailySalesEditPage />} />
            <Route path="all" element={<AllSalesPage />} />
            <Route path="all/:id" element={<DailySalesEditPage />} />
            <Route path="visit-tracker" element={<VisitTrackerPage />} />
            <Route
              path="visit-tracker/:id"
              element={<VisitTrackerEditPage />}
            />
            <Route path="monthly-target" element={<MonthlyTargetPage />} />
            <Route
              path="monthly-target/:id"
              element={<MonthlyTargetEditPage />}
            />
            <Route path="loading" element={<Loading />} />
          </Route>
          {/* Company */}
          <Route path="/company" element={<CompanyLayout />}>
            <Route path="information" element={<CompanyInfoPage />} />
            <Route path="edit" element={<CompanyFormPage />} />
            <Route path="loading" element={<Loading />} />
          </Route>
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>{" "}
    </Suspense>
  );
}

export default App;
