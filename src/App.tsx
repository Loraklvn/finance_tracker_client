import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoutesWrapper from './components/common/PrivateRoutesWrapper';
import Home from './pages/Home';
import Login from './pages/Login';

function App(): React.ReactElement {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutesWrapper />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
