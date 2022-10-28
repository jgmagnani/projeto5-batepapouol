const peopleName = prompt("Qual é o seu nome?");

const promiseName = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{name: peopleName})

promiseName.then(nameOk);

function nameOk(name){
    console.log(name);
}