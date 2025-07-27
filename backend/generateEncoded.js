// generateEncoded.js
const email = "yallamanohar22@gmail.com";
const encoded = Buffer.from(JSON.stringify({ email })).toString("base64");
console.log("Encoded Base64 string:\n", encoded);


const approvalLink = `${process.env.SERVER_URL}api/auth/approve-admin?data=${encodedData}`;


// Include `approvalLink` in the email body

console.log("\nTest Approval Link:\n", approvalLink);
