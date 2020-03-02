let IMG_WIDTH = 100;
let IMG_HEIGHT = 100;

function createCanvas() {
    let row = document.getElementById('row-select').value;
    let column = document.getElementById('column-select').value;
    let canvas = document.getElementById('canvas-dst');
    canvas.width = IMG_WIDTH * column;
    canvas.height = IMG_HEIGHT * row;

    document.getElementById('btn-exec').disabled = false;
}

function drawCanvas(images, type) {
    let row = document.getElementById('row-select').value;
    let column = document.getElementById('column-select').value;
    let c = column;

    let canvas = document.getElementById('canvas-dst');
    let context = canvas.getContext('2d');
    let sx = 0, sy = 0;
    let dx = 0, dy = 0;

    for (let i = 0; i < images.length; i++) {
        context.drawImage(images[i],
            sx, sy, IMG_WIDTH, IMG_HEIGHT, dx, dy, IMG_WIDTH, IMG_HEIGHT);

        if ((i + 1) % c > 0) { //
            dx += IMG_WIDTH;
        } else { //
            dx = 0;
            dy += IMG_HEIGHT;
        }
    }
}

function submit() {
    let files = document.getElementById('file-upload').files;
    let fields = document.getElementById('img-field');

    fields.innerHTML = "";

    if (files.length == 0){
        alert('No data selected');
    } else {
        for (let i = 0; i < files.length; i++) {
            let url = window.URL.createObjectURL(files[i]);
            let imgs = `<img class="image-src" src="${url}" style="display: none" />`;

            fields.innerHTML += imgs;
        }

        document.getElementById('btn-create').disabled = false;
    }

}

function goExec() {
    let images = document.getElementsByClassName('image-src');
    let type = document.getElementById('draw-type');

    drawCanvas(images, type);
}
