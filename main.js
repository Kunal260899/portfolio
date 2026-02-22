function toggleMode() {
  if (!document.startViewTransition) {
    document.body.classList.toggle("light");
    return;
  }

  document.startViewTransition(() => {
    document.body.classList.toggle("light");
  });
}

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

  function applySystemTheme() {
    document.body.classList.toggle("light", prefersLight.matches);
  }

  applySystemTheme();
  prefersLight.addEventListener("change", applySystemTheme);

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//--- HERO SECTION ---
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- TYPEWRITER EFFECT ---
  let index = 0;
  const txt = "<p>  Kunal Sondkar  </p>";
  const speed = 50;
  function typeWriter() {
    if (index < txt.length) {
      document.getElementById("hero-section-p").innerHTML += txt.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }
  window.onload = typeWriter;

//--- IMAGE SCROOL EFFECT ---
  const frameCount = 75;
  const currentFrame = index => `/img/${index}.webp`;
  const canvas = document.getElementById("sequence");
  const context = canvas.getContext("2d");
  const images = [];
  const imageSeq = { frame: 0 };
  let loadedCount = 0;
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
      loadedCount++;
      if (loadedCount === frameCount) render();
    };
    images.push(img);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  }

  function render() {
    const frame = Math.floor(imageSeq.frame);
    const img = images[frame];
    if (!img) return;
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    ease: "none",
    onUpdate: render,
    scrollTrigger: {
      trigger: "#hero-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      pin: ".wrapper",
    }
  });

 // --- VIDEO FADE IN ---
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const overlay = document.getElementById("introOverlay");
  window.addEventListener("scroll", () => overlay.classList.add("fade-out"), { once: true });

  const endVideo = document.getElementById("endVideo");

  ScrollTrigger.create({
    trigger: "#hero-section",
    start: "90% bottom",
    end: "bottom top",
    onEnter: () => {
      endVideo.classList.add("active");
      gsap.to(canvas, { opacity: 0, duration: 1 });
      gsap.to(endVideo, { opacity: 1, duration: 1 });
    },
  });

  ScrollTrigger.create({
    trigger: "#hero-section",
    start: "50% bottom",
    end: "bottom top",
    onLeaveBack: () => {
      endVideo.classList.remove("active");
      gsap.to(endVideo, { opacity: 0, duration: 1 });
      gsap.to(canvas, { opacity: 1, duration: 1 });
    }
  });

 // --- PARALLAX ---
  ScrollTrigger.create({
    trigger: "#hero-section",
    start: "105% bottom",
    once: true,
    onEnter: () => {
      gsap.to(".bg-name", {
        y: -550,
        ease: "none",
        scrollTrigger: {
          trigger: ".info-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".end-video video", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: ".info-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
  });

  // --- .info-section SECTION OVERLAP ---
  gsap.to("#info-section", {
    yPercent: -100,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero-section",
      start: "bottom bottom",
      end: "bottom+=100% bottom",
      scrub: true,
    }
  });

  // --- ICONS ---

  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  const icons = document.querySelectorAll('.social-icons a');
  icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'rotate(10deg) scale(1.3)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'rotate(0deg) scale(1)';
    });
  });

  //---COLOR CHANGE---
  document.addEventListener('DOMContentLoaded', () => {
    const skill_boxes_letters = ['a','b','c','d','e','f','g','h'];
    const skill_boxes = Array.from(document.querySelectorAll('.grid-skills .skills')).slice(0,8);
    const easter_egg = document.getElementById('easter-egg');

    skill_boxes.forEach((box,i) => {
        const letter = skill_boxes_letters[i];
        box.classList.add(`${letter}_1`);

        box.addEventListener('mouseenter', () => {
            if(box.classList.contains(`${letter}_1`)){
                box.classList.remove(`${letter}_1`);
                box.classList.add(`${letter}_2`)
            } else {
                box.classList.remove(`${letter}_2`);
                box.classList.add(`${letter}_1`)
            }

            const allToggled = skill_boxes.every((b,idx) =>
                b.classList.contains(`${skill_boxes_letters[idx]}_2`)
            );

            //---EASTER EGG---
            if(allToggled){
                easter_egg.style.opacity = 1;
            } else {
                easter_egg.style.opacity = 0;
            }
        });
    });
  });

//---RESUME DOWNLOAD
function startDownload() {
  const box = document.querySelector('.resume_download-box');
  const fill = document.getElementById('fill-progress');
  const tick = document.getElementById('tick');
  const cross = document.getElementById('cross');
  const text = document.getElementById('resume-text');


  fill.style.animation = 'none';
  fill.offsetHeight; // force reflow
  fill.style.animation = 'fillUp 2s forwards';

  box.classList.remove('show-tick', 'show-cross', 'loading');

  box.classList.add('loading');

  [tick, cross].forEach(img => {
    img.src = img.src;
    img.style.opacity = 0;
    img.style.bottom = '-80%';
  });

  setTimeout(async () => {
    const pdfUrl = 'Resume.pdf';

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = pdfUrl; // filename on save
    document.body.appendChild(a);
    a.click();
    a.remove();

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('Failed');

      box.classList.remove('loading');
      box.classList.add('show-tick');
    } catch {
      box.classList.remove('loading');
      box.classList.add('show-cross');
    }
    
    setTimeout(() => {
      box.classList.remove('show-tick', 'show-cross', 'loading');
      fill.style.animation = 'none';
      fill.style.height = '0';
    }, 3000);

  }, 2000);
}

