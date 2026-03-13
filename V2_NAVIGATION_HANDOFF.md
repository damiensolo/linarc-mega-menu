# V2 Navigation System — Feature List & Interaction Details

**Purpose:** Handoff document for Product Management and Development.  
**Scope:** V2 navigation (header, mega menu, sidebar, bookmarks, project selector).  
**Validation:** Features and interactions verified via **Playwright MCP** click-through on `http://localhost:3000/` with “Switch to V2” applied.

---

## 1. V2 vs V1 — Summary of Differences

| Area | V1 | V2 |
|------|----|----|
| **Bookmarks entry point** | Header: dedicated “Bookmarks” pill next to category menu | **Sidebar only:** “Bookmarks” at top of left sidebar; no bookmarks control in header |
| **Header visual** | `#1e1e1e`, 3px gray bottom border | `#1a1a1a`, 2px cyan bottom border (`border-cyan-500/50`) |
| **Hover / focus** | Gray (`hover:bg-gray-800/50`) | Cyan tint (`hover:bg-cyan-900/30`) |
| **Project panel** | Gray border | Cyan-tinted border (`border-cyan-600/30`) |
| **Bookmarks data flow** | Header owns bookmarks UI | Header exposes `bookmarks`, `toggleBookmark`, `handleSelect` to parent; **Sidebar** consumes them for the Bookmarks menu |

**Playwright check (V2):** With “Switch to V2” active, header shows only the category trigger (“Docs”) and horizontal nav tabs; sidebar shows “Bookmarks” button at top, then Dashboard, Boards, Logs, Completed, Closed, then Linarc logo.

---

## 2. Feature List

### 2.1 Global Header

- **Left/Center**
  - **Category menu trigger:** Single pill showing current category main icon + abbreviation (e.g. “Docs”). Abbreviations: PM, Team, Quality, Finance, Field, Docs. In V2 there is **no** Bookmarks pill in the header.
  - **Mega menu:** Opens on hover (desktop) or click (mobile) from that trigger; see §2.2.
  - **Horizontal nav (desktop):** Subcategory tabs for the **current** category (e.g. Document, Plans, RFI, Submittals, Specbook when Documentation is active). Clicking a tab selects that subcategory and updates the main heading (e.g. “Documentation / Document” → “Documentation / Plans”).
- **Right (desktop)**
  - **Project panel:** Project selector dropdown + Project details card (see §2.4, §2.5).
  - **Vertical divider** then **action icons:** Search, Chat, Help, Notifications, User profile (with Tooltips, e.g. 400ms delay).

**Playwright check:** Category button has `aria-label` “Documentation menu” and `aria-expanded` when open. Horizontal nav links (Document, Plans, RFI, Submittals, Specbook) are present; clicking “Plans” sets it active and updates the main heading to “Documentation / Plans”.

### 2.2 Mega Menu (Hover Menu)

- **Trigger:** Same as “Category menu trigger” above. Desktop: hover to open, mouse leave to close. Mobile: tap toggles; close by tap outside or Escape.
- **Layout:** Three columns (responsive: 1 col on small, 2–3 on md/lg). Column mapping:
  - **Column 1:** Project Management, Collaboration, Quality  
  - **Column 2:** Finance & Cost Control, Field & Site Operations  
  - **Column 3:** Documentation, More (Reports, Configure)
- **Content per category:** Category title as heading (e.g. “Project Management”) and list of items. Each item: icon (colored rounded square), label (heading), short description, and **bookmark** control (Add/Remove bookmark). Bookmark state persisted in `localStorage` under `linarc-bookmarks` (set of `"categoryKey:itemKey"`).
- **“More”:** Text links only (Reports, Configure); no icons/descriptions.
- **Selection:** Clicking an item calls `onSelect(categoryKey, subcategoryKey)`: updates active category and subcategory, header tabs, and page title; closes mega menu (and in V2 any open bookmarks menu).

**Playwright check:** Opening the category menu shows the full 3-column mega menu with headings (Project Management, Collaboration, Quality, Finance & Cost Control, Field & Site Operations, Documentation, More). Each primary item has an “Add bookmark” / “Remove bookmark” button. After adding a bookmark for “Document,” the item shows “Remove bookmark” and the bookmark appears in the Sidebar Bookmarks menu.

### 2.3 Bookmarks (Favorites)

- **Persistence:** `localStorage` key `linarc-bookmarks`; value is a JSON array of strings `"categoryKey:itemKey"`.
- **V2 entry point:** Sidebar “Bookmarks” button only. No bookmarks pill in header.
- **Bookmarks menu (FavoritesMenu):**
  - **Empty state:** “No bookmarks yet” and short hint to bookmark from the menu.
  - **With bookmarks:** Panel opens to the **right** of the sidebar. Header “Bookmarks” + “Your frequently used tools”; grid of cards (icon, label, description, “Remove bookmark” button). Clicking a card navigates (same as selecting that item from the mega menu) and closes the menu.
