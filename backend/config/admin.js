module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c5b66f30f1f9bd209b9868870dc3bfba'),
  },
});
