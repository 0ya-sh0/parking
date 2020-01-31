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
refresh()
setInterval(refresh, 700);