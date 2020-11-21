import React from 'react';
import './App.css';
import Button, {Group} from "./components/Button";
import Link from './components/Link';
import Icon from "./components/Icon";
import Message, {message} from "./components/Message";
function App() {
  return (
      <header className="App-header">
        <Link to="https://baidu.com">测试</Link>
          <Group>
        <Button type='primary' formType={"submit"} >link</Button>
        <Button danger dashed onClick={() => {
            message.success('hello', 1)
        }} icon={<Icon type={"view-off"} />}>T</Button>
          </Group>
          <Icon type={"refresh"} spinning/>
          <Message text={"Hello World"} type={"warn"}/>
      </header>
  );
}

export default App;
