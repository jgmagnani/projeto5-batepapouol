const peopleName = prompt('Qual é o seu nome?');
let msgs = [];

const promiseName = axios.post(
  'https://mock-api.driven.com.br/api/v6/uol/participants',
  { name: peopleName }
);

promiseName.then(nameOk);

//conectionVerify(peopleName)

function getMsg() {
  const promiseMsg = axios.get(
    'https://mock-api.driven.com.br/api/v6/uol/messages'
  );
  promiseMsg.then(carregarMensagens);
  
}
getMsg();

function nameOk(name) {
  //name = name.config.data
  console.log(name);
}
/*
function conectionVerify(userName){
    const conectionStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",{name: userName});    
    conectionStatus.then(setTimeout(conectionVerify, 5000, userName));    
    console.log(userName);
}
*/
function carregarMensagens(elemento) {
  msgs = elemento.data;
  console.log('mss: ', msgs);

  renderizarMsgs();
}

function renderizarMsgs() {
  const listaMsg = document.querySelector('.chat');
  console.log(listaMsg)
  listaMsg.innerHTML = '';

  for (let index = 0; index < msgs.length; index++) {
    let mensagem = msgs[index]
    console.log(mensagem.type)

    switch (msgs.type) {
      case "status":
        listaMsg.innerHTML += `
                <div class="cameIn">
                    <p>${mensagem.time} ${mensagem.from} ${mensagem.text}</p>
                </div>
                `;
        break;
      case "message":
        listaMsg.innerHTML += `
                <div class="msgAll">
                    <p>${mensagem.time} ${mensagem.from} para todos: ${mensagem.text}</p>
                </div>
                `;
        break;
      case "private_message":
        listaMsg.innerHTML += `
                <div class="msgPrivate">
                    <p>${mensagem.time} reservadamente para Maria: ${mensagem.from} ${mensagem.text}</p>
                </div>
                `;
        break;
    }
    /*if (msgs.type = "status") {
        listaMsg.innerHTML += `
                <div class="cameIn">
                    <p>${mensagem.time} ${mensagem.from} ${mensagem.text}</p>
                </div>
                `;
    } 
    if (msgs.type = 'message')
    {
        listaMsg.innerHTML += `
        <div class="msgAll">
            <p>${mensagem.time} ${mensagem.from} para todos: ${mensagem.text}</p>
        </div>
        `; 
    }
    if (msgs.type = 'private_message')
    {
        listaMsg.innerHTML += `
                <div class="msgPrivate">
                    <p>${mensagem.time} reservadamente para Maria: ${mensagem.from} ${mensagem.text}</p>
                </div>
                `;
    }*/

  }
}
