import { ReactNode } from "react";
import NavBar from "./NavBar";

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout = ({ children, title }: Props) => {
  return (
    <div>
      <NavBar title={title} />

      {children}
    </div>
  );
};

export default Layout;
