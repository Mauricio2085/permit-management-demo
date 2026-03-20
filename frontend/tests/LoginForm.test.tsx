import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { MemoryRouter } from "react-router";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import { LoginForm } from "@/components/LoginForm";
import { act } from "react";
import { AxiosError } from "axios";

vi.mock(import("../src/contexts/AuthContext"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

const mockedLogin = useAuth as Mock;

// Mock del hook useFetch
vi.mock("@/hooks/useFetch", () => ({
  useFetch: vi.fn((url: string) => {
    // Mock data basado en la URL
    if (url.includes("sequence")) {
      return {
        data: { data: "SEQ-001" },
        loading: false,
        error: null,
      };
    }
    if (url.includes("providers")) {
      return {
        data: {
          data: [
            { id: 1, name: "Cliente 1" },
            { id: 2, name: "Cliente 2" },
          ],
        },
        loading: false,
        error: null,
      };
    }
    if (url.includes("critical-tasks")) {
      return {
        data: {
          data: [
            { id: 1, name: "Tarea Crítica 1" },
            { id: 2, name: "Tarea Crítica 2" },
          ],
        },
        loading: false,
        error: null,
      };
    }
    if (url.includes("documents-support")) {
      return {
        data: {
          data: [
            { id: 1, name: "Documento 1" },
            { id: 2, name: "Documento 2" },
          ],
        },
        loading: false,
        error: null,
      };
    }
    // Mock para el resto de endpoints
    return {
      data: { data: [] },
      loading: false,
      error: null,
    };
  }),
}));

// Mock react-router navigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = () =>
  render(
    <AuthProvider>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </AuthProvider>,
  );

function createAxiosError(message: string) {
  const error = new AxiosError(message);
  (error as AxiosError).response = {
    data: { message },
    status: 401,
    statusText: "Unauthorized",
    headers: {},
    config: {},
  } as never;
  return error;
}

describe("Tests for loginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedLogin.mockImplementation(() => ({
      login: vi.fn(),
      logout: vi.fn(),
      user: null,
    }));
  });

  it("debe renderizar correctamente el formulario de inicio de sesión", async () => {
    renderWithProviders();

    // Verificar que los elementos del formulario estén presentes
    expect(
      screen.getByPlaceholderText("tu.correo@compañía.com"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your secure password"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "login" })).toBeInTheDocument();
  });

  it("Should show a error message Incorrect Credentials", async () => {
    const message = "Error trying to log in. Please verify your credentials.";
    const loginSpy = vi.fn().mockRejectedValue(createAxiosError(message));
    mockedLogin.mockImplementation(() => ({
      login: loginSpy,
      logout: vi.fn(),
      user: null,
    }));

    renderWithProviders();

    const emailInput = screen.getByPlaceholderText("tu.correo@compañía.com");
    const passworInput = screen.getByPlaceholderText(
      "Enter your secure password",
    );
    const buttonLogin = screen.getByRole("button", { name: "login" });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "wrong@company.com" } });
      fireEvent.change(passworInput, { target: { value: "wrong password" } });
      fireEvent.click(buttonLogin);
    });

    expect(await screen.findByText(message)).toBeInTheDocument();
    await waitFor(() => expect(loginSpy).toHaveBeenCalled());
  });
});
