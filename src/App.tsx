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
        <Button danger dashed onClick={() => {
            console.log('hello')
        }} icon={<Icon type={"bell"} />}>T</Button>
          </Group>
          <Icon type={"alipay"} color={"primary"}/>
      </header>
    </div>
  );
}

export default App;
