# Using nuqs for URL State Management

Since nuqs has compatibility issues with React 19, I've implemented URL state management using React Router's built-in `useSearchParams` hook. However, if you want to use nuqs in the future, here's how you would do it:

## Installation (when React 19 compatibility is available)

```bash
npm install nuqs --legacy-peer-deps
```

## Setup Provider

```tsx
// src/main.tsx
import { NuqsAdapter } from "nuqs/adapters/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
```

## Usage in Components

```tsx
// src/Pages/SignUp/index.tsx
import { useQueryState } from "nuqs";

export default function SignUp() {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "signup" });

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange}>
      {/* Your tabs content */}
    </Tabs>
  );
}
```

## Current Implementation

The current implementation uses React Router's `useSearchParams` which provides similar functionality:

- **URL State**: Tab state is stored in URL search params (`?tab=signin` or `?tab=signup`)
- **Navigation**: Clicking tabs updates the URL and navigates between pages
- **Persistence**: Tab state persists on page refresh
- **Sharing**: URLs can be shared with specific tab states

## Benefits of Current Approach

1. **No Dependencies**: Uses built-in React Router functionality
2. **React 19 Compatible**: Works with the latest React version
3. **Lightweight**: No additional bundle size
4. **Simple**: Easy to understand and maintain

## URL Examples

- Login page with signin tab: `http://localhost:5174/?tab=signin`
- Login page with signup tab: `http://localhost:5174/?tab=signup`
- Signup page with signup tab: `http://localhost:5174/signup?tab=signup`
- Signup page with signin tab: `http://localhost:5174/signup?tab=signin`
