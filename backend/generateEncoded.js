// generateEncoded.js
const email = "yallamanohar22@gmail.com";
const encoded = Buffer.from(JSON.stringify({ email })).toString("base64");
console.log("Encoded Base64 string:\n", encoded);

const approvalLink = `https://your-backend-domain.com/api/approve-admin?data=${encoded}`;
console.log("\nTest Approval Link:\n", approvalLink);
