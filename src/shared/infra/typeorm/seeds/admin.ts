import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO users(id, name, password, email, driver_license, "isAdmin", created_at)
    VALUES('${id}', 'admin', '${password}', 'admin@rentx.com.br', 04946464, 'true', 'now()')`
  );

  connection.close();
}

create().then(() => console.log("User admin created!"));
