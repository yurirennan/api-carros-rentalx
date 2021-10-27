import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuid } from "uuid";

import app from "@shared/infra/http/app";

let connection: Connection;
let responseToken: string;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users(id, name, password, email, driver_license, "isAdmin", created_at)
      VALUES('${id}', 'admin', '${password}', 'admin@rentx.com.br', 04946464, 'true', 'now()')`
    );

    const response = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    responseToken = response.body.refresh_token;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new Category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test Name",
        description: "Test description",
      })
      .set({
        Authorization: `Bearer ${responseToken}`,
      });

    expect(response.status).toBe(201);
  });

  it("Should no be able to create a new Category if the name already exists", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test Name",
        description: "Test description",
      })
      .set({
        Authorization: `Bearer ${responseToken}`,
      });

    expect(response.status).toBe(400);
  });
});
