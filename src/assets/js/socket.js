var stompClient

function connect(callback, id) {
  if (stompClient == null || !stompClient.connected) {
    const socket = new SockJS('http://localhost:8080/time')
    stompClient = Stomp.over(socket)

    stompClient.connect({}, function (frame) {
      subscribe(callback, id)
    }, function(message) {
      connect(callback, id)
    })
  } else {
    subscribe(callback, id)
  }
}

function subscribe(callback, id) {
    stompClient.subscribe('/topic/timer', (message) => {
      callback(JSON.parse(message.body))
    }, {id})
}

function unsubscribe(id) {
  stompClient.unsubscribe(id)
}
