import { Routes, Route } from "react-router-dom";
import SignInPage from "pages/auth/SignInPage";
import SignUpPage from "pages/auth/SignUpPage";
import MainPage from "pages/MainPage";
import Layout from "components/layout/Layout";
import AuthLayout from "components/layout/AuthLayout";
import PricePage from "pages/price/PricePage";
import PriceEditPage from "pages/price/PriceEditPage";
import PriceCreatePage from "pages/price/PriceCreatePage";
import TaskLayout from "components/task/TaskLayout";
import TaskPage from "pages/task/TaskPage";
import TaskCreatePage from "pages/task/TaskCreatePage";
import TaskEditPage from "pages/task/TaskEditPage";
import NotFoundPage from "pages/NotFoundPage";
import "styles/App.scss";

function App() {
  //TODO: 로그인 유저 확인하기 -> 없으면 바로 로그인 페이지로 보내기

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        {/* Price */}
        <Route path="/price" element={<PricePage />} />
        <Route path="/price/:id" element={<PriceEditPage />} />
        <Route path="/price/create" element={<PriceCreatePage />} />

        {/* Task */}
        <Route path="/task" element={<TaskLayout />}>
          <Route path=":name" element={<TaskPage />} />
        </Route>
        <Route path="/task/:name/create" element={<TaskCreatePage />} />
        <Route path="/task/:name/:id" element={<TaskEditPage />} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
