var gs = {
    skeletonLoad : function (elem, mode = 'dark') {
        let color;
        if (mode == 'dark') color = '0,0,0'; else if (mode == 'light') color = '255,255,255'; else throw 'Invalid Mode in skeletonLoad';
        let targets = document.querySelectorAll(elem);
        for (let i = 0; i < targets.length; i++) {
            targets[i].style.background = 'linear-gradient(120deg,rgba(' + color + ',0.1) 30%,rgba(' + color + ',0.15) 38%,rgba(' + color + ',0.15) 42%,rgba(' + color + ',0.1) 50%';
            targets[i].style.backgroundSize = '200% 100%';
            targets[i].style.animation = 'load 2s infinite';
        }
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '@keyframes load {0% {background-position: 100% 0;}100% {background-position: -100% 0;}}';
        document.getElementsByTagName('head')[0].appendChild(style);
    },
    stopLoading : function(elem) {
        let targets = document.querySelectorAll(elem);
        for (let i = 0; i < targets.length; i++) {
            targets[i].style.background = '';
            targets[i].style.backgroundSize = '';
            targets[i].style.animation = '';
        }
    },
    flickerText: function(el, gap, delay = 0, mode = 'in') {
        el = document.querySelector(el);
        text = el.innerHTML;
        el.innerHTML = '';
        for (i in text) if (text[i] != ' ') el.innerHTML += '<span style="display:inline-block">' + text[i] + '</span>';
        st = Math.ceil(el.childNodes.length / 3);
        var fl = 0;
        hideAll();
        var ticks = 0;
        setTimeout(() => {
            var timer = setInterval(function () {
                var arr = [];
                hideAll();

                if ((ticks + 1) % 2 == 0 && fl < el.childNodes.length && ticks > 2) fl++;
                while (arr.length < fl) {
                    var r = Math.floor(Math.random() * el.childNodes.length);
                    if (arr.indexOf(r) === -1) {
                        arr.push(r);
                        fill(el.childNodes[r]);
                    }
                }
                if (ticks == 0) st--;
                if (ticks == 1) st++;
                if (ticks == 3) st++;
                st = fl + st <= el.childNodes.length ? st : el.childNodes.length - fl;
                while (arr.length < fl + st) {
                    var r = Math.floor(Math.random() * el.childNodes.length);
                    if (arr.indexOf(r) === -1) {
                        arr.push(r);
                        stroke(el.childNodes[r]);
                    }
                }

                ticks++;
                if (ticks == (el.childNodes.length * 2) + 2) clearInterval(timer);
            }, gap);
        }, delay);

        function stroke(elem) {
            elem.style.opacity = 1;
            elem.style.webkitTextFillColor = 'transparent';
            elem.style.webkitTextStrokeWidth = '0.3px';
            elem.style.webkitTextStrokeColor = elem.style.color;
        }
        function fill(elem) {
            elem.style.opacity = 1;
            elem.style.webkitTextFillColor = elem.style.color;
            elem.style.webkitTextStrokeWidth = '0';
            elem.style.webkitTextStrokeColor = 'none';
        }
        function hideAll() {
            for (i in el.childNodes) if (i < el.childNodes.length) el.childNodes[i].style.opacity = 0;
        }
    },
    center: function(el){
        el = document.querySelectorAll(el);
        for(let i=0;i<el.length;i++){
            el[i].style.position = 'absolute';
            el[i].style.top = '50%';
            el[i].style.left = '50%';
            el[i].style.transform = el[i].style.transform+'translate(-50%,-50%)';
        }
    },
    centerh: function (el){
        el = document.querySelectorAll(el);
        for (let i = 0; i < el.length; i++) {
            el[i].style.position = 'absolute';            
            el[i].style.left = '50%';
            el[i].style.transform = el[i].style.transform + 'translate(-50%,0)';
        }
    },
    centerv: function (el){
        el = document.querySelectorAll(el);
        for (let i = 0; i < el.length; i++) {
            el[i].style.position = 'absolute';
            el[i].style.top = '50%';            
            el[i].style.transform = el[i].style.transform + 'translate(0,-50%)';
        }
    },
    random: function(min=1, max=100){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    empty: function(array){
        return array.length==0?true:false;
    }
}