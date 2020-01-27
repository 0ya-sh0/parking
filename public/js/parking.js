let state = {}

function refresh() {
    fetch('/api/state')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            state = myJson;
            show()
        });
}

function show() {
    for (const ch of ['A', 'B', 'C']) {
        for (let i = 1; i <= 3; i++) {
            const id = `${ch}-${i}`;
            const value = state[id]
            const div = document.getElementById(`${ch}-${i}`);
            if (value === 0 && div.classList.contains('bg-dark')) {
                div.classList.remove('bg-dark')
                div.classList.add('bg-success')
            } else if (value === 1 && div.classList.contains('bg-success')) {
                div.classList.remove('bg-success')
                div.classList.add('bg-dark')
            }
        }
    }
}


function toggle(id) {
    state[id] = state[id] === 0 ? 1 : 0;
    fetch('/api/state', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
    })
        .then((response) => response.json())
        .then((myJson) => {
            console.log(myJson);
            state = myJson;
            show()
        });
}

refresh()