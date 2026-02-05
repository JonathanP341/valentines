// ============================================
// DIALOGUE TREE CONFIGURATION
// ============================================
// You can modify the dialogue here:
const DIALOGUE = {
    initialQuestion: "Will you be my \nvalentine!?!?",
    primaryNoResponse: "Too bad! \nWill you be my \nvalentine?",
    secondaryNoResponse: "Good try buddy!\n Will you be my \nvalentine?",
    tertiaryNoResponse: "No choice now!\n NOW will you be \nmy valentine?",
    yesResponse: "OMG OMG OMG \nTY I LUV U SO \nMUCH!!!!",
    successMessage: "Here are some of my favourite moments of ours and I can't wait to make so many more!",
    valentinesMessage: "HAPPY VALENTINES DAY VICTORIA"
};

// Number of times "No" can be clicked before button is removed
const MAX_NO_CLICKS = 3;

// Image order for the gallery
const GALLERY_IMAGES = [
    'montreal.jpg',
    'carry.jpg',
    'tiff.jpg',
    'hoco.jpg',
    'new_york.jpg'
];

// ============================================
// GAME STATE
// ============================================
let noClickCount = 0;
let gameState = 'initial'; // 'initial', 'no', 'yes'

// ============================================
// DOM ELEMENTS
// ============================================
const enemyText = document.getElementById('enemyText');
const enemySpeech = document.getElementById('enemySpeech');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const playerContainer = document.getElementById('playerContainer');
const successContainer = document.getElementById('successContainer');
const imageGallery = document.getElementById('imageGallery');
const successMessageBox = document.getElementById('successMessageBox');

// ============================================
// EVENT LISTENERS
// ============================================
yesBtn.addEventListener('click', handleYes);
noBtn.addEventListener('click', handleNo);

// ============================================
// FUNCTIONS
// ============================================
function handleYes() {
    gameState = 'yes';
    
    // Change bear to happy bear
    const enemyPokemon = document.getElementById('enemyPokemon');
    enemyPokemon.src = 'happy_bear.png';
    enemyPokemon.classList.add('happy');
    
    // Update enemy text (with line break support)
    enemyText.innerHTML = DIALOGUE.yesResponse.replace(/\n/g, '<br>');
    
    // Hide only miffy and her options (keep bear visible)
    playerContainer.style.display = 'none';
    
    // Show success container
    successContainer.style.display = 'flex';
    
    // Create image gallery
    createImageGallery();
}

function handleNo() {
    noClickCount++;
    gameState = 'no';
    
    // Update enemy text based on which "No" click this is (with line break support)
    let responseText;
    if (noClickCount === 1) {
        responseText = DIALOGUE.primaryNoResponse;
    } else if (noClickCount === 2) {
        responseText = DIALOGUE.secondaryNoResponse;
    } else {
        responseText = DIALOGUE.tertiaryNoResponse;
    }
    enemyText.innerHTML = responseText.replace(/\n/g, '<br>');
    
    // After the second \"No\", change bear to angry_bear and keep it that way
    if (noClickCount >= 2) {
        const enemyPokemon = document.getElementById('enemyPokemon');
        enemyPokemon.src = 'angry_bear.png';
        enemyPokemon.classList.add('angry');
    }
    
    // If max clicks reached, remove No button
    if (noClickCount >= MAX_NO_CLICKS) {
        noBtn.style.display = 'none';
    }
}

function createImageGallery() {
    // Clear any existing content
    imageGallery.innerHTML = '';
    
    // Add success message above images (below bear)
    const successMsg = document.createElement('h2');
    successMsg.className = 'success-message';
    successMsg.textContent = DIALOGUE.successMessage;
    imageGallery.appendChild(successMsg);
    
    // Create images with arrows between them
    GALLERY_IMAGES.forEach((imageName, index) => {
        // Create image
        const img = document.createElement('img');
        img.src = imageName;
        img.alt = `Memory ${index + 1}`;
        img.className = 'gallery-image';
        imageGallery.appendChild(img);
        
        // Add arrow between images (not after the last one)
        if (index < GALLERY_IMAGES.length - 1) {
            const arrow = document.createElement('img');
            arrow.src = 'arrow.png';
            arrow.alt = 'Arrow';
            arrow.className = 'gallery-arrow';
            imageGallery.appendChild(arrow);
        }
    });
    
    // Update valentines message
    const valentinesMsg = successContainer.querySelector('.valentines-message');
    if (valentinesMsg) {
        valentinesMsg.textContent = DIALOGUE.valentinesMessage;
    }
}

// Initialize (with line break support)
enemyText.innerHTML = DIALOGUE.initialQuestion.replace(/\n/g, '<br>');
