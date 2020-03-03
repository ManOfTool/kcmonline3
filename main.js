let IMG_WIDTH = document.getElementById('sw').valueAsNumber;
let IMG_HEIGHT = document.getElementById('sh').valueAsNumber;

document.getElementById('sw').addEventListener('change', function(){
    IMG_WIDTH = this.valueAsNumber;
});

document.getElementById('sh').addEventListener('change', function(){
    IMG_HEIGHT = this.valueAsNumber;
});

document.getElementById('file-upload').addEventListener('change', function(){
    let files = document.getElementById('file-upload').files;
    // console.log(this.files.length);

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
    let row = document.getElementById('row-select').value;
    let column = document.getElementById('column-select').value;
    let canvas = document.getElementById('canvas-dst');

    canvas.width = IMG_WIDTH * column;
    canvas.height = IMG_HEIGHT * row;
}

function drawCanvas() {
    let row = document.getElementById('row-select').value;
    let column = document.getElementById('column-select').value;

    let canvas = document.getElementById('canvas-dst');
    let context = canvas.getContext('2d');
    
    let sx = document.getElementById('sx').valueAsNumber;
    let sy = document.getElementById('sy').valueAsNumber;

    let dx = 0, dy = 0;

    let images = document.getElementsByClassName('image-src');
    for (let i = 0; i < images.length; i++) {
        context.drawImage(images[i],
            sx, sy, IMG_WIDTH, IMG_HEIGHT,
            dx, dy, IMG_WIDTH, IMG_HEIGHT);
        
        if ((i + 1) % column > 0) {
            dx += IMG_WIDTH;
        } else {
            dx = 0;
            dy += IMG_HEIGHT;
        }
    }
}


function goExec() {
    createCanvas();

    drawCanvas();
}
