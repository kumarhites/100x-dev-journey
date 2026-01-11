const countEl = document.getElementById("count");
const btnClick = document.getElementById("click");
const msg = document.getElementById("msg");

const createRateLimitedCounter = (limitMs) => {
    let count = 0;
    let locked = false;

    const render = () => {
        countEl.innerText = count;
    }

    return function handleClick(){
        if(locked){
            msg.innerText = 'Too fast! wait...';
            return;
        }
        locked = true;
        msg.innerText = "";

        count++;
        render();

        setTimeout(() => {
            locked = false;
            msg.innerText = "";
        }, limitMs)
    }
}

const rateLimitedClick = createRateLimitedCounter(2000);

btnClick.addEventListener('click', rateLimitedClick);
countEl.innerText = 0;