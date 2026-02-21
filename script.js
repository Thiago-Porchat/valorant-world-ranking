function carregarPlanilha(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const tabela = document.getElementById("tabela");
      tabela.innerHTML = "";

      const linhas = data.trim().split("\n");

      linhas.forEach((linha, index) => {
        const tr = document.createElement("tr");
        const colunas = linha.split(",");

        if (index === 0) {
          // Cabeçalho
          const thTeam = document.createElement("th");
          thTeam.textContent = "Time";
          thTeam.style.textAlign = "left";
          tr.appendChild(thTeam);

          const thPoints = document.createElement("th");
          thPoints.textContent = "Pontos";
          tr.appendChild(thPoints);
        } else {
          // Coluna Time + Bandeira
            const tdTeam = document.createElement("td");
            tdTeam.style.display = "flex";
            tdTeam.style.alignItems = "center";

            const codigoPais = colunas[2].trim().toLowerCase();
            console.log("Código país:", codigoPais);

            const bandeira = document.createElement("img");
            bandeira.src = `https://flagcdn.com/24x18/${codigoPais}.png`;
            bandeira.alt = `Bandeira ${codigoPais}`;
            bandeira.style.marginRight = "8px";
            bandeira.style.height = "18px";
            bandeira.style.width = "24px";

            tdTeam.appendChild(bandeira);
            tdTeam.appendChild(document.createTextNode(colunas[0]));
            tr.appendChild(tdTeam);


          // Coluna Pontos
          const tdPoints = document.createElement("td");
          tdPoints.textContent = colunas[1];
          tr.appendChild(tdPoints);
        }

        // Classificação top 3
        if (index === 1) tr.classList.add("top1");
        if (index === 2) tr.classList.add("top2");
        if (index === 3) tr.classList.add("top3");

        tabela.appendChild(tr);
      });
    });
}