/* eslint-disable no-lonely-if */
export default async function decorate(block) {
  [...block.children].forEach((child) => {
    const link = child.querySelector('p > a');
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img-wrapper');
    const img = document.createElement('img');
    img.src = link.innerText;
    img.alt = 'Product image';
    imgWrapper.append(img);
    link.parentNode.replaceWith(imgWrapper);

    const cardTitle = child.querySelector('h2');
    const cardWrapperLink = child.querySelector('h2 > a');
    cardTitle.innerHTML = cardWrapperLink.innerText;
    const hiddenLinkContainer = document.createElement('div');
    hiddenLinkContainer.classList.add('hidden-link-container');
    hiddenLinkContainer.innerHTML = `<p><a href="${cardWrapperLink.href}" title="${cardWrapperLink.href}">${cardWrapperLink.href}</a></p>`;
    child.querySelector(':scope > div').prepend(hiddenLinkContainer);
  });

  const container = block.parentElement.parentElement;
  const defaultContentWrappers = container.querySelectorAll(
    '.default-content-wrapper',
  );
  const lastWrapper = defaultContentWrappers[defaultContentWrappers.length - 1];
  const featuredProductsWrapper = container.querySelector(
    '.featured-products-wrapper .featured-products',
  );

  let isExpanded = false;

  const applyDisplayState = () => {
    const isCarouselViewport = window.innerWidth >= 1024 && window.innerWidth <= 1200;
    const productDivs = featuredProductsWrapper.querySelectorAll(':scope > div');

    if (isCarouselViewport) {
      productDivs.forEach((div) => {
        div.style.display = '';
      });
    } else {
      if (isExpanded) {
        productDivs.forEach((div) => {
          div.style.display = '';
        });
      } else {
        productDivs.forEach((div, index) => {
          div.style.display = index < 2 ? '' : 'none';
        });
      }
    }
  };

  const setupCarousel = () => {
    const isCarouselViewport = window.innerWidth >= 1024 && window.innerWidth <= 1200;

    if (isCarouselViewport) {
      if (!container.querySelector('.carousel-navigation')) {
        const productDivs = featuredProductsWrapper.querySelectorAll(':scope > div');
        productDivs.forEach((div) => {
          div.style.display = '';
        });

        const carouselNav = document.createElement('div');
        carouselNav.className = 'carousel-navigation';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev';
        prevBtn.setAttribute('aria-label', 'Previous slide');
        prevBtn.setAttribute('type', 'button');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next';
        nextBtn.setAttribute('aria-label', 'Next slide');
        nextBtn.setAttribute('type', 'button');

        carouselNav.appendChild(prevBtn);
        carouselNav.appendChild(nextBtn);

        container
          .querySelector('.featured-products-wrapper')
          .appendChild(carouselNav);

        prevBtn.addEventListener('click', () => {
          featuredProductsWrapper.scrollBy({
            left: -featuredProductsWrapper.offsetWidth * 0.4,
            behavior: 'smooth',
          });
        });

        nextBtn.addEventListener('click', () => {
          featuredProductsWrapper.scrollBy({
            left: featuredProductsWrapper.offsetWidth * 0.4,
            behavior: 'smooth',
          });
        });

        // A11y: Add keyboard navigation for carousel
        featuredProductsWrapper.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            prevBtn.click();
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            nextBtn.click();
          }
        });

        // A11y: Make carousel focusable
        featuredProductsWrapper.setAttribute('tabindex', '0');
        featuredProductsWrapper.setAttribute('role', 'region');
        featuredProductsWrapper.setAttribute(
          'aria-label',
          'Featured Products Carousel',
        );
      }
    } else {
      const carouselNav = container.querySelector('.carousel-navigation');
      if (carouselNav) {
        carouselNav.remove();
      }

      applyDisplayState();
    }

    if (lastWrapper) {
      const showMoreParagraph = lastWrapper.querySelector('p.show-more');
      if (showMoreParagraph) {
        showMoreParagraph.style.display = isCarouselViewport ? 'none' : '';
      }
    }
  };

  if (lastWrapper && featuredProductsWrapper) {
    const showMoreParagraph = lastWrapper.querySelector('p');
    if (
      showMoreParagraph
      && showMoreParagraph.textContent.trim() === 'Show more'
    ) {
      const symbolSpan = document.createElement('span');
      symbolSpan.textContent = ' +';
      symbolSpan.style.color = '#006b46';
      symbolSpan.style.fontSize = '1.2em';
      symbolSpan.style.marginLeft = '4px';
      showMoreParagraph.textContent = 'Show more';
      showMoreParagraph.appendChild(symbolSpan);
      showMoreParagraph.classList.add('show-more');

      // A11y: Add button role and keyboard support
      showMoreParagraph.setAttribute('role', 'button');
      showMoreParagraph.setAttribute('tabindex', '0');
      showMoreParagraph.setAttribute('aria-expanded', 'false');

      isExpanded = false;

      applyDisplayState();

      const toggleShowMore = () => {
        isExpanded = !isExpanded;

        if (isExpanded) {
          symbolSpan.textContent = ' -';
          showMoreParagraph.textContent = 'Show less';
          showMoreParagraph.appendChild(symbolSpan);
          showMoreParagraph.setAttribute('aria-expanded', 'true');
        } else {
          symbolSpan.textContent = ' +';
          showMoreParagraph.textContent = 'Show more';
          showMoreParagraph.appendChild(symbolSpan);
          showMoreParagraph.setAttribute('aria-expanded', 'false');
        }

        applyDisplayState();
      };

      showMoreParagraph.addEventListener('click', toggleShowMore);

      // A11y: Keyboard support for show more
      showMoreParagraph.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleShowMore();
        }
      });
    }
  }

  // --- START: Optimized JavaScript for href transformation ---
  const productCards = block.querySelectorAll(':scope > div');

  productCards.forEach((card, index) => {
    const anchorElement = card.querySelector('div > p > a[href]');

    if (anchorElement) {
      const url = anchorElement.href;
      const linkText = anchorElement.textContent.trim();
      card.dataset.href = url;

      const divToHide = anchorElement.closest('div');
      if (divToHide) {
        divToHide.classList.add('hidden-link-container');
      }

      card.classList.add('clickable-card');

      // A11y: Make card keyboard accessible
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute(
        'aria-label',
        `Navigate to ${linkText || 'product page'}`,
      );

      // A11y: Keyboard navigation for cards
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          window.location.href = url;
        }
      });

      // SEO: Add structured data attributes
      card.setAttribute('data-product-url', url);
      card.setAttribute('data-product-position', index + 1);

      // SEO: Add title for better UX
      const cardTitle = card.querySelector('h2');
      if (cardTitle) {
        card.setAttribute('title', `View ${cardTitle.textContent.trim()}`);
      }
    }
  });

  block.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.clickable-card');

    if (clickedCard && clickedCard.dataset.href) {
      window.location.href = clickedCard.dataset.href;
    }
  });
  // --- END: Optimized JavaScript for href transformation ---

  // A11y: Add semantic structure
  if (featuredProductsWrapper) {
    featuredProductsWrapper.setAttribute('role', 'region');
    featuredProductsWrapper.setAttribute('aria-label', 'Featured Products');
  }

  // A11y: Add heading association
  const mainHeading = container.querySelector('#featured-products');
  if (mainHeading && featuredProductsWrapper) {
    featuredProductsWrapper.setAttribute(
      'aria-labelledby',
      'featured-products',
    );
  }

  setupCarousel();

  window.addEventListener('resize', setupCarousel);

  // SEO: Add structured data for products
  const addStructuredData = () => {
    if (document.querySelector('script[data-featured-products-schema]')) {
      return; // Already added
    }

    const products = [];
    productCards.forEach((card) => {
      const title = card.querySelector('h2');
      const description = card.querySelector('p:not(.show-more)');
      const url = card.dataset.href;

      if (title && url) {
        products.push({
          '@type': 'Product',
          name: title.textContent.trim(),
          description: description ? description.textContent.trim() : '',
          url,
        });
      }
    });

    if (products.length > 0) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Featured Products',
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: product,
        })),
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-featured-products-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  };

  // Add structured data after initialization
  requestAnimationFrame(addStructuredData);
}
