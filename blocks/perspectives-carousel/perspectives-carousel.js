import { sliderData } from './carouselData.js';

export default async function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const ul = document.createElement('ul');
  ul.classList.add('carousel');

  const slides = [];

  sliderData.forEach((slide, i) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('slide-card');

    const imageBlock = document.createElement('div');
    imageBlock.classList.add('image-block');

    const shape = document.createElement('div');
    shape.classList.add('shape-container');
    shape.innerHTML = ` <div class="shape1"></div>
                            <div class="shape2"></div>
                            <div class="shape3"></div>`;
    const image = document.createElement('img');
    image.src = slide.img;
    image.alt = `Slide ${i + 1} image`;
    imageBlock.append(shape, image);

    const bullets = document.createElement('div');
    bullets.classList.add('carousel-bullets');
    bullets.innerHTML = `<div class="bullets">
            <button class="bullet active" data-index="1" data-slide="${
              i + 1
            }" aria-label="Slide 1"></button>
            <button class="bullet" data-index="2" data-slide="${
              i + 1
            }" aria-label="Slide 2"></button>       
            <button class="bullet" data-index="3" data-slide="${
              i + 1
            }" aria-label="Slide 3"></button>       
            <button class="bullet" data-index="4" data-slide="${
              i + 1
            }" aria-label="Slide 4"></button>
    </div>`;

    const textBlock = document.createElement('div');
    textBlock.classList.add('text-block');
    const heading = document.createElement('p');
    heading.innerText = slide.heading;
    heading.classList.add('heading');
    textBlock.append(heading);

    const title = document.createElement('h2');
    title.innerText = slide.title;
    title.classList.add('title');
    textBlock.append(title);

    const description = document.createElement('p');
    description.innerText = slide.description;
    description.classList.add('description');
    textBlock.append(description);

    const cta = document.createElement('a');
    const ctaSpan = document.createElement('span');
    ctaSpan.innerText = slide.linkTitle;
    cta.append(ctaSpan);
    cta.href = slide.linkHref;
    cta.title = `Follow this link to ${cta.innerText.toLowerCase()}`
    cta.classList.add('cta', 'button');
    textBlock.append(cta);

    slideWrapper.append(imageBlock, bullets, textBlock);
    slides.push(slideWrapper);
  });

  slides.forEach((row, i) => {
    const li = document.createElement('li');
    li.className = 'card';
    while (row.firstElementChild) li.append(row.firstElementChild);
    ul.append(li);
  });

  wrapper.append(ul);
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  pagination.innerHTML = `<div class="carousel-actions"><div class="carousel-counter"><span class="current-index">01</span> <span class="divider">/</span> <span class="total-slides">04</span></div><button id="left" class="previous" aria-label="Previous" type="button"><span class="prev-icon"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13">
    <g fill="none" fill-rule="evenodd" stroke-linejoin="round">
        <path stroke="#054123" stroke-linecap="square" stroke-width=".686" d="M28 43H10C4.477 43 0 38.523 0 33V0h33c5.523 0 10 4.477 10 10v18c0 8.284-6.716 15-15 15z" transform="matrix(1 0 0 -1 -13 28)"></path>
        <g stroke="#35B77D" stroke-linecap="round" stroke-width="1.371">
            <path d="M0 4.282L9.214 4.282M6.143 0L10.443 4.282 6.143 8.359" transform="matrix(1 0 0 -1 -13 28) translate(16.586 17.2)"></path>
        </g>
    </g>
</svg></span></button><ol class="indicators"><li class="active" aria-label="Slide 1"></li><li aria-label="Slide 2"></li><li aria-label="Slide 3"></li><li aria-label="Slide 4"></li></ol><button id="right" class="next" aria-label="Next" type="button"><span class="next-icon"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13">
    <g fill="none" fill-rule="evenodd" stroke-linejoin="round">
        <path stroke="#054123" stroke-linecap="square" stroke-width=".686" d="M28 43H10C4.477 43 0 38.523 0 33V0h33c5.523 0 10 4.477 10 10v18c0 8.284-6.716 15-15 15z" transform="matrix(1 0 0 -1 -13 28)"></path>
        <g stroke="#35B77D" stroke-linecap="round" stroke-width="1.371">
            <path d="M0 4.282L9.214 4.282M6.143 0L10.443 4.282 6.143 8.359" transform="matrix(1 0 0 -1 -13 28) translate(16.586 17.2)"></path>
        </g>
    </g>
</svg></span></button></div>`;

  wrapper.append(pagination);
  block.append(wrapper);
}

