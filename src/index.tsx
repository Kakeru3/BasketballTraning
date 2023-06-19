import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {  MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);
