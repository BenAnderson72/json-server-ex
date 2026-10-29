module.exports = (req, res, next) => {
  // Example: Read a custom header
//   const authHeader = req.headers['authorization'];
//   const customHeader = req.headers['x-custom-header'];

//   console.log('Authorization:', authHeader);
//   console.log('X-Custom-Header:', customHeader);

  // Example: Block requests if a header is missing
  if (req.method === 'POST' && !authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const userId = req.headers['x-user-id'];

  if (req.path.includes('/users') && !userId) {
    return res.status(400).json({
      error: {
        code: "MISSING_HEADER",
        message: "The x-user-id header is required for this endpoint."
      }
    });
  }
  

  // If the header is provided and it's a GET request to the users collection
  if (userId && req.method === 'GET' && req.path === '/users') {
    // Append or override the query parameter for filtering
    req.query['user-id'] = userId;
    console.log('x-user-idd:', userId);
  }

  // Continue to json-server router
  next();
};