import { sendResponse, setTokenCookie } from "@api/helps";

export default async function POST(req, res) {
  try {
    setTokenCookie(res, null);
    sendResponse(res, {
      statusCode: 200,
      message: "success",
    })
  } catch (error) {
    console.error("error", error);
    sendResponse(res, {
      statusCode: 500,
      message: error,
    })
  }
}
