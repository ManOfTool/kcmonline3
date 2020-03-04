document.getElementById('file-upload').addEventListener('change', function(){
    let files = document.getElementById('file-upload').files;

    if (files.length == 0){
        document.getElementById('btn-exec').disabled = true;
        alert('No data selected');
    } else {
        let fields = document.getElementById('img-field');
        fields.innerHTML = "";

        for (let i = 0; i < files.length; i++) {
            let url = window.URL.createObjectURL(files[i]);
            let imgs = `<img class="image-src" src="${url}" style="display: none" />`;

            fields.innerHTML += imgs;
        }

        document.getElementById('btn-exec').disabled = false;
    }
});

function createCanvas() {
    let IMG_WIDTH = document.getElementById('sw').valueAsNumber;
    let IMG_HEIGHT = document.getElementById('sh').valueAsNumber;

    let d_width = IMG_WIDTH * document.getElementById('dw').valueAsNumber / 100;
    let d_height = IMG_HEIGHT * document.getElementById('dh').valueAsNumber / 100;
    
    let row = document.getElementById('row-select').value;
    let column = document.getElementById('column-select').value;
    let canvas = document.getElementById('canvas-dst');

    canvas.width = d_width * column;
    canvas.height = d_height * row;
}

function drawCanvas() {
    let IMG_WIDTH = document.getElementById('sw').valueAsNumber;
    let IMG_HEIGHT = document.getElementById('sh').valueAsNumber;

    let d_width = IMG_WIDTH * document.getElementById('dw').valueAsNumber / 100;
    let d_height = IMG_HEIGHT * document.getElementById('dh').valueAsNumber / 100;

    let row = document.getElementById('row-select').value;
    let column = document.getElementById('column-select').value;

    let canvas = document.getElementById('canvas-dst');
    let context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    let sx = document.getElementById('sx').valueAsNumber;
    let sy = document.getElementById('sy').valueAsNumber;

    let dx = 0, dy = 0;

    let images = document.getElementsByClassName('image-src');
    for (let i = 0; i < images.length; i++) {
        context.drawImage(images[i],
            sx, sy, IMG_WIDTH, IMG_HEIGHT,
            dx, dy, d_width, d_height);
        
        if ((i + 1) % column > 0) {
            dx += d_width;
        } else {
            dx = 0;
            dy += d_height;
        }
    }
}

function selectPredefined(s){
    switch (s) {
        case '0':
            document.getElementById('sw').valueAsNumber = 100;
            document.getElementById('sh').valueAsNumber = 100;
            document.getElementById('sx').valueAsNumber = 0;
            document.getElementById('sy').valueAsNumber = 0;
            break;
        case '1':
            document.getElementById('sw').valueAsNumber = 570;
            document.getElementById('sh').valueAsNumber = 750;
            document.getElementById('sx').valueAsNumber = 450;
            document.getElementById('sy').valueAsNumber = 150;
            break;
        default:
            document.getElementById('sw').valueAsNumber = 0;
            document.getElementById('sh').valueAsNumber = 0;
            document.getElementById('sx').valueAsNumber = 0;
            document.getElementById('sy').valueAsNumber = 0;
    }
}

function download() {
    let canvas = document.getElementById('canvas-dst');
    console.log(canvas.toDataURL('image/png'));
}

function goExec() {
    createCanvas();

    drawCanvas();
}
