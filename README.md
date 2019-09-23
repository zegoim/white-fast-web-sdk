# Ultra Fast WhiteBoard

English | [简体中文](./README-zh_CN.md) | [日本語](./README-jp.md) 

![GitHub](https://img.shields.io/github/license/netless-io/whiteboard-designer)
![jenkins](http://ci.netless.group/job/fast-sdk-pr/badge/icon)

⚡ Open source ultra fast whiteboard.

## 🎉 Quickstart 

### Online

[codepen](https://codepen.io/buhe/pen/XWryGWO?editors=1000#0)


[jsrun#china](http://jsrun.pro/zmbKp/edit)

### Live WhiteBoard

```html
<body>
    <div id="app-root"></div>
    <script src="https://sdk.herewhite.com/fast-sdk/index.js"></script>
    <script type="text/javascript">
        var userId = `${Math.floor(Math.random() * 100000)}`;
        var uuid = "8c2ee602f11e4883a75a9be9dd51b4cd";
        var roomToken = "WHITEcGFydG5lcl9pZD0zZHlaZ1BwWUtwWVN2VDVmNGQ4UGI2M2djVGhncENIOXBBeTcmc2lnPWFhODIxMTQ5NjdhZDdmMmVlMzI1NmJhNjUwNmM2OTJmMzFkNGZiODg6YWRtaW5JZD0xNTgmcm9vbUlkPThjMmVlNjAyZjExZTQ4ODNhNzVhOWJlOWRkNTFiNGNkJnRlYW1JZD0yODMmcm9sZT1yb29tJmV4cGlyZV90aW1lPTE2MDA1MTI0OTYmYWs9M2R5WmdQcFlLcFlTdlQ1ZjRkOFBiNjNnY1RoZ3BDSDlwQXk3JmNyZWF0ZV90aW1lPTE1Njg5NTU1NDQmbm9uY2U9MTU2ODk1NTU0NDAwMjAw";
        
        WhiteFastSDK.Room("app-root",{
            uuid: uuid,
                       roomToken: roomToken,
                       userId: userId,
                       userName: "rick", // 选填，名字
                       userAvatarUrl: "https://ohuuyffq2.qnssl.com/netless_icon.png", // 选填，头像
                       logoUrl: "", // 选填，头像
                       toolBarPosition: "left", // 选填，工具栏位置
                       pagePreviewPosition: "right", // 选填，预览侧边的位置
                       boardBackgroundColor: "#F2F2F2", // 选填，白板背景图片
                       isReadOnly: false, // 选填，订阅者是否可以操作
                       identity: "host", // 选填，身份
                       defaultColorArray: [
                           "#E77345",
                           "#005BF6",
                           "#F5AD46",
                           "#68AB5D",
                           "#9E51B6",
                           "#1E2023",
                       ], // 选填，默认的颜色列表
                       roomCallback: (room) => {
                           console.log(room);
                       }, // 选填，获取 room 对象，方便二次开发
                       colorArrayStateCallback: (colorArray) => {
                           console.log(colorArray);
                       }, // 选填, 新增颜色时给出的回调
        });
    </script>
</body>
```

### WhiteBoard Player

```html
<body>
    <div id="app-root"></div>
    <script src="https://sdk.herewhite.com/fast-sdk/index.js"></script>
    <script type="text/javascript">
        var userId = `${Math.floor(Math.random() * 100000)}`;
        var uuid = "8c2ee602f11e4883a75a9be9dd51b4cd";
        var roomToken = "WHITEcGFydG5lcl9pZD0zZHlaZ1BwWUtwWVN2VDVmNGQ4UGI2M2djVGhncENIOXBBeTcmc2lnPWFhODIxMTQ5NjdhZDdmMmVlMzI1NmJhNjUwNmM2OTJmMzFkNGZiODg6YWRtaW5JZD0xNTgmcm9vbUlkPThjMmVlNjAyZjExZTQ4ODNhNzVhOWJlOWRkNTFiNGNkJnRlYW1JZD0yODMmcm9sZT1yb29tJmV4cGlyZV90aW1lPTE2MDA1MTI0OTYmYWs9M2R5WmdQcFlLcFlTdlQ1ZjRkOFBiNjNnY1RoZ3BDSDlwQXk3JmNyZWF0ZV90aW1lPTE1Njg5NTU1NDQmbm9uY2U9MTU2ODk1NTU0NDAwMjAw";
        
        WhiteFastSDK.Player("app-root",{
            uuid: uuid,
            roomToken: roomToken,
            userId: userId,
        });
    </script>
</body>
```

## 📖 Documentation

When setting your whiteboard widget in code, you have several configs at your disposal all of which are described in detail below.

### WhiteBoard

To create a whiteboard, invoke a ```WhiteFastSDK.Room``` method in which you write the selected element in which you want to add the whiteboard and preferred configs.

- element [string] – contains a reference to the element in which whiteboard is
- configs [object] – options object

**uuid [string] required**

Room indentify.

```
uuid: "8c2ee602f11e4883a75a9be9dd51b4cd"
```

**roomToken [string] required**

Room auth token.

```
roomToken: "WHITEcGFydG5lcl9pZD....TOO...LONG"
```

**userId [string] required**

User indentify.

```
userId: "wdqzidmac"
```

**userName [string] optional**

User name.

```
userName: "rick"
```

**userAvatarUrl [string] optional**

User avatar url.

```
userAvatarUrl: "https://ohuuyffq2.qnssl.com/netless_icon.png"
```

**logoUrl [url] optional**

With the default value as undefined, Custom branding logo.

```
logoUrl: "https://path/to/logo.png"
```

**toolBarPosition [string] optional**

With the default value as top, ToolBar position, value include left,top,bottom,right.

```
toolBarPosition: "left"
```

**pagePreviewPosition [string] optional**

With the default value as right, Preview view position, value include left, right.

```
pagePreviewPosition: "left"
```

**boardBackgroundColor [color] optional**

With the default value as white, Background color.

```
boardBackgroundColor: "#F2F2F2"
```

**isReadOnly [boolean] optional**

With the default value as false, read-only meaning can not write at board.

```
isReadOnly: false
```

**identity [string] optional**

With the default value as host, value include host, guest, listener.

```
identity: “guest”
```

### WhiteBoard Player

To create a player, invoke a ```WhiteFastSDK.Player``` method in which you write the selected element in which you want to add the player and preferred configs.

- element [string] – contains a reference to the element in which whiteboard is
- configs [object] – options object

**uuid [string] required**

Room indentify.

```
uuid: "8c2ee602f11e4883a75a9be9dd51b4cd"
```

**roomToken [string] required**

Room auth token.

```
roomToken: "WHITEcGFydG5lcl9pZD....TOO...LONG"
```

**logoUrl [url] optional**

With the default value as undefined, Custom branding logo.

```
logoUrl: "https://path/to/logo.png"
```


## 🚀 Development

1. Run `yarn dev` in your terminal
2. Live room by open facade/index.html
3. Player by open facade/player.html

## 👏 Contributing

Please refer to each project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes
NOTE: Be sure to merge the latest from "upstream" before making a pull request!
