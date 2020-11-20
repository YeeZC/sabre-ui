import React, {useRef} from 'react';
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
        <Button type='primary' onClick={() => {
            console.log('hello')
        }}>TestButton</Button>
        <Message text="Hello World" type="primary"/>

      </header>
    </div>
  );
}

export default App;
