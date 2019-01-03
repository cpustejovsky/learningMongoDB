let counter = 0;
function startGame() {

    document.querySelector('button').addEventListener('click', () => {
        ++counter;
    });
    /*
    A promise is a tool we have for managing asynchronous code flow throughout our applications
    For handling any code that is going to happen at any point in the future
    */
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(counter > 5) { //it's up to the dev to decide what resolves or rejects a promise
                resolve();
            } else {
                reject();
            }
        }, 2000);
    });
};
//this is what developers usually use
startGame()
    .then(() => alert(`You won! You clicked ${counter} times!`))//chains on to the Promise; called if resolved
    .catch(() => alert(`Awww! You only clicked ${counter} times. You needed to click at least five times.`))//chains on to the Promise; called if rejected