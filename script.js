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
          scrollTop: $(hash).offset().top - 85,
        },
        800
      );
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
        title: "Lol Sale Alarm",
        thumbnail: "img/skinsale.jpg",
        description: "Ein anpassbares Desktop-Tool, das die wöchentlichen Skin-Sales des bekannten Online-Spiels League of Legends überwacht und per Desktop-Benachrichtigung informiert, sobald ein Skin von der Wunschliste im Angebot ist.",
        techStack: ["Python", "Tkinter"],
        demoURL: "#",
        srcURL: "https://github.com/Linh-Linh2/LoLSaleAlarm",
      },
      {
        title: "Schulressourcenverwalter",
        thumbnail: "img/board-5599231_1280.png",
        description: "Im Schulressourcenverwalter-Projekt übernahm ich die Umsetzung von Funktionen zur Kurseinschreibung und Ressourcenverwaltung in enger Abstimmung mit realen Anforderungen und einem echten Kunden. Das Projekt dauerte etwa 1 Jahr an.",
        techStack: ["TypeScript", "HTML", "CSS","Vue.js","PHP","MySQL","Laravel"],
        demoURL: "#",
        srcURL: "#",
      },
      {
        title: "Binäruhr",
        thumbnail: "img/binäruhr.png",
        description: "Dieses Projekt entstand 2024 im Rahmen des Moduls 'Systemnahe Programmierung' als 2er-Gruppenarbeit und wurde mit der Note 1.0 bewertet. Ziel war es, eine Binäruhr zu entwickeln, die sowohl die Hardware- als auch die Softwareentwicklung umfasst. Die Uhr zeigt die aktuelle Zeit im Binärformat mittels LEDs an und wird von einem Mikrocontroller gesteuert. Neben dem Entwurf und Fräsen der Leiterplatte lag ein besonderer Fokus auf der effizienten und robusten Programmierung, einschließlich Tasterentprellung und PWM-Steuerung der Anzeige. Das Ergebnis ist eine funktionale, energiesparende und eigenständige Binäruhr, die sich durch ihr kompaktes Design und ihre Zuverlässigkeit auszeichnet.",
        techStack: ["C++", "KiCad"],
        demoURL: "#",
        srcURL: "https://github.com/Linh-Linh2/binaer-uhr",
      },
      {
        title: "Mensch Ärgere Dich Nicht",
        thumbnail: "img/spielfeld1.png",
        description: "Diese Projekt simuliert das bekannte Brettspiel 'Mensch Ärgere Dich Nicht' in Java und enstand in 2022 als Abschlussprojekt des Moduls 'Anwendungsorientierte Programmierung' im Rahmen einer Gruppenarbeit. Das Projekt erhielt eine Bewertung von 1,7. Es können bis zu vier menschliche Spieler teilnehmen. Sind weniger als vier Spieler beteiligt, übernimmt der Computer (Bot) die restlichen Spielerplätze. Die Bots agieren mit einer einfachen, aber sinnvollen Strategie. Das Spiel bietet eine grafische Benutzeroberfläche (GUI) und einen Testmodus, mit dem alle Spielfeatures gezielt überprüft werden können.",
        techStack: ["Java", "AWT", "Swing"],
        demoURL: "#",
        srcURL: "https://github.com/Linh-Linh2/mensch-aegere-dich-nicht",
      },
      {
        title: "Fullduplex 8-Bit Nachrichtenübertragung",
        thumbnail: "img/hwp7.jpg",
        description: "Ziel dieses Projekts war die Implementierung einer voll-duplexfähigen 8-Bit-Nachrichtenübertragung über Kabel zwischen zwei Systemen. Die Kommunikation erfolgt paketbasiert, wobei jedes Zeichen in zwei 4-Bit-Pakete aufgeteilt und mit Start-/End-Bits sowie Escape-Bits übertragen wird. Zur Fehlererkennung wird eine CRC8-Prüfsumme verwendet. Das Projekt enstand im Rahmen des Moduls 'Hardwarepraktikum' als Gruppenarbeit zweier Bachelorstudenten.",
        techStack: ["C++"],
        demoURL: "#",
        srcURL: "https://github.com/Linh-Linh2/8bit-fullduplex-nachrichtenaustausch",
      },
      {
        title: "In Bearbeitung",
        thumbnail: "https://placehold.co/600x300/888/aaa?text=nochleer",
        description: "Textextext text text",
        techStack: ["Python", "Docker"],
        demoURL: "#",
        srcURL: "#"
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
              <a ${data.demoURL !== "#" ? `href="{demoURL}"` : ''} target="_blank" class="btn btn-primary ${data.demoURL === "#" ? 'disabled' : ''}"><i class="fa-solid fa-display"></i> Live Demo</a>
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

document.addEventListener("DOMContentLoaded", function() {
    const toTopBtn = document.getElementById("to-top-btn");

    if(toTopBtn) {
        toTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});