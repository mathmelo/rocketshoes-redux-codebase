import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Switch>
  );
}
