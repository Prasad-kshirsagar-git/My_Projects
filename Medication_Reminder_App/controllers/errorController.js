const someController = (req, res, next) => {
  try {
    // Some logic here...
    if (!req.user) {
      const error = new Error("User not authenticated");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err); // Pass the error to the errorHandler
  }
};
