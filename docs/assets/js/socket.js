const socket = new SockJS('https://tasktrackerserver.herokuapp.com/time')
var stompClient = Stomp.over(socket)

stompClient.connect({}, function (frame) {}, function(message) {

})


function subscribe(callback, id) {
    stompClient.subscribe('/topic/timer', (message) => {
      callback(JSON.parse(message.body))
    }, {id})
}

function unsubscribe(id) {
  stompClient.unsubscribe(id)
}
