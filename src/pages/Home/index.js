import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// ------ STYLES ------
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';

// ------ REDUX ACTIONS ------
import * as CartActions from '../../store/modules/cart/actions';

// ------ UTILS ------
import { formattedPrice } from '../../util/format';

// ------ API´s ------
import api from '../../services/api';

class Home extends Component {
  state = {
    products: [],
  };

  static propTypes = {
    addToCartRequest: PropTypes.func.isRequired,
    amount: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map((item) => ({
      ...item,
      formattedPrice: formattedPrice(item.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = (id) => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt="Tênis" />
            <strong>{product.title}</strong>
            <span>{product.formattedPrice}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

/**
 * Copying data from cart reducer and putting it in component props
 */
const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

/**
 * Defragmenting cart actions and converting each to separate functions.
 * OBS. -> These functions can be found in component props
 */
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
