import supertest from "supertest";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeTestContact,
  removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("harus bisa create contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        phone: "test",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("test");
    expect(result.body.data.lastName).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("test");
  });

  it("harus bisa create contact dengan data firstName saja", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "test",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("test");
  });

  it("harus bisa reject ketika data firstName tidak ada", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("harus bisa get contact berdasarkan id", async () => {
    const contact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + contact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
  });

  it("harus bisa reject ketika id tidak valid", async () => {
    const result = await supertest(web)
      .get("/api/contacts/123")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe("contact not found");
  });

  it("harus bisa reject ketika token tidak valid", async () => {
    const contact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + contact.id)
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("harus bisa mengupdate data contact", async () => {
    const contact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + contact.id)
      .set("Authorization", "test")
      .send({
        firstName: "updated",
        lastName: "updated",
        email: "updated@gmail.com",
        phone: "updated",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(contact.id);
    expect(result.body.data.firstName).toBe("updated");
    expect(result.body.data.lastName).toBe("updated");
    expect(result.body.data.email).toBe("updated@gmail.com");
    expect(result.body.data.phone).toBe("updated");
  });

  it("harus bisa reject ketika request tidak valid", async () => {
    const contact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + contact.id)
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "updated",
        phone: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("harus bisa reject ketika contact id tidak ada", async () => {
    const result = await supertest(web)
      .put("/api/contacts/" + 12345)
      .set("Authorization", "test")
      .send({
        firstName: "updated",
        lastName: "updated",
        email: "updated@gmail.com",
        phone: "updated",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("harus bisa reject ketika token tidak valid", async () => {
    const contact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + contact.id)
      .set("Authorization", "salah")
      .send({
        firstName: "updated",
        lastName: "updated",
        email: "updated@gmail.com",
        phone: "updated",
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it("harus bisa menghapus data contact", async () => {
    let contact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + contact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    // cek di db
    contact = await getTestContact();
    expect(contact).toBeNull();
  });

  it("harus bisa reject ketika contact id tidak ada", async () => {
    const result = await supertest(web)
      .delete("/api/contacts/" + 12345)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("harus bisa reject ketika token tidak valid", async () => {
    const contact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + contact.id)
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
