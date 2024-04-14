gsap.registerPlugin(ScrollTrigger);

// const lenis = new Lenis({
//     duration: 2.3,
//     smoothTouch: true
// });

// lenis.on('scroll', ScrollTrigger.update)

// gsap.ticker.add((time)=>{
//     lenis.raf(time * 1000);
// });

// gsap.ticker.lagSmoothing(0);

// ScrollTrigger.config(
//     {
//         autoRefreshEvents: "load",
//     }
// );

window.addEventListener("resize", resizer);
window.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", function () {
    resizer();
    handleScroll();   
    const myAtropos = Atropos({
        el: '.my-atropos',
    });    
});

function resizer() {
    const headerHeight = document.querySelector("header")?.clientHeight;
    if (headerHeight) {
        document.body.style.setProperty("--header-height", headerHeight + "px");
    }

    const mainBtns = document.querySelectorAll(".main_btn");
    if (mainBtns && mainBtns.length) {
        mainBtns.forEach(btn => {
            const btnWidth = btn?.getBoundingClientRect().width;            
            if (btnWidth) {
                btn.style.setProperty("--btn-width", `${btnWidth.toFixed(2)}px`);
            }
            
            let timeStamp = 0;

            btn.addEventListener("mouseenter", evt => {
                timeStamp = Date.now();
                evt.target.classList.add("active");
                evt.target.classList.remove("inactive");
            });

            btn.addEventListener("mouseleave", evt => {
                if ((Date.now() - timeStamp) < 400) {
                    setTimeout(() => {
                        evt.target.classList.remove("active");
                        evt.target.classList.add("inactive");
                        setTimeout(() => {
                            evt.target.classList.remove("inactive");
                            evt.target.classList.add("reset");
                        }, 400);
                    }, 400 + Date.now() - timeStamp);
                } else {
                    evt.target.classList.remove("active");
                    evt.target.classList.add("inactive");
                    setTimeout(() => {
                        evt.target.classList.add("reset");
                        evt.target.classList.remove("inactive");
                    }, 400);
                }
            });
        });
    }  
}

function handleScroll () {
    if (window.scrollY > 200) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    document.body.style.setProperty("--scrollPercentage", scrollPercentage.toFixed(2) + "%");
    
    const scrollListeners = document.querySelectorAll(".scrollListener");
    if (scrollListeners && scrollListeners.length) {
        scrollListeners.forEach(listener => {
        const scrollPosition = window.scrollY;
        let offset = listener.getBoundingClientRect().top + window.scrollY;
    
        const elementPosition = offset - scrollPosition;        
        const viewportHeight = window.innerHeight;
        const triggerPositionTop = 0.9 * viewportHeight;
        const triggerPositionBottom = 0.2 * viewportHeight;
    
        if (elementPosition < triggerPositionTop && elementPosition > -listener.clientHeight) {
            listener.classList.add("active");
        }
    
        if (elementPosition < triggerPositionBottom && elementPosition > -listener.clientHeight) {
            listener.classList.add("active");
        }
        
        if (elementPosition > viewportHeight || elementPosition < -listener.clientHeight) {
            listener.classList.remove("active");
        }
        })
    }
} 

const homeBannerLiner = document.querySelector(".home_banner .line");
if (homeBannerLiner) {
    gsap.to(homeBannerLiner, {
        width: "100%",
        left: 0,
        right: 0,
        transform: "none",
        scrollTrigger: {
            trigger: homeBannerLiner.parentElement,
            start: "top top",
            end: "bottom top",
            pin: homeBannerLiner.parentElement,
            pinSpacing: true,
            scrub: true,
            // markers: true,
        }
    });
}

const projectTitle = document.querySelector(".projectTitle");
if (projectTitle) {
    gsap.to(projectTitle, {
        opacity: .1,
        scrollTrigger: {
            trigger: projectTitle.parentElement,
            scrub: true,
            start: "top center",
            end: "top top",
            // markers: true,
        }
    })
}