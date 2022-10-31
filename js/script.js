let msgs = [];
let peopleName;
let userConect;
let canConnectionVerify = true;

function verificaNome() {
  peopleName = prompt('Qual é o seu nome?');
}
while (!peopleName) {
  verificaNome();
}

//atualiza as mensagens de 3 em 3 segundos
const attMsg = setInterval(() => {
  let promiseAtt = axios.get(
    'https://mock-api.driven.com.br/api/v6/uol/messages'
  );
  promiseAtt.then(carregarMensagens);
}, 3000);

const promiseName = axios.post(
  'https://mock-api.driven.com.br/api/v6/uol/participants',
  { name: peopleName }
);

promiseName.then(conectionVerify);

let promiseMsg = axios.get(
  'https://mock-api.driven.com.br/api/v6/uol/messages'
);
promiseMsg.then(carregarMensagens);

function conectionVerify() {
  userConect = setInterval(() => {
    if (canConnectionVerify) {      
      canConnectionVerify = false;
      let promise = axios.post(
        'https://mock-api.driven.com.br/api/v6/uol/status',
        { name: peopleName }
      );
      promise.then(() => (canConnectionVerify = true));
      promise.catch(() => {
        canConnectionVerify = true;
        alert('deu erro');
        clearInterval(userConect);
      });
    }
  }, 5000);
}

function carregarMensagens(elemento) {
  msgs = elemento.data;
  renderizarMsgs(msgs);

  const lastMsg = document.querySelector('.chat');
  lastMsg.scrollIntoView(false);
}

function renderizarMsgs(elemento) {
  const listaMsg = document.querySelector('.chat');
  listaMsg.innerHTML = '';

  for (let index = 0; index < elemento.length; index++) {
    let mensagem = elemento[index];
    
    if (mensagem.type === 'status') {
      listaMsg.innerHTML += `
                <div class="cameIn" id="teste">
                    <p>${mensagem.time} ${mensagem.from} ${mensagem.text}</p>
                </div>
                `;
    } else if (mensagem.type === 'message') {
      listaMsg.innerHTML += `
        <div class="msgAll" id="teste">
            <p>${mensagem.time} ${mensagem.from} para todos: ${mensagem.text}</p>
        </div>
        `;
    } else if (mensagem.type === 'private_message') {
      if (mensagem.from === peopleName || mensagem.to === peopleName || mensagem.to === "Todos") {
        listaMsg.innerHTML += `
                <div class="msgPrivate" id="teste">
                    <p>${mensagem.time} ${mensagem.from} reservadamente para ${mensagem.to}:  ${mensagem.text}</p>
                </div>
                `;
      }
    }
  }
}
//Enviar mensagem para o servidor.
function postMessage() {
  let variavel = document.getElementById('myInput');
  
  if (!variavel.value) {
    
    return;
  }

  const mensagemEnv = {
    from: peopleName,
    to: 'Todos',
    text: variavel.value,
    type: 'message',
  };

  let sendMessage = axios.post(
    'https://mock-api.driven.com.br/api/v6/uol/messages',
    mensagemEnv
  );

  sendMessage.then(carregarMensagens);
  variavel.value = '';
  sendMessage.catch(messageFail);
}

function messageFail(element) {
  console.log('MENSAGEM DEU PAU');
}

//enviar mensagem com o Enter

document.getElementById('myInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    postMessage();
  }
});
