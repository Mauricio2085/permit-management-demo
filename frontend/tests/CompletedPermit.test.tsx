import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { MemoryRouter } from "react-router";
import { useFetch } from "@/hooks/useFetch";
import type { PermissionDownloadResponse } from "@/types/workAtHeights";
import { CompletedPermit } from "@/components/CompletedPermit";

vi.mock("@/components/PermitDownloadPdfButton", () => ({
  PermissionDownloadPdfButton: () => <div data-testid="pdf-download-stub" />,
}));

vi.mock("@/hooks/useFetch", () => ({
  useFetch: vi.fn(),
}));

const mockedUseFetch = useFetch as Mock;

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router",
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ permissionId: "42" }),
  };
});

function createMockPermissionResponse(): PermissionDownloadResponse {
  return {
    data: [
      {
        id: 1,
        sequence: 100,
        permissionStartDate: "2025-01-15T00:00:00.000Z",
        permissionEndDate: "2025-01-15T23:59:59.000Z",
        description: "Trabajo de prueba en alturas",
        state: "completado",
        customer: "Cliente Demo S.A.",
        criticalTasks: ["Trabajo en caliente"],
        documentsSupport: [
          { document_id: 1, name: "Plan de trabajo", response: "SI" },
        ],
        maxHeightAuthorized: "10",
        maxLoadAuthorized: "500",
        fallElements: ["Línea de vida"],
        personalProtectionElements: ["Arnés"],
        accessElements: ["Escalera"],
        answersCheckPermission: [
          {
            id: 1,
            verification: "Verificación 1",
            aspect: "Aspecto A",
            response: "SI",
          },
        ],
        signaturesPermission: [
          {
            name: "Ejecutor Uno",
            identification: "123456",
            role: "ejecutor",
            signature: "https://example.com/sig-e.png",
          },
          {
            name: "Coordinador Uno",
            identification: "789012",
            role: "coordinador",
            signature: "https://example.com/sig-c.png",
          },
          {
            name: "Autorizador Uno",
            identification: "345678",
            role: "autorizador",
            signature: "https://example.com/sig-a.png",
          },
        ],
      },
    ],
  };
}

function renderCompletedPermit() {
  return render(
    <MemoryRouter>
      <CompletedPermit />
    </MemoryRouter>,
  );
}

describe("CompletedPermit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseFetch.mockImplementation(() => ({
      data: createMockPermissionResponse(),
      loading: false,
      error: null,
    }));
  });

  it("debe llegar la data del permiso correctamente", async () => {
    renderCompletedPermit();

    expect(mockedUseFetch).toHaveBeenCalledWith(
      expect.stringMatching(/work-at-heights\/pending-complete-permissions\/42$/),
    );

    expect(screen.getAllByText("Cliente Demo S.A.").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Trabajo de prueba en alturas").length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("100").length).toBeGreaterThan(0);
  });
});
