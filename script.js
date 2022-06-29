const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}
// passing joke to voiceRSS api
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'Your Api Key here',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get jokes from joke api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        } 
        // text-to speech
        tellMe(joke);
        // disabled button
        toggleButton();
    } catch (error) {
        // catch errors
    }
}

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);