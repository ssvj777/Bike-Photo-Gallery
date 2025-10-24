//Loading Screen Script

window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.classList.add("hidden");
  }, 700);
});

// Scroll to Top Button

const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 333) {
    scrollTop.classList.add("visible");
  } else {
    scrollTop.classList.remove("visible");
  }
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//Navbar Script

let sideNavbar = document.querySelector(".side-navbar");
let showToggle = document.querySelector(".show-navbar");
let showCloseBtn = document.querySelector(".close-navbar");

document.querySelector(".toggle-btn").addEventListener("click", function () {
  sideNavbar.style.left = "0";
  showToggle.style.display = "none";
  showCloseBtn.style.display = "flex";
});

document.querySelector(".x-mark").addEventListener("click", function () {
  sideNavbar.style.left = "-70%";
  showToggle.style.display = "flex";
  showCloseBtn.style.display = "none";
});

// Close the menu when a link is clicked

document.addEventListener("DOMContentLoaded", function () {
  const listcontents = document.querySelectorAll(".side-navbar-list a");

  listcontents.forEach(function (listcontent) {
    listcontent.addEventListener("click", function () {
      sideNavbar.style.left = "-70%";
      showToggle.style.display = "flex";
      showCloseBtn.style.display = "none";
    });
  });
});

// Gallery filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const touchLeft = document.getElementById("touchLeft");
const touchRight = document.getElementById("touchRight");

let currentIndex = 0;
let visibleItems = [];

function updateVisibleItems() {
  visibleItems = Array.from(galleryItems).filter(
    (item) => item.style.display !== "none"
  );
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    updateVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    openLightbox();
  });
});

function openLightbox() {
  const img = visibleItems[currentIndex].querySelector("img");
  lightboxImage.src = img.src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

function prevImage() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
  lightboxImage.src = visibleItems[currentIndex].querySelector("img").src;
  showTouchIndicator("left");
}

function nextImage() {
  currentIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
  lightboxImage.src = visibleItems[currentIndex].querySelector("img").src;
  showTouchIndicator("right");
}

function showTouchIndicator(direction) {
  const indicator = direction === "left" ? touchLeft : touchRight;
  indicator.style.animation = "none";
  indicator.style.opacity = "1";
  indicator.style.transform = "translateY(-50%) scale(1.2)";

  setTimeout(() => {
    indicator.style.animation = "fadeInOut 2s infinite";
    indicator.style.transform = "translateY(-50%) scale(1)";
  }, 200);
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevImage);
lightboxNext.addEventListener("click", nextImage);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("active")) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

lightboxImage.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  },
  { passive: true }
);

lightboxImage.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  const minSwipeDistance = 50;

  // Only process horizontal swipes (ignore vertical scrolling)
  if (
    Math.abs(deltaX) > Math.abs(deltaY) &&
    Math.abs(deltaX) > minSwipeDistance
  ) {
    if (deltaX > 0) {
      prevImage();
    } else {
      nextImage();
    }
  }
}

// Get the current year
const currentYear = new Date().getFullYear();
// Set the current year in the span with id "year"
document.getElementById("year").textContent = currentYear;
