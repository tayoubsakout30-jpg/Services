document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        setActiveLink();
    });
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    function setActiveLink() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>تم إرسال طلبك بنجاح!</h3>
                <p>شكرًا لك ${formData.name}، سنقوم بالاتصال بك على ${formData.email} في أقرب وقت ممكن.</p>
            `;
            
            contactForm.parentNode.insertBefore(successMsg, contactForm);
            contactForm.style.display = 'none';
            
            contactForm.reset();
            
            setTimeout(() => {
                successMsg.style.opacity = '0';
                setTimeout(() => {
                    successMsg.remove();
                    contactForm.style.display = 'block';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 500);
            }, 5000);
        }, 2000);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px;
            border-radius: var(--radius);
            text-align: center;
            animation: fadeIn 0.5s ease;
            box-shadow: var(--shadow);
        }
        
        .success-message i {
            font-size: 4rem;
            margin-bottom: 20px;
            display: block;
        }
        
        .success-message h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: white;
        }
        
        .success-message p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});