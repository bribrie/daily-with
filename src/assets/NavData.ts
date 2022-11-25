import { ReactComponent as Calendar } from "./images/Calendar.svg";
import { ReactComponent as Card } from "./images/Card.svg";
import { ReactComponent as Member } from "./images/Member.svg";
import { ReactComponent as Sales } from "./images/Sales.svg";
import { ReactComponent as Building } from "./images/Building.svg";
import { ReactComponent as Dashboard } from "./images/Dashboard.svg";

export const navList = [
  { address: "/", name: "Dashboard", image: Dashboard },
  {
    address: "/task/daymorning",
    name: "Task",
    image: Calendar,
  },
  { address: "/member", name: "Member", image: Member },
  { address: "/price", name: "Price", image: Card },
  { address: "/sales", name: "Sales", image: Sales },
  { address: "/company", name: "Company", image: Building },
];
