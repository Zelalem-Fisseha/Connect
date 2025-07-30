import React from 'react';
import {
    MdDashboard,
    MdOutlineRequestPage,
    MdOutlineLocalOffer,
    MdChat,
    MdSettings,
    MdOutlineConnectWithoutContact // A placeholder icon for 'DevConnect' logo
} from 'react-icons/md';
import  './Sidebar.css';
import { useLocation, Link } from 'react-router-dom';
const Sidebar =() =>{
    const location = useLocation();
    return(
        <>
            <nav className="sidebar">

                <div className="sidebar-header">
                    <div className="sidebar-logo-icon">
                        <MdOutlineConnectWithoutContact size={40} />
                    </div>

                    <div className="sidebar-brand">DevConnect</div>
                </div>


                <ul className="sidebar-menu">
                    <li className={`sidebar-menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        <Link to="/dashboard">
                            <MdDashboard className="sidebar-icon" />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-item ${location.pathname === '/request' ? 'active' : ''}`}>
                        <Link to="/request">
                            <MdOutlineRequestPage className="sidebar-icon" />
                            <span>Request</span>
                        </Link>
                    </li>

                    <li className={`sidebar-menu-item ${location.pathname === '/offer' ? 'active' : ''}`}>
                        <Link to="/offer">
                            <MdOutlineRequestPage className="sidebar-icon" />
                            <span>Offer</span>
                        </Link>
                    </li>

                <li className={`sidebar-menu-item ${location.pathname === '/chat' ? 'active' : ''}`}>
                    <Link to="/chat">
                        <MdChat className="sidebar-icon" />
                        <span>Chat</span>
                    </Link>
                </li>

                </ul>

                <div className="sidebar-footer">
                    <ul className="sidebar-menu">
                        <li className="sidebar-menu-item">
                            <a href="/settings">
                                <MdSettings className="sidebar-icon" />
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </nav>
        </>
    )
}
export default Sidebar