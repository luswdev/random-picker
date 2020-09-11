function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2)
        }, delayInms)
    });
}
  
function getRandom(min, max) {
    return Math.floor(Math.random()*max)+min
}
  
async function runCycle(arr, target, trigger, startTime, speed, durning, fastDurning) {
    let tmpTime = startTime
    
    trigger.setAttribute('disabled', true)
    
    target.classList.toggle('running')
    target.move = setInterval(()=>{
        target.innerHTML = arr[getRandom(0,arr.length)]
    },startTime)

    while(tmpTime>0){
        tmpTime-=speed
        setTimeout(()=>{
            clearInterval(target.move)
            target.move = setInterval(()=>{
                target.innerHTML= arr[getRandom(0,arr.length)]
                textFit(target)
            },tmpTime)
        },durning)
        let delayres = await delay(durning)
    }
    
    let delayres = await delay(fastDurning)

    while(tmpTime<=startTime){
        tmpTime+=speed
        setTimeout(()=>{
            clearInterval(target.move)
            target.move = setInterval(()=>{
                target.innerHTML= arr[getRandom(0,arr.length)]
                textFit(target)
            },tmpTime)
        },durning)
        let delayres = await delay(durning)
    }
    
    setTimeout(()=>{
        clearInterval(target.move)
        trigger.removeAttribute('disabled', true)
        target.classList.toggle('running')
    },durning)
}

let runBtn = document.getElementById('run-result')
runBtn.addEventListener('click', ()=>{
    let tar = document.getElementById('result-value')
    let itemArr = document.querySelector('.card-active textarea').value.split('\n')

    if (itemArr.length === 1 && itemArr[0] === '') {
        tar.innerHTML = '-'
    } else {
        runCycle(itemArr, tar, runBtn, 300, 5, 100, 1500)
    }
})

textFit(document.getElementById('result-value'))

let items = new Vue({
    el: '#items',
    data: {
        groups: [
            {
                "title": "預設群組",
                "items": "在這裡輸入選項\n用換行來區隔不同選項\n例如\n選項一\n選項二\n不同選項\n按旁邊的加號可以新增群組\n點選圓圈處選擇要使用的群組",
            }
        ],
        actived: "group-0"
    },
    methods: {
        addGroup: function () {
            this.groups.push({"title": "", "items": ""})
        },
        setActive: function (index) {
            this.actived = "group-" + index
        }
    }
})