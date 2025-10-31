 const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');

  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

// theme toggle switch 
  // const themeSwitch = document.getElementById("theme-switch");

  const menuIcon = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
      menuIcon.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // // Load saved theme
  // if (localStorage.getItem("theme") === "dark") {
  //   document.body.classList.add("dark-mode");
  //   themeSwitch.checked = true;
  // }

  // themeSwitch.addEventListener("change", () => {
  //   if (themeSwitch.checked) {
  //     document.body.classList.add("dark-mode");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //     localStorage.setItem("theme", "light");
  //   }
  // });

// const sections = document.querySelectorAll("section");
// const navLinks = document.querySelectorAll(".nav-links a");

// window.addEventListener("scroll", () => {
//   let current = "";
//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop - 100;
//     if (pageYOffset >= sectionTop) {
//       current = section.getAttribute("id");
//     }
//   });
//   navLinks.forEach((a) => {
//     a.classList.remove("active");
//     if (a.getAttribute("href") === `#${current}`) {
//       a.classList.add("active");
//     }
//   });
// });

// /* anti-inspect.js
//    All-in-one anti-inspect script.
//    Usage: include <script src="anti-inspect.js"></script> before </body> or bundle into your build.
//    Author: ChatGPT for Sandy
// */

// (function AntiInspect(window, document){
//   'use strict';

//   // --------- CONFIG ----------
//   const config = {
//     detectionIntervalMs: 800,       // how often to check for DevTools
//     sizeThresholdPx: 160,           // difference between outer/inner that indicates DevTools
//     timeDelayThresholdMs: 100,      // timing threshold for "debugger" delay check
//     onDetect: 'warn',               // 'warn' | 'redirect' | 'blank'  -> action when devtools detected
//     redirectUrl: 'about:blank',     // used if onDetect === 'redirect'
//     warningHtml: '<div style="height:100vh;display:flex;justify-content:center;align-items:center;background:#111;color:#fff;font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;"><div style="max-width:720px;text-align:center;padding:24px;"><h1 style="margin:0 0 8px;font-size:28px;">\u26A0\uFE0F DevTools Detected</h1><p style="margin:0 0 16px;">For security reasons this page is not available while developer tools are open.</p></div></div>'
//   };
//   // ---------------------------

//   // Helper: replace page with warning / blank / redirect
//   function punish() {
//     try {
//       if (config.onDetect === 'warn') {
//         document.documentElement.innerHTML = config.warningHtml;
//         document.documentElement.style.height = '100%';
//         // stop further JS
//         throw new Error('DevTools detected — page locked by script.');
//       } else if (config.onDetect === 'blank') {
//         document.open();
//         document.write('');
//         document.close();
//       } else if (config.onDetect === 'redirect') {
//         window.location.href = config.redirectUrl;
//       }
//     } catch(e){
//       // swallow to avoid errors bubbling to console
//       console.warn(e && e.message ? e.message : e);
//     }
//   }

//   // 1) Disable context menu (right click)
//   document.addEventListener('contextmenu', function(e){
//     e.preventDefault();
//   }, {passive:false});

//   // 2) Block selection, copy, cut, paste
//   function preventDefaultAndStop(e){ e.preventDefault(); e.stopPropagation(); }
//   document.addEventListener('copy', preventDefaultAndStop, {passive:false});
//   document.addEventListener('cut', preventDefaultAndStop, {passive:false});
//   document.addEventListener('paste', preventDefaultAndStop, {passive:false});
//   document.addEventListener('selectstart', preventDefaultAndStop, {passive:false});
//   document.addEventListener('mousedown', function(e){
//     // optionally allow middle-click (button===1) if you want
//     if (e.button === 2) { e.preventDefault(); }
//   }, {passive:false});

//   // 3) Block common keyboard shortcuts that open DevTools or view-source
//   document.addEventListener('keydown', function(e){
//     // F12
//     if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); e.stopPropagation(); return false; }

