var socket = io();

const btn = document.querySelector('.btn');
const name = document.querySelector('.name');
const code = document.querySelector('.code');
const shell = document.querySelector('.shell');

btn.addEventListener('click', () => {
  if(name.value.length < 2 || code.value.length < 2) {
    name.classList.add('is-invalid');
    code.classList.add('is-invalid');
  } else {
    name.classList.replace('is-invalid', 'is-valid');
    code.classList.replace('is-invalid', 'is-valid');
    socket.emit('sendBots', { code: code.value, name: name.value });
  }
});

socket.on('message', msg => {
  write(msg);
})

socket.on('botm', msg => {
  write(msg);
})

function write(msg) {
  shell.innerHTML += `<p>> ${msg}</p>`
}