//PROJECT SECTION
//CARD ANIMATION
  const cards = document.querySelectorAll(".card");
  const moveStrength = 20;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const moveX = ((relX - rect.width / 2) / rect.width) * moveStrength;
      const moveY = ((relY - rect.height / 2) / rect.height) * moveStrength;

      gsap.to(card, {
        x: moveX,
        y: moveY,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    });
  });

  gsap.from(".card", {
    scrollTrigger: {
      trigger: ".projects",
      start: "top 40%",
      toggleActions: "play none none reverse"
    },
    y: 500,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2
  });

const splitTypes = document.querySelectorAll('.reveal-type')

splitTypes.forEach((char, i) => {
    const text = new SplitType(char, { types: 'chars'})

    gsap.from(text.chars, {
        scrollTrigger: {
            trigger: char,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
        },
        scaleY: 0,
        y: -20,
        transformOrigin: 'top',
        stagger: 0.1
    })
})

//EDUCATION SECTION
    const toggle = document.getElementById("toggle");
    const indicator = document.querySelector(".toggle-indicator");
    const eduTab = document.getElementById("eduTab");
    const expTab = document.getElementById("expTab");

    const eduItems = gsap.utils.toArray(".edu");
    const expItems = gsap.utils.toArray(".exp");
    let showingEducation = true;

    gsap.to(eduItems, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    });

    toggle.addEventListener("click", () => {
      showingEducation = !showingEducation;
      indicator.style.left = showingEducation ? "calc(0% + 4px)" : "calc(50% - 4px)";
      gsap.to(indicator, { background: showingEducation ? "var(--edutoggle)" : "var(--exptoggle)", duration: 0.4 });

      const fromItems = showingEducation ? expItems : eduItems;
      const toItems = showingEducation ? eduItems : expItems;

      gsap.to(fromItems, {
        x: -80,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        onComplete: () => {
          fromItems.forEach(el => el.style.display = "none");
          toItems.forEach(el => el.style.display = "block");
          gsap.fromTo(toItems,
            { x: 80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.2,
              ease: "power2.out"
            }
          );

          if (!showingEducation) {
            gsap.fromTo("#expBadge", 
              { opacity: 0, y: 30, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.7)" }
            );
          } else {
            gsap.to("#expBadge", { opacity: 0, y: 30, duration: 0.4, ease: "power1.in" });
          }
        }
      });
    });

    const circle = document.querySelector(".transition-circle");
    const bottomOffset = 20;

    let mm = gsap.matchMedia();

    //DESKTOP
    mm.add("(min-width: 901px)", () => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".education",
          start: "top bottom",
          endTrigger: ".contact",
          end: "bottom bottom",
          scrub: true
        }
      });

      tl.to(circle, {
        top: "0%",
        scale: 3,
        backgroundColor: "var(--education-section)",
        ease: "none"
      });

      tl.to(circle, {
        scale: 1,
        top: `${100 - bottomOffset}%`,
        transform: "translate(-50%, 0%)",
        backgroundColor: "var(--education-section)",
        ease: "none"
      });

    });


    //MOBILE VERSION
    mm.add("(max-width: 900px)", () => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects",
          start: "center bottom",        
          endTrigger: ".contact",
          end: "bottom 80%",     
          scrub: true
        }
      });

      tl.to(circle, {
        top: "0%",
        scale: 4,             
        backgroundColor: "var(--education-section)",
        ease: "none"
      });

      tl.to(circle, {
        scale: 0.6,
        top: `${100 - bottomOffset}%`,
        transform: "translate(-50%, 0%)",
        backgroundColor: "var(--education-section)",
        ease: "none"
      });

    });

    // === NAVBAR SLIDE-IN/OUT ===
    const mobile_navbar = document.getElementById("fixedNav");
    const hammburger = document.getElementById("hammburger");

    function hammburger_change() {
      hammburger.classList.toggle("change");
      mobile_navbar.classList.toggle("show");
    }

    const nav_links = document.querySelectorAll(".fixed-nav a");
    nav_links.forEach(link => {
      link.addEventListener('click', () => {
        hammburger_change();
      })
    })


    mm.add("(min-width: 901px)", () => {

        gsap.set(".fixed-nav", { scaleX: 0, transformOrigin: "center" });
        gsap.set(".nav-links", { opacity: 0 });

        gsap.registerPlugin(ScrollTrigger);

        const navTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",       // when info-section starts coming into view
            end: () => document.body.scrollHeight,
            toggleActions: "play reverse play reverse",
            scrub: false,
          }
        });

        // Step 1: open door
        navTimeline.to(".fixed-nav", {
          duration: 1,
          scaleX: 1,
          ease: "power4.inOut",
        });

        // Step 2: fade in links
        navTimeline.to(".nav-links", {
          duration: 0.6,
          opacity: 1,
          ease: "power2.out",
          stagger: 0.1,
        }, "-=0.3");
    });

    mm.add("(max-width: 900px)", () => {
      gsap.set(".nav-links", { opacity: 1 });
    });

    gsap.fromTo(".bar1, .bar2, .bar3",
      {
        backgroundColor: "var(--text)", // original
      },
      {
        backgroundColor: "white",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top center",
          toggleActions: "play reverse play reverse"
        }
      }
    );
