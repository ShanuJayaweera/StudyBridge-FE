import Footer from "../components/footer";
import MainContent from "../components/main-content";
import NavbarHeader from "../components/navbar-header";
import Sidebar from "../components/side-bar";


function BaseTheme() {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <NavbarHeader />
            <MainContent />
            <Footer />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default BaseTheme;