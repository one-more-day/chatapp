# chatapp
### web socket
### 在线演示 : https://moreday.top/chatapp
> TO learn web socket chat room 

> + https://www.youtube.com/watch?v=k4mjF4sPITE&t=70s 相关视频及源码
> + 前端 react context ;后端 谷歌的 firebase 云平台;
> + 最为主要的即时通讯 最后发现 作者使用的firebase 具有 即时通讯api snapshot,借此实现监听后端数据库改变，重新请求，实现 服务器向前端发送信息，https://firebase.google.com/docs/firestore/query-data/listen
> + 前端使用onsnaoshot 非常简单，但是 firebase 并未解释具体实现思路，且集成性太强,不具有普遍性
```js
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), 
      //当监听数据库发生改变时，再次调用回调函数
      (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
```
> https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj 此文章使用较为原生的方法，同样实现chatapp ,前端 react ;后端 node ;使用 sock io
```js
//此方式同样是简化了原生websocket的方法
//可以看出 实现的方式 为 on emit 的注册事件，监听事件的方式，借助sockio 可以在服务端触发客户端事件，在客户端触发服务端注册事件

//服务端
socketIO.on('connection', (socket) => {
  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
});
//客户端
 useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

//总之，实现websockt 长连接应用 需要前后端设计规范，规定消息的触发条件，以及发送的数据格式
```


