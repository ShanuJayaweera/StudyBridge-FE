import Footer from "../components/footer";
import MainContent from "../components/MainContent";
import NavbarHeader from "../components/navbar-header";
import Sidebar from "../components/side-bar";


function BaseTheme() {
    return (
        <div className="wrapper">
          <Sidebar />
          <div className="main-panel">
            <NavbarHeader />
            <MainContent />
            <Footer />
          </div>
        </div>
      );
}

export default BaseTheme;