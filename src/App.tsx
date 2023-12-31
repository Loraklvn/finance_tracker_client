import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoutesWrapper from './components/common/PrivateRoutesWrapper';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Transactions from './pages/Transactions';

function App(): React.ReactElement {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutesWrapper />}>
          <Route path="/" element={<Home />} index />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
