
const game = (() => {

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let current_player;

    const set_player = function (new_player) {
        this.current_player = new_player;
    }

    const remove = n => {
        const n_index = numbers.indexOf(n);

        numbers.splice(n_index, 1);
    }

    return { numbers, current_player, set_player, remove }
})();


function User(name) {

    const sets = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    let selected_numbers = [];

    const select = (n) => {
        selected_numbers.push(n);
    }

    const validate_set = () => {

        let result = false;

        sets.forEach(set => {

            let match = 0;

            set.forEach(n => {

                const matched = selected_numbers.includes(n);

                if (matched) { match++ }
            })

            if (match === 3) { result = true };
        })

        return result;
    }

    return { name, selected_numbers, validate_set, select }
}

let player;
let computer;

/* Click on the PLAY button to start the game. */
const game_init = document.querySelector("#start");

game_init.addEventListener('click', () => {

    player = User('Player');
    computer = User('Computer');
    game.set_player(player.name)

    alert('Game Start')
    setTimeout(() => {
        alert(`${game.current_player} start first.`)
    }, 1000);

    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener(
            'click',
            (e) => {

                const id = e.currentTarget.dataset.id;
                const n = parseInt(id);

                const available = game.numbers.includes(n);

                if (available) {

                    const i = game.numbers.indexOf(n);
                    game.numbers.splice(i, 1);

                    const score = document.createElement('div');
                    score.textContent = n;

                    if (game.current_player === "Player") {
                        player.select(n);

                        const scores = document.querySelector('#player > .scores');
                        scores.appendChild(score);

                        e.currentTarget.textContent = "X";
                        e.currentTarget.style.cssText = "font-size: 28px; font-weight: bold; color: green;"

                        const result = player.validate_set();

                        if (!result) {
                            game.set_player(computer.name)
                            setTimeout(() => {
                                alert(`${game.current_player} pick a number.`)
                            }, 1000);
                        }
                        else {
                            const text = `
                                Congratulation !!!
                                ${game.current_player} won the game !!
                            `
                            setTimeout(() => {
                                alert(text)
                            }, 1000);
                            return
                        }
                    }
                    else {
                        computer.select(n);

                        const scores = document.querySelector('#computer > .scores');
                        scores.appendChild(score);

                        e.currentTarget.textContent = "O";
                        e.currentTarget.style.cssText = "font-size: 34px; font-weight: bold; color: red;"

                        const result = computer.validate_set();

                        if (!result) {
                            game.set_player(player.name)
                            setTimeout(() => {
                                alert(`${game.current_player} pick a number.`)
                            }, 500);
                        }
                        else {
                            const text = `
                                Congratulation !!!
                                ${game.current_player} won the game !!
                            `
                            setTimeout(() => {
                                alert(text)
                            }, 500);
                            return
                        }
                    }
                }
                else {
                    alert(`${n} is not available.`)
                }
            }
        )
    })

})