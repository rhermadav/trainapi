const socket =io();
const params = $.deparam();console.log(params);
const displayMessage = $("#messages");
let userName;

const updateUI=()=> {
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child')
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
  
	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
	  messages.scrollTop(scrollHeight);
	}
}


socket.on("connect",function() {
	console.log("connect to server!");
	const active = params.activeRoom && params.activeRoom!=="active"?params.activeRoom:params.room;
	const param = {name:params.name,room:active}

	socket.emit("newUserJoined",param,function(user,isTrue) {
		if(isTrue) {
			userName=user.user;
			socket.emit("JOIN",user,function(isUser){
				if(!isUser) {
					return window.location.href="/index.html";
				}	
			})
		}else {
			return window.location.href="/index.html";
		}




	});


	

	socket.on("JoinedUser",(message)=> {
	const NewMessage= new HtmlElements("#users");
		NewMessage.renderNewUserJoined(message);
	
	})



	socket.on("wellcomeMessage",(message)=> {
		const NewMessage= new HtmlElements("#room");
		NewMessage.renderWelcomeMessage(message);
	})

	socket.on("NewMessage",(message)=> {
		if(userName !== message.user) {
			const NewMessage= new HtmlElements("#messages");
		NewMessage.renderNewMessage(message)
		
		
		}else if(userName === message.user) {
		const NewMessage= new HtmlElements("#messages");
		NewMessage.renderNewMessageLeft(message)
		}
		updateUI()	
	})
	

	socket.on("userResult",(data)=> {
		console.log(data);
	})

	// socket.on("roomResult",(data)=> {
	// 	const NewMessage= new HtmlElements(".selector");
	// 	NewMessage.renderSelectItems(data)
	// })

})

socket.emit("getUsers");
socket.emit("getRooms");



$("#message-form").submit(function(e){
	e.preventDefault();
	const message = $("input[name=message]").val();
	socket.emit("MESSAGE",{
	from:"user1",
	text:message,

},function() {
	 $("input[name=message]").val("");
	
})

})



socket.on("disconnect",()=> {
	socket.emit("DISCONNECT");

})
