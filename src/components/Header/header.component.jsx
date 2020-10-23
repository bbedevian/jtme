import React, { Component } from 'react';
import './header.styles.scss'
import { ListNested } from 'react-bootstrap-icons'


class Header extends Component {
    render() {
        return (
            <div className='header'>
                <h1>{<ListNested/>}JTME</h1>
            </div>
        );
    }
}

export default Header;
