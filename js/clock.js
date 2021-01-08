const clockContainer = document.querySelector('.js-clock'),
    CLOCK = document.querySelector('span');

function getTime() {
    const date = new Date();

    const hrs = date.getHours();
    const min = date.getMinutes();
    //const sec = date.getSeconds();
    //const milli = date.getMilliseconds();


    CLOCK.innerText = `${hrs > 9 ? hrs : `0${hrs}`}:${min > 9 ? min : `0${min}`}`;

}

function init() {

    setInterval(getTime, 1000);
}

init();