import React from 'react';
import './App.css';
import Button from "./components/Button";
import Link from './components/Link';
import Icon from "./components/Icon";
import notification from "./components/Notification";
import message from "./components/Message";
import Menu from "./components/Menu";
import Tabs from "./components/Tabs";
import Space from "./components/Space";
function App() {
  return (
      <header className="App-header">
          <Space>
          <Button onClick={() => {
              notification.confirm({
                  icon: <Icon type={'info-filled'} theme={"primary"}/>,
                  title: 'Notification',
                  content: 'content',
                  closable: true
              })
          }}>click</Button>
          <Button onClick={() => {
              notification.confirm({
                  icon: <Icon type={'info-filled'} theme={"primary"}/>,
                  title: 'Notification',
                  content: 'content',
                  closable: true
              })
          }}>click</Button>
          </Space>
      </header>
  );
}

export default App;
