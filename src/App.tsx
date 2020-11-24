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
import Input from "./components/Input";

function App() {
    return (
        <header className="App-header">
            <div style={{width: 300, height: 300}}>
                <span>
                <span>aaa</span>
                <Divider size={20} placement={'right'} type={"vertical"}></Divider>
                <span>a</span>
                </span>
                <Input.Number placeholder={"请输入"} defaultValue={10} steps={.3} onChange={v => console.log(v)}/>
                <Divider size={20} placement={'right'} dashed>
                    Text
                </Divider>
                <Button type={"primary"} onClick={() => {
                    notification.success({
                        content: "Hello"
                    })
                }}>点击通知</Button>
            </div>

        </header>
    );
}

export default App;
