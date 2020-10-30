import React from 'react';
import './header.styles.scss'
import { ListNested } from 'react-bootstrap-icons'
import {withRouter} from 'react-router-dom';

const Header = ({history}) => {
    return (
        <div className='header' onClick={() => history.push('/')}>
            <h1>{<ListNested/>}JTME</h1>
        </div>
    );
}

export default withRouter(Header);
