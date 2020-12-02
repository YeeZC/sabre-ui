import React from "react";
import {Meta} from "@storybook/react";
import Icon, {IconProps} from "./index";
import {Story} from "@storybook/react/dist/client/preview/types-6-0";
import Space from "../Space";
import Row from "../Row";

const iconTypes = ["1688", "alipay", "alipay-font",
    "amazon", "applets", "arrow-down", "arrow-left",
    "arrow-right", "arrow-up", "attachment", "balance", "bell",
    "bell-off", "benefits", "calculator", "cart",
    "cart-empty", "caution", "caution-filled",
    "check", "check-filled", "chrome", "close",
    "close-filled", "cloud", "cloud-download",
    "cloud-server", "cloud-sync", "cloud-upload",
    "copy", "correct", "credits", "cross", "customer-service",
    "delete", "delete-fill", "desktop", "dingtalk",
    "discount", "down-to-bottom", "download", "edit",
    "email", "empty", "et", "facebook", "fb", "filter",
    "flow", "forbidden", "forbidden-filled", "github",
    "go-to", "google", "h5", "help", "help-filled",
    "image", "info", "info-filled", "inter", "like",
    "like-filled", "link", "linkedin", "list", "ln",
    "lock", "message", "message-unread", "naver",
    "order", "order-unread", "page-first", "page-last",
    "page-left", "page-right", "partner", "phone", "phone-off",
    "play", "record", "refresh", "region", "reload", "renew",
    "search", "setting", "share", "show-less", "show-more",
    "sina", "skype", "spinner", "stackflow", "star", "star-filled",
    "sub-account", "sync", "taobao", "taobao-font", "time",
    "twitter", "unlock", "up-to-top", "upload", "user", "view",
    "view-off", "wechat", "youtube", "zhihu"]

const meta: Meta = {
    title: 'Icon',
    component: Icon
}

export default meta;

export const Template: Story<IconProps> = (props) => {
    const length = iconTypes.length;
    let row = Math.floor(length / 4);
    if (length % 4 !== 0) {
        row += 1;
    }
    const data = new Array<any>()
    for (let i = 0; i < row; i++) {
        data.push([])
        for (let j = 0; j < 4; j++) {
            const item = iconTypes[i * 4 + j]
            data[i].push(<Row.Col span={6} style={{
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Icon {...props} type={item}/>
                    <span>{item}</span>
                </div>
            </Row.Col>)
        }
    }

    return <Space>
        {data.map(item => (<Row style={{flexWrap: 'nowrap', fontSize: '1.5rem'}}>{item}</Row>))}
    </Space>
}

Template.storyName = "Icon"