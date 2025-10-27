document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-popup");
  const origemInput = document.getElementById("origem_site");

  if (!form || !origemInput) return;

  // 1️⃣ Captura do domínio
  const dominio = window.location.hostname;
  origemInput.value = dominio;

  // 2️⃣ Define a página de sucesso/obrigado
  let urlDestino;
  const urlCompleta = window.location.href;
  if (urlCompleta.includes("planoseconvenios")) {
    urlDestino = "https://pedro-santoro.github.io/planoseconvenios/sucesso.html";
  } else if (urlCompleta.includes("planosempresariais")) {
    urlDestino = "https://pedro-santoro.github.io/planosempresariais/obrigado.html";
  } else {
    urlDestino = "https://pedro-santoro.github.io/planosmedicos/";
  }

  // 3️⃣ Envio do formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = new FormData(form);

    // Redirecionamento seguro mesmo se o CRM der problema
    const redirecionar = () => window.location.href = urlDestino;

    try {
      const resposta = await fetch(
        "https://crm.planosdesaudebrj.com.br/recebe_leads.php/api/captura",
        {
          method: "POST",
          body: dados
        }
      );

      // Log para debug
      console.log("Status do CRM:", resposta.status);
      const texto = await resposta.text();
      console.log("Resposta do CRM:", texto);

      // Sempre redireciona
      redirecionar();

    } catch (erro) {
      console.error("Erro no envio para o CRM:", erro);
      // Redireciona mesmo com erro
      redirecionar();
    }
  });
});
