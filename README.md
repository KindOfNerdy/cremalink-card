# Cremalink Cards

Two Lovelace cards for coffee machines set up with the [cremalink-ha](https://github.com/lodzen/cremalink-ha) integration: **Cremalink Coffee Machine** for everyday use (status, drink tiles, sliders with the machine's limits and a brew button) and **Cremalink Machine Manager** for the rarely needed things (favorites, machine settings, maintenance). Colors, fonts and texts follow your Home Assistant theme and language (English and German included). Unofficial; not affiliated with or endorsed by De'Longhi, product names are trademarks of their respective owners.

> [!NOTE]
> Early version. Developed with an Eletta Explore (ECAM452) over the cloud; other machines that cremalink-ha supports should show up too, but are untested.

## Cremalink Coffee Machine: what it shows

- **Header:** machine name, status, "reported x min ago", progress while brewing and a power button.
- **Warnings:** only what needs attention (water tank, drip tray, beans, descaling, filter …).
- **Drinks:** tabs like the machine and the app have them: **Favorites** (of the active profile), **Hot**, **Cold**, **To go** (with a hot / cold choice below the tabs, as on the machine) and **Custom** (the recipes you named yourself), each with its own icon. One tile per drink, in the order of the machine's drink menu. A custom recipe is drawn like the drink whose picture you chose for it on the machine. Tap a tile to select it.
- **Sliders:** one row for the selected drink (amount, strength, milk, temperature …) with the limits the machine allows. For tea the temperature steps are shown as tea types (white, green, oolong, black). A changed value is marked with a dot and only applies to the next brew; the stored recipe stays untouched.
- **Brew:** one big button. It is disabled while the machine is asleep, busy or still loading the recipe values, and says why. The coffee pot and the cold brew pot can only be set and started on the machine (like in the Coffee Link app): they stay selectable, but have no sliders and no brew button.
- **Profile:** buttons for the profiles you set up (profiles that still have their factory name are left out). Folded below: **Maintenance** (grounds container, descaling and water filter as bars, plus beverages, descalings and water in total). The machine settings live in the Machine Manager card.

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

Add "Cremalink Coffee Machine" from the card picker and set it up in the visual editor, or use YAML:

```yaml
type: custom:cremalink-card
mode: full   # full | control | status
```

Set `device_id` only if you have more than one machine.

**When the machine sleeps** the card shows only what is useful then: the header with status and power button, warnings, maintenance and settings. Drinks, profile, sliders and the brew button come back once the machine is on. In the Machine Manager the custom recipes are hidden in standby as well (the machine cannot confirm a change then).

The card adapts to the width it gets on the dashboard: on a wide card the drinks sit next to the sliders and the brew button, on a narrow one everything stacks and shrinks.

## Options

| Option | Default | Description |
|---|---|---|
| `mode` | `full` | `full`, `control` (drinks, sliders, brew) or `status` (header, warnings, maintenance) |
| `hide` | – | Sections to hide: `header`, `recipes`, `sliders`, `profile`, `alarms`, `maintenance` |
| `name` | device name | Title in the header |
| `device_id` | first machine | Device of the machine |
| `tab_labels` | `true` | Show the text under the tab icons; `false` shows the icons only |
| `show_default_profiles` | `false` | Also show profiles that still have their factory name ("Explorer 2" …) |
| `drinks` | all | YAML only: list of drink keys to show, e.g. `[espresso, cappuccino, tea]` |
| `images.device` | – | URL of a picture of your machine |
| `images.tabs` | – | URL pattern for the tab pictures, `{tab}` is `favorites`, `hot`, `cold`, `togo` or `custom`, e.g. `/local/coffee/tab_{tab}.webp` |
| `images.drinks` | – | URL pattern for drink pictures, `{drink}` is the drink key, e.g. `/local/coffee/{drink}.webp` |

### Pictures

Without pictures the tiles use icons. To use your own pictures, put them into your `www` folder (for example `config/www/coffee/espresso.webp`) and set `images.drinks: /local/coffee/{drink}.webp`. The file name is the drink key shown in the entity's options (a custom recipe uses the file of the drink it is shown as, e.g. `latte_macchiato`); drinks without a picture keep their icon (`espresso`, `cappuccino`, `flat_white` …).

If you change an amount of one of your own recipes with the sliders, two buttons appear below them: *Save in recipe* and *Save and brew* (the brew button keeps brewing the changed amounts once, without saving).

The tabs use the drink ids and the favorites from the integration where it provides them (`option_beverages` and `favorite_beverages` attributes of the recipe select) and the drink's name otherwise.

## Cremalink Machine Manager

The second card, for things you rarely change. Add "Cremalink Machine Manager" from the card picker, or use YAML:

```yaml
type: custom:cremalink-admin-card
```

It holds four sections. Each one can be folded; they are open at first and the card remembers what you folded (per browser, separately from the Coffee Machine card):

- **Favorites** of the active profile: drag the grip to reorder (the arrow buttons work too), remove drinks, add drinks from the list (at most 12), then *Save on machine*. This needs the integration version with the `cremalink_ha.set_favorites` action and a machine that is awake.
- **Custom recipes**: the machine's six places for your own drinks. Pick a place to create or change a recipe like in the Coffee Link app: name, the picture shown on the machine (the app's 20 pictures, plus the machine's further ones), and the ingredients coffee (with strength), milk (with froth and milk first) and hot water within the place's limits. The form opens with what the machine holds now. Then *Only save*, *Save and brew* or *Delete* (asks twice). Hidden while the machine is in standby. Needs the integration version with the `cremalink_ha.save_recipe`, `get_recipe` and `delete_recipe` actions.
- **Machine settings:** beep, energy saving, coffee temperature, auto-off, water hardness, plus when the counters were last updated and the Wi-Fi module firmware.
- **Maintenance:** the same bars and counters as in the Coffee Machine card.

| Option | Default | Description |
|---|---|---|
| `hide` | – | What to hide: `title`, `favorites`, `custom`, `settings`, `maintenance` |
| `sections` | all | YAML only: which sections to show and in what order, e.g. `[maintenance, favorites]` |
| `name` | device name | Title of the card |
| `device_id` | first machine | Device of the machine |

You can arrange the sections like separate cards: add the Machine Manager several times, each with one section and without the title, and place them wherever you like on the dashboard.

```yaml
type: custom:cremalink-admin-card
hide: [title]
sections: [settings]
```

## Support

If this saves you time, you can [buy me a coffee on Ko-fi](https://ko-fi.com/kindofnerdy) ☕
