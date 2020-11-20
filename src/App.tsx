import React from 'react';
import logo from './logo.svg';
import './App.css';
import Message from './components/Message';
import Button from './components/Button';
import Link from './components/Link';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="https://baidu.com">测试</Link>
        <Button type='link' size="large">link</Button>
        <Button type='primary' disabled>TestButton</Button>
        <Message text="Hello World" type="primary"/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
