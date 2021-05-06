import React from 'react';
import { Link } from 'react-router-dom';
import { RouterData } from './RouterMenuData';

const NavBar = () => {
    const routerData = RouterData;
    const cssNavBar: React.CSSProperties = {
        backgroundColor: 'black',
        padding: '0px 20px 0px 20px',
        height: '80px',
    }
    const cssTitleNavBar: React.CSSProperties = {
        color: 'white'
    }
    const cssIconPlusNavBar: React.CSSProperties = {
        color: 'white',
        fontSize: '15px',
        fontWeight: 'bold',
    }

    const cssItemMenuIcon: React.CSSProperties = {
        color: 'black',
        fontWeight: 'bold',
        marginRight: '10px',
        marginBottom: '15px',
    }

    const cssItemMenuSpan: React.CSSProperties = {
        color: 'black',
        fontSize: '15px',
        fontWeight: 'bold',
    }

    const cssSideBar: React.CSSProperties = {
        backgroundColor: 'white',
        padding: 'unset'
    }

    const cssSideBarItens: React.CSSProperties = {
        backgroundColor: 'white',
        padding: '10px 20px 10px 20px'
    }

    const cssSideBarHeader: React.CSSProperties = {
        width: '100%',
        height: '80px',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white'
    }


    return (
        <>
            <div className="uk-navbar " style={cssNavBar} >
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li className="menu-bars">
                            <Link uk-tooltip="Menu" className="menu-bars" to="#" uk-toggle="target: #offcanvas-overlay" >
                                <span style={cssIconPlusNavBar} uk-icon="icon: menu; ratio: 2"></span>
                            </Link>
                        </li>
                    </ul>
                    <div className="uk-navbar-center">
                        <Link to="/" className="uk-navbar-item- uk-logo" style={cssTitleNavBar}>Manager Services</Link>
                    </div>
                </div>
            </div>
            <div id="offcanvas-overlay" uk-offcanvas="overlay: true">
                <div className="uk-offcanvas-bar" style={cssSideBar}>
                    <div style={cssSideBarHeader}>
                        <span>Manager Services</span>
                    </div>
                    <ul className="uk-nav uk-nav-default" style={cssSideBarItens}>
                        {/* <li key={9000} className="uk-offcanvas-close" style={cssItemMenuIconClose}>
                            <Link to="#" >
                                <span style={cssItemMenuIcon} uk-close="true"></span>
                            </Link>
                        </li> */}
                        {routerData.map((item, index) => {
                            return (
                                <li key={index} >
                                    <Link uk-tooltip={item.title} to={item.path} uk-toggle="target: #offcanvas-overlay" >
                                        <span style={cssItemMenuIcon} uk-icon={`icon: ${item.icon}; ratio: 1.4`}></span>
                                        <span style={cssItemMenuSpan}>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    )

};

export default NavBar;