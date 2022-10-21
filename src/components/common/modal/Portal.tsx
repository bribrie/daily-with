import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const rootElement = document.getElementById("modal-root") as HTMLElement;

  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
};

export default Portal;
