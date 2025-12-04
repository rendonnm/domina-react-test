import { test, expect } from "@playwright/test";

test.describe("Users Table", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load and display users table", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible();

    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    const rows = page.getByRole("row");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(1);

    await expect(
      page.getByRole("textbox", { name: "Buscar por nombre de usuario" })
    ).toBeVisible();
    await expect(
      page.getByLabel("Cantidad de registros por página")
    ).toBeVisible();
  });

  test("should search users by username", async ({ page }) => {
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    const searchInput = page.getByRole("textbox", {
      name: "Buscar por nombre de usuario",
    });

    await searchInput.fill("soph");

    await page.waitForTimeout(500);
    await page.waitForURL((url) => url.searchParams.get("search") === "soph", {
      timeout: 10000,
    });

    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await expect(page.getByRole("cell", { name: "sophiab" })).toBeVisible();

    await searchInput.clear();
    await page.waitForTimeout(500);
    await page.waitForURL((url) => !url.searchParams.has("search"), {
      timeout: 10000,
    });
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();
  });

  test("should change page limit", async ({ page }) => {
    const limitSelect = page.getByLabel("Cantidad de registros por página");

    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await limitSelect.selectOption("50");

    await page.waitForURL((url) => url.searchParams.get("limit") === "50");

    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    const rows = page.getByRole("row");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(11);
  });

  test("should navigate between pages", async ({ page }) => {
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    const nextButton = page.getByRole("button", { name: "Siguiente" });
    const prevButton = page.getByRole("button", { name: "Anterior" });

    await expect(prevButton).toBeDisabled();
    await expect(nextButton).toBeEnabled();

    await nextButton.click();
    await page.waitForURL((url) => url.searchParams.get("page") === "2");
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await expect(prevButton).toBeEnabled();
    await expect(nextButton).toBeEnabled();

    await prevButton.click();
    await page.waitForURL(
      (url) =>
        url.searchParams.get("page") === "1" || !url.searchParams.has("page")
    );
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await expect(prevButton).toBeDisabled();
  });

  test("should navigate using page numbers", async ({ page }) => {
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await page
      .getByLabel("Cantidad de registros por página")
      .selectOption("20");
    await page.waitForURL((url) => url.searchParams.get("limit") === "20");
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await page.getByRole("button", { name: "2" }).click();
    await page.waitForURL((url) => url.searchParams.get("page") === "2");
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    const page2Button = page.getByRole("button", { name: "2" });
    await expect(page2Button).toHaveClass(/bg-\[#1722FF\]/);
  });

  test("should persist filters in URL", async ({ page }) => {
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await page.getByLabel("Cantidad de registros por página").selectOption("5");
    await page.waitForURL((url) => url.searchParams.get("limit") === "5");
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await page.getByRole("button", { name: "Siguiente" }).click();
    await page.waitForURL((url) => url.searchParams.get("page") === "2");
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    await page.reload();
    await expect(page.getByText("Cargando usuarios...")).not.toBeVisible();

    const url = new URL(page.url());
    expect(url.searchParams.get("page")).toBe("2");
    expect(url.searchParams.get("limit")).toBe("5");

    await expect(
      page.getByLabel("Cantidad de registros por página")
    ).toHaveValue("5");
  });
});
