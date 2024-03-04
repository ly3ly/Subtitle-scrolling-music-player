

const lrc = `
[00:04.00]I remember our last summer
[00:07.74]When your heart met mine
[00: 11.99]We were divin' to the ocean
[00: 15.99]Always side by side
[00: 19.74]I hear your world's been getting colder, colder
[00: 23.49]But through it all, I'll be your shoulder, shoulder
[00: 27.74]And even though we're getting older, older
[00: 31.49]Remember what we said
[00: 34.74]That if the world was ending
[00: 36.99]You know I'll carry you home (You home)
[00: 42.48]I'll be the last man standing
[00: 44.99]To keep you safe from the storm(The storm)
[00: 50.49]I'll bе the light in your darkest night
[00: 54.23]Until you know it will be alright
[00: 58.24]'Causе if the world was ending
[01:00.73]You know I'll carry you home
[01:04.49]I go wherever you go
[01: 22.62]I remember, I was broken
[01: 26.37]How you held me up
[01: 30.63]With your love, you made me stronger
[01: 34.38]You believed in us
[01: 38.36]I hear your world's been getting colder, colder
[01: 42.13]But through it all, I'll be your shoulder, shoulder
[01: 46.38]And even though we're getting older, older
[01: 49.88]Remember what we said
[01: 53.37]That if the world was ending
[01: 55.88]You know I'll carry you home (You home)
[02:01.13]I'll be the last man standing
[02:03.62]To keep you safe from the storm(The storm)
[02:09.12]I'll be the light in your darkest night
[02: 12.88]Until you know it will be alright
[02: 16.88]'Cause if the world was ending
[02: 19.35]You know I'll carry you home
[02: 23.38]I go wherever you go
[02: 40.63]That if the world was ending
[02: 42.87]You know I'll carry you home (Yeah, you home, yeah)
[02: 48.38]I'll be the last man standing
[02: 50.88]To keep you safe from the storm(Yeah, the storm, yeah)
[02: 56.38]I'll be the light in your darkest night
[03:00.14]Until you know it will be alright
[03:04.37]'Cause if the world was ending
[03:06.63]You know I'll carry you home
[03: 10.38]I go wherever you go
`
function parseLrc(lrc) {
    var lrcs = lrc.trim().split("\n");
    var lrcObj = [];
    // var lictx = ""
    for (var i = 0; i < lrcs.length; i++) {
        var lrc = lrcs[i].split("]");
        var time = parseTime(lrc[0].substring(1, lrc[0].length));
        var content = lrc[1];
        // lictx += `<li>${content}</li>`
        lrcObj.push({ time: time, content: content });
    }
    // console.log(lictx)
    return lrcObj;
}

function parseTime(time) {
    var times = time.split(":");
    return Number(times[0]) * 60 + Number(times[1]);
}


var doms = {
    audio: document.querySelector("audio"),
    container: document.querySelector(".container"),
    ul: document.querySelector(".container ul")
}

var lrcData = parseLrc(lrc);

function findIndex() {
    var currentTime = doms.audio.currentTime;
    for (var i = 0; i < lrcData.length; i++) {
        if (currentTime < lrcData[i].time) {
            return i - 1;
        }
    }
    return lrcData.length - 1;
}

function createLrcElements() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < lrcData.length; i++) {
        var li = document.createElement("li");
        li.textContent = lrcData[i].content;
        frag.appendChild(li); // 避免频繁修改dom树
    }
    doms.ul.appendChild(frag);
}

createLrcElements();

var containerHeight = doms.container.clientHeight;
var liHeight = doms.ul.children[0].clientHeight;
var maxOffset = doms.ul.clientHeight - containerHeight

function setOffset() {
    var index = findIndex();
    var offset = liHeight * index + liHeight / 2 - containerHeight / 2;
    if (offset < 0) {
        offset = 0
    }
    if (offset > maxOffset) {
        offset = maxOffset
    }
    // console.log(index, offset)

    doms.ul.style.transform = `translateY(-${offset}px)`
    var li = doms.ul.querySelector('.active')
    if (li) {
        li.classList.remove('active')
    }
    li = doms.ul.children[index];
    if (li) {
        li.classList.add("active");
    }
}

doms.audio.addEventListener("timeupdate", function () {
    setOffset();
})
