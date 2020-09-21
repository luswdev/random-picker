let app = new Vue({
    el: '#app',
    data: {
        items: ["-"],
        index: 0,
        running: false,
        eventBuffer: null,
        speed: 5,
        startTime: 200,
        durning: 100,
        fastDurning: 1500
    },
    methods: {
        getRandom: function (min, max) {
            this.index = Math.floor(Math.random() * max) + min
        },
        delay: function (delayInms) {
            return new Promise(resolve => {
                setTimeout( () => {
                    resolve(2)
                }, delayInms)
            })
        },
        runCycle: async function () {
            $('[data-toggle="tooltip"]').tooltip('dispose')

            let tmpTime = this.startTime
            this.running = true
            this.items = items.groups[items.activedIndex].items.split('\n')
            if (this.items.length === 1) {
                if (this.items[0] === "") {
                    this.items = ["-"]
                }
                this.index = 0
                this.running = false
                return
            }

            this.eventBuffer = setInterval( () => {
                this.getRandom(0, this.items.length)
            }, this.startTime)

            while(tmpTime > 0){
                tmpTime -= this.speed
                setTimeout( () => {
                    clearInterval(this.eventBuffer)
                    this.eventBuffer = setInterval( () => {
                        this.getRandom(0, this.items.length)
                    }, tmpTime)
                }, this.durning)
                let delayres = await this.delay(this.durning)
            }
            
            let delayres = await this.delay(this.fastDurning)

            while(tmpTime <= this.startTime){
                tmpTime += this.speed
                setTimeout( () => {
                    clearInterval(this.eventBuffer)
                    this.eventBuffer = setInterval( () => {
                        this.getRandom(0, this.items.length)
                    }, tmpTime)
                }, this.durning)
                let delayres = await this.delay(this.durning)
            }
            
            setTimeout( () => {
                clearInterval(this.eventBuffer)
                this.running = false
                $('[data-toggle="tooltip"]').tooltip()
            }, this.durning)
        }
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip()
    }
})

let items = new Vue({
    el: '#items',
    data: {
        groups: [
            {
                "title": "預設群組",
                "items": "範例\n在這裡輸入選項\n用換行來區隔不同選項\n例如\n選項一\n選項二\n不同選項\n按旁邊的加號可以新增群組\n點選圓圈處選擇要使用的群組",
            }
        ],
        activedIndex: 0,
        actived: "group-0"
    },
    methods: {
        emptyGroup: function () {
            this.actived = "group-0"
            this.groups = [{"title": "", "items": ""}]
        },
        addGroup: function () {
            this.groups.push({"title": "", "items": ""})
        },
        setActive: function (index) {
            this.actived = "group-" + index
            this.activedIndex = index
        }
    }
})

let b2t = new Vue({
    el: '#b2t-container',
    data: {
        isTop: true,
        styles: {
            bottom: '-60px'
        }
    },
    mounted: function () {
        window.addEventListener('scroll', () => {
            this.isTop = !(document.body.scrollTop > 0);
            this.styles.bottom = this.isTop ? '-60px' : '0' 
        })
    }
})