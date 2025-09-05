const valueEl = document.getElementById('value');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');


let count = 0;


function render(){
valueEl.textContent = count;
}


increaseBtn.addEventListener('click', ()=>{
count += 1;
render();
});


decreaseBtn.addEventListener('click', ()=>{
count -= 1;
render();
});


resetBtn.addEventListener('click', ()=>{
count = 0;
render();
});
window.addEventListener('keydown', (e)=>{
if (e.key === '+' || e.key === '='){
count += 1; render();
} else if (e.key === '-'){
count -= 1; render();
} else if (e.key.toLowerCase() === 'r'){
count = 0; render();
}
});

render();