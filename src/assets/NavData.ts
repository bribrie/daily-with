import { ReactComponent as Home } from "./images/Home.svg";
import { ReactComponent as Calendar } from "./images/Calendar.svg";
import { ReactComponent as Dollar } from "./images/Dollar.svg";
import { ReactComponent as Chart } from "./images/Chart.svg";
import { ReactComponent as Bell } from "./images/Bell.svg";

export const navList = [
  { address: "/", name: "Analytic", image: Chart },
  {
    address: "/task/weekday-morning",
    name: "Task",
    image: Calendar,
  },
  { address: "/price", name: "Price", image: Dollar },
  { address: "/notice", name: "Notice", image: Bell },
];
