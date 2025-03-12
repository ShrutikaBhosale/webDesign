import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "jsr:@std/dotenv/load";

const client = new Client({
  user: Deno.env.get("DBUSER"),
  database: Deno.env.get("DATABASE"),
  hostname: Deno.env.get("HOST"),
  port: parseInt(Deno.env.get("PORT")),
  password: Deno.env.get("PASSWORD"),
});

await client.connect();

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { firstname, lastname, phone, email, password } = body;
      await client.queryObject(
        "INSERT INTO signup (first_name,last_name, phone, email, password) VALUES ($1,$2,$3,$4,$5)",
        [firstname, lastname, phone, email, password]
      );

      return new Response(
        JSON.stringify({ message: "Inserted successfully" }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: "Wrong Credentials" }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }
});

// try {
//   const body = await req.json();
//   const username = body.username;
//   const password = body.password;
//   await client.queryObject(
//     "INSERT INTO login (username, password) VALUES ($1,$2)",
//     [username, password]
//   );

//   return new Response(
//     JSON.stringify({ message: "Inserted successfully" }),
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     }
//   );
// } catch (error) {
//   return new Response(JSON.stringify({ error: "Wrong Credentials" }), {
//     status: 405,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//   });
// }
