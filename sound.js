const sounds={
roll:new Audio('assets/sound/roll.wav'),
open:new Audio('assets/sound/open.wav'),
win:new Audio('assets/sound/win.wav'),
lose:new Audio('assets/sound/lose.wav')
};
function playSound(n){if(sounds[n]){sounds[n].currentTime=0;sounds[n].play();}}