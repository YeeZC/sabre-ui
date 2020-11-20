import React from 'react';
import './App.css';
import Button, {Group} from "./components/Button";
import Link from './components/Link';
import Icon from "./components/Icon";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="https://baidu.com">测试</Link>
          <Group>
        <Button type='primary' formType={"submit"}>link</Button>
        <Button danger onClick={() => {
            console.log('hello')
        }}>T</Button>
          </Group>
          <Icon type={"alipay"}/>
          <Icon type={"test"}/>
      </header>
    </div>
  );
}

export default App;
