import React from 'react';
import './App.css';
import Button from "./components/Button";
import Link from './components/Link';
import Icon from "./components/Icon";
import notification from "./components/Notification";
import message from "./components/Message";
import Menu from "./components/Menu";
import Tabs from "./components/Tabs";
function App() {
  return (
      <header className="App-header">
        <Tabs type={"card"}>
            <Tabs.Tab title={"Tab0"}>
                Content 0
            </Tabs.Tab>
            <Tabs.Tab title={"Tab1"}>
                Content 1
            </Tabs.Tab>
        </Tabs>

      </header>
  );
}

export default App;
