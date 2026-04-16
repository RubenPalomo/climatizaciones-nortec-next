type LeadTelegramData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  consulta: string | null;
};

function escapeMarkdown(value: string) {
  return value.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function sendToTelegram(data: LeadTelegramData): Promise<boolean> {
  const telegramToken = process.env.TELEGRAM_TOKEN;
  const telegramId = process.env.TELEGRAM_ID;

  if (!telegramToken || !telegramId) {
    console.error(
      "Faltan las variables de entorno TELEGRAM_TOKEN o TELEGRAM_ID",
    );
    return false;
  }

  const message = [
    "*Nuevo lead desde la web*",
    `*Nombre:* ${escapeMarkdown(data.name)}`,
    `*Email:* ${escapeMarkdown(data.email)}`,
    data.phone ? `*Teléfono:* ${escapeMarkdown(data.phone)}` : "",
    `*Servicio:* ${escapeMarkdown(data.service)}`,
    data.consulta ? `*Consulta:* ${escapeMarkdown(data.consulta)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${telegramToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramId,
        text: message,
        parse_mode: "MarkdownV2",
      }),
    },
  );

  return response.ok;
}
