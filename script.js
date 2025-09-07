(function () {
	const envelopes = document.querySelectorAll('.envelope');
	const balloonsContainer = document.getElementById('balloonsContainer');
	const acceptBtn = document.getElementById('acceptBtn');

	// Abrir/cerrar sobres con el corazón
	envelopes.forEach((env) => {
		const heartBtn = env.querySelector('.heart-button');
		const closeBtn = env.querySelector('.close-letter');

		function toggleEnvelope(forceOpen) {
			const isOpen = env.classList.contains('open');
			const willOpen = typeof forceOpen === 'boolean' ? forceOpen : !isOpen;

			// Cierra otros sobres al abrir uno (opcional: comentario para desactivar)
			if (willOpen) {
				envelopes.forEach((e) => {
					if (e !== env) {
						e.classList.remove('open');
						e.setAttribute('aria-expanded', 'false');
					}
				});
			}

			env.classList.toggle('open', willOpen);
			env.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
		}

		heartBtn.addEventListener('click', () => toggleEnvelope());
		closeBtn.addEventListener('click', () => toggleEnvelope(false));

		// Accesibilidad por teclado
		heartBtn.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggleEnvelope();
			}
		});
	});

	// Globos al hacer clic en "¡¡Si, Acepto!!"
	acceptBtn.addEventListener('click', () => {
		spawnBalloons(randomInt(10, 20));
		// Micro feedback haptico/visual
		acceptBtn.style.transform = 'translateY(-2px)';
		setTimeout(() => (acceptBtn.style.transform = ''), 160);
	});

	function spawnBalloons(count) {
		for (let i = 0; i < count; i++) {
			const balloon = document.createElement('div');
			const isPurple = Math.random() > 0.5;
			balloon.className = `balloon ${isPurple ? 'purple' : 'yellow'}`;

			const left = randomInt(0, 100);
			const delay = randomFloat(0, 0.6);
			const duration = randomFloat(6.5, 10.5);
			const size = randomInt(26, 44); // ancho base
			const drift = randomInt(-20, 20);

			balloon.style.left = `${left}vw`;
			balloon.style.animationDuration = `${duration}s`;
			balloon.style.animationDelay = `${delay}s`;
			balloon.style.width = `${size}px`;
			balloon.style.height = `${Math.round(size * 1.35)}px`;
			balloon.style.transform = `translateX(${drift}px)`;

			balloonsContainer.appendChild(balloon);

			// Limpieza tras animación
			const total = (delay + duration) * 1000;
			setTimeout(() => {
				if (balloon.parentNode) balloon.parentNode.removeChild(balloon);
			}, total + 200);
		}
	}

	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function randomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}
})();