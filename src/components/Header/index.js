import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';
import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="RocketShoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

/**
 * Prop types checking
 */
Header.propTypes = {
  cartSize: PropTypes.number.isRequired,
};

/**
 * Export header component and give him access to cart reducer
 * OBS: The component will render again after any update of reducer
 */
export default connect((state) => ({
  cartSize: state.cart.length,
}))(Header);
