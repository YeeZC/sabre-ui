import React from 'react';
import './App.css';
import Button from "./components/Button";
import Link from './components/Link';
import Icon from "./components/Icon";
import notification from "./components/Notification";
import message from "./components/Message";
function App() {
  return (
      <header className="App-header">
        <Link to="https://baidu.com">测试</Link>
          <Button.Group>
        <Button type='primary' formType={"submit"} >link</Button>
        <Button danger dashed onClick={() => {
            notification.success({
                content:"Hello",
                title: 'title',
                closable: true
            });
        }} icon={<Icon type={"view-off"} />}>T</Button>
          </Button.Group>
          <Icon type={"refresh"} spinning/>

      </header>
  );
}

export default App;
