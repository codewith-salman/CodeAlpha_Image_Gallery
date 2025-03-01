document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const images = document.querySelectorAll(".gallery img");

    searchInput.addEventListener("keyup", function () {
        let searchText = searchInput.value.toLowerCase();
        images.forEach(img => {
            let altText = img.alt.toLowerCase();
            img.classList.toggle("hidden", !altText.includes(searchText));
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            images.forEach(img => {
                if (category === "all" || img.getAttribute("data-category") === category) {
                    img.classList.remove("hidden");
                } else {
                    img.classList.add("hidden");
                }
            });
        });
    });

    // Lightbox Setup
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <img class="lightbox-img" src="" alt="">
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentIndex = 0;
    let visibleImages = [];

    // Function to update visible images (filtered)
    function updateVisibleImages() {
        visibleImages = Array.from(document.querySelectorAll(".gallery img:not(.hidden)"));
    }

    images.forEach(img => {
        img.addEventListener("click", function () {
            updateVisibleImages(); // Update images when clicking (after filtering)
            currentIndex = visibleImages.indexOf(this);
            showLightbox(currentIndex);
        });
    });

    function showLightbox(index) {
        lightbox.style.display = "flex";
        lightboxImg.src = visibleImages[index].src;
    }

    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
        showLightbox(currentIndex);
    });

    nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % visibleImages.length;
        showLightbox(currentIndex);
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            lightbox.style.display = "none";
        }
    });
});
