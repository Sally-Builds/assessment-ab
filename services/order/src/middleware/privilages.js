exports.restrictTo = (admin) => {
    return (req, res, next) => {
      if (req.user.role !== admin) {
        return next(
          new AppError(
            'You do not have the permission to perform this action',
            403
          )
        );
      }
      next();
    };
  };