import { useLocation } from "react-router-dom";
import Menuacc from "./Components/Account/Menuacc";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import MenuLeft from "./Components/Layout/MenuLeft";



function App(props) {
  let param = useLocation();

  console.log(param);
  return (
    <>
        <Header/>
        {/* <Slider/> */}
        <section>
            <div className="container">
              <div className="row">
                  {param["pathname"].includes("account") ? <Menuacc/> : <MenuLeft/>}
                  {props.children}
              </div>
            </div>
        </section>

        <Footer/>
        
    </>
  );
}

export default App;
