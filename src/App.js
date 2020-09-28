import React from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import Form from './containers/Form/Form';

function App() {
  return (
    <div className="App">
      <Layout>
        <Form/>
      </Layout>
    </div>
  );
}

export default App;
