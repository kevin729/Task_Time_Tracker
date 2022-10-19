var stompClient

function connect() {
  if (stompClient == null || !stompClient.connected) {
    const socket = new SockJS('http://localhost:8080/time')
    stompClient = Stomp.over(socket)

    stompClient.connect({}, function (frame) {

    }, function(message) {
      connect()
    })
  }
}

function subscribe(callback, id) {
    stompClient.subscribe('/topic/timer', (message) => {
      const msg = JSON.parse(message.body)
      console.log(id)
      if (msg.to == id) {
        callback(msg)
      }
    }, {id})
}

function unsubscribe(id) {
  stompClient.unsubscribe(id)
}
