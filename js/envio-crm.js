document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-popup");
  const origemInput = document.getElementById("origem_site");

  if (!form || !origemInput) return; // segurança: se não existir, para aqui

  // 1️⃣ Captura automática do domínio atual
const urlCompleta = window.location.href;

  origemInput.value = dominio;

  // 2️⃣ Define o destino (obrigado.html) com base no domínio
  let urlDestino;
  if (urlCompleta.includes("planoseconvenios")) {
  urlDestino = "https://pedro-santoro.github.io/planoseconvenios/sucesso.html";
} else if (urlCompleta.includes("planosempresariais")) {
  urlDestino = "https://pedro-santoro.github.io/planosempresariais/obrigado.html";
} else {
  urlDestino = "https://pedro-santoro.github.io/planosmedicos/";
}

  // 3️⃣ Envio pro CRM e redirecionamento
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = new FormData(form);

    try {
      const resposta = await fetch("https://crm.planosdesaudebrj.com.br/recebe_leads.php/api/captura", {
        method: "POST",
        body: dados
      });

      if (resposta.ok) {
        window.location.href = urlDestino;
      } else {
        alert("Houve um problema ao enviar. Tente novamente.");
      }
    } catch (erro) {
      console.error("Erro no envio:", erro);
      alert("Erro ao enviar. Verifique sua conexão.");
    }
  });
});
