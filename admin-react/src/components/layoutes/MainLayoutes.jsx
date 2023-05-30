import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const MainLayoutes = ({children}) =>{
    const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history("/admin-login");
    }
  }, []);
    return (
        <div>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      );
}
export default MainLayoutes