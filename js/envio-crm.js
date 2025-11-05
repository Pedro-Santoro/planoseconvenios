document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-popup");
  const origemInput = document.getElementById("origem_site");

  if (!form || !origemInput) return;

  // 1️⃣ Captura do domínio atual
  const dominio = window.location.hostname;
  const urlCompleta = window.location.href;
  origemInput.value = dominio;

  // 2️⃣ Define a página de sucesso/obrigado de acordo com o subdomínio
  let urlDestino;

  if (urlCompleta.includes("convenios.planosdesaudephs.com.br")) {
    urlDestino = "https://convenios.planosdesaudephs.com.br/sucesso.html";

  } else if (urlCompleta.includes("empresa.planosdesaudephs.com.br")) {
    urlDestino = "https://empresa.planosdesaudephs.com.br/obrigado.html";

  // 🔹 Exemplo: novos subdomínios (futuro)
  } else if (urlCompleta.includes("blog.planosdesaudephs.com.br")) {
    urlDestino = "https://blog.planosdesaudephs.com.br/obrigado.html";

  } else if (urlCompleta.includes("saude.planosdesaudephs.com.br")) {
    urlDestino = "https://saude.planosdesaudephs.com.br/obrigado.html";

  } else if (urlCompleta.includes("clinicas.planosdesaudephs.com.br")) {
    urlDestino = "https://clinicas.planosdesaudephs.com.br/obrigado.html";

  } else {
    // 🔸 Padrão/fallback
    urlDestino = "https://convenios.planosdesaudephs.com.br/";
  }

  // 3️⃣ Envio do formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = new FormData(form);

    // Função de redirecionamento segura
    const redirecionar = () => window.location.href = urlDestino;

    try {
      const resposta = await fetch(
        "https://crm.planosdesaudebrj.com.br/recebe_leads.php/api/captura",
        {
          method: "POST",
          body: dados,
        }
      );

      console.log("Status do CRM:", resposta.status);
      const texto = await resposta.text();
      console.log("Resposta do CRM:", texto);

      redirecionar();

    } catch (erro) {
      console.error("Erro no envio para o CRM:", erro);
      redirecionar();
    }
  });
});
