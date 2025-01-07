// Navbar Interactivity
(function () {
  const navLinks = document.querySelectorAll("nav ul li a");
  const navMenu = document.querySelector("nav ul");
  const menuToggle = document.querySelector(".menu-toggle");

  if (navLinks.length && navMenu && menuToggle) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.forEach((nav) => nav.classList.remove("active"));
        link.classList.add("active");

        // Close the menu when a link is clicked
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      });
    });

    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Highlight active link on scroll
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section");
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 70;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(sectionId)) {
              link.classList.add("active");
            }
          });
        }
      });
    });

    // Ensure menu is closed on large screens
    const handleResize = () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  }
})();

// Timer Calculation
(function () {
  const updateTimer = () => {
    const startDate = new Date("2023-05-23T00:00:00");
    const now = new Date();
    const elapsedTime = now - startDate;

    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement && hoursElement && minutesElement && secondsElement) {
      daysElement.textContent = days;
      hoursElement.textContent = hours;
      minutesElement.textContent = minutes;
      secondsElement.textContent = seconds;
    }
  };

  setInterval(updateTimer, 1000);
})();

// Love Percentage Calculator
(function () {
  const calculateLovePercentage = () => {
    const yourBirthday = document.getElementById("your-birthday").value;
    const partnerBirthday = document.getElementById("partner-birthday").value;

    if (yourBirthday && partnerBirthday) {
      const yourDate = new Date(yourBirthday);
      const partnerDate = new Date(partnerBirthday);

      if (isNaN(yourDate.getTime()) || isNaN(partnerDate.getTime())) {
        document.getElementById("result").textContent =
          "Tanggal lahir tidak valid!";
        return;
      }

      const diffInDays = Math.abs(
        (yourDate - partnerDate) / (1000 * 60 * 60 * 24)
      );
      const randomFactor = Math.random() * 50;
      const percentage =
        Math.abs(100 - ((diffInDays % 100) + randomFactor)) % 100;
      const roundedPercentage = Math.round(percentage);

      const percentageElement = document.getElementById("percentage");
      percentageElement.textContent = "Loading...";
      percentageElement.classList.add("loading");

      setTimeout(() => {
        percentageElement.textContent = `${roundedPercentage}%`;
        percentageElement.classList.remove("loading");

        const message =
          roundedPercentage <= 50
            ? `Kecocokan kalian ${roundedPercentage}%. Ada kecocokan, tapi mungkin perlu usaha lebih.`
            : `Kecocokan kalian ${roundedPercentage}%. Ada kecocokan, semoga berjodoh!`;

        document.getElementById("result").textContent = message;
      }, 2000);
    } else {
      document.getElementById("result").textContent =
        "Harap masukkan kedua tanggal lahir!";
    }
  };

  const calculateButton = document.getElementById("calculate-button");
  if (calculateButton) {
    calculateButton.addEventListener("click", calculateLovePercentage);
  }
})();

// Comment Section Interactivity
(function () {
  const blockedWords = ["kasar", "kotor", "jelek", "tidak pantas"];

  // Filter blocked words
  const filterMessage = (message) => {
    const regex = new RegExp(`\\b(${blockedWords.join("|")})\\b`, "gi");
    return message.replace(regex, "***");
  };

  // Get relative time string (e.g., "baru saja", "2 menit yang lalu")
  const getRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "baru saja";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} bulan yang lalu`;
    return `${Math.floor(diffInSeconds / 31536000)} tahun yang lalu`;
  };

  // Get Google profile mock data
  const getGoogleProfile = () => ({
    name: "Stranger",
    photo: "https://via.placeholder.com/50",
  });

  // Submit comment
  const submitComment = () => {
    const nameInput = document.getElementById("name").value.trim();
    let message = document.getElementById("message").value.trim();
    message = filterMessage(message);

    const googleProfile = getGoogleProfile();
    const name = nameInput || googleProfile.name;
    const profilePhoto = googleProfile.photo;

    if (name && message) {
      const commentSection = document.getElementById("comments-section");
      const now = new Date();

      // Create comment element
      const comment = document.createElement("div");
      comment.className = "comment";
      comment.innerHTML = `
        <img src="${profilePhoto}" alt="Profile" class="profile-pic" />
        <strong class="comment-name">${name}</strong>
        <p class="comment-message">${message}</p>
        <span class="comment-time">${getRelativeTime(now)}</span>
      `;

      commentSection.appendChild(comment);
      commentSection.scrollLeft = commentSection.scrollWidth;

      document.getElementById("name").value = "";
      document.getElementById("message").value = "";

      const totalComments = document.getElementById("total-comments");
      totalComments.textContent = commentSection.childElementCount;
    } else {
      alert("Harap isi nama dan ucapan!");
    }
  };

  // Update relative time periodically
  const updateCommentTimes = () => {
    const times = document.querySelectorAll(".comment-time");
    const now = new Date();
    times.forEach((timeElement) => {
      const originalTime = new Date(timeElement.getAttribute("data-time"));
      timeElement.textContent = getRelativeTime(originalTime);
    });
  };

  // Attach event listener to submit button
  const submitButton = document.getElementById("submit-comment");
  if (submitButton) {
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      submitComment();
    });
  }

  // Periodically update relative times
  setInterval(updateCommentTimes, 60000); // Update every minute
})();
