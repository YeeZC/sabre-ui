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
import Row from "./components/Row";
import Card from "./components/Card";
import Progress from "./components/Progress";
import Divider from "./components/Divider";

function App() {
    return (
        <header className="App-header">
            <div style={{width: 100, height: 300}}>
                <p>aaa</p>
                <Divider size={20} type={"vertical"}/>
                <p>bbb</p>
            </div>

        </header>
    );
}

export default App;
