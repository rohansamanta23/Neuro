// This utility function wraps an asynchronous route handler to catch errors
// and pass them to the next middleware, allowing for centralized error handling.
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
      next(error);
  }
};

export { asyncHandler };