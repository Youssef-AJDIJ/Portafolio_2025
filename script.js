document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    let lastPlayedVideo = null;
    
    // Mejorar la gestión de videos
    videos.forEach(video => {
        video.muted = true;
        
        // Añadir overlay al hacer hover
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        video.parentElement.appendChild(overlay);
        
        video.addEventListener('play', function() {
            if (lastPlayedVideo && lastPlayedVideo !== video) {
                lastPlayedVideo.pause();
            }
            lastPlayedVideo = video;
            overlay.style.opacity = '0';
        });
        
        video.addEventListener('pause', function() {
            overlay.style.opacity = '1';
        });
    });

    // Optimización de rendimiento
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.pause();
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '50px'
    });

    videos.forEach(video => videoObserver.observe(video));

    // Añadir animaciones suaves al scroll
    const cards = document.querySelectorAll('.machine-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => cardObserver.observe(card));

    // Videos de ejemplo (aquí puedes sustituir con tus URLs de videos reales)
    const videosMap = {
        "Mutoh ValueJet": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "Summa Plotter": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "CNC Yeming": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "Konica Minolta": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "Bodor Láser": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "Paneles LED": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    };

    // Obtener elementos del DOM
    const modal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const closeModal = document.querySelector(".close-modal");
    const videoContainers = document.querySelectorAll(".video-container");

    // Funcionalidad para abrir el modal con el video correspondiente
    videoContainers.forEach(container => {
        container.addEventListener("click", function() {
            const machineName = this.nextElementSibling.querySelector("h3").textContent;
            if (videosMap[machineName]) {
                videoFrame.src = videosMap[machineName];
                modal.style.display = "flex";
            }
        });
    });

    // Cerrar el modal
    closeModal.addEventListener("click", function() {
        videoFrame.src = "";
        modal.style.display = "none";
    });

    // Cerrar el modal haciendo clic fuera del contenido
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            videoFrame.src = "";
            modal.style.display = "none";
        }
    });
});