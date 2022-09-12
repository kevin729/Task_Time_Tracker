const socket = new SockJS('https://tasktrackerserver.herokuapp.com/time')
var stompClient = Stomp.over(socket)


function subscribe(callback, id) {
  stompClient.connect({}, function (frame) {
    stompClient.subscribe('/topic/timer', (message) => {
      callback(JSON.parse(message.body))
    }, {id})
  }, function(message) {
    subscribe(callback, id)
  })
}

function unsubscribe(id) {
  stompClient.unsubscribe(id)
}
