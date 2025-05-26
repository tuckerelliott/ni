export default function decorate(block) {
  const mediaInfoBlock = document.createElement('div');

  const imageBlock = document.createElement('div');
  imageBlock.classList.add('image-block');

  const image = document.createElement('img');
  image.src = 'https://ni.scene7.com/is/image/ni/259204_Company-Campaign_performance_graphic?scl=1';
  image.alt = 'Performance graphic';
  imageBlock.append(image);
  mediaInfoBlock.append(imageBlock);

  const infoBlock = document.createElement('div');
  infoBlock.classList.add('info-block');

  const infoWrapper = document.createElement('div');
  infoWrapper.classList.add('info-wrapper');

  const title = document.createElement('h2');
  title.classList.add('title');
  title.innerText = 'Elevate Performance with Test';
  infoWrapper.append(title);

  const description = document.createElement('p');
  description.classList.add('description');
  description.innerText = 'Unlocking the full benefits of test isn’t just about using a better tool. It requires an intentional strategy with automation, standardization, and digital transformation initiatives.';
  infoWrapper.append(description);

  const cta = document.createElement('a');
  cta.classList.add('cta', 'button');
  cta.href = 'https://www.ni.com/en/about-ni/improve-performance-through-test.html';
  cta.innerText = 'Learn how';
  infoWrapper.append(cta);

  infoBlock.append(infoWrapper);
  mediaInfoBlock.append(infoBlock);

  block.innerHTML = mediaInfoBlock.innerHTML;
}
