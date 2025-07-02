function verifyRole(allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // Assuming user info is attached to req by a authMiddleware
    if (!user || !allowedRoles.includes(user.roleId)) {
      console.warn(`Access denied for role: ${user?.role || 'undefined'}`);
      return res.status(403).send("Forbidden: Insufficient role");
    }
    next();
  };
}

export default verifyRole;