export function decorateCarousel() {
  const carousel = document.querySelector('ul.carousel');
  const prevBtn = document.querySelector('#left');
  const nextBtn = document.querySelector('#right');
  const bulletButtons = document.querySelectorAll('.carousel-bullets button');
  let slides = Array.from(carousel.children);
  const totalCards = slides.length;
  const slideWidth = slides[0].offsetWidth;

  let currentIndex = 1;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let animationID;

  slides[0].classList.add('active');

  // Clone first and last slide for infinite effect
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, slides[0]);
  slides = Array.from(carousel.children);

  // Set initial position
  carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  function updateCounter(curr) {
    const counter = document.querySelector('.carousel-counter');
    const displayIndex = curr === 0 ? totalCards : curr > totalCards ? 1 : curr;

    counter.innerHTML = `<span class="current-index">${displayIndex
      .toString()
      .padStart(
        2,
        '0'
      )}</span><span class="total-slides"> <span class="divider">/</span> <span class="total-slides">${totalCards
      .toString()
      .padStart(2, '0')}</span>`;
  }

  function setSlide(index) {
    carousel.style.transition = 'transform 0.3s ease';
    carousel.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
    updateCounter(currentIndex);
  }

  function goToNext() {
    if (currentIndex >= slides.length - 1) return;
    setSlide(currentIndex + 1);
  }

  function goToPrev() {
    if (currentIndex <= 0) return;
    setSlide(currentIndex - 1);
  }

  carousel.addEventListener('transitionend', () => {
    if (slides[currentIndex].isEqualNode(firstClone)) {
      requestAnimationFrame(() => {
        carousel.style.transition = 'none';
        currentIndex = 1;
        carousel.style.transform = `translateX(-${
          slideWidth * currentIndex
        }px)`;
        slides.forEach(slide => slide.classList.remove('active'));

        slides[currentIndex].classList.add('active');
      });
    }
    if (slides[currentIndex].isEqualNode(lastClone)) {
      requestAnimationFrame(() => {
        carousel.style.transition = 'none';
        currentIndex = slides.length - 2;
        carousel.style.transform = `translateX(-${
          slideWidth * currentIndex
        }px)`;
        slides.forEach(slide => slide.classList.remove('active'));

        slides[currentIndex].classList.add('active');
      });
    } else {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[currentIndex].classList.add('active');
    }
  });

  nextBtn.addEventListener('click', goToNext);
  prevBtn.addEventListener('click', goToPrev);

  // Drag functionality
  function touchStart() {
    return function (event) {
      if (event.target.classList.contains('bullet')) {
        return;
      }

      isDragging = true;
      startX = event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
      animationID = requestAnimationFrame(animation);
      carousel.style.transition = 'none';
    };
  }

  function touchMove(event) {
    if (event.target.classList.contains('bullet')) {
      return;
    }

    if (!isDragging) return;
    const currentX = event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
    const diff = currentX - startX;
    currentTranslate = -currentIndex * carousel.offsetWidth + diff;
  }

  function touchEnd(event) {
    if (event.target.classList.contains('bullet')) {
      bulletButtons.forEach(btn => btn.classList.remove('active'));
      const bulletIndex = +event.target.getAttribute('data-index');
      bulletButtons.forEach(btn => {
        if (+btn.getAttribute('data-index') === bulletIndex) {
          btn.classList.add('active');
        }
      });

      setSlide(bulletIndex);
      return;
    }

    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate + currentIndex * carousel.offsetWidth;

    if (movedBy < -50) {
      goToNext();
    } else if (movedBy > 50) {
      goToPrev();
    } else {
      setSlide(currentIndex);
    }
  }

  function animation() {
    if (isDragging) {
      carousel.style.transform = `translateX(${currentTranslate}px)`;
      requestAnimationFrame(animation);
    }
  }

  // Add listeners
  carousel.addEventListener('mousedown', touchStart(currentIndex));
  carousel.addEventListener('touchstart', touchStart(currentIndex), {
    passive: true,
  });

  carousel.addEventListener('mousemove', touchMove);
  carousel.addEventListener('touchmove', touchMove, { passive: true });

  carousel.addEventListener('mouseup', touchEnd);
  carousel.addEventListener('mouseleave', () => isDragging && touchEnd());
  carousel.addEventListener('touchend', touchEnd);

  window.addEventListener('resize', () => {
    // Disable transition so resize snap is instant and smooth
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(-${currentIndex * carousel.offsetWidth}px)`;
  });
}
