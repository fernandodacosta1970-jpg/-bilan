export async function sendReportEmail({
  to,
  clientName,
  reportUrl,
  trackingUrl,
  month,
  year,
}: {
  to: string;
  clientName: string;
  reportUrl: string;
  trackingUrl: string;
  month: number;
  year: number;
}) {
  const MONTHS = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];

  const html = `
    <div style="font-family: sans-serif; color: #1B2A4A; max-width: 480px;">
      <p>Bonjour,</p>
      <p>Le bilan de ${MONTHS[month - 1]} ${year} pour <strong>${clientName}</strong> est disponible.</p>
      <p>
        <a href="${reportUrl}" style="display: inline-block; background: #D9A62E; color: #1B2A4A; padding: 12px 20px; text-decoration: none; font-weight: bold; border-radius: 4px;">
          Consulter le bilan
        </a>
      </p>
      <img src="${trackingUrl}" width="1" height="1" alt="" style="display:none;" />
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
            from: "Bilan <bilan@bilan.website>",

      to,
      subject: `Votre bilan de ${MONTHS[month - 1]} ${year}`,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Échec de l'envoi de l'email: ${error}`);
  }
}
