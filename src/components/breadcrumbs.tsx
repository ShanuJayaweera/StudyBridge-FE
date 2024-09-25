function Breadcrumbs(){
    return (
        <>
            <div className="page-inner">
                <div className="page-header">
                <h4 className="page-title">Dashboard</h4>
                <ul className="breadcrumbs">
                    <li className="nav-home">
                    <a href="#">
                        <i className="icon-home"></i>
                    </a>
                    </li>
                    <li className="separator">
                    <i className="icon-arrow-right"></i>
                    </li>
                    <li className="nav-item">
                    <a href="#">Pages</a>
                    </li>
                    <li className="separator">
                    <i className="icon-arrow-right"></i>
                    </li>
                    <li className="nav-item">
                    <a href="#">Starter Page</a>
                    </li>
                </ul>
                </div>
                <div className="page-category">Inner page content goes here</div>
          </div>
        </>
    );
}

export default Breadcrumbs;