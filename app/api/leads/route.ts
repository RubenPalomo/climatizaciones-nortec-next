import { NextResponse } from "next/server";
import { getMongoCollectionName, getMongoDb } from "@/lib/mongodb";
import { sendToTelegram } from "@/lib/sendToTelegram";

export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  consulta?: unknown;
};

function sanitizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email);
    const phone = sanitizeString(body.phone);
    const service = sanitizeString(body.service) || "Consulta";
    const consulta = sanitizeString(body.consulta);

    if (!name || !email) {
      return NextResponse.json(
        { error: "El nombre y el email son obligatorios." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "El email no es válido." },
        { status: 400 },
      );
    }

    if (service === "Consulta" && !consulta) {
      return NextResponse.json(
        { error: "Describe brevemente tu consulta." },
        { status: 400 },
      );
    }

    const db = await getMongoDb();
    const leadsCollection = db.collection(getMongoCollectionName());

    const result = await leadsCollection.insertOne({
      name,
      email,
      phone,
      service,
      consulta: consulta || null,
      createdAt: new Date(),
      source: "web",
      userAgent: request.headers.get("user-agent") ?? null,
    });

    const sentToTelegram = await sendToTelegram({
      name,
      email,
      phone,
      service,
      consulta: consulta || null,
    });
    if (!sentToTelegram) {
      console.warn("Lead guardado en MongoDB pero no se pudo enviar a Telegram.");
    }

    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error guardando lead en MongoDB:", error);
    return NextResponse.json(
      { error: "No se pudo guardar el lead. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
