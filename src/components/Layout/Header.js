import { Fragment } from 'react';
import res from'./res.jpg'


import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={res} alt='hello'></img>
    </div>
    </Fragment>
  );
};

export default Header;