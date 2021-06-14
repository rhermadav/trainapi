
class HtmlElements {
	constructor(selector) {
		this.selector=selector;
	}

	renderNewUserJoined(message) {
	if(!this.selector || this.selector === null || this.selector === undefined) {
			throw new Error("oops  no element to append to");
		}
	const displayMessage = $(this.selector);
	const timeStamp = moment(message.createdAt).format("h:mm: a")
		const render =`
		<li>
		<p>${timeStamp} ${message.user}</p>
		</li>
		`;
		displayMessage.append(render);
	}

	renderNewMessage(message) {
		if(!this.selector || this.selector === null || this.selector === undefined) {
			throw new Error("oops  no element to append to");
		}

		const displayMessage = $(this.selector);
		const timeStamp = moment(message.createdAt).format("h:mm: a")
		const render =`
		<li class="message" style="display:flex;justify-content:flex-start">
			<div style="display:flex;flex-direction:column;" class="sub__div">
				<div class="message__title">
					<h4>${message.user}</h4>
					<span>${timeStamp}</span>
				</div>
				<div class="message__body">
					<p>${message.text}</p>
				</div>
			</div>
		</li>
		`;
		displayMessage.append(render);
	}


	renderNewMessageLeft(message) {
		if(!this.selector || this.selector === null || this.selector === undefined) {
			throw new Error("oops  no element to append to");
		}

		const displayMessage = $(this.selector);
		const timeStamp = moment(message.createdAt).format("h:mm: a")
		const render =`
		<li class="message" style="display:flex;justify-content:flex-end">
			<div style="display:flex;flex-direction:column;" class="sub__div">
				<div class="message__title">
					<h4>${message.user}</h4>
					<span>${timeStamp}</span>
				</div>
				<div class="message__body">
					<p>${message.text}</p>
				</div>
			</div>
		</li>
		`;
		displayMessage.append(render);
	}




	renderWelcomeMessage(message) {
		if(!this.selector || this.selector === null || this.selector === undefined) {
			throw new Error("oops  no element to append to");
		}

		const displayMessage = $(this.selector);
		const render =`
		<li style="background-color:yellow">
		<p style="font-weigth:bold;font-size:20px">${message.roomName} </p>
		</li>
		`;
		displayMessage.html(render);
	}


	renderSelectItems(data) {
		if(!this.selector || this.selector === null || this.selector === undefined) {
			throw new Error("oops  no element to append to");
		}

		if(!data.length){
			throw new Error("ooop no value inside the array");
		}

		const displayMessage= $(this.selector);



		let items=`<option value="active" default selected readOnly>select from active rooms</option>`;
		for(let i =0; i < data.length; i++) {
			items+=`

			<option value=${data[i]}>${data[i]}</option>
			`;
		}

		displayMessage.empty().append(items);


	}


}










