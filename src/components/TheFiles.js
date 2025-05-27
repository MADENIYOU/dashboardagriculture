// components/TheFiles.js

import { saveAs } from "file-saver";

export const generateCultureFicheTxt = (culture) => {
  const content = `
Fiche Culture : ${culture.nom_culture}

🌍 Région : ${culture.region} , ${culture.type}
🌞 Saison idéale : ${culture.saison}
💧 Besoin en eau : ${culture.besoin_eau}
📌 Conseil : ${culture.conseil}
📊 Production annuelle : ${culture.production} M/Ans

📍 Contexte au Sénégal : 
${culture.description}
`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `Fiche_${culture.nom_culture}.txt`);
};

// generateCultureFichePDF.js
import { jsPDF } from "jspdf";

export const generateCultureFichePDF = ({
  nom_culture,
  region,
  saison,
  conseil,
  besoin_eau,
  production,
  description,
  type
}) => {
  const doc = new jsPDF();

  // En-tête
  doc.setFontSize(18);
  doc.text(`Fiche Culture : ${nom_culture}`, 10, 15);

  // Contenu - chaque ligne est un élément du tableau
  doc.setFontSize(12);
  doc.text([
    `Nom de la culture : ${nom_culture}`,
    `Type : ${type}`,
    `Région : ${region}`,
    `Saison idéale : ${saison}`,
    `Besoins en eau : ${besoin_eau}`,
    `Production annuelle : ${production} tonnes/ha/an`,
    "",
    "Description :",
    description || "Aucune description disponible.",
    "",
    "Conseils :",
    conseil || "Aucun conseil disponible."
  ], 10, 30);

  // Télécharger le PDF
  doc.save(`Fiche_${nom_culture}.pdf`);
};