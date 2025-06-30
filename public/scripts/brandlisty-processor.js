/**
 * Brandlisty Component Processor
 * Processes Brandlisty components dynamically in the frontend
 */

(function () {

  // Function to process a single Brandlisty component
  function processBrandlistyComponent(component) {
    const apikey = component.getAttribute("data-apikey") || "";
    const listid = component.getAttribute("data-listid") || "";
    const boton = component.getAttribute("data-boton") || "SPILL NÅ";
    const limit = component.getAttribute("data-limit") || "";
  

    if (!apikey || !listid) {
      console.warn("Brandlisty component missing required parameters:", {
        apikey,
        listid,
      });
      return;
    }

    // Generate a unique ID for this instance
    const uniqueId =
      "brandlisty-" +
      Date.now() +
      "-" +
      Math.random().toString(36).substr(2, 9);

    // Build the API URL
    let apiUrl =
      "https://app.brandlisty.com/nowpcms.php?apikey=" +
      encodeURIComponent(apikey) +
      "&hash=" +
      encodeURIComponent(listid);

    if (boton && boton.trim()) {
      apiUrl += "&boton=" + encodeURIComponent(boton);
    }

    if (limit && limit.trim()) {
      apiUrl += "&limit=" + encodeURIComponent(limit);
    }

    // Create loading indicator
    component.innerHTML = `
            <div id="${uniqueId}" class="brandlisty-loading" style="
                text-align: center; 
                padding: 40px; 
                background: #f8f9fa; 
                border-radius: 8px; 
                border: 1px solid #dee2e6;
                min-height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            ">
                <div style="
                    width: 40px; 
                    height: 40px; 
                    border: 3px solid #dee2e6; 
                    border-radius: 50%; 
                    border-top-color: #007bff; 
                    animation: spin 1s ease-in-out infinite;
                    margin-bottom: 15px;
                "></div>
                <p style="margin: 0; color: #6c757d; font-size: 14px;">Loading Brandlisty content...</p>
            </div>
            <style>
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
        `;

    // Fetch content from Brandlisty API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        // Replace the loading indicator with the actual content
        const container = document.getElementById(uniqueId);
        if (container) {
          container.innerHTML = html;
        }
      })
      .catch((error) => {
        console.error("Error loading Brandlisty content:", error);

        // Show error message
        const container = document.getElementById(uniqueId);
        if (container) {
          container.innerHTML = `
                        <div style="
                            text-align: center; 
                            padding: 30px; 
                            background: #f8d7da; 
                            border: 1px solid #f5c6cb; 
                            border-radius: 8px; 
                            color: #721c24;
                        ">
                            <i class="fa fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 10px;"></i>
                            <p style="margin: 0; font-weight: bold;">Error loading Brandlisty content</p>
                            <small style="opacity: 0.8;">Please check your API configuration and try again</small>
                        </div>
                    `;
        }
      });
  }

  // Function to process all Brandlisty components on the page
  function processAllBrandlistyComponents() {
    const components = document.querySelectorAll(
      '[data-gjs-type="brandlisty"]'
    );

    if (components.length === 0) {
      return;
    }

    console.log(
      `Found ${components.length} Brandlisty component(s) to process`
    );

    components.forEach((component, index) => {
      setTimeout(() => {
        processBrandlistyComponent(component);
      }, index * 100); // Small delay between processing to avoid overwhelming the API
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      processAllBrandlistyComponents
    );
  } else {
    processAllBrandlistyComponents();
  }

  // Also process components that might be loaded dynamically
  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(function (mutations) {
      let shouldProcess = false;

      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              // Element node
              if (
                node.getAttribute &&
                node.getAttribute("data-gjs-type") === "brandlisty"
              ) {
                shouldProcess = true;
              } else if (node.querySelectorAll) {
                const brandlistyNodes = node.querySelectorAll(
                  '[data-gjs-type="brandlisty"]'
                );
                if (brandlistyNodes.length > 0) {
                  shouldProcess = true;
                }
              }
            }
          });
        }
      });

      if (shouldProcess) {
        setTimeout(processAllBrandlistyComponents, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  console.log("Starting!!")
  // Export for manual processing if needed
  window.BrandlistyProcessor = {
    processAll: processAllBrandlistyComponents,
    processComponent: processBrandlistyComponent,
  };
})();