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
import Tag from "./components/Tag/tag";
function App() {
  return (
      <header className="App-header">
          <Card style={{width: 300}}
                title={"Title"}
                hoverable
                extra={<Button.Group>
                    <Button onClick={() => console.log('a')} type={"primary"}>a</Button>
                    <Button onClick={() => console.log('b')} danger>b</Button>
                </Button.Group>}
                onClick={() => {
                    console.log('click')
                }}
                actions={[
                    'add',
                    'remove',
                ]}
                cover={<img src={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606127011506&di=e12dcb449dca900ece2135fb5087f263&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F08%2F22%2F01300000242726125670225939875.jpg"}/>}>

          </Card>
          <Tag text={"测试"} icon={<Icon type={'info'}/> } closable/>
          <Tag text={"测试"} icon={<Icon type={'info'}/> } closable/>
          <Tag text={"测试"} icon={<Icon type={'info'}/> } closable/>
          <Tag text={"测试"} icon={<Icon type={'info'}/> } closable/>
      </header>
  );
}

export default App;
