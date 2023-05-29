import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './pages/Products'
import Product from './pages/Product'
import { Fragment } from 'react';
import Default from './layouts/Default';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <Fragment className="App">
      <ThemeProvider theme={darkTheme}>
        <Default>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route index element={<Products />} />
              <Route path="blogs" element={<Product />} />
            </Routes>
          </BrowserRouter>
        </Default>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
