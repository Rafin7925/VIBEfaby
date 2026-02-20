let noClickCount = {
    screen1: 0,
    screen3: 0,
    iDont: 0
};

const maxAttempts = 3;

function moveButton(button) {
    const currentScreen = document.querySelector('.screen.active').id;
    
    if (currentScreen === 'screen1') noClickCount.screen1++;
    if (currentScreen === 'screen3') noClickCount.screen3++;

    button.classList.add('moving');
    setTimeout(() => {
        button.classList.remove('moving');
    }, 600);

    if (currentScreen === 'screen3' && noClickCount.screen3 >= maxAttempts) {
        showModal('modal4');
    } else if (currentScreen === 'screen1' && noClickCount.screen1 >= maxAttempts) {
        showModal('modal1');
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function goToScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById('screen' + screenNumber);
    if (targetScreen) targetScreen.classList.add('active');

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.style.display = 'none';
    });

    // Reset counters for the new screen logic
    if (screenNumber === 3) noClickCount.screen3 = 0;
    if (screenNumber === 4) noClickCount.iDont = 0;

    window.history.pushState({screen: screenNumber}, `Screen ${screenNumber}`, `#screen${screenNumber}`);
}

function handleIDontClick() {
    noClickCount.iDont++;
    if (noClickCount.iDont < 3) {
        showModal('modal2');
    } else {
        showModal('modal3');
    }
}

function logResponse(response) {
    // Static hosting safe logging
    console.log('User Response:', response);
}

// Close modals on escape key or outside click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});