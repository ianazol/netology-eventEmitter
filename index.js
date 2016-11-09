const ChatApp = require('./chat');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let chatReady = () => {
  console.log("Готовлюсь к ответу");
}

let chatOnClose = () => {
  console.log("Чат вконтакте закрылся :(");
}

vkChat.setMaxListeners(2);

webinarChat
    .on('message', chatReady)
		.on('message', chatOnMessage);

facebookChat.on('message', chatOnMessage);

vkChat
    .on('message', chatReady)
	  .on('message', chatOnMessage)
	  .on('close', chatOnClose);

// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', chatOnMessage);
  vkChat.close();
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание - вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

// Закрыть чат вебинара
setTimeout( ()=> {
  console.log('Закрываю чат вебинара!');
  webinarChat.removeListener('message', chatOnMessage);
}, 30000 );