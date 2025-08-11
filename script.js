$(document).ready(function () {
  // --- FUNKTION FÜR DAS HAMBURGER MENÜ-ICON ---
  $(".navbar-toggler").click(function () {
    $("#nav-icon").toggleClass("open");
  });

  // --- FUNKTION FÜR DEN SCROLL-FORTSCHRITTSBALKEN ---
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    $("#progress-bar").css("width", scrollPercent + "%");
  });

  // --- FUNKTION FÜR SMOOTH SCROLLING ---
  $(".nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 85, // 85px ist die Höhe der Navbar
        },
        800 // Dauer der Animation
      );
      
      // Schließt das mobile Menü nach dem Klick (falls offen)
      if ($('.navbar-collapse').hasClass('show')) {
        $('.navbar-toggler').click();
      }
    }
  });
});



// ======================= DYNAMIC PROJECT CAROUSEL (nach Vorbild) =======================
document.addEventListener("DOMContentLoaded", function() {

    const projectDataSource = [
      {
        title: "Titel meines ersten Projekts",
        thumbnail: "https://placehold.co/600x300/333/555?text=Projekt+1",
        description: "Dies ist eine Beschreibung meines ersten Projekts. Hier erkläre ich, was es tut und welche Herausforderung es gab.",
        techStack: ["React", "CSS", "API"],
        demoURL: "#",
        srcURL: "#",
      },
      {
        title: "Ein weiteres cooles Projekt",
        thumbnail: "https://placehold.co/600x300/444/666?text=Projekt+2",
        description: "Die Beschreibung für mein zweites Projekt. Der Fokus lag hier auf einem sauberen Backend.",
        techStack: ["Node.js", "JavaScript"],
        demoURL: "#",
        srcURL: "#",
      },
      {
        title: "Projekt Nummer Drei",
        thumbnail: "https://placehold.co/600x300/555/777?text=Projekt+3",
        description: "Ein kleines, aber feines Projekt, um eine neue Technologie auszuprobieren.",
        techStack: ["Vue.js", "TypeScript"],
        demoURL: "#",
        srcURL: "#",
      },
      {
        title: "Viertes Projekt im Bunde",
        thumbnail: "https://placehold.co/600x300/666/888?text=Projekt+4",
        description: "Hier habe ich mich auf ein ansprechendes und responsives User Interface konzentriert.",
        techStack: ["HTML", "CSS", "Figma"],
        demoURL: "#",
        srcURL: "#",
      },
      {
        title: "Projekt Nummer Fünf",
        thumbnail: "https://placehold.co/600x300/777/999?text=Projekt+5",
        description: "Ein Projekt aus dem universitären Umfeld, das im Team entstanden ist.",
        techStack: ["Java", "SQL"],
        demoURL: "#",
        srcURL: "#",
      },
      {
        title: "Das letzte Projekt",
        thumbnail: "https://placehold.co/600x300/888/aaa?text=Projekt+6",
        description: "Ein Tool zur Automatisierung von Alltagsaufgaben, das mir persönlich sehr hilft.",
        techStack: ["Python", "Docker"],
        demoURL: "#",
        srcURL: "#",
      }
    ];

    const projectsElem = document.querySelector(".project-data");
    const navElem = document.querySelector(".navigation");
    const arrowRight = document.querySelector(".arrow-right");
    const arrowLeft = document.querySelector(".arrow-left");

    if (!projectsElem || !navElem || !arrowRight || !arrowLeft) {
        return;
    }

    const buildTemplate = (template, data) => {
        for (const key in data) {
            const reg = new RegExp(`{${key}}`, "ig");
            template = template.replace(reg, data[key]);
        }
        return template;
    };

    const ProjectCard = function (data) {
        const techStackData = data.techStack.map((tech) => `<span class="stack-badge">${tech}</span>`).join(" ");
        const elem = document.createElement("div");
        elem.classList.add("project-card");
        elem.style.setProperty("--rotation", data.rotation + "deg");
        elem.innerHTML = buildTemplate(
          `<div class='projects-header'>
              <img class="card-img-top" src="{thumbnail}" alt="Projekt-Vorschaubild">
           </div>
           <h5 class="card-title mt-3">{title}</h5>
           <div class='content'>{description}</div>
           <div class='technologies'>${techStackData}</div>
           <div class="card-buttons">
              <a href="{demoURL}" target="_blank" class="btn btn-primary"><i class="fa-solid fa-display"></i> Live Demo</a>
              <a href="{srcURL}" target="_blank" class="btn btn-secondary"><i class="fa-regular fa-file-code"></i> Source Code</a>
          </div>`,
          data
        );
        return elem;
    };

    const rotationAmt = 360 / projectDataSource.length;
    let focused = 0;

    const radius = (400 * 1.2) / (2 * Math.tan(Math.PI / projectDataSource.length));
    const distToEdge = Math.round(Math.sqrt(radius ** 2 - 225 ** 2) + 20);
    projectsElem.style.setProperty("--distance", distToEdge + "px");

    projectDataSource.forEach((project, i) => {
        projectsElem.appendChild(ProjectCard({ ...project, rotation: i * rotationAmt }));
        const navBtn = document.createElement("div");
        navBtn.classList.add("nav-dot");
        navBtn.addEventListener("click", () => { select(i); });
        navElem.appendChild(navBtn);
    });

    let autoRotateTimeout;
    function update(isManual) {
        if (autoRotateTimeout && isManual) clearTimeout(autoRotateTimeout);

        gsap.to(projectsElem, {
            rotationY: -focused * rotationAmt,
            duration: 1,
            ease: "power3.out"
        });
        
        const focusedIndex = ((focused % projectDataSource.length) + projectDataSource.length) % projectDataSource.length;

        document.querySelectorAll(".project-card").forEach((card, i) => {
            if (i === focusedIndex) card.classList.add("focused");
            else card.classList.remove("focused");
        });

        document.querySelectorAll(".nav-dot").forEach((dot, i) => {
            if (i === focusedIndex) dot.classList.add("focused");
            else dot.classList.remove("focused");
        });

        if (!isManual) {
            autoRotateTimeout = setTimeout(() => {
                focused++;
                update(false);
            }, 5000);
        }
    }
    
    function select(index) {
        focused += (index - (((focused % projectDataSource.length) + projectDataSource.length) % projectDataSource.length));
        update(true);
    }
    
    arrowRight.addEventListener("click", () => {
        focused++;
        update(true);
    });

    arrowLeft.addEventListener("click", () => {
        focused--;
        update(true);
    });
    
    update(false);
});