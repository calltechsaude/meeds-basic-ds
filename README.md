# @meeds/ds

Design system dos fronts Meeds (`meeds-basic-admin`, `meeds-basic-doctor`, `meeds-basic-web`).
Tokens + preset Tailwind + componentes React. Extraído dos padrões já existentes nos três apps.

Stack alvo: React 18/19, Tailwind 3.4, lucide-react, TypeScript.

## Instalação

```bash
npm run build   # neste repo, gera dist/

# no app consumidor:
npm install ../meeds-basic-ds        # local, ou
npm install git+ssh://git@github.com/<org>/meeds-basic-ds.git
```

## Setup no app (3 passos)

**1. Tailwind** — `tailwind.config.js`:

```js
import preset from '@meeds/ds/tailwind-preset'

export default {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/@meeds/ds/dist/**/*.js', // obrigatório: classes do DS
  ],
}
```

**2. CSS** — no entry (`main.tsx`), antes do CSS do app:

```ts
import '@meeds/ds/styles.css'
```

**3. Providers e tema** — no `App.tsx` e `index.html`:

```tsx
import { ToastProvider, themeInitScript } from '@meeds/ds'

<ToastProvider>{/* app */}</ToastProvider>
// index.html <head>: <script>{themeInitScript('meeds-admin-theme')}</script>
```

## Tokens

Tudo vem de CSS vars (`--ds-*` em `styles.css`), mapeadas no preset:

| Grupo | Classes | Uso |
|---|---|---|
| Marca | `primary`, `primary-light/dark/hover` | cor da marca; multi-tenant via `applyBrand('#hex')` |
| Superfície | `app-bg`, `app-surface`, `app-border` | fundo, cards, bordas |
| Texto | `app-text`, `app-muted`, `app-dark`, `app-darker` | hierarquia de texto |
| Semânticas | `success(-soft)`, `warning(-soft/strong)`, `danger(-dark/soft)` | substituem hex soltos (`#00C851`, `#FFBB33`, `#C90000`) |
| Sombras | `shadow-glow-primary(-lg)`, `shadow-card`, `shadow-modal` | |
| Z-index | `z-dropdown`, `z-overlay`, `z-modal`, `z-popover`, `z-toast` | fim dos z-index mágicos |
| Animações | `animate-slide-in`, `animate-fade-in`, `animate-pulse-dot`, `animate-pulse-slow` | |

Dark mode: classe `.dark` no `<html>` (hook `useTheme` + `ThemeToggle` + `themeInitScript`).

Convenção de raio: `rounded-lg` controles · `rounded-xl` pills/tiles · `rounded-2xl` cards e modais.

## Componentes

| Categoria | Componentes |
|---|---|
| Ações | `Button` (primary/gradient/secondary/danger/danger-outline/ghost; sm/md/lg; `loading`, `leftIcon`, `fullWidth`), `IconButton` |
| Formulário | `Form`, `Field`, `FieldError`, `Input`, `PasswordInput`, `LockedInput`, `Textarea`, `SearchInput`, `Checkbox`, `Toggle` |
| Exibição | `Badge` (tones + `hash`), `CountBadge`, `StatusDot`, `Avatar`, `IconTile`, `Card`, `SectionCard`, `KpiCard`, `SectionLabel`, `PageHeader`, `PageContainer`, `InfoRow`, `ListHeader`/`ListItem`, `Tabs` (underline/pill), `ProgressBar` |
| Feedback | `Alert`, `EmptyState`, `ErrorState`, `Spinner`, `CenteredSpinner`, `Skeleton`, `ToastProvider` + `useToast` |
| Overlays | `Modal` (sm/md/lg/xl, Esc + backdrop, `z-modal`), `ConfirmDialog` (substitui `window.confirm`) |
| Infra | `ThemeToggle`, `InfiniteScroll`, `cn`, `initialsOf`, `hashColorStyle`, `applyBrand`, `useTheme`, `useClickOutside` |

Exemplo:

```tsx
import { Button, Field, Input, Modal, useToast, Badge } from '@meeds/ds'

const toast = useToast()

<Field label="CPF" error={errors.cpf}>
  <Input value={cpf} onChange={...} />
</Field>
<Button loading={saving} onClick={save}>Salvar</Button>
<Badge tone="success">Concluída</Badge>
```

## Multi-tenant (web)

```ts
import { applyBrand } from '@meeds/ds'
applyBrand(tenant.brandColor) // sobrescreve --ds-primary* em runtime
```

Tudo que usa `primary` (inclusive `bg-primary/10`) segue o tenant. Substitui o `applyBrand`
antigo do web e a escala estática `brand-*`.

## Guia de migração (equivalências)

| Antes (nos apps) | Agora |
|---|---|
| Botão inline `bg-primary px-4 py-2 ... hover:bg-primary/90` (~25 cópias) | `<Button>` |
| Botão com hover via `onMouseEnter` mutando style | `<Button>` / `<IconButton>` |
| `window.confirm(...)` | `<ConfirmDialog>` |
| Chrome de modal copiado (backdrop + painel + header com ícone + X) | `<Modal icon={...}>` |
| `STATUS_STYLE` / `StatusChip` / `chip()` com hex | `<Badge tone={...}>` |
| Span `animate-spin` com border inline, `RefreshCw` girando | `<Spinner>` / `<CenteredSpinner>` |
| Avatar de iniciais + `initialsOf` reescrito 3x | `<Avatar name={...}>` |
| Empty state de círculo 52px + dois textos (~40 cópias) | `<EmptyState>` |
| Caixa de erro `#fff1f0`/`#c53030` (10 cópias no web) | `<Alert tone="danger">` |
| `bg-amber-50 text-amber-700 ...` | `<Alert tone="warning">` |
| Tabs underline copiadas / pills segmentadas | `<Tabs variant="underline|pill">` |
| KpiCard/ChartCard duplicados (Dashboard × GeneralTab) | `<KpiCard>` / `<Card>` + `<SectionLabel>` |
| `listStyles.ts` (LIST_HEADER_CLASS etc.) | `<ListHeader>` / `<ListItem interactive>` |
| Toast acoplado ao zustand | `useToast().success(...)` |
| `cn` = clsx puro | `cn` com tailwind-merge (classes do consumidor vencem) |
| Hex `#00c7d2`, `#00C851`, `#FFBB33`, `#C90000` | tokens `primary`, `success`, `warning`, `danger` |

### Atenção na migração

- **Não** levar para os apps os resets globais antigos (`* { position: relative }`, `!important` de Bootstrap); o DS não os define de propósito.
- `Select`/`MultiSelect` (combobox com busca do admin/doctor) ainda **não** foram extraídos — próxima versão; manter os locais por enquanto.
- Tema escuro fixo da tela de consulta do doctor (slates `#0f172a`) não responde ao `.dark`; migrar depois para os tokens.
