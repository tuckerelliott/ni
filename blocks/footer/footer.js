import { footerLinks } from './footerData.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // decorate footer DOM
  const footer = document.createElement('div');

  const footerTop = document.createElement('div');
  footerTop.classList.add('footer-top');
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('logo-block');
  const logo = document.createElement('img');
  logo.classList.add('logo');
  logo.src = '../../icons/emerson_footer_white.webp';
  logo.alt = 'Emerson logo';
  logoWrapper.append(logo);

  footerTop.append(logoWrapper);

  Array.from(Object.entries(footerLinks)).forEach(
    ([heading, links], i, arr) => {
      const column = document.createElement('div');

      const headingEl = document.createElement('p');
      headingEl.classList.add('heading');
      headingEl.innerText = heading;

      column.append(headingEl);

      const navLinks = document.createElement('div');
      navLinks.classList.add('nav-links');

      links.forEach(({ title, link }) => {
        const linkEl = document.createElement('a');
        linkEl.href = link;
        linkEl.innerText = title;

        navLinks.append(linkEl);
      });

      column.append(navLinks);

      if (i === arr.length - 1) {
        const socialLinks = document.createElement('div');
        socialLinks.classList.add('social-links');
        socialLinks.innerHTML = `<a class="analytics-footer-link ni-wrapper-social-fa-facebook" href="//www.facebook.com/NationalInstruments/" aria-label="Visit Facebook">
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='#32eb96' viewBox='0 0 500 500' width='20px' height='20px'>
    <path
        d='m500,250C500,111.93,388.07,0,250,0S0,111.93,0,250c0,117.24,80.72,215.62,189.61,242.64v-166.24h-51.55v-76.4h51.55v-32.92c0-85.09,38.51-124.53,122.05-124.53,15.84,0,43.17,3.11,54.35,6.21v69.25c-5.9-.62-16.15-.93-28.88-.93-40.99,0-56.83,15.53-56.83,55.9v27.02h81.66l-14.03,76.4h-67.63v171.77c123.77-14.95,219.7-120.35,219.7-248.17Z'
        fill='%2332eb96' />
</svg>
                                </a>
                                <a class="analytics-footer-link ni-wrapper-social-fa-twitter" href="//twitter.com/NIglobal" aria-label="Visit X">
                                    <svg width='20' height='20' viewBox='0 0 1200 1227' fill='#32eb96' xmlns='http://www.w3.org/2000/svg'><path d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z' fill='#32eb96'/></svg>
                                </a>
                                <a class="analytics-footer-link ni-wrapper-social-fa-linkedin" href="//www.linkedin.com/company/niglobal/" aria-label="Visit Linkedin">
                                    <svg height='20' viewBox='0 0 72 72' width='20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z' fill='#32eb96'/></svg>
                                </a>
                                <a class="analytics-footer-link ni-wrapper-social-fa-youtube" href="//www.youtube.com/@NIApps/featured" aria-label="Visit Youtube">
                                    <svg xmlns='http://www.w3.org/2000/svg' width='28.5648256' height='20' version='1.1' viewBox='0 0 71.412065 50'><g id='g5' transform='scale(.58824)'><path fill='#32eb96' fill-rule='evenodd' d='M118.9 13.3c-1.4-5.2-5.5-9.3-10.7-10.7C98.7 0 60.7 0 60.7 0s-38 0-47.5 2.5C8.1 3.9 3.9 8.1 2.5 13.3 0 22.8 0 42.5 0 42.5s0 19.8 2.5 29.2C3.9 76.9 8 81 13.2 82.4 22.8 85 60.7 85 60.7 85s38 0 47.5-2.5c5.2-1.4 9.3-5.5 10.7-10.7 2.5-9.5 2.5-29.2 2.5-29.2s.1-19.8-2.5-29.3z M80.2 42.5 48.6 24.3v36.4z'/></g></svg>
                                </a>
                                <a class="analytics-footer-link ni-wrapper-social-fa-instagram-square" href="//www.instagram.com/niglobal/?hl=en" aria-label="Visit Instagram">
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' fill='#32eb96' width='20px' height='20px'><path d='M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34' transform='translate(-2.5 -2.5)'/></svg>
                                </a>`;
        column.append(socialLinks);
      }

      footerTop.append(column);
    },
  );

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  footerBottom.innerHTML = `
  <div class="gateway-legal">
                    <a class="global-gateway analytics-footer-link" href="//www.ni.com/global-gateway/?rtrn=https%3A%2F%2Fwww.ni.com%2Fen.html"><img class="global-gateway-icon" src="//ni.scene7.com/is/image/ni/ca?fmt=png-alpha" alt="" width="21" loading="lazy"><span>Canada (English)</span></a>
                <div class="legal">
                    <a class="analytics-footer-link" href="//www.ni.com/en/about-ni/legal.html">LEGAL</a>
                    <a class="analytics-footer-link" href="https://www.ni.com/en/about-ni/legal/imprint.html">IMPRINT</a>
                    <a class="analytics-footer-link" href="//www.ni.com/en/about-ni/legal/privacy-statement.html">PRIVACY</a>
                    <a id="preferences" class="ot-sdk-show-settings" href="javascript:void(0)">Manage cookies</a>
                </div>
                </div>
                <div class="allRights"> © <span class="copyright">2025</span> NATIONAL INSTRUMENTS CORP. ALL RIGHTS RESERVED.</div>
                <div class="contact-number"><a href="tel:+1 800 433 3488">+1 800 433 3488</a></div>`;

  footer.append(footerTop, footerBottom);

  block.innerHTML = footer.innerHTML;
}
