export default ({ env }) => {
  const client = env('DATABASE_CLIENT');

  if (client !== 'postgres') {
    throw new Error('Only postgres is allowed');
  }

  const isSSL =
    env('DATABASE_SSL', 'false') === 'true';

  return {
    connection: {
      client: 'postgres',
      connection: env('DATABASE_URL')
        ? {
          connectionString: env('DATABASE_URL'),
          ssl: isSSL ? { rejectUnauthorized: false } : false,
        }
        : {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
          ssl: isSSL ? { rejectUnauthorized: false } : false,
        },
      pool: { min: 2, max: 10 },
    },
  };
};
