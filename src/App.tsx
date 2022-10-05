import { Routes, Route } from "react-router-dom";
import SignInPage from "pages/auth/SignInPage";
import SignUpPage from "pages/auth/SignUpPage";
import MainPage from "pages/MainPage";
import Layout from "components/layout/Layout";
import AuthLayout from "components/layout/AuthLayout";
import PricePage from "pages/price/PricePage";
import PriceCreatePage from "pages/price/PriceCreatePage";
import "styles/App.scss";

function App() {
  //TODO: 로그인 유저 확인하기 -> 없으면 바로 로그인 페이지로 보내기

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/price/*" element={<PricePage />}></Route>
        <Route path="/price/create" element={<PriceCreatePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
