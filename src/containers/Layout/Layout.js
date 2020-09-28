import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import classes from './Layout.module.css';
import logo from '../../logo.svg';

const Layout = props =>{
    return(
        <div className={classes.container}>
            <AppBar position="static" >
                <div className={classes.topbar}>
                    <img className={classes.topLogo} src={logo} alt='logo'/>
                    <h5>Pet API</h5>
                </div>
            </AppBar>
            <div className={classes.centerpiece}>
                {props.children}
            </div>
            <div className={classes.footer}>
                <p>Footer</p>
            </div>
        </div>
    )
}

export default Layout;