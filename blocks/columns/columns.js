export default function decorate(block) {
  // Add base column classes
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Process each row and column
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // Original image column handling
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      }

      // Scene7 URL handling - now using <img>
      const links = col.querySelectorAll('a[href*="scene7.com"]');
      links.forEach((link) => {
        const url = link.href;
        const container = document.createElement('div');
        container.classList.add('scene7-container');

        // Direct image embed with size parameters
        const optimizedUrl = `${url.split('?')[0]}?fit=constrain&wid=1200&hei=630`;
        container.innerHTML = `
          <img src="${optimizedUrl}" 
            class="scene7-image" 
            loading="lazy" 
            alt="Dynamic content"
          >
        `;

        // Replace the link
        link.parentNode.replaceChild(container, link);
        col.classList.add('columns-scene7-col');
      });
    });
  });
}
