function jsx(html, ...args) {
  return html.slice(1).reduce((str, elem, i) => str + args[i] + elem, html[0]);
}

export default function decorate(block) {
  // Add base column classes
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Process each row and column
  [...block.children].forEach(row => {
    [...row.children].forEach(col => {
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
      links.forEach(link => {
        const url = link.href;
        const container = document.createElement('div');
        container.classList.add('scene7-container');

        // Direct image embed with size parameters
        const optimizedUrl = `${
          url.split('?')[0]
        }?fmt=webp-alpha&scl=1&fit=constrain&wid=1200&hei=630`;
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

      const linkAchors = col.querySelectorAll('.button-container a');
      linkAchors.forEach(
        link => (link.title = `Follow this link to ${link.innerText.toLowerCase()}`)
      );
    });

    if (block.classList.contains('test-and-measurement')) {
      const wrapper = block.parentNode;
      wrapper.parentNode.classList.add('test-and-measurement');

      const newDiv = jsx`<hr /> <div class="default-content-wrapper"><h2 id="shop-by-application-area">Shop by Application Area</h2></div><div class="ts-tabs-container">
        <div class="ts-tabs-header">
            <div class="ts-tab active" data-tab="data-acquisition">Data Acquisition and Control</div>
            <div class="ts-tab" data-tab="electronic-test">Electronic Test and Communication</div>
            <div class="ts-tab" data-tab="wireless-test">Wireless Design and Test</div>
            <div class="ts-tab" data-tab="systems-management">Systems and Data Management</div>
            <div class="ts-tab" data-tab="education">Engineering Education</div>
        </div>
        <div class="ts-tab-content active" data-tab="data-acquisition">
            <div class="ts-columns-container">
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/multifunction-io.html">Multifunction I/O</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/voltage.html">Voltage</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/current.html">Current</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/digital-io.html">Digital I/O</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/counters-and-timers.html">Counters and Timers</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/packaged-controllers.html">Packaged Controllers</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/industrial-communication-buses.html">Industrial Communication Buses</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/vehicle-communication-buses.html">Vehicle Communication Buses</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/avionics-communication-buses.html">Avionics Communication Buses</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/temperature.html">Temperature</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/sound-and-vibration.html">Sound and Vibration</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/strain-pressure-and-force.html">Strain, Pressure, and Force</a></li>

                    </ul>
                </div>
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/position-displacement.html">Position Displacement</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/machine-vision.html">Machine Vision</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/board-level-controllers.html">Board-Level Controllers</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/hmis-and-displays.html">HMIs and Displays</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/signal-conditioning.html">Signal Conditioning</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/programming-environments.html">Programming Environments for Data Acquisition and Control</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/software-suites.html">Control & Software Suites for Data Acquisition and Control</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/application-software-for-data-acquisition-and-control.html">Application Software for Data Acquisition and Control</a></li>
                    </ul>
                </div>
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en/support/downloads/tools-network.html">Add-Ons for Data Acquisition and Control</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/shop/electronic-test-instrumentation/application-software-for-electronic-test-and-instrumentation-category/systemlink.html">SystemLink™ Software</a></li>
                    </ul>
                </div>
            </div>
            <div>
            <button class="ts-see-more">See more</button>
            </div>
        </div>

        <div class="ts-tab-content" data-tab="electronic-test">
            <div class="ts-columns-container">
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/oscilloscopes-and-digitizers.html">Oscilloscopes</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/category/digital-instruments.html">Digital Instruments</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/frequency-counters.html">Frequency Counters</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/power-supplies-and-loads.html">Power Supplies and Loads</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/switches.html">Switches</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/gpib-serial-and-ethernet.html">GPIB, Serial, and Ethernet</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/digital-multimeters.html">Digital Multimeters</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/waveform-generators.html">Waveform Generators</a></li>
                    </ul>
                </div>
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/category/source-measure-units-and-lcr-meters.html">Source Measure Units and LCR Meters</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/flexrio-custom-instruments-and-processing.html">FlexRIO Custom Instruments and Processing</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/programming-environments.html">Programming Environments for Electronic Test and Instrumentation</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/software-suites.html">Software Suites for Electronic Test and Instrumentation</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/application-software-for-electronic-test-and-instrumentation.html">Application Software for Electronic Test and Instrumentation</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/support/downloads/tools-network.html">Add-Ons for Electronic Test and Instrumentation</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/shop/electronic-test-instrumentation/what-is-the-semiconductor-test-system.html">Semiconductor Test System</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/shop/electronic-test-instrumentation/application-software-for-electronic-test-and-instrumentation-category/systemlink.html">SystemLink™ Software</a></li>
                    </ul>
                </div>
            </div>
            <button class="ts-see-more">See more</button>
        </div>

        <div class="ts-tab-content" data-tab="wireless-test">
            <div class="ts-columns-container">
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/vector-signal-transceivers.html">Vector Signal Transceivers</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/rf-signal-generators.html">RF Signal Generators</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/software-defined-radios.html">Software Defined Radios</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/network-analyzers.html">Network Analyzers</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/spectrum-and-signal-analyzers.html">Spectrum and Signal Analyzers</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/rf-and-microwave-switches.html">RF and Microwave Switches</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/power-sensors.html">Power Sensors</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-us/shop/category/rf-signal-conditioning.html">RF Signal Conditioning</a></li>
                    </ul>
                </div>
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/category/programming-environments.html">Programming Environments for Wireless Design and Test</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/category/software-suites.html">Test & Software Suites for Wireless Design and Test</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/category/application-software-for-wireless-design-and-test.html">Application Software for Wireless Design and Test</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/support/downloads/tools-network.html">Add-Ons for Wireless Design and Test</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/shop/electronic-test-instrumentation/what-is-the-semiconductor-test-system.html">Semiconductor Test System</a></li>
                </div>
            </div>
            <button class="ts-see-more">See more</button>
        </div>

        <div class="ts-tab-content" data-tab="systems-management">
            <div class="ts-columns-container">
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en/shop/electronic-test-instrumentation/application-software-for-electronic-test-and-instrumentation-category/systemlink.html">SystemLink™</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/shop/electronic-test-instrumentation/application-software-for-electronic-test-and-instrumentation-category/what-is-teststand.html">TestStand</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/shop/data-acquisition-and-control/application-software-for-data-acquisition-and-control-category/what-is-diadem.html">DIAdem</a></li>
                    </ul>
                </div>
            </div>
            <button class="ts-see-more">See more</button>
        </div>

        <div class="ts-tab-content" data-tab="education">
            <div class="ts-columns-container">
                <div class="ts-column">
                    <ul class="ts-item-list arrow-list">
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/category/portable-student-devices.html">Portable Student Devices</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/category/radio-prototyping-hardware.html">Radio Prototyping Hardware</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/category/engineering-lab-stations.html">Engineering Lab Stations</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/product/labview.html">LabVIEW</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en/shop/academic-volume-license.html">Academic Volume License</a></li>
                        <li class="ts-list-item"><a href="https://www.ni.com/en-ca/shop/product/multisim.html">Multisim Education Edition</a></li>
                    </ul>
                </div>
            </div>
            <button class="ts-see-more">See more</button>
        </div>
    </div>`;
      wrapper.insertAdjacentHTML('beforeend', newDiv);

      const tabs = document.querySelectorAll('.ts-tab');
      const tabContents = document.querySelectorAll('.ts-tab-content');

      const MAX_ITEMS_PER_COLUMN_DESKTOP = 8;
      const MAX_ITEMS_MOBILE_INITIAL = 8;
      const DESKTOP_VIEWPORT_WIDTH = 1200;

      function manageItemVisibility(activeTabContent) {
        tabContents.forEach(content => {
          const seeMoreBtn = content.querySelector('.ts-see-more');
          const allListItems = content.querySelectorAll('.ts-list-item');
          allListItems.forEach(item =>
            item.classList.remove('ts-hidden-by-default')
          );

          if (window.innerWidth < DESKTOP_VIEWPORT_WIDTH) {
            const listItemsToHide = Array.from(allListItems).slice(
              MAX_ITEMS_MOBILE_INITIAL
            );
            if (
              content === activeTabContent &&
              content.getAttribute('data-shown-all-mobile') !== 'true'
            ) {
              listItemsToHide.forEach(item =>
                item.classList.add('ts-hidden-by-default')
              );
              if (listItemsToHide.length > 0) {
                seeMoreBtn.style.display = 'block';
              } else {
                seeMoreBtn.style.display = 'none';
              }
            } else if (content !== activeTabContent) {
              listItemsToHide.forEach(item =>
                item.classList.add('ts-hidden-by-default')
              );
              seeMoreBtn.style.display = 'block';
              content.removeAttribute('data-shown-all-mobile');
            } else {
              seeMoreBtn.style.display = 'none';
            }
          } else {
            allListItems.forEach(item =>
              item.classList.remove('ts-hidden-by-default')
            );
            seeMoreBtn.style.display = 'none';

            const columns = activeTabContent.querySelectorAll('.ts-column');
            columns.forEach(column => {
              const itemsInColumn = column.querySelectorAll('.ts-list-item');
              Array.from(itemsInColumn).forEach((item, index) => {
                if (index >= MAX_ITEMS_PER_COLUMN_DESKTOP) {
                  item.classList.add('ts-hidden-by-default');
                } else {
                  item.classList.remove('ts-hidden-by-default');
                }
              });
            });
          }
        });
      }

      tabs.forEach(tab => {
        tab.addEventListener('click', function () {
          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));

          this.classList.add('active');

          const tabId = this.getAttribute('data-tab');
          const activeTabContent = document.querySelector(
            `.ts-tab-content[data-tab="${tabId}"]`
          );
          activeTabContent.classList.add('active');

          manageItemVisibility(activeTabContent);
        });
      });

      document.addEventListener('click', e => {
        if (e.target.classList.contains('ts-see-more')) {
          const tabContent = e.target.closest('.ts-tab-content');
          tabContent
            .querySelectorAll('.ts-list-item.ts-hidden-by-default')
            .forEach(item => {
              item.classList.remove('ts-hidden-by-default');
            });
          e.target.style.display = 'none';
          tabContent.setAttribute('data-shown-all-mobile', 'true');
        }
      });

      function checkViewportAndApplyVisibility() {
        const activeTabContent = document.querySelector(
          '.ts-tab-content.active'
        );
        if (activeTabContent) {
          manageItemVisibility(activeTabContent);
        }
      }

      checkViewportAndApplyVisibility();

      window.addEventListener('resize', checkViewportAndApplyVisibility);
    }
  });
}
