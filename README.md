# @sharadox/showcase-web-library

Show one site's live components on another, as they are at home: a portfolio page runs a client's real components instead of pictures of them.

```tsx
import { AssetOrigin } from "@sharadox/showcase-web-library/asset-origin";
import { Guest } from "@sharadox/showcase-web-library/guest";

// In the guest site's library: its look (colors, type, base styles) on a wrapper class.
<Guest className={styles.look} look={styles.look}>
  <AssetOrigin origin="https://luispiresdecor.com">
    <Work locale="en" />
  </AssetOrigin>
</Guest>;
```

| Import           | What it does                                                                                                                                                                                                                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `…/guest`        | `<Guest className? style? look>`: the demo frame. Marked `data-guest`, so the host's global rules leave it alone and pointer-web-library's `Cursor` shows the system cursor over it. Its links do nothing (a demo shouldn't leave for the guest's pages); buttons, filters and dragging still work. `GuestContext` holds `look`. |
| `…/portal`       | `<Portal>`: draws at the end of `<body>` (a full-screen viewer), browser only. Inside a `Guest`, it wraps what it draws in the guest's look and `data-guest`, so it looks the same as at home.                                                                                                                                   |
| `…/asset-origin` | `<AssetOrigin origin>`, `useAsset(path)`, `useAssets()`: the guest's own files (photos, logos) keep their paths and load from its address.                                                                                                                                                                                       |

The guest's components use `Portal` and `useAsset` for everything they draw elsewhere or load from their site; at home, both change nothing.

## Develop

`pnpm verify` runs formatting, lint, type-check, tests with 100% coverage and the build. Branches follow `<feature>.development` → `development` → `index`, and releases are `v<version>` tags on `index`.

## License

Licença Sharadox de Código Aberto, versão 0.1.0. See [português](LICENCA.md) (the binding text) and the [English translation](LICENSE.md).
