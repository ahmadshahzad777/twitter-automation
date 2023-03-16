const images = {
    img1: 'pre1',
    img2: 'pre2',
    img3: 'pre3',
    img4: 'pre4',
};

Object.keys(images).forEach((image) => {
    document.getElementById(image).addEventListener('change', () => {
        let picker = document.getElementById(image);
        let file = picker.files[0];
        if (file) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load', function () {
                let preview = document.getElementById(images[image]);
                preview.classList.remove('no-preview');
                preview.classList.add('the-preview');
                document.getElementById(`clx${image}`).classList.remove('hidden');
                preview.style.backgroundImage = `url(${this.result})`;
            });
        }
    });
});

const clxs = {
    clximg1: 'img1',
    clximg2: 'img2',
    clximg3: 'img3',
    clximg4: 'img4',
};

Object.keys(clxs).forEach((clx) => {
    document.getElementById(clx).addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(clx).classList.add('hidden');
        document.getElementById(images[clxs[clx]]).classList.add('no-preview');
        document.getElementById(images[clxs[clx]]).classList.remove('the-preview');
        document.getElementById(images[clxs[clx]]).style.backgroundImage = "url('/images/image.svg')";
        document.getElementById(clxs[clx]).value = '';
    });
});

document.getElementById('postitnow').addEventListener('click', () => {
    document.getElementById('hider').classList.remove('hidden');
});
