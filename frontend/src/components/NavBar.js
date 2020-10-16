import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';


class NavBar extends React.Component {
    render() {
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="active item">Streams</Link>
                <div className="right menu">
                    <Link to="/streams/create" className="item">Create Stream</Link>
                    <GoogleAuth className="item" />
                </div>
            </div>
        );
    }
}

export default NavBar;