- **Adding:** Only from the mega menu (hover item, click “Add bookmark”). **Removing:** From mega menu (toggle) or from bookmarks menu (“Remove bookmark”).
- **V2 data flow:** Header’s `useBookmarks` and `getBookmarkItems` feed `onBookmarksDataChange` with `{ bookmarks, toggleBookmark, handleSelect }`. App passes these to Sidebar so the sidebar bookmarks menu stays in sync.

**Playwright check:** In V2, clicking Sidebar “Bookmarks menu” opens a panel to the right with “Bookmarks” and “Your frequently used tools.” A bookmarked “Document” appears as a card with “Remove bookmark”; button has `aria-label` “Remove bookmark.”

### 2.4 Project Selector

- **Desktop:** In header project panel. Button shows “Project:” + current project name + chevron. Tooltip “Project: {name}” (bottom, 400ms), disabled when dropdown is open.
- **Dropdown:** Exposed as a **listbox** with **option** elements. Options: Big Mall, Downtown Tower, Suburban Complex. Selected option shows a checkmark icon. Click option → select project, close dropdown. Click outside closes. Button shows `aria-expanded` when open.
- **Mobile:** Separate project icon in header; tap opens overlay (backdrop + panel) with project list and project details section.

**Playwright check:** “Select project” button opens a listbox; options include “Big Mall” (selected, with checkmark), “Downtown Tower,” “Suburban Complex.”

### 2.5 Project Details Card (Site Information)

- **Desktop:** Next to project selector in header. Location icon + chevron; tooltip shows truncated address (“Site: …”), disabled when expanded.
- **Click:** Toggles a floating panel (fixed position) with: **Address**, **Owner**, **General Contractor**, **Project Manager**, **Phone** (each with icon and label). Panel positions above or below based on viewport; horizontal clamping and scroll when content is tall.
- **Close:** Click outside.

**Playwright check:** “Site information” button opens a panel with labeled fields, e.g. Address (“4900 Moorpark Ave #326, San Jose, CA 95127, USA”), Owner (Build Enterprises), General Contractor (A to Z construction), Project Manager (Max Anderson), Phone (+1 56535 - 7878). Button has `aria-expanded` when open.

### 2.6 Sidebar (V2)

- **Width:** 82px.
- **Top (V2 only):** “Bookmarks” button (icon + label). Click toggles Bookmarks menu to the **right** of the sidebar (FavoritesMenu with `position="right"`). Button has `aria-label` “Bookmarks menu” and `aria-expanded` when open. Active state: orange accent bar on the right edge when menu is open.
- **Main items:** Dashboard, Boards, Logs, Completed, Closed. Each: icon + label; active item has orange right-edge bar. Click sets active item (local state in demo).
- **Bottom:** Linarc logo.

**Playwright check:** In V2, sidebar shows “Bookmarks menu” at top, then Dashboard, Boards, Logs, Completed, Closed, then logo. No “Bookmarks” in header.

### 2.7 Mobile Behavior

- **Breakpoint:** 768px (md); below = mobile.
- **Header:** Category trigger (and in V1 bookmarks trigger): tap toggles menus. Horizontal nav hidden.
- **Project:** Project icon opens overlay (project list + details). Hamburger opens slide-out menu (right, ~280px) with project selector, project details, Search, Chat, Help, Notifications, user block. Close: X, backdrop tap, or Escape. Body scroll locked while slide-out is open.
- **Mega menu:** Tap category to open; tap outside or Escape to close.
- **Touch:** Minimum tap targets 44px where specified.

### 2.8 Tooltips

- **Component:** `Tooltip`: `content`, `position` (top/bottom/left/right), `delay` (default 400ms), `disabled`.
- **Behavior:** Show after delay on mouse enter; hide on mouse leave. When `disabled` (e.g. dropdown open), tooltip does not show.
- **Used on:** Project selector button, project icon (mobile), project details trigger, Search, Chat, Help, Notifications, User profile.

---

## 3. Interaction Details (By Component)

### 3.1 Header — Category / Mega Menu Trigger

- **Desktop:** `mouseEnter` → set `menuVisible true`, `bookmarksMenuVisible false`. `mouseLeave` → `menuVisible false`. A small “bridge” div below the trigger keeps the menu open when moving from trigger to menu.
- **Mobile:** `click` → toggle `menuVisible`; bookmarks menu closed if open. Click outside or Escape closes.
- **ARIA:** `role="button"`, `aria-haspopup="true"`, `aria-expanded={isMenuVisible}`, `aria-label="{Category title} menu"`.
- **Visual:** Chevron under icon rotates 180° when menu is open.

### 3.2 Header — Horizontal Nav (Subcategory Tabs)

- **Visibility:** `hidden md:block`; only when mega menu is closed and desktop.
- **Source:** `navItems` = items of `activeCategory`.
- **Click:** Sets `activeSubcategoryKey`, calls `onSelectionChange("{Category title} / {Subcategory label}")`. Tab gets active styling (e.g. category color).

### 3.3 HoverMenu — Item Click & Bookmark

- **Item click:** `preventDefault`, then `onSelect(categoryKey, item.key)`. Header closes mega menu and bookmarks menu.
- **Bookmark:** “Add bookmark” / “Remove bookmark” button; click runs `onToggleBookmark(categoryKey, itemKey)` with `preventDefault` and `stopPropagation`. Icon filled (yellow) when bookmarked.

### 3.4 Sidebar — Bookmarks (V2)

- **Click:** Toggle `isBookmarksMenuVisible`. Menu renders to the right with `AnimatePresence`; animation: opacity + x.
- **Close:** Click outside (via `bookmarksMenuRef`).
- **Select/remove:** Same `handleSelect` and `onToggleBookmark` as header; selecting an item closes the bookmarks menu.

### 3.5 Project Selector — Desktop

- **Button:** `aria-label="Select project"`, `aria-expanded`, `aria-haspopup="listbox"`. List has `role="listbox"`, options `role="option"`, `aria-selected`.
- **Dropdown:** `AnimatePresence`; position below button; on small screens full-width with constraints.
- **Outside click:** Closes when clicking outside the selector ref.

### 3.6 Project Details Card

- **Button:** `aria-expanded`, `aria-label="Site information"`.
- **Panel:** Two-pass layout (estimate then measure) for above/below placement and `maxHeight`/`overflowY`; `position: fixed`.

### 3.7 Mobile Slide-Out Menu

- **Backdrop:** `fixed inset-0`, `bg-black/50`, `z-40`; click closes.
- **Panel:** Slide from right, spring transition, `z-50`. Contains project selector, project details, action links, user block.
- **Escape:** Closes and restores body scroll.

---

## 4. Data & State

- **Navigation:** `navigationData` and `menuLayout` in Header. Categories: projectManagement, collaboration, quality, finance, fieldOps, documentation, more.
- **Active nav:** `activeCategoryKey` (default `'documentation'`), `activeSubcategoryKey` (default `'document'`). Updated on mega menu or tab selection.
- **Bookmarks:** `useBookmarks()` in Header: `bookmarks` (Set of `"categoryKey:itemKey"`), `toggleBookmark`, `getBookmarkItems(navigationData)`.
- **Project:** `selectedProject` in Header; static `projects` (e.g. Big Mall, Downtown Tower, Suburban Complex) with `id`, `name`, `details[]`.
- **Page title:** Parent state; Header calls `onSelectionChange(title)` when user selects a subcategory (mega menu or horizontal tab).

---

## 5. Accessibility Notes

- **ARIA:** Buttons and dropdowns use `aria-label`, `aria-expanded`, `aria-haspopup`. Project selector uses listbox/option and `aria-selected`. Bookmark buttons use “Add bookmark” / “Remove bookmark” labels.
- **Keyboard:** Escape closes mobile menu, project overlay, and (on mobile) mega menu. Full keyboard navigation (e.g. arrow keys in lists) not implemented in the reviewed code.
- **Touch:** `touch-manipulation` and min height 44px on key controls.

---

## 6. Playwright Verification Summary

| Flow | Result |
|------|--------|
| Switch to V2 | Header shows only category + tabs; Sidebar shows Bookmarks at top. |
| Open mega menu | 3-column menu with all categories and “Add bookmark” on items. |
| Add bookmark (Document) | Item shows “Remove bookmark”; bookmark appears in Sidebar Bookmarks. |
| Close mega menu (click main) | Menu closes. |
| Open Sidebar Bookmarks | Panel to right with “Bookmarks,” “Your frequently used tools,” and Document card with “Remove bookmark.” |
| Close bookmarks (click main) | Panel closes. |
| Open project selector | Listbox with Big Mall (selected), Downtown Tower, Suburban Complex. |
| Open Site information | Panel with Address, Owner, GC, PM, Phone for Big Mall. |
| Click Plans tab | “Plans” becomes active; heading updates to “Documentation / Plans.” |

---

## 7. Suggested Next Steps for PM / Dev

1. **Acceptance criteria:** Turn §2–§3 into a V2 acceptance checklist (bookmarks only in sidebar, cyan styling, persistence/sync, ARIA as above).
2. **E2E:** Add Playwright tests for: switch to V2 → open mega menu → select item → add bookmark → open Sidebar Bookmarks → see item; project switch; project details; mobile menu and overlay.
3. **Backend:** Replace static `projects` (and nav if needed) with API; keep same component props/events.
4. **Analytics:** Define events for category/subcategory selection, bookmark add/remove, project change, mobile menu open/close.

---

*Document created with codebase analysis and **Playwright MCP** click-through validation at http://localhost:3000/ (V2).*
