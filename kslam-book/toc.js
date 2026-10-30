// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded affix "><a href="getting-started.html">Getting Started</a></li><li class="chapter-item expanded affix "><li class="part-title">Part I — Foundations</li><li class="chapter-item expanded "><a href="part1/what-is-slam.html"><strong aria-hidden="true">1.</strong> What Is SLAM?</a></li><li class="chapter-item expanded "><a href="part1/rigid-motion.html"><strong aria-hidden="true">2.</strong> Rigid-Body Motion and Lie Groups</a></li><li class="chapter-item expanded "><a href="part1/cameras.html"><strong aria-hidden="true">3.</strong> Cameras and Projection</a></li><li class="chapter-item expanded "><a href="part1/sensors.html"><strong aria-hidden="true">4.</strong> Sensors, Rigs and Calibration</a></li><li class="chapter-item expanded affix "><li class="part-title">Part II — The Visual Frontend</li><li class="chapter-item expanded "><a href="part2/features.html"><strong aria-hidden="true">5.</strong> Features and Matching</a></li><li class="chapter-item expanded "><a href="part2/optical-flow.html"><strong aria-hidden="true">6.</strong> Optical Flow Tracking</a></li><li class="chapter-item expanded affix "><li class="part-title">Part III — Geometry</li><li class="chapter-item expanded "><a href="part3/two-view.html"><strong aria-hidden="true">7.</strong> Two-View Geometry and Map Initialization</a></li><li class="chapter-item expanded "><a href="part3/pnp.html"><strong aria-hidden="true">8.</strong> Pose from the Map: PnP</a></li><li class="chapter-item expanded "><a href="part3/tracking.html"><strong aria-hidden="true">9.</strong> Tracking</a></li><li class="chapter-item expanded affix "><li class="part-title">Part IV — Optimization</li><li class="chapter-item expanded "><a href="part4/least-squares.html"><strong aria-hidden="true">10.</strong> Nonlinear Least Squares</a></li><li class="chapter-item expanded "><a href="part4/bundle-adjustment.html"><strong aria-hidden="true">11.</strong> Bundle Adjustment and the Schur Complement</a></li><li class="chapter-item expanded "><a href="part4/local-mapping.html"><strong aria-hidden="true">12.</strong> Local Mapping</a></li><li class="chapter-item expanded affix "><li class="part-title">Part V — Visual-Inertial SLAM</li><li class="chapter-item expanded "><a href="part5/preintegration.html"><strong aria-hidden="true">13.</strong> IMU Preintegration</a></li><li class="chapter-item expanded "><a href="part5/vi-initialization.html"><strong aria-hidden="true">14.</strong> Visual-Inertial Initialization</a></li><li class="chapter-item expanded "><a href="part5/vi-ba.html"><strong aria-hidden="true">15.</strong> Visual-Inertial Bundle Adjustment</a></li><li class="chapter-item expanded affix "><li class="part-title">Part VI — Loop Closure</li><li class="chapter-item expanded "><a href="part6/place-recognition.html"><strong aria-hidden="true">16.</strong> Place Recognition with Bags of Words</a></li><li class="chapter-item expanded "><a href="part6/loop-correction.html"><strong aria-hidden="true">17.</strong> Loop Verification and Pose-Graph Optimization</a></li><li class="chapter-item expanded affix "><li class="part-title">Part VII — The Complete System</li><li class="chapter-item expanded "><a href="part7/system.html"><strong aria-hidden="true">18.</strong> Assembling the SLAM System</a></li><li class="chapter-item expanded "><a href="part7/evaluation.html"><strong aria-hidden="true">19.</strong> Evaluating SLAM</a></li><li class="chapter-item expanded "><a href="part7/frontiers.html"><strong aria-hidden="true">20.</strong> Frontiers</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="appendix/notation.html">Notation and Conventions</a></li><li class="chapter-item expanded affix "><a href="appendix/linear-algebra.html">Linear Algebra Refresher</a></li><li class="chapter-item expanded affix "><a href="appendix/datasets.html">Datasets</a></li><li class="chapter-item expanded affix "><a href="appendix/bibliography.html">Bibliography</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
