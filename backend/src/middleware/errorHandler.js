export const notFound = (_request, response) => response.status(404).json({ message: "Route not found" });
export const errorHandler = (error, _request, response, _next) => {
  console.error(error);
  if (error?.code === 11000) return response.status(409).json({ message: "That email address is already in use" });
  response.status(500).json({ message: "Unexpected server error" });
};
