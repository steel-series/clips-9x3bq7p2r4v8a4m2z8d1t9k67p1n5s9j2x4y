// Gestion du bouton Watch Clips et effets de flash
document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('start-screen');
    const content = document.getElementById('content');
    const watchClipsBtn = document.getElementById('watch-clips-btn');
    const audio = document.getElementById('audio-player');
    const image = document.getElementById('main-image');
    
    let sonLance = false;
    let flashInterval;
    
    // S'assurer que l'audio est prêt
    audio.load();
    
    // Fonction pour lancer le son
    function lancerSon() {
        if (!sonLance) {
            audio.play().then(function() {
                sonLance = true;
                console.log('Son lancé avec succès');
            }).catch(function(error) {
                console.log('Erreur de lecture:', error);
            });
        }
    }
    
    // Fonction pour créer un effet de flash INTENSE
    function creerFlash() {
        const flashTypes = ['flash-white', 'flash-red', 'flash-blue', 'flash-green', 'flash-purple'];
        const randomFlash = flashTypes[Math.floor(Math.random() * flashTypes.length)];
        
        image.classList.add(randomFlash);
        
        setTimeout(function() {
            image.classList.remove(randomFlash);
        }, 100); // Flash plus court
    }
    
    // Fonction pour créer des flashs multiples rapides
    function creerFlashMultiple() {
        for (let i = 0; i < 3; i++) {
            setTimeout(function() {
                creerFlash();
            }, i * 50); // Flashs rapprochés
        }
    }
    
    // Fonction pour démarrer les effets de flash RAPIDES
    function demarrerFlash() {
        // Flashs normaux très rapides
        flashInterval = setInterval(creerFlash, Math.random() * 300 + 100); // Flash toutes les 0.1 à 0.4 secondes
        
        // Flashs multiples occasionnels
        setInterval(function() {
            if (Math.random() < 0.3) { // 30% de chance
                creerFlashMultiple();
            }
        }, 2000);
    }
    
    // Fonction pour arrêter les effets de flash
    function arreterFlash() {
        if (flashInterval) {
            clearInterval(flashInterval);
        }
    }
    
    // Gestion du clic sur le bouton Watch Clips
    watchClipsBtn.addEventListener('click', function() {
        // Masquer l'écran de démarrage
        startScreen.style.display = 'none';
        
        // Afficher le contenu
        content.style.display = 'block';
        
        // Lancer le son
        lancerSon();
        
        // Démarrer les effets de flash IMMÉDIATEMENT
        setTimeout(demarrerFlash, 200); // Commencer les flash après 0.2 seconde
        
        console.log('Watch Clips activé !');
    });
    
    // Gestion des erreurs d'image
    image.addEventListener('error', function() {
        this.style.display = 'none';
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        padding: 40px; background: rgba(255, 0, 0, 0.1); border-radius: 10px; 
                        border: 2px dashed #ff6b6b; color: #ff6b6b; text-align: center;">
                <p style="font-size: 1.2rem;">⚠️ Image non trouvée</p>
                <p>Veuillez placer le fichier "site.png" dans le même dossier que ce site.</p>
            </div>
        `;
        content.appendChild(errorDiv);
    });
    
    // Gestion des erreurs audio
    audio.addEventListener('error', function() {
        console.log('Erreur lors du chargement du fichier audio');
        const errorMsg = document.createElement('div');
        errorMsg.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); 
                        padding: 20px; background: rgba(255, 0, 0, 0.1); border-radius: 10px; 
                        border: 2px dashed #ff6b6b; color: #ff6b6b; text-align: center;">
                <p>⚠️ Fichier audio non trouvé</p>
                <p>Veuillez placer le fichier "site.mp3" dans le même dossier que ce site.</p>
            </div>
        `;
        content.appendChild(errorMsg);
    });
});
