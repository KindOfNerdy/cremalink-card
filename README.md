# Cremalink Coffee Card

A Lovelace card for coffee machines set up with the [cremalink-ha](https://github.com/lodzen/cremalink-ha) integration: status, drink tiles, sliders with the machine's limits and a brew button in one card. Colors, fonts and texts follow your Home Assistant theme and language (English and German included). Unofficial; not affiliated with or endorsed by De'Longhi, product names are trademarks of their respective owners.

> [!NOTE]
> Early version. Developed with an Eletta Explore (ECAM452) over the cloud; other machines that cremalink-ha supports should show up too, but are untested.

## What it shows

- **Header:** machine name, status, "reported x min ago", progress while brewing and a power button.
- **Warnings:** only what needs attention (water tank, drip tray, beans, descaling, filter …).
- **Drinks:** tabs like the machine and the app have them: **Favorites** (of the active profile), **Hot**, **Cold**, **To go** and **Custom** (the recipes you named yourself), each with its own icon. One tile per drink, in the order of the machine's drink menu. Tap a tile to select it.
- **Sliders:** one row for the selected drink (amount, strength, milk, temperature …) with the limits the machine allows. Changes only apply to the next brew; the stored recipe stays untouched.
- **Brew:** one big button. It is disabled while the machine is asleep, busy or still loading the recipe values, and says why.
- **Profile:** buttons for the profiles you set up (profiles that still have their factory name are left out). Folded below: **Maintenance** (grounds container, descaling, water filter, counters) and **Settings** (beep, energy saving, auto-off, water hardness, data freshness).

## Requirements

- Home Assistant with the cremalink-ha integration (recipe sliders and the brew switch need a version with the recipe panel, `0.3.0b1` or newer).
- The card finds the machine's entities itself. Entities the integration does not provide are left out.

## Installation

**Home Assistant 2026.11 and later (Marketplace):**

1. Add the repository (*Add from link*, `https://github.com/KindOfNerdy/cremalink-card`):

   [![Open your Home Assistant instance and show your custom repositories in the Marketplace.](https://my.home-assistant.io/badges/marketplace_repositories.svg)](https://my.home-assistant.io/redirect/marketplace_repositories/)

2. Install the card:

   [![Open your Home Assistant instance and open this repository in the Marketplace.](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=KindOfNerdy&repository=cremalink-card&category=plugin)

**Earlier versions:** add the repository in HACS as a custom repository of type *Dashboard*, then download the card.

[![Open your Home Assistant instance and open this repository in HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=KindOfNerdy&repository=cremalink-card&category=plugin)

## Usage

Add "Cremalink Coffee Card" from the card picker and set it up in the visual editor, or use YAML:

```yaml
type: custom:cremalink-card
mode: full   # full | control | status
```

Set `device_id` only if you have more than one machine.

**When the machine sleeps** the card keeps showing the drinks and profiles it saw last, dimmed and locked (the machine's selections are not available in standby), together with the status, warnings, maintenance and settings. The power button switches the machine on; the sliders and the brew button return when it is ready. The last known lists are kept in your browser.

The card adapts to the width it gets on the dashboard: on a wide card the drinks sit next to the sliders and the brew button, on a narrow one everything stacks and shrinks.

## Options

| Option | Default | Description |
|---|---|---|
| `mode` | `full` | `full`, `control` (drinks, sliders, brew) or `status` (header, warnings, maintenance) |
| `hide` | – | Sections to hide: `header`, `recipes`, `sliders`, `profile`, `alarms`, `maintenance`, `settings` |
| `name` | device name | Title in the header |
| `device_id` | first machine | Device of the machine |
| `show_default_profiles` | `false` | Also show profiles that still have their factory name ("Explorer 2" …) |
| `drinks` | all | YAML only: list of drink keys to show, e.g. `[espresso, cappuccino, tea]` |
| `images.device` | – | URL of a picture of your machine |
| `images.tabs` | – | URL pattern for the tab pictures, `{tab}` is `favorites`, `hot`, `cold`, `togo` or `custom`, e.g. `/local/coffee/tab_{tab}.webp` |
| `images.drinks` | – | URL pattern for drink pictures, `{drink}` is the drink key, e.g. `/local/coffee/{drink}.webp` |

### Pictures

Without pictures the tiles use icons. To use your own pictures, put them into your `www` folder (for example `config/www/coffee/espresso.webp`) and set `images.drinks: /local/coffee/{drink}.webp`. The file name is the drink key shown in the entity's options; drinks without a picture keep their icon (`espresso`, `cappuccino`, `flat_white` …).

The tabs use the drink ids and the favorites from the integration where it provides them (`option_beverages` and `favorite_beverages` attributes of the recipe select) and the drink's name otherwise.

## Support

If this saves you time, you can [buy me a coffee on Ko-fi](https://ko-fi.com/kindofnerdy) ☕
