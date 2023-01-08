var stompClient

function connect(callback) {
  if (stompClient == null || !stompClient.connected) {
    const socket = new SockJS('https://tasktrackerserver.herokuapp.com/time')
    stompClient = Stomp.over(socket)

    stompClient.connect({}, function (frame) {
      callback(stompClient)
    }, function(message) {
      connect()
    })
  }
}

function subscribe(callback, id) {

    stompClient.subscribe('/topic/timer', (message) => {
      const msg = JSON.parse(message.body)

      if (msg.to == id) {
        callback(msg)
      }
    }, {id})
}

function unsubscribe(id) {
  stompClient.unsubscribe(id)
}
