import { LayoutProps } from "components/layout/Layout";
import DailySalesHeader from "./DailySalesHeader";

const DailySalesLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <DailySalesHeader />
      {children}
    </div>
  );
};

export default DailySalesLayout;
