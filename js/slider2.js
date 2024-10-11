const slider = document.querySelector(".slider");
const form = document.querySelector(".form");
let mouseDownAt = 0;
let left = 0;

slider.onmousedown = (e) => {
    mouseDownAt = e.clientX;
    console.log(mouseDownAt);
};

slider.onmouseup = () => {
    mouseDownAt = 0;
    slider.style.userSelect = 'unset';
    slider.style.cursor = 'unset';
    form.style.pointerEvents = 'unset';
    form.classList.remove('left');
    form.classList.remove('right');
}

slider.onmousemove = e => {
    if (mouseDownAt == 0) return;
    
    slider.style.userSelect = 'none';
    slider.style.cursor = 'grab';
    form.style.pointerEvents = 'none';

    // Проверка направления слайдера
    if (e.clientX > mouseDownAt) {
        form.classList.add('left');
        form.classList.remove('right');
    } else if (e.clientX < mouseDownAt) {
        form.classList.remove('left');
        form.classList.add('right');
    }

    // Увеличение или уменьшение скорости
    let speed = 3;
    let leftTemporary = left + ((e.clientX - mouseDownAt) / speed);
    let leftLimit = form.offsetWidth - slider.offsetWidth / 2;

    // Ограничение движения слайдера
    if (leftTemporary < 0 && Math.abs(leftTemporary) < leftLimit) {
        form.style.setProperty('--left', left + 'px');
        left = leftTemporary;
        mouseDownAt = e.clientX;
    }
}
