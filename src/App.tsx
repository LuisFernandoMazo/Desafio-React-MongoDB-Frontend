import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";
import { Articles } from "./components/features/Articles";
import { FormPriceSpecial } from "./components/features/FormPriceSpecial";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserProvider } from "./components/contexts/UserContext";
import { Inicio } from "./components/Inicio";
import { DocumentProvider } from "./components/contexts/DocumentContext";
import { SpecialPrice } from "./components/features/SpecialPrice";

function App() {
  return (
    <UserProvider>
      <DocumentProvider>
        <BrowserRouter>
          <header className="h-16 fixed top-0 left-0 right-0 text-white z-50 shadow-lg">
            <Header />
          </header>

          <aside className="w-64 fixed left-0 top-16 bottom-0 text-white z-40 border-r border-gray-600 lg:block hidden">
            <SideMenu />
          </aside>

          <main className="pt-16 min-h-screen bg-gray-300  flex justify-center items-center lg:ml-64 ml-0  ">
            <div className=" mx-auto overflow-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/inicio" replace />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/articles" element={<Articles />} />
                <Route
                  path="/special-price"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <SpecialPrice />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-price-special"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <FormPriceSpecial />
                    </ProtectedRoute>
                  }
                />

                <Route path="/*" element={<Navigate to="/inicio" replace />} />
              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </DocumentProvider>
    </UserProvider>
  );
}

export default App;
