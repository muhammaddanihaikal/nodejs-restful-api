import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "danihaikal91",
      },
    });
  });

  it("harus bisa daftar user baru", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "danihaikal91",
      password: "rahasia",
      name: "Muhammad Dani Haikal",
    });

    logger.info("mantap");
    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("danihaikal91");
    expect(result.body.data.name).toBe("Muhammad Dani Haikal");
    expect(result.body.data.password).toBeUndefined();
  });

  // MASIH ERROR!!!
  it("harus bisa menolak jika request tidak valid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
