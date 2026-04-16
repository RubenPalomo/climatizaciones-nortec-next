"use client";
import { useState } from "react";

export default function LeadForm() {
  const [service, setService] = useState("Reparación Aire");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consulta, setConsulta] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setConsulta("");
    setService("Reparación Aire");
  }

  function validateEmail(email: string) {
    return /.+@.+\..+/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (!name.trim() || !email.trim()) {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: {
            type: "error",
            message: "El nombre y el email son necesarios",
          },
        }),
      );
      return;
    }
    if (!validateEmail(email)) {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: { type: "error", message: "El email no es válido" },
        }),
      );
      return;
    }

    if (service === "Consulta" && !consulta.trim()) {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: { type: "error", message: "Describe brevemente tu consulta" },
        }),
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          consulta,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        window.dispatchEvent(
          new CustomEvent("toast", {
            detail: {
              type: "error",
              message:
                data?.error ?? `No se pudo guardar (HTTP ${response.status}).`,
            },
          }),
        );
        return;
      }

      resetForm();
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: {
            type: "success",
            message: "¡Formulario enviado correctamente!",
          },
        }),
      );
    } catch {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: {
            type: "error",
            message: "Error de conexión. Revisa tu red e inténtalo de nuevo.",
          },
        }),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="lead-card"
      aria-label="Formulario de solicitud"
      onSubmit={handleSubmit}
    >
      <h2>Atendemos todos los avisos en 24 horas</h2>
      <p>Sencillo, rápido y eficaz. Cuéntanos tu avería y te llamamos.</p>
      <label>
        Nombre
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
      </label>
      <label>
        Servicio
        <select
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          disabled={isSubmitting}
        >
          <option>Reparación Aire</option>
          <option>Instalación</option>
          <option>Aerotermia</option>
          <option>Mantenimiento</option>
          <option>Consulta</option>
        </select>
      </label>
      {service === "Consulta" && (
        <label>
          ¿Qué necesitas?
          <input
            type="text"
            name="consulta"
            placeholder="Describe tu consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            disabled={isSubmitting}
          />
        </label>
      )}
      <label>
        Teléfono
        <input
          type="tel"
          name="phone"
          placeholder="Tu teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isSubmitting}
        />
      </label>
      <button
        className="cursor-pointer"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Pedir más información"}
      </button>
      <p className="lead-note">
        Sin compromiso. Contacto directo con técnico especializado.
      </p>
    </form>
  );
}
