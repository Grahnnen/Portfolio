const experienceData = {
  1: {
    title: "Maskinoperatör",
    description:
      "Arbetade med att övervaka och underhålla produktionsmaskiner på Fazer mellan 2022 och 2025. Ansvarade för kvalitetskontroll och säkerhetsrutiner.",
  },
  2: {
    title: "Värnplikten",
    description:
      "Gjorde värnplikten i Enköping som radiolänksoldat. Jag va förare och kranbilsoperatör.",
  },
  3: {
    title: "UX/UI-design",
    description:
      "Genomförde Komvuxkurs i UX/UI-design där jag lärde mig grunderna i användarcentrerad design och prototypframställning.",
  },
  4: {
    title: "Teknikprogrammet",
    description:
      "Studerade på Dragonskolan med fokus på teknik och programmering, vilket lade grunden för mitt intresse för webbutveckling.",
  },
  7: {
    title: "Spelprogrammering",
    description:
      "Hobbyverksamhet sedan 2013 där jag skapat egna spel och experimenterat med C# i Unity-motorn.",
  },
  8: {
    title: "Resor och vandring",
    description:
      "Gillar att vara ute i naturen mycket och tälta. I somras besökte jag Lofoten i Norge där vi tältade.",
  },
  9: {
    title: "Fordon",
    description:
      "Tycker det är kul att skruva och försöka restaurera upp äldre bilar.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".experience-list li");
  const infoBox = document.querySelector(".info-box");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      const info = experienceData[id];

      if (window.innerWidth > 768) {
        // DESKTOP
        infoBox.innerHTML = `<h3>${info.title}</h3><p>${info.description}</p>`;
        infoBox.classList.add("visible");
      } else {
        // MOBIL
        let mobileBox = item.nextElementSibling;

        if (!mobileBox || !mobileBox.classList.contains("info-box")) {
          mobileBox = document.createElement("div");
          mobileBox.className = "info-box";
          item.insertAdjacentElement("afterend", mobileBox);
        }

        if (mobileBox.classList.contains("visible")) {
          // === STÄNG ===
          mobileBox.style.maxHeight = mobileBox.scrollHeight + "px"; // start
          void mobileBox.offsetHeight; // reflow
          mobileBox.style.maxHeight = "0"; // animera

          mobileBox.addEventListener(
            "transitionend",
            function handler(e) {
              if (e.propertyName === "max-height") {
                mobileBox.classList.remove("visible");
                mobileBox.style.display = "none"; // ta bort visuellt → inget hack, inget mellanrum
                mobileBox.removeEventListener("transitionend", handler);
              }
            }
          );
        } else {
          // === ÖPPNA ===
          mobileBox.innerHTML = `<h3>${info.title}</h3><p>${info.description}</p>`;
          mobileBox.style.display = "block"; // se till att den finns
          mobileBox.style.maxHeight = "0"; // börja stängd
          void mobileBox.offsetHeight; // reflow
          mobileBox.classList.add("visible");
          mobileBox.style.maxHeight = mobileBox.scrollHeight + "px"; // expandera
        }
      }
    });
  });

  // DESKTOP: klick utanför stänger rutan
  document.addEventListener("click", (e) => {
    if (window.innerWidth > 768) {
      if (
        !infoBox.contains(e.target) &&
        ![...items].some((i) => i.contains(e.target))
      ) {
        infoBox.classList.remove("visible");
      }
    }
  });
});

// ===== PARALLAX =====
window.addEventListener("scroll", function () {
  const scrolled = window.scrollY;
  document.body.style.setProperty("--parallax", -(scrolled * 0.3) + "px");
});
