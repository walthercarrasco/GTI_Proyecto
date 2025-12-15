const form = document.getElementById('ticketForm');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const subject = document.getElementById('subject').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!subject || !description) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
    }

    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span>Enviando...';

    try {
        const response = await fetch('http://localhost:8080/projects/gestion-de-tickets/issues.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                issue: {
                    subject: subject,
                    description: description
                }
            })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('✅ Ticket creado exitosamente', 'success');
            form.reset();
        } else {
            showMessage('❌ Error al crear el ticket: ' + (data.error || 'Error desconocido'), 'error');
        }
    } catch (error) {
        showMessage('❌ Error de conexión: ' + error.message, 'error');
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar Ticket';
    }
});

// Validación en tiempo real
document.getElementById('subject').addEventListener('input', function() {
    if (this.value.length > 0) {
        this.style.borderColor = '#4CAF50';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

document.getElementById('description').addEventListener('input', function() {
    if (this.value.length > 0) {
        this.style.borderColor = '#4CAF50';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

