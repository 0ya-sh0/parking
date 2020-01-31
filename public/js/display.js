const socket = io();
socket.on('newState', show)

function show(state) {
    console.log(state)
    for (const ch of ['A', 'B', 'C', 'D']) {
        const id = `${ch}-${1}`;
        const value = state[id]
        const div = document.getElementById(`${ch}-${1}`);
        if (value === 1 && div.classList.contains('bg-dark')) {
            div.classList.remove('bg-dark')
            div.classList.add('bg-success')
        } else if (value === 0 && div.classList.contains('bg-success')) {
            div.classList.remove('bg-success')
            div.classList.add('bg-dark')
        }
    }
}