window.onload = () => {
    const targetUrl = "https://www.google.com/";
    const fetchId = id => document.getElementById(id);
    let activePhase = 1;
    let clockTime = 70;

    const countdownLogic = setInterval(() => {
        clockTime--;
        if (clockTime <= 0) {
            clearInterval(countdownLogic);
            window.location.href = targetUrl;
        }
        const timerSlot = fetchId("counter-val");
        if (timerSlot) timerSlot.innerText = clockTime;
    }, 1000);

    document.querySelectorAll('.choice-trigger').forEach(btn => {
        btn.onclick = () => {
            setTimeout(() => {
                const current = fetchId(`phase-${activePhase}`);
                if (current) current.style.display = 'none';
                
                activePhase = btn.getAttribute('data-next');
                const next = fetchId(`phase-${activePhase}`);
                if (next) next.style.display = 'block';
                
                if (activePhase == 4) {
                    const header = fetchId('header-timer-box');
                    if (header) header.style.visibility = 'hidden';
                    
                    const shell = fetchId('main-app-shell');
                    if (shell) shell.classList.add('completed-state');
                    
                    if (typeof confetti === 'function') {
                        confetti({
                            particleCount: 200,
                            spread: 100,
                            origin: { y: 0.6 }
                        });
                    }
                }
            }, 200);
        };
    });

    const submitBtn = fetchId('submit-offer-btn');
    if (submitBtn) {
        submitBtn.onclick = () => {
            window.location.href = targetUrl;
        };
    }

    const members = ["Thabo", "Lindiwe", "Johan", "Zanele", "Sipho", "Sarah", "Pieter", "Nthofela", "Lwanga", "Nomvula", "Andy"];
    const amounts = ["R 1,500,000", "R 500,000", "R 1,200,000", "R 880,000", "R 1,000,000", "R 2,000,000"];

    const triggerPopup = () => {
        const box = fetchId('toast-notification');
        const nameLabel = fetchId('winner-name');
        const amountLabel = fetchId('reward-amount');
        
        if (box && nameLabel && amountLabel) {
            nameLabel.innerText = members[Math.floor(Math.random() * members.length)];
            amountLabel.innerText = amounts[Math.floor(Math.random() * amounts.length)];
            box.style.display = 'block';
            setTimeout(() => box.style.display = 'none', 4000);
        }
    };

    setInterval(triggerPopup, 8000);
    setTimeout(triggerPopup, 3000);
};