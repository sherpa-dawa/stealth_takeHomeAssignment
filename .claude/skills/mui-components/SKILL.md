---
name: mui-components
description: MUI component selection and styling conventions for the Audit Workspace
---

# MUI Components & Styling

When building or editing any MUI component in this project, follow these conventions.

## Component Selection Guide

| Purpose                                  | MUI Component                                              | Notes                                                                      |
| ---------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| Card container for audit areas           | `Card` + `CardContent`                                     | Use CardContent for inner padding; full-height flex container              |
| Risk/status badges                       | `Chip`                                                     | size="small", read-only (no delete icon); color from theme tokens          |
| Progress bar                             | `LinearProgress`                                           | `variant="determinate"` for known progress; sx={{height: 2}} for compact   |
| Dialogs (assign, status change, details) | `Dialog` + `DialogTitle`, `DialogContent`, `DialogActions` | PaperProps for custom width; fullWidth + maxWidth="sm" for modals          |
| Loading skeleton                         | `Skeleton`                                                 | Skeleton component with width/height via sx prop; multiple for card layout |
| Form inputs                              | `TextField` (text), `Select` + `MenuItem` (dropdowns)      | variant="outlined" for consistency                                         |
| Buttons                                  | `Button`                                                   | variant="contained"/"outlined"/"text"; size="small" for card actions       |
| Empty/error state                        | Typography + Icon                                          | use `Alert` for error messages with `severity="error"`                     |
| Expandable sections (mobile)             | `Accordion` + `AccordionSummary`, `AccordionDetails`       | Mobile sidebar uses accordion to save space                                |

## Styling Rules

### The `sx` Prop

All styling goes in the `sx` prop; no separate CSS files or Tailwind classes.

```tsx
<Card sx={{
  border: state.error ? `2px solid ${theme.palette.error.main}` : 'none',
  '&:hover': { boxShadow: 3 },
  borderRadius: 1,
}}>
```

### Theme Tokens (Required for Colors)

Risk and status colors **must** come from theme.ts, never hardcoded:

```tsx
// ❌ Wrong
<Chip label="High" sx={{ backgroundColor: '#ff0000' }} />

// ✅ Right
<Chip label="High" sx={{ backgroundColor: theme.palette.riskHigh }} />
```

Available tokens (from theme.ts):

- `theme.palette.riskHigh` → Red
- `theme.palette.riskMedium` → Amber
- `theme.palette.riskLow` → Green
- `theme.palette.statusPlanning` → Gray
- `theme.palette.statusInProgress` → Blue
- `theme.palette.statusReview` → Orange
- `theme.palette.statusComplete` → Green
- `theme.palette.primary`, `theme.palette.error`, `theme.palette.success` for semantic colors

### Responsive Design

Use MUI's sx breakpoints:

```tsx
<Box sx={{
  display: { xs: 'none', md: 'block' },  // hidden on mobile, block on md+
  p: { xs: 1, sm: 2, lg: 3 },            // responsive padding
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }
}}>
```

### Spacing

Use theme spacing units (0, 1=4px, 2=8px, 3=12px, 4=16px, etc.):

```tsx
<Box sx={{ p: 2, mb: 3, gap: 1.5 }}>
```

## Common Patterns

### Card with Header and Actions

```tsx
<Card>
  <CardContent sx={{ pb: 1 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="h6">{area.name}</Typography>
      <Chip
        label={area.risk}
        sx={{ backgroundColor: theme.palette[`risk${area.risk}`] }}
      />
    </Box>
    <LinearProgress
      variant="determinate"
      value={area.progress}
      sx={{ mb: 2 }}
    />
    <Button size="small">Action</Button>
  </CardContent>
</Card>
```

### Loading State with Skeleton

```tsx
<Card>
  <CardContent>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="rectangular" width="100%" height={20} sx={{ my: 1 }} />
    <Skeleton variant="circular" width={40} height={40} />
  </CardContent>
</Card>
```

### Dialog for User Actions

```tsx
<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
  <DialogTitle>Assign Auditor</DialogTitle>
  <DialogContent sx={{ pt: 2 }}>
    <Select
      defaultValue={currentAuditor}
      onChange={(e) => setSelected(e.target.value)}
    >
      {auditors.map((a) => (
        <MenuItem key={a.id} value={a.id}>
          {a.name}
        </MenuItem>
      ))}
    </Select>
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Cancel</Button>
    <Button onClick={handleAssign} variant="contained">
      Assign
    </Button>
  </DialogActions>
</Dialog>
```

## Typography Variants

- `variant="h5"` — Page titles
- `variant="h6"` — Section headers, card titles
- `variant="body1"` — Body text (16px)
- `variant="body2"` — Smaller body text (14px)
- `variant="caption"` — Labels, metadata (12px)
- Never use hardcoded font sizes; always use variants

## Color & Contrast

- Text on light backgrounds: `theme.palette.text.primary` (dark gray)
- Secondary text: `theme.palette.text.secondary` (medium gray)
- Disabled text: `theme.palette.text.disabled`
- Always ensure WCAG AA contrast; MUI defaults are safe
