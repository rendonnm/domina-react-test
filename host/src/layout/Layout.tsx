import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <div className="h-screen w-screen grid grid-rows-[auto_1fr_auto] overflow-hidden">
        <header className="bg-[#1722ff] h-18 p-4">
          <h1 className="leading-none">
            <a
              href="https://domina.com.co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="/domina-logo-light.webp"
                alt="Logo de la empresa Domina Entrega Total"
                aria-hidden="true"
                className="h-10 object-contain"
              />
              <span className="sr-only">Domina Entrega Total S.A.S.</span>
            </a>
          </h1>
        </header>
        <main className="p-10 overflow-auto">
          <Outlet />
        </main>
        <footer className="bg-[#1722ff] flex h-10 px-8 items-center justify-center text-white">
          <p>Creado por Santiago Rendon Munera</p>
        </footer>
      </div>
    </>
  );
}
