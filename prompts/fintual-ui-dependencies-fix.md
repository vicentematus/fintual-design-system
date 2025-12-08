# Fixing fintual-ui: Dependencies vs PeerDependencies

## The Problem

When installing `fintual-ui@1.0.6` in a new Expo app with pnpm, Metro crashed:

```
TreeFS: Could not add directory node_modules/fintual-ui... already exists as a file
```

## Root Cause

`fintual-ui` had 16+ packages in `dependencies`:

```json
"dependencies": {
  "expo": "^54.0.20",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "react-native-reanimated": "~4.1.1",
  // ... 12 more
}
```

**What happened:**
1. pnpm installed fintual-ui with all its dependencies
2. pnpm created symlinks in `.pnpm/fintual-ui@.../node_modules/` for each dep
3. Metro's TreeFS saw fintual-ui as both a file (symlink) and directory
4. Metro crashed

## The Fix

Moved everything to `peerDependencies`, left `dependencies` empty:

```json
"dependencies": {},
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "react-native": ">=0.70.0",
  "react-native-web": ">=0.19.0"
},
"devDependencies": {
  "react": "19.1.0",
  "react-native": "0.81.5",
  // ... only for building/dev
}
```

**Result:** Installing fintual-ui removed 83 packages, added only 1.

---

## Understanding Dependencies

### `dependencies`
Packages YOUR code bundles and ships. Installed automatically for consumers.

**Use for:** Internal utilities consumers don't need to know about.

```json
"dependencies": {
  "lodash": "^4.0.0"  // You use it, consumer doesn't care
}
```

### `peerDependencies`
Packages the CONSUMER must provide. Not installed automatically.

**Use for:** React, React Native, or any framework the consumer already has.

```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0"  // Consumer provides this
}
```

### `devDependencies`
Packages needed only for development/building. Never shipped to consumers.

```json
"devDependencies": {
  "typescript": "~5.9.2",  // For building
  "react": "19.1.0"        // For type-checking during build
}
```

---

## Why UI Libraries Use Empty Dependencies

Your components import:
```typescript
import { Text, StyleSheet } from "react-native";
import { createContext } from "react";
```

These come from `react` and `react-native` - which the consumer's app already has.

**If react was in dependencies:**
- Consumer app has react 19.1.0
- fintual-ui ALSO installs react 19.1.0
- Two React instances = hooks break, context breaks

**With peerDependencies:**
- Consumer app has react 19.1.0
- fintual-ui says "use yours"
- Single React instance = works

---

## The Golden Rule

| Package Type | When to Use |
|--------------|-------------|
| `dependencies` | Packages you bundle that consumers don't provide |
| `peerDependencies` | Packages consumers already have (react, react-native) |
| `devDependencies` | Build tools, types, testing - never shipped |

For UI libraries: `dependencies` is usually empty or minimal.
