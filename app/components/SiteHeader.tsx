import { MapPin, Clock3, PhoneCall, Menu } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="top-strip-inner container">
          <p>
            <MapPin
              size={16}
              aria-hidden="true"
            />{" "}
            Alcobendas
          </p>
          <p>
            <Clock3
              size={16}
              aria-hidden="true"
            />{" "}
            Lun - Vie: 09:00 - 19:00 h
          </p>
          <p>
            <PhoneCall
              size={16}
              aria-hidden="true"
            />{" "}
            Emergencias 24h: 91 999 38 39
          </p>
        </div>
      </div>

      <div className="nav-row container">
        <a
          className="brand"
          href="#inicio"
        >
          <Image
            className="brand-logo"
            src={logo}
            alt="Nortec Logo"
            width={184}
            height={54}
            priority
          />
        </a>

        <nav
          className="desktop-nav"
          aria-label="Navegación principal"
        >
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Soluciones</a>
          <a href="#instalaciones">Instalaciones</a>
          <a href="#mantenimiento">Mantenimiento</a>
          <a href="#faq">FAQ</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="desktop-actions">
          <a
            className="ghost-action"
            href="https://wa.me/34679285294"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="primary-action min-w-34"
            href="tel:+34919993839"
          >
            91 999 38 39
          </a>
        </div>

        <details className="mobile-menu">
          <summary>
            <Menu
              size={18}
              aria-hidden="true"
            />{" "}
            Menú
          </summary>
          <nav aria-label="Menú móvil">
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Soluciones</a>
            <a href="#instalaciones">Instalaciones</a>
            <a href="#mantenimiento">Mantenimiento</a>
            <a href="#faq">FAQ</a>
            <a href="#contacto">Contacto</a>
            <a href="tel:+34919993839">Llamar ahora</a>
            <a
              href="https://wa.me/34679285294"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
