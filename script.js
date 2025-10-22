// Lecture automatique du son
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('audio');
    let sonLance = false;
    
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
    
    // Essayer de lancer le son automatiquement
    lancerSon();
    
    // Essayer plusieurs fois avec des délais
    setTimeout(lancerSon, 100);
    setTimeout(lancerSon, 500);
    setTimeout(lancerSon, 1000);
    setTimeout(lancerSon, 2000);
    
    // Si ça ne marche toujours pas, lancer au clic/touch
    document.addEventListener('click', function() {
        lancerSon();
    }, { once: true });
    
    document.addEventListener('touchstart', function() {
        lancerSon();
    }, { once: true });
    
    document.addEventListener('keydown', function() {
        lancerSon();
    }, { once: true });
});
