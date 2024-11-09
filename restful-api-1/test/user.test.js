import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { removeTestUser, createTestUser } from "./test-util.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    removeTestUser();
  });

  it("harus bisa daftar user baru", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });

    logger.info("mantap");
    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();
  });

  // MASIH ERROR!!!
  it("harus bisa reject ketika request tidak valid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  // MASIH ERROR!!!
  it("harus bisa reject ketika username sudah ada ", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("harus bisa login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("harus bisa menolak ketika request tidak valid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("harus bisa menolak ketika password salah", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("harus bisa menolak ketika username salah", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