//     // Ctrl+Shift+I/J/C  (DevTools)
//     if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
//       e.preventDefault(); e.stopPropagation(); return false;
//     }

//     // Ctrl+U (view-source), Ctrl+S (save), Ctrl+Shift+S
//     if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.keyCode === 85 || e.keyCode === 83)) {
//       e.preventDefault(); e.stopPropagation(); return false;
//     }
//   }, {passive:false});

//   // 4) DevTools detection heuristics
//   let detected = false;

//   // 4a) dimension change (DevTools docks change the inner/outer difference)
//   function sizeCheck() {
//     try {
//       const widthDelta = Math.abs(window.outerWidth - window.innerWidth);
//       const heightDelta = Math.abs(window.outerHeight - window.innerHeight);
//       if (widthDelta > config.sizeThresholdPx || heightDelta > config.sizeThresholdPx) {
//         return true;
//       }
//     } catch(e){}
//     return false;
//   }

//   // 4b) console inspection trick using getter side-effect
//   function consoleGetCheck() {
//     try {
//       let opened = false;
//       const obj = {
//         toString: function(){
//           opened = true;
//           return '';
//         }
//       };
//       // Logging the object may trigger the console to call toString when opened & inspecting
//       // This trick is not 100% reliable on all browsers but helps.
//       console.log('%c', obj);
//       return opened;
//     } catch (e){
//       return false;
//     }
//   }

//   // 4c) timing + debugger trick
//   function timingDebuggerCheck() {
//     try {
//       const t0 = performance.now();
//       // the 'debugger' statement will pause execution if DevTools are actively intercepting.
//       // In normal run it returns immediately. The presence of a big delay suggests DevTools.
//       debugger;
//       const t1 = performance.now();
//       return (t1 - t0) > config.timeDelayThresholdMs;
//     } catch(e){
//       return false;
//     }
//   }

//   // Composite check
//   function checkAll() {
//     if (detected) return true;
//     try {
//       if (sizeCheck()) { detected = true; return true; }
//       if (consoleGetCheck()) { detected = true; return true; }
//       if (timingDebuggerCheck()) { detected = true; return true; }
//     } catch(e){}
//     return false;
//   }

//   // Polling / event-based checks
//   const intervalId = setInterval(function(){
//     if (checkAll()) {
//       clearInterval(intervalId);
//       punish();
//     }
//   }, config.detectionIntervalMs);

//   // Also listen to resize (fast response)
//   window.addEventListener('resize', function(){
//     if (sizeCheck()) {
//       clearInterval(intervalId);
//       punish();
//     }
//   });

//   // 5) Extra: neutralize some common devtool-less inspection: window.print, view-source shortcuts via beforeprint
//   window.addEventListener('beforeprint', function(e){
//     e.preventDefault && e.preventDefault();
//     setTimeout(function(){ window.location.reload(); }, 1);
//   });

//   // 6) Keep the page resilient: hide helpful things if someone tries to inspect elements via accessibility tools
//   // (this is minimal — heavy-handed changes can break UX and accessibility)
//   document.addEventListener('focusin', function(e){
//     // if the focused element is the body or devtools-like, do nothing; keep it simple and non-invasive.
//     // Placeholder for custom behavior if needed.
//   });

//   // 7) Small, polite console message for honest devs (optional)
//   try {
//     console.log('This site uses scripts to discourage casual inspection. If you are a developer working on it, please disable them in the console or contact site owner.');
//   } catch (e){}

// })(window, document);

// document.addEventListener("DOMContentLoaded", function() {
//   const donateBtn = document.querySelector(".donate-btn");
//   let lastScrollY = window.scrollY;

//   window.addEventListener("scroll", () => {
//     if (window.scrollY < lastScrollY) {
//       // Scrolling up → show button
//       donateBtn.classList.add("show");
//     } else {
//       // Scrolling down → hide button
//       donateBtn.classList.remove("show");
//     }
//     lastScrollY = window.scrollY;
//   });
// });
