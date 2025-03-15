# Navigation Query Fix Instructions

The 401 error you're seeing is because the anonymous Supabase role doesn't have permission to access the navigation tables. Here's how to fix it:

## 1. Update Supabase Permissions

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of the `supabase-navigation-permissions.sql` file
4. Run the SQL script

This script will:
- Enable Row Level Security (RLS) on the navigation tables
- Create policies that allow anonymous users to read navigation data
- Grant the necessary permissions to the anonymous role

## 2. Verify Table Names

The SQL script assumes your tables are named:
- `navigation`
- `navigation_items`

If your tables have different names, modify the SQL script accordingly before running it.

## 3. Restart Your Application

After applying the permissions:

```bash
npm run dev
```

## What We Fixed

1. Ensured both Apollo client configurations use the same GraphQL endpoint:
   - Updated `apollo-wrapper.tsx` to use `/graphql/v1` instead of `/v1/graphql`

2. Created a SQL script to grant the necessary permissions for anonymous access to navigation data

## Troubleshooting

If you still see 401 errors after applying these changes:

1. Check the Supabase dashboard to ensure the policies were created successfully
2. Verify that your `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable is correct
3. Check the network tab in your browser's developer tools to see the exact request that's failing
4. Ensure your GraphQL schema is properly configured to allow anonymous access
