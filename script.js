const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Timestap
const currentTime = new Date();
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const time = hours + ':' + minutes;

let timeSuffix = 'AM';
if (hours >= 12) {
  timeSuffix = 'PM';
}

console.log(time);

// Send and Receive Message
async function sendMessage() {
  const url = 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'b07daf4e55msh27bdf3bd8deb3e0p13c380jsn2094cf41f695',
      'X-RapidAPI-Host': 'chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: userInput.value,
        },
      ],
      temperature: 0.8,
      stream: false,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    document.getElementById('chatbox').innerHTML += `
      <div class="user">
        <div>${userInput.value}</div>
        <span class="timestamp">${time} ${timeSuffix}</span>
      </div>
      <div class="response">
        <div>${result.choices[0].message.content}</div>
        <span class="timestamp">${time} ${timeSuffix}</span>
      </div>
    `;
  } catch (error) {
    console.error(error);
  }

  userInput.value = '';
}
