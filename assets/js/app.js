window.onload = () => {
    const targetUrl = "https://www.google.com/";
    const fetchId = id => document.getElementById(id);
    let activePhase = 1;
    let clockTime = 60;

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
                fetchId(`phase-${activePhase}`).style.display = 'none';
                activePhase = btn.getAttribute('data-next');
                fetchId(`phase-${activePhase}`).style.display = 'block';
                
                if (activePhase == 4) {
                    fetchId('header-timer-box').style.visibility = 'hidden';
                    fetchId('main-app-shell').classList.add('completed-state');
                    confetti({
                        particleCount: 200,
                        spread: 100,
                        origin: { y: 0.6 }
                    });
                }
            }, 200);
        };
    });

    fetchId('submit-offer-btn').onclick = () => {
        window.location.href = targetUrl;
    };

    const members = ["Thabo", "Lindiwe", "Johan", "Zanele", "Sipho", "Sarah", "Pieter", "Nthofela", "Lwanga", "Nomvula", "Andy"];
    const amounts = ["R 1,500,000", "R 500,000", "R 1,200,000", "R 880,000", "R 1,000,000", "R 2,000,000"];

    const triggerPopup = () => {
        const box = fetchId('toast-notification');
        fetchId('winner-name').innerText = members[Math.floor(Math.random() * members.length)];
        fetchId('reward-amount').innerText = amounts[Math.floor(Math.random() * amounts.length)];
        box.style.display = 'block';
        setTimeout(() => box.style.display = 'none', 4000);
    };

    setInterval(triggerPopup, 8000);
    setTimeout(triggerPopup, 3000);
};