import bcrypt from "bcryptjs";

const password: string | undefined = process.argv[2];

if (!password) {
  console.log("Please provide a password as an argument.");
  process.exit(1);
}

bcrypt.hash(password, 10, (err: Error | null, hash: string | undefined) => {
  if (err || !hash) {
    console.error("Error hashing password:", err);
    process.exit(1);
  }
  console.log("Hashed password:", hash);
});
