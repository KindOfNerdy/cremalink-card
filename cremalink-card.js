/*
 * Cremalink Coffee Card
 * Control card for coffee machines set up with the cremalink-ha integration.
 * Colors and fonts come only from the Home Assistant theme.
 */

const CARD_VERSION = "0.6.1";

const TEXT = {
  en: {
    no_device: "No coffee machine found. Set it up with the cremalink-ha integration first.",
    brew: "Brew",
    brewing: "Brewing …",
    starting: "Starting …",
    stop: "Stop",
    stopping: "Stopping …",
    power_on: "Switch on",
    power_off: "Switch off",
    hint_standby: "The machine is asleep. Wake it up and off you go.",
    hint_waking: "The machine is waking up …",
    hint_loading: "Fetching the values from the machine …",
    hint_defaults: "These are still factory values, yours are on their way.",
    hint_busy: "The machine is busy right now.",
    dispensing: "Your drink is on its way",
    hint_pot: "The pot only works right at the machine.",
    last_report: "Last heard {when}",
    never: "nothing heard yet",
    recipe: "Drink",
    tab_favorites: "Favorites",
    tab_hot: "Hot",
    tab_cold: "Cold",
    tab_togo: "To go",
    tab_custom: "Custom",
    profile: "Profile",
    adjust: "Adjust",
    overridden: "just this once",
    tea_0: "White tea",
    tea_1: "Green tea",
    tea_2: "Oolong tea",
    tea_3: "Black tea",
    maintenance: "Care",
    grounds: "Grounds container",
    descale: "Until descaling",
    filter: "Water filter left",
    counters: "Counters",
    total: "Beverages total",
    aborted: "Aborted",
    descales: "Descalings",
    water_total: "Water used in total",
    settings: "Settings",
    info: "Info",
    stats_updated: "Counters as of",
    firmware: "Wi-Fi module firmware",
    alarms: "Needs a quick look",
    ed_mode: "Mode",
    ed_mode_full: "Everything",
    ed_mode_control: "Controls only",
    ed_mode_status: "Status only",
    ed_mode_row: "Row (like a tile)",
    ed_tap_action: "Tap on the row",
    ed_hold_action: "Hold on the row",
    ed_hide: "Hide sections",
    ed_hide_header: "Header",
    ed_hide_recipes: "Drinks",
    ed_hide_sliders: "Adjust",
    ed_hide_profile: "Profile",
    ed_hide_alarms: "Warnings",
    ed_hide_maintenance: "Maintenance",
    ed_hide_title: "Title",
    ed_hide_favorites: "Favorites",
    ed_hide_settings: "Machine settings",
    ed_name: "Title",
    ed_tab_labels: "Show the text on the tabs",
    ed_show_default_profiles: "Show profiles with factory names",
    ed_device_id: "Machine (only needed with more than one)",
    ed_images: "Pictures (optional)",
    ed_device: "Machine picture (URL)",
    ed_drinks: "Drink pictures (URL with {drink})",
    ed_tabs: "Tab pictures (URL with {tab})",
  },
  de: {
    no_device: "Keine Kaffeemaschine gefunden. Richte sie zuerst mit der Integration cremalink-ha ein.",
    brew: "Zubereiten",
    brewing: "Läuft …",
    starting: "Startet …",
    stop: "Stopp",
    stopping: "Stoppt …",
    power_on: "Einschalten",
    power_off: "Ausschalten",
    hint_standby: "Die Maschine schläft. Weck sie auf, dann geht's los.",
    hint_waking: "Die Maschine wacht gerade auf …",
    hint_loading: "Hole die Werte von der Maschine …",
    hint_defaults: "Das sind noch Werkswerte, deine kommen gleich.",
    hint_busy: "Die Maschine ist gerade beschäftigt.",
    dispensing: "Dein Getränk läuft",
    hint_pot: "Die Kanne geht nur direkt an der Maschine.",
    last_report: "Zuletzt gemeldet {when}",
    never: "noch nichts gemeldet",
    recipe: "Getränk",
    tab_favorites: "Favoriten",
    tab_hot: "Heiß",
    tab_cold: "Kalt",
    tab_togo: "To Go",
    tab_custom: "Eigene",
    profile: "Profil",
    adjust: "Anpassen",
    overridden: "nur für dieses Mal",
    tea_0: "Weißer Tee",
    tea_1: "Grüner Tee",
    tea_2: "Oolong Tee",
    tea_3: "Schwarzer Tee",
    maintenance: "Pflege",
    grounds: "Satzbehälter",
    descale: "Bis zum Entkalken",
    filter: "Wasserfilter übrig",
    counters: "Zähler",
    total: "Getränke gesamt",
    aborted: "Abgebrochen",
    descales: "Entkalkungen",
    water_total: "Wasser gesamt",
    settings: "Einstellungen",
    info: "Infos",
    stats_updated: "Zählerstand von",
    firmware: "Firmware WLAN-Modul",
    alarms: "Bitte kurz kümmern",
    ed_mode: "Modus",
    ed_mode_full: "Alles",
    ed_mode_control: "Nur Bedienung",
    ed_mode_status: "Nur Status",
    ed_mode_row: "Zeile (wie eine Kachel)",
    ed_tap_action: "Antippen der Zeile",
    ed_hold_action: "Halten der Zeile",
    ed_hide: "Bereiche ausblenden",
    ed_hide_header: "Kopf",
    ed_hide_recipes: "Getränke",
    ed_hide_sliders: "Anpassen",
    ed_hide_profile: "Profil",
    ed_hide_alarms: "Warnungen",
    ed_hide_maintenance: "Wartung",
    ed_hide_title: "Titel",
    ed_hide_favorites: "Favoriten",
    ed_hide_settings: "Maschineneinstellungen",
    ed_name: "Titel",
    ed_tab_labels: "Text auf den Tabs zeigen",
    ed_show_default_profiles: "Profile mit Werksnamen zeigen",
    ed_device_id: "Maschine (nur bei mehreren nötig)",
    ed_images: "Bilder (optional)",
    ed_device: "Bild der Maschine (URL)",
    ed_drinks: "Getränkebilder (URL mit {drink})",
    ed_tabs: "Tab-Bilder (URL mit {tab})",
  },
};

function uiText(key) {
  const lang = (document.documentElement.lang || navigator.language || "en").split("-")[0];
  return (TEXT[lang] || TEXT.en)[key] || TEXT.en[key] || key;
}

// Coffee pot and cold brew pot: the app only offers them on the machine (cups are set there).
const POT_IDS = [23, 122];
// Cold and cold to-go drinks, sorted like the app (machines with cold brew).
function isColdSave(id) {
  return (id >= 50 && id < 58) || id === 27 || (id >= 120 && id < 125) || (id >= 100 && id < 108) || (id >= 140 && id < 143);
}

const EMPTY = ["unknown", "unavailable", "none", ""];
const STANDBY = ["in_standby", "going_to_sleep", "sleeping", "deep_sleep"];
const IDLE = ["ready"];
const MODES = ["full", "control", "status", "row"];
// How long a pressed button waits for the machine before it gives up showing a spinner.
const WAIT_MS = 30000;

// Machine status -> theme color variable
function statusColor(s) {
  if (!s || EMPTY.includes(s)) return "var(--secondary-text-color)";
  if (STANDBY.includes(s)) return "var(--secondary-text-color)";
  if (s === "waking_up") return "var(--info-color)";
  if (IDLE.includes(s)) return "var(--success-color)";
  return "var(--state-climate-heat-color, var(--orange-color))";
}

// Parameter order in the card (translation_key of the number entities)
const PARAMS = ["param_coffee", "param_water", "param_milk", "param_taste", "param_the_temp"];

// Binary sensors shown as warnings when on (besides every alarm_*)
const EXTRA_ALARMS = ["is_watertank_empty", "switch_water_tank_absent", "switch_water_level_low"];

// Custom recipes carry a picture number set on the machine. Like the Coffee Link app,
// the number stands for one of the drinks (0 cappuccino, 1 espresso, 2 latte macchiato …);
// 18 and 20-25 were checked on the machine's display (18 espresso, 20 cold coffee, 21 to-go cappuccino).
const SYMBOL_DRINK = [
  "cappuccino", "espresso", "latte_macchiato", "double_espresso", "caffe_latte", "doppio_plus",
  "hot_milk", "americano", "cappuccino_plus", "coffee", "espresso_macchiato", "flat_white",
  "hot_water", "cold_milk", "long_coffee", "steam", "chocolate", "cappuccino_mix", "espresso", "tea",
  "cold_coffee", "togo_cappuccino", "cappuccino", "cappuccino", "cappuccino", "cappuccino",
];

// Icon per drink (own mapping from public MDI icons; pictures are optional via `images`)
function drinkIcon(key) {
  const k = String(key).toLowerCase();
  if (k.includes("tea")) return "mdi:tea";
  if (k.includes("hot_water") || k === "steam") return "mdi:kettle-steam";
  if (k === "cold_milk" || k === "chocolate") return "mdi:cup";
  if (k.includes("pot")) return "mdi:coffee-maker";
  if (k.startsWith("mug_") || k.endsWith("_mug")) return "mdi:glass-mug-variant";
  if (k.includes("iced") || k.includes("ice") || k.includes("cold_brew")) return "mdi:cup-water";
  if (k.includes("milk") && !k.includes("macchiato") && !k.includes("latte")) return "mdi:cup";
  if (/(cappuccino|latte|macchiato|flat_white|cortado)/.test(k)) return "mdi:coffee-to-go";
  if (/(espresso|doppio|ristretto)/.test(k)) return "mdi:coffee-outline";
  return "mdi:coffee";
}

// To go drinks are chosen hot or cold on the machine as well: 100-107 and 140-142 are cold.
function togoKind(option, id) {
  if (Number.isInteger(id)) return (id >= 100 && id < 108) || (id >= 140 && id < 143) ? "cold" : "hot";
  return /(iced|over_ice|cold_brew)/.test(String(option)) ? "cold" : "hot";
}

const TABS = ["favorites", "hot", "cold", "togo", "custom"];
const TAB_ICON = {
  favorites: "mdi:heart-outline",
  hot: "mdi:coffee",
  cold: "mdi:cube-outline",
  togo: "mdi:coffee-to-go-outline",
  custom: "mdi:star-circle-outline",
};

// Tab of a drink. With the beverage id (attribute `option_beverages` of the
// recipe select) the groups are the ones of the app and the machine:
// 50-57 and 120-124 cold, 80-86 and 100-107 and 140-142 to go, 230-235 your own
// recipes, 27 (brew over ice) cold, everything else hot. Without ids the
// drink's name decides.
// Machine states that always mean a hot drink (also when it was started on the machine).
const HOT_STATUSES = ["dispensing_hot_water", "preparing_steam"];

// "hot" or "cold" for a drink, from the tab it belongs to (custom recipes: from their picture).
function drinkKind(option, id, icons) {
  const tab = tabOf(option, id);
  if (tab === "cold") return "cold";
  if (tab === "togo") return togoKind(option, id);
  if (tab === "custom") {
    const key = SYMBOL_DRINK[(icons || {})[option]];
    return /(iced|over_ice|cold)/.test(String(key || "")) ? "cold" : "hot";
  }
  return "hot";
}
function tabOf(option, id) {
  if (Number.isInteger(id)) {
    if (id >= 230 && id <= 235) return "custom";
    if ((id >= 80 && id < 87) || (id >= 100 && id < 108) || (id >= 140 && id < 143)) return "togo";
    if ((id >= 50 && id < 58) || (id >= 120 && id < 125) || id === 27) return "cold";
    return "hot";
  }
  const k = String(option);
  if (!/^[a-z0-9_]+$/.test(k)) return "custom";
  if (k.startsWith("mug_") || k.endsWith("_mug")) return "togo";
  if (/(iced|over_ice|cold_brew)/.test(k)) return "cold";
  return "hot";
}

class CremalinkCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._sig = null;
    this._lastStates = null;
    this._busy = new Set();
    this._busyFrom = {}; // entity -> its state when the command was sent
    this._picking = {}; // select entity -> option asked for, until the machine reports it
    this._pending = {};
    this._timers = {};
    this._message = "";
    const open = this._loadOpen();
    this._maintOpen = open.maint === true;
    this._settingsOpen = open.settings === true;
    this._tab = TABS.includes(open.tab) ? open.tab : null;
    this._togo = open.togo === "cold" ? "cold" : open.togo === "hot" ? "hot" : null;
    // Last known drink list and profiles: the machine's selects are unavailable
    // while it sleeps, but the card should still show what you can pick.
    this._cache = this._loadCache();

    this.shadowRoot.addEventListener("click", (e) => {
      const el = e.target.closest("[data-act]");
      if (!el || el.disabled) return;
      const act = el.dataset.act;
      const entity = el.dataset.entity;
      if (act === "drink" || act === "pick") this._select(entity, el.dataset.value);
      if (act === "brew") {
        this._started = { kind: this._selectedKind(), at: Date.now() };
        this._call("switch", "turn_on", entity);
      }
      if (act === "save-changes") this._saveChanges(el.dataset.brew === "1");
      if (act === "row") {
        if (this._held) this._held = false;
        else this._rowAction("tap_action");
        return;
      }
      if (act === "stop") this._call("switch", "turn_off", entity);
      if (act === "power") this._call("switch", el.dataset.on === "1" ? "turn_off" : "turn_on", entity);
      if (act === "toggle-switch") this._call("switch", el.dataset.on === "1" ? "turn_off" : "turn_on", entity);
      if (act === "step") this._step(entity, Number(el.dataset.dir));
      if (act === "tab") {
        this._tab = el.dataset.value;
        this._saveOpen();
        this._refresh();
      }
      if (act === "togo") {
        this._togo = el.dataset.value;
        this._saveOpen();
        this._refresh();
      }
      if (act === "toggle-maint") {
        this._maintOpen = !this._maintOpen;
        this._saveOpen();
        this._refresh();
      }
      if (act === "toggle-settings") {
        this._settingsOpen = !this._settingsOpen;
        this._saveOpen();
        this._refresh();
      }
    });
    this.shadowRoot.addEventListener("change", (e) => {
      const input = e.target.closest("input[data-act='type']");
      if (input) {
        this._type(input.dataset.entity, input.value);
        return;
      }
      const pick = e.target.closest("select[data-act='value']");
      if (pick) {
        this._type(pick.dataset.entity, pick.value);
        return;
      }
      const el = e.target.closest("select[data-act='select']");
      if (el) this._select(el.dataset.entity, el.value);
    });
    // A picture that does not load (no file for this drink) falls back to its icon.
    this.shadowRoot.addEventListener(
      "error",
      (e) => {
        const img = e.target;
        if (!img?.matches?.("img[data-icon]")) return;
        const icon = document.createElement("ha-icon");
        icon.setAttribute("icon", img.dataset.icon);
        img.replaceWith(icon);
      },
      true
    );
    // redraw after a drop-down closed, but only if an update was held back meanwhile
    this.shadowRoot.addEventListener("focusout", () => {
      if (!this._dirty) return;
      this._dirty = false;
      setTimeout(() => this._refresh(), 0);
    });
    this.shadowRoot.addEventListener("focusin", (e) => {
      if (e.target.matches?.("input[data-act='type']")) e.target.select();
    });
    this.shadowRoot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.matches?.("input[data-act='type']")) e.target.blur();
      if ((e.key === "Enter" || e.key === " ") && e.target.matches?.("[data-act='row']")) {
        e.preventDefault();
        this._rowAction("tap_action");
      }
    });
    // Hold on the row (not on its button) runs hold_action, if one is set.
    this.shadowRoot.addEventListener("pointerdown", (e) => {
      if (!this._config?.hold_action || e.target.closest("button") || !e.target.closest("[data-act='row']")) return;
      clearTimeout(this._holdTimer);
      this._held = false;
      this._holdTimer = setTimeout(() => {
        this._held = true;
        this._rowAction("hold_action");
      }, 500);
    });
    for (const type of ["pointerup", "pointercancel"]) {
      this.shadowRoot.addEventListener(type, () => clearTimeout(this._holdTimer));
    }
  }

  // Visual editor: Home Assistant builds the form from this description.
  static getConfigForm() {
    const options = (keys, prefix) => keys.map((v) => ({ value: v, label: uiText(`${prefix}${v}`) }));
    return {
      schema: [
        {
          name: "mode",
          default: "full",
          required: true,
          selector: { select: { mode: "dropdown", options: options(["full", "control", "status", "row"], "ed_mode_") } },
        },
        {
          name: "hide",
          selector: {
            select: {
              multiple: true,
              mode: "list",
              options: options(["header", "recipes", "sliders", "profile", "alarms", "maintenance"], "ed_hide_"),
            },
          },
        },
        { name: "name", selector: { text: {} } },
        { name: "tab_labels", default: true, selector: { boolean: {} } },
        { name: "show_default_profiles", default: false, selector: { boolean: {} } },
        { name: "device_id", selector: { device: { filter: { integration: "cremalink_ha" } } } },
        { name: "tap_action", selector: { ui_action: {} } },
        { name: "hold_action", selector: { ui_action: {} } },
        {
          type: "expandable",
          name: "images",
          title: uiText("ed_images"),
          schema: [
            { name: "device", selector: { text: {} } },
            { name: "drinks", selector: { text: {} } },
            { name: "tabs", selector: { text: {} } },
          ],
        },
      ],
      computeLabel: (schema) => uiText(`ed_${schema.name}`),
      assertConfig: (config) => {
        if (config.mode && !MODES.includes(config.mode)) throw new Error(`mode must be one of ${MODES.join(", ")}`);
        if (config.drinks) throw new Error("drinks can only be set in YAML");
      },
    };
  }

  static getStubConfig() {
    return { mode: "full" };
  }

  getCardSize() {
    const mode = this._config?.mode;
    return mode === "row" ? 1 : mode === "status" ? 3 : 10;
  }

  getGridOptions() {
    return this._config?.mode === "row" ? { rows: 1, columns: 12, min_columns: 6 } : { columns: 12, min_columns: 4 };
  }

  setConfig(config) {
    const mode = config.mode || "full";
    if (!MODES.includes(mode)) throw new Error(`mode must be one of ${MODES.join(", ")}`);
    this._config = { ...config, mode };
    this._found = null;
    this._sig = null;
    if (this._hass) this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    // keeps "reported 2 min ago" current between state changes
    this._ticker = setInterval(() => {
      if (this._hass) this._update();
    }, 30000);
  }

  disconnectedCallback() {
    clearInterval(this._ticker);
  }

  _refresh() {
    this._sig = null;
    if (this._hass) this._update();
  }

  _t(key, vars = {}) {
    const lang = (this._hass?.language || "en").split("-")[0];
    const table = TEXT[lang] || TEXT.en;
    return (table[key] || TEXT.en[key] || key).replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  }

  // ---- entity discovery -------------------------------------------------

  // Finds the machine's entities by translation key (cremalink_ha platform).
  _discover() {
    const hass = this._hass;
    let deviceId = this._config.device_id;
    if (!deviceId) {
      const first = Object.values(hass.entities).find(
        (e) => e.platform === "cremalink_ha" && e.translation_key === "cremalink_status_name"
      );
      deviceId = first?.device_id;
    }
    if (!deviceId) return null;
    const deviceName = hass.devices?.[deviceId]?.name || "";
    const found = { deviceId, deviceName, entities: {}, alarms: [], prefix: "" };
    for (const [id, reg] of Object.entries(hass.entities)) {
      if (reg.device_id !== deviceId || reg.platform !== "cremalink_ha" || !reg.translation_key) continue;
      const tk = reg.translation_key;
      found.entities[tk] = id;
      if (id.startsWith("binary_sensor.") && (tk.startsWith("alarm_") || EXTRA_ALARMS.includes(tk))) {
        found.alarms.push(id);
      }
    }
    // Entity names start with the device name (as set in the registry, which can differ
    // from the device's original name): take what all of the device's names share.
    const names = Object.values(found.entities)
      .map((id) => String(hass.states[id]?.attributes?.friendly_name || "").split(" "))
      .filter((w) => w.length > 1);
    if (names.length > 2) {
      let n = 0;
      while (names.every((w) => w[n] !== undefined && w[n] === names[0][n]) && n < names[0].length - 1) n++;
      found.prefix = names[0].slice(0, n).join(" ");
    }
    return found;
  }

  _ent(tk) {
    return this._found?.entities?.[tk];
  }

  _state(tk) {
    const id = this._ent(tk);
    return id ? this._hass.states[id] : undefined;
  }

  // Entity name without the device name in front of it.
  _label(st) {
    let name = String(st?.attributes?.friendly_name || "");
    const drop = [this._found.prefix, this._found.deviceName, this._config.name];
    for (const prefix of drop) {
      if (prefix && name.startsWith(prefix + " ")) {
        name = name.slice(prefix.length + 1);
        break;
      }
    }
    return name.trim();
  }

  // What can be done right now.
  _flags() {
    const status = this._state("cremalink_status_name")?.state;
    const brew = this._state("brew_recipe");
    const recipe = this._state("recipe");
    const standby = STANDBY.includes(status);
    const waking = status === "waking_up";
    const running = brew?.state === "on";
    const values = recipe?.attributes?.values_source;
    const selectedId = recipe?.attributes?.selected_beverage;
    const pot = POT_IDS.includes(Number(selectedId));
    const params = PARAMS.map((tk) => this._state(tk)).filter((s) => s && !EMPTY.includes(s.state));
    const brewAvailable = brew && brew.state !== "unavailable";
    let hint = "";
    if (standby) hint = "hint_standby";
    else if (waking) hint = "hint_waking";
    else if (pot) hint = "hint_pot";
    else if (recipe && recipe.state !== "unavailable" && !params.length && !running) hint = "hint_loading";
    else if (values === "default" && !running) hint = "hint_defaults";
    else if (!brewAvailable) hint = "hint_busy";
    else if (!running && status && !IDLE.includes(status)) hint = "hint_busy";
    return {
      status,
      standby,
      waking,
      running,
      values,
      params,
      pot,
      canBrew: Boolean(brewAvailable) && !running && !standby && !waking && !pot && IDLE.includes(status) && params.length > 0,
      hint,
    };
  }

  // ---- actions ----------------------------------------------------------

  // A pressed control waits for the machine: `release` ends the wait when the call
  // fails or WAIT_MS have passed (_update ends it once the entity reports the change).
  _waitFor(timer, release, domain, service, data) {
    this._message = "";
    clearTimeout(this._timers[timer]);
    this._timers[timer] = setTimeout(() => {
      release();
      this._refresh();
    }, WAIT_MS);
    this._service(domain, service, data).catch((err) => {
      release();
      this._error(err);
    });
    this._refresh();
  }

  _call(domain, service, entity) {
    if (!entity || this._busy.has(entity)) return;
    this._busy.add(entity);
    this._busyFrom[entity] = this._hass.states[entity]?.state;
    this._waitFor(`busy:${entity}`, () => this._busy.delete(entity), domain, service, { entity_id: entity });
  }

  // A select (drink, profile, setting): the pressed option shows a spinner until the
  // machine reports it.
  _select(entity, option) {
    if (!entity || this._picking[entity] !== undefined) return;
    if (this._hass.states[entity]?.state === option) return;
    this._picking[entity] = option;
    this._waitFor(`pick:${entity}`, () => delete this._picking[entity], "select", "select_option", {
      entity_id: entity,
      option,
    });
  }

  // An action of the integration while `flag` shows its button as working; true on success.
  async _action(flag, value, service, data) {
    this[flag] = value;
    this._refresh();
    try {
      await this._service("cremalink_ha", service, data);
      return true;
    } catch (err) {
      this._error(err);
      return false;
    } finally {
      this[flag] = false;
      this._refresh();
    }
  }

  _setNumber(entity, value) {
    this._service("number", "set_value", { entity_id: entity, value }).catch((err) => this._error(err));
  }

  // Every action goes through here: errors show next to the button (_error), so HA's
  // own toast is switched off to avoid the same message twice. The row has no room for
  // a message, so there Home Assistant shows its toast instead.
  _service(domain, service, data) {
    return this._hass.callService(domain, service, data, undefined, this._config?.mode === "row");
  }

  // Spinner and text for a button that is waiting for the machine.
  _spin(text) {
    return `<ha-icon icon="mdi:loading" class="spin"></ha-icon>${text ? `<span>${text}</span>` : ""}`;
  }

  _step(entity, dir) {
    const st = this._hass.states[entity];
    if (!st) return;
    const a = st.attributes;
    const step = Number(a.step) || 1;
    const base = this._pending[entity] ?? Number(st.state);
    const next = Math.min(Number(a.max), Math.max(Number(a.min), base + dir * step));
    this._pending[entity] = next;
    clearTimeout(this._timers[entity]);
    this._timers[entity] = setTimeout(() => this._setNumber(entity, next), 400);
    this._refresh();
  }

  // Typed value: snapped to the entity's range and step.
  _type(entity, raw) {
    const st = this._hass.states[entity];
    if (!st) return;
    const a = st.attributes;
    const n = Number(String(raw).replace(",", "."));
    if (!Number.isFinite(n)) {
      this._refresh();
      return;
    }
    const step = Number(a.step) || 1;
    const min = Number(a.min);
    const snapped = min + Math.round((n - min) / step) * step;
    const value = Math.min(Number(a.max), Math.max(min, snapped));
    this._pending[entity] = value;
    this._setNumber(entity, value);
    this._refresh();
  }

  _loadOpen() {
    try {
      return JSON.parse(localStorage.getItem("cremalink-card-open") || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  _loadCache() {
    try {
      return JSON.parse(localStorage.getItem("cremalink-card-cache") || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  // Remember the lists while the selects are available.
  _remember() {
    const r = this._state("recipe");
    const p = this._state("profile");
    let changed = false;
    if (r && r.state !== "unavailable" && Array.isArray(r.attributes.options)) {
      const next = {
        options: r.attributes.options,
        ids: r.attributes.option_beverages || {},
        favorites: r.attributes.favorite_beverages || [],
        icons: r.attributes.option_icons || {},
        state: r.state,
      };
      if (JSON.stringify(next) !== JSON.stringify(this._cache.recipe)) {
        this._cache.recipe = next;
        changed = true;
      }
    }
    if (p && p.state !== "unavailable" && Array.isArray(p.attributes.options)) {
      const next = { options: p.attributes.options, state: p.state };
      if (JSON.stringify(next) !== JSON.stringify(this._cache.profile)) {
        this._cache.profile = next;
        changed = true;
      }
    }
    if (!changed) return;
    try {
      localStorage.setItem("cremalink-card-cache", JSON.stringify(this._cache));
    } catch (e) {
      /* storage not available */
    }
  }

  _saveOpen() {
    try {
      localStorage.setItem(
        "cremalink-card-open",
        JSON.stringify({ maint: this._maintOpen, settings: this._settingsOpen, tab: this._tab, togo: this._togo })
      );
    } catch (e) {
      /* storage not available */
    }
  }

  // An error message, only while there is one (it takes no room otherwise).
  _msgHtml() {
    return this._message ? `<div class="msg" role="alert">${esc(this._message)}</div>` : "";
  }

  // Shows an error in the user's language: errors of the integration carry a
  // translation key (same text as HA's toast), anything else its plain message.
  async _error(err) {
    this._message = (await this._localizeError(err)) || err?.message || String(err);
    clearTimeout(this._timers.message);
    this._timers.message = setTimeout(() => {
      this._message = "";
      this._refresh();
    }, 8000);
    this._refresh();
  }

  async _localizeError(err) {
    const domain = err?.translation_domain;
    const key = err?.translation_key;
    if (!domain || !key || !this._hass?.loadBackendTranslation) return "";
    try {
      const localize = (await this._hass.loadBackendTranslation("exceptions", domain)) || this._hass.localize;
      return localize(`component.${domain}.exceptions.${key}.message`, err.translation_placeholders || {});
    } catch (e) {
      return "";
    }
  }

  // ---- rendering ---------------------------------------------------------

  _update() {
    const hass = this._hass;
    if (!hass || !this._config) return;
    if (!this._found) this._found = this._discover();
    if (!this._found) {
      this._sig = null;
      this.shadowRoot.innerHTML = `<ha-card><div style="padding:16px">${this._t("no_device")}</div></ha-card>`;
      return;
    }
    // do not redraw under an open drop-down or while typing
    const active = this.shadowRoot.activeElement?.tagName;
    if (active === "SELECT" || active === "INPUT") {
      this._dirty = true;
      return;
    }

    const ids = [...Object.values(this._found.entities)];
    const states = ids.map((id) => `${hass.states[id]?.state}`).join("|");
    this._lastStates = states;
    // a command has gone through once its own entity changed
    for (const entity of [...this._busy]) {
      if (hass.states[entity]?.state !== this._busyFrom[entity]) this._busy.delete(entity);
    }
    for (const [entity, option] of Object.entries(this._picking)) {
      if (hass.states[entity]?.state === option) delete this._picking[entity];
    }
    for (const [entity, value] of Object.entries(this._pending)) {
      if (Number(hass.states[entity]?.state) === value) delete this._pending[entity];
    }
    const recipeAttrs = this._state("recipe")?.attributes || {};
    const status = this._state("cremalink_status_name");
    const sig = [
      states,
      hass.language,
      status ? hass.formatEntityState(status) : "",
      recipeAttrs.values_source,
      [...this._busy].join(","),
      JSON.stringify(this._picking),
      String(this._saving),
      JSON.stringify(this._pending),
      this._message,
      this._maintOpen,
      this._settingsOpen,
      this._tab,
      this._togo,
      this._config.show_default_profiles === true,
      this._config.tab_labels !== false,
      Object.keys(recipeAttrs.option_beverages || {}).length,
      JSON.stringify(recipeAttrs.option_icons || {}),
      (recipeAttrs.favorite_beverages || []).join(","),
      this._state("cremalink_last_report") ? this._since(this._state("cremalink_last_report").state) : "",
    ].join("#");
    if (sig === this._sig) return;
    this._sig = sig;
    this._remember();
    this._render();
  }

  get _hide() {
    return Array.isArray(this._config.hide) ? this._config.hide : [];
  }

  _since(iso) {
    if (!iso || EMPTY.includes(iso)) return this._t("never");
    const ms = new Date(iso).getTime() - Date.now();
    if (!Number.isFinite(ms)) return this._t("never");
    const rtf = new Intl.RelativeTimeFormat(this._hass.language, { numeric: "auto" });
    const mins = Math.round(ms / 60000);
    if (Math.abs(mins) < 60) return rtf.format(mins, "minute");
    const hours = Math.round(mins / 60);
    if (Math.abs(hours) < 48) return rtf.format(hours, "hour");
    return rtf.format(Math.round(hours / 24), "day");
  }

  _fmt(v, unit, tk) {
    // the tea "temperature" has four steps; the machine names them after the tea types
    if (tk === "param_the_temp" && Number.isInteger(Number(v)) && this._t(`tea_${v}`) !== `tea_${v}`) return this._t(`tea_${v}`);
    return unit ? `${v} ${unit}` : `${v}`;
  }

  _tkOf(entityId) {
    return Object.keys(this._found.entities).find((k) => this._found.entities[k] === entityId);
  }

  // Value in the middle of a stepper: a native picker when the list of allowed
  // values is short enough, otherwise a typed field.
  _valueField(entity, st, value, unit, off) {
    const tk = this._tkOf(entity);
    const a = st.attributes;
    const min = Number(a.min);
    const max = Number(a.max);
    const step = Number(a.step) || 1;
    const label = a.friendly_name || "";
    const count = Math.floor((max - min) / step) + 1;
    if (Number.isFinite(count) && count > 0 && count <= 300) {
      const values = [];
      for (let i = 0; i < count; i++) values.push(Math.round((min + i * step) * 100) / 100);
      if (!values.includes(value)) {
        values.push(value);
        values.sort((x, y) => x - y);
      }
      const options = values
        .map((v) => `<option value="${v}" ${v === value ? "selected" : ""}>${this._fmt(v, unit, tk)}</option>`)
        .join("");
      return `<select class="pick" data-act="value" data-entity="${entity}" aria-label="${label}" ${off}>${options}</select>`;
    }
    return `<label class="val"><input data-act="type" data-entity="${entity}" type="text" inputmode="decimal"
        value="${value}" aria-label="${label}" ${off}><span class="unit">${unit}</span></label>`;
  }

  _stepper(st) {
    const entity = st.entity_id;
    const pending = this._pending[entity];
    const value = pending !== undefined ? pending : Number(st.state);
    const unit = st.attributes.unit_of_measurement || "";
    const off = "";
    return `<div class="stepper">
      <button data-act="step" data-entity="${entity}" data-dir="-1" ${off} aria-label="-"><ha-icon icon="mdi:minus"></ha-icon></button>
      ${this._valueField(entity, st, value, unit, off)}
      <button data-act="step" data-entity="${entity}" data-dir="1" ${off} aria-label="+"><ha-icon icon="mdi:plus"></ha-icon></button>
    </div>`;
  }

  _dropdown(entity, enabled = true) {
    const st = this._hass.states[entity];
    if (!st) return "";
    const asked = this._picking[entity];
    const options = (st.attributes.options || [])
      .map((o) => {
        const sel = asked !== undefined ? o === asked : o === st.state;
        return `<option value="${esc(o)}" ${sel ? "selected" : ""}>${esc(this._hass.formatEntityState(st, o))}</option>`;
      })
      .join("");
    const select = `<select data-act="select" data-entity="${entity}" aria-label="${this._label(st)}" aria-busy="${asked !== undefined}"
      ${enabled && asked === undefined ? "" : "disabled"}>${options}</select>`;
    return asked !== undefined ? `<span class="waiting"><ha-icon icon="mdi:loading" class="spin"></ha-icon>${select}</span>` : select;
  }

  // hot or cold: the drink currently selected in the recipe picker
  _selectedKind() {
    const st = this._state("recipe");
    if (!st || st.state === "unavailable") return null;
    const id = st.attributes?.selected_beverage;
    return drinkKind(st.state, Number.isInteger(id) ? id : undefined, st.attributes?.option_icons);
  }

  // The kind of the drink that is being made, only when it is certain: the machine's own
  // status says hot water, tea or steam, or the drink was started with this card. For other
  // drinks started on the machine the monitor does not say whether they are hot or cold,
  // so nothing is claimed (null).
  _runningKind(f) {
    // hot water, tea and steam are hot whoever started them (the machine says so in its status)
    if (HOT_STATUSES.includes(f.status) || ["hot_water", "steam"].includes(this._state("cremalink_drink_phase")?.state)) return "hot";
    if (f.running) this._sawRunning = true;
    else if (this._sawRunning) {
      this._started = null;
      this._sawRunning = false;
    }
    const s = this._started;
    if (!f.running || !s || Date.now() - s.at > 10 * 60 * 1000) return null;
    return s.kind;
  }

  // What the header and the row show: name, picture, status line and progress.
  _headInfo(f) {
    const hass = this._hass;
    const status = this._state("cremalink_status_name");
    const name = this._config.name || this._found.deviceName || "Coffee machine";
    // Coffee and other drinks keep the status "ready" while they run: say what happens.
    // The integration's "drink phase" sensor says which step it is (grinding, dispensing ...).
    const phase = this._state("cremalink_drink_phase");
    const phaseText = phase && !EMPTY.includes(phase.state) && IDLE.includes(f.status) ? hass.formatEntityState(phase) : "";
    const dispensing = Boolean(phaseText) || (f.running && IDLE.includes(f.status));
    const color = statusColor(dispensing ? "dispensing" : f.status);
    const pic = this._config.images?.device;
    const visual = pic
      ? `<img class="pic" src="${pic}" alt="">`
      : `<ha-icon class="pic icon" icon="mdi:coffee-maker"></ha-icon>`;
    const progress = this._state("cremalink_progress_percent");
    const pct = progress && !EMPTY.includes(progress.state) ? Math.min(100, Math.max(0, Number(progress.state))) : 0;
    const showBar = f.running || (pct > 0 && pct < 100 && !IDLE.includes(f.status) && !f.standby);
    // warm drinks orange, cold drinks blue (theme colours); unknown keeps the status colour
    const kind = this._runningKind(f);
    const barColor = kind === "hot" ? "var(--warning-color)" : kind === "cold" ? "var(--info-color)" : color;
    const text = phaseText || (dispensing ? this._t("dispensing") : status ? hass.formatEntityState(status) : "");
    // Busy (brewing, heating, rinsing ...) as opposed to asleep, off or simply ready.
    const active = !f.standby && (dispensing || f.running || !(IDLE.includes(f.status) || EMPTY.includes(f.status ?? "")));
    return { name, visual, color, text, pct, showBar, barColor, active };
  }

  // A round icon button that waits for the machine like every other control.
  _iconBtn(act, entity, icon, label, { cls = "", extra = "" } = {}) {
    const busy = this._busy.has(entity);
    return `<button class="btn icon-only ${cls} ${busy ? "working" : ""}" data-act="${act}" data-entity="${entity}" ${extra}
      title="${label}" aria-label="${label}" aria-busy="${busy}" ${busy ? "disabled" : ""}>
      <ha-icon icon="${busy ? "mdi:loading" : icon}" class="${busy ? "spin" : ""}"></ha-icon></button>`;
  }

  _powerBtn() {
    const power = this._state("power");
    if (!power || power.state === "unavailable") return "";
    const on = power.state === "on";
    return this._iconBtn("power", power.entity_id, "mdi:power", this._t(on ? "power_off" : "power_on"), {
      cls: on ? "primary" : "",
      extra: `data-on="${on ? 1 : 0}"`,
    });
  }

  _header(f) {
    const i = this._headInfo(f);
    const report = this._state("cremalink_last_report");
    return `
      <div class="head">
        <div class="visual">${i.visual}</div>
        <div class="text">
          <div class="name">${esc(i.name)}</div>
          <div class="status" style="color:${i.color}">${i.text}</div>
          ${report ? `<div class="sub">${this._t("last_report", { when: this._since(report.state) })}</div>` : ""}
        </div>
        ${this._powerBtn()}
        ${i.showBar ? `<div class="bar"><div style="width:${i.pct}%;background:${i.barColor}"></div></div>` : ""}
      </div>`;
  }

  // One line like a tile card, for a "running now" section: picture, name, status with a
  // thin progress bar, and the one button that fits (stop while a drink runs, else power).
  _row(f) {
    const i = this._headInfo(f);
    const brew = this._state("brew_recipe");
    const button = f.running && brew
      ? this._iconBtn("stop", brew.entity_id, "mdi:stop", this._t("stop"), { cls: "stop" })
      : this._powerBtn();
    const pct = i.showBar && i.pct > 0 ? ` · ${Math.round(i.pct)} %` : "";
    return `
      <div class="tile" data-act="row" role="button" tabindex="0" aria-label="${esc(i.name)}">
        <div class="t-icon ${i.active ? "on" : ""}">${i.visual}</div>
        <div class="t-text">
          <div class="t-name">${esc(i.name)}</div>
          <div class="t-state" style="color:${i.color}">${i.text}${pct}</div>
          ${i.showBar ? `<div class="t-bar"><div style="width:${i.pct}%"></div></div>` : ""}
        </div>
        ${button}
      </div>`;
  }

  // tap_action / hold_action of the row, in Home Assistant's action format.
  _rowAction(which) {
    const a = this._config[which] || (which === "tap_action" ? { action: "more-info" } : { action: "none" });
    if (a.action === "more-info") {
      const entityId = a.entity || this._config.entity || this._state("cremalink_status_name")?.entity_id;
      if (entityId) fire(this, "hass-more-info", { entityId });
    } else if (a.action === "navigate" && a.navigation_path) {
      history.pushState(null, "", a.navigation_path);
      fire(window, "location-changed", { replace: false });
    } else if (a.action === "url" && a.url_path) {
      window.open(a.url_path, "_blank", "noopener");
    } else if (a.action === "perform-action" || a.action === "call-service") {
      const [domain, service] = String(a.perform_action || a.service || "").split(".");
      if (domain && service) {
        this._service(domain, service, { ...(a.data || a.service_data || {}), ...(a.target || {}) }).catch((err) => this._error(err));
      }
    }
  }

  _alarms(f) {
    const active = this._found.alarms
      // The milk-rinse reminder is set as the milk starts; only show it once the drink is done.
      .filter((id) => !(f?.running && this._tkOf(id) === "alarm_clean_knob"))
      .map((id) => this._hass.states[id])
      .filter((st) => st && st.state === "on");
    if (!active.length) return "";
    const chips = active
      .map((st) => `<span class="chip"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${this._label(st)}</span>`)
      .join("");
    return `<div class="alarms" role="status"><div class="alarms-title">${this._t("alarms")}</div><div class="chips">${chips}</div></div>`;
  }

  _tabVisual(tab) {
    const pattern = this._config.images?.tabs;
    return pattern
      ? `<img class="t-pic" src="${String(pattern).replace("{tab}", tab)}" data-icon="${TAB_ICON[tab]}" alt="">`
      : `<ha-icon icon="${TAB_ICON[tab]}"></ha-icon>`;
  }

  _drinkPicture(key) {
    const pattern = this._config.images?.drinks;
    return pattern ? String(pattern).replace("{drink}", key) : null;
  }

  _recipes(f) {
    const st = this._state("recipe");
    if (!st) return "";
    // While the machine sleeps the select is unavailable: show the last known list, dimmed.
    const live = st.state !== "unavailable";
    const known = live
      ? { options: st.attributes.options, ids: st.attributes.option_beverages, favorites: st.attributes.favorite_beverages, icons: st.attributes.option_icons, state: st.state }
      : this._cache.recipe;
    if (!known || !Array.isArray(known.options)) return "";
    const all = known.options || [];
    const ids = known.ids || {};
    const icons = known.icons || {};
    const picking = this._picking[st.entity_id];
    const locked = !live || f.running || picking !== undefined;
    const wanted = Array.isArray(this._config.drinks) ? this._config.drinks : null;
    const options = all.filter((o) => (wanted ? wanted.includes(o) : true));
    // keep the machine's order inside each tab (the options come in menu order)
    const groups = { favorites: [], hot: [], cold: [], togo: [], custom: [] };
    for (const o of options) groups[tabOf(o, ids[o])].push(o);
    // favourites of the active profile, in the machine's favourite order
    const byId = Object.fromEntries(options.filter((o) => Number.isInteger(ids[o])).map((o) => [ids[o], o]));
    groups.favorites = (known.favorites || []).map((id) => byId[id]).filter(Boolean);
    // to go: hot first, then cold, like the machine's display
    const present = TABS.filter((t) => groups[t].length);
    if (!present.length) return "";
    const current = options.includes(known.state) ? tabOf(known.state, ids[known.state]) : null;
    const tab = this._tab && present.includes(this._tab) ? this._tab : present.includes(current) ? current : present[0];
    const labels = this._config.tab_labels !== false;
    const tabs = present
      .map(
        (t) => `<button class="tab ${t === tab ? "on" : ""}" role="tab" aria-selected="${t === tab}"
          data-act="tab" data-value="${t}" title="${this._t(`tab_${t}`)}" aria-label="${this._t(`tab_${t}`)}">${this._tabVisual(t)}${labels ? `<span>${this._t(`tab_${t}`)}</span>` : ""}</button>`
      )
      .join("");
    let shown = groups[tab];
    let sub = "";
    if (tab === "togo") {
      const kinds = { hot: [], cold: [] };
      for (const o of shown) kinds[togoKind(o, ids[o])].push(o);
      const both = kinds.hot.length && kinds.cold.length;
      if (both) {
        const selKind = options.includes(known.state) && tabOf(known.state, ids[known.state]) === "togo" ? togoKind(known.state, ids[known.state]) : null;
        const kind = this._togo && kinds[this._togo].length ? this._togo : selKind || "hot";
        shown = kinds[kind];
        sub = `<div class="seg sub" role="radiogroup">${["hot", "cold"]
          .map(
            (k) => `<button class="seg-btn ${k === kind ? "on" : ""}" role="radio" aria-checked="${k === kind}" data-act="togo" data-value="${k}">
              <ha-icon icon="${TAB_ICON[k]}"></ha-icon>${this._t(`tab_${k}`)}</button>`
          )
          .join("")}</div>`;
      }
    }
    const tiles = shown
      .map((o) => {
        const asked = picking === o;
        const sel = live && (asked || (picking === undefined && o === st.state));
        // a custom recipe is drawn like the drink its picture number stands for
        const key = SYMBOL_DRINK[icons[o]] || o;
        const picture = this._drinkPicture(key);
        const visual = asked
          ? `<ha-icon icon="mdi:loading" class="spin"></ha-icon>`
          : picture
            ? `<img class="d-pic" src="${picture}" data-icon="${drinkIcon(key)}" alt="" loading="lazy">`
            : `<ha-icon icon="${drinkIcon(key)}"></ha-icon>`;
        return `<button class="drink ${sel ? "sel" : ""} ${asked ? "working" : ""}" data-act="drink" data-entity="${st.entity_id}" data-value="${esc(o)}"
            aria-pressed="${sel}" aria-busy="${asked}" ${locked ? "disabled" : ""}>
            ${visual}<span class="d-name">${esc(this._hass.formatEntityState(st, o))}</span></button>`;
      })
      .join("");
    return `<div class="section"><div class="tabs ${labels ? "" : "icons"}" role="tablist">${tabs}</div>${sub}<div class="drinks">${tiles}</div></div>`;
  }

  _sliders(f) {
    if (!f.params.length || f.pot) return "";
    const recipe = this._state("recipe");
    const rows = f.params
      .map((st) => {
        const over = st.attributes.overridden ? `<span class="dot" title="${this._t("overridden")}" aria-label="${this._t("overridden")}"></span>` : "";
        return `<div class="slider"><div class="s-label">${this._label(st)}${over}</div>${this._stepper(st)}</div>`;
      })
      .join("");
    return `<div class="section"><div class="sliders">${rows}</div>${this._saveBar(f)}</div>`;
  }

  // Changed amounts of one of your own recipes can stay in the recipe (the machine stores
  // them), with or without pouring the drink.
  // The changed sliders that can be kept, by action field. Like the app: for cold and
  // cold to-go drinks the machine keeps the coffee, milk and water amounts fixed.
  _savableChanges(f, id) {
    const fields = { 1: "coffee", 2: "taste", 9: "milk", 15: "water", 13: "tea_temperature" };
    const fixed = isColdSave(id) ? [1, 9, 15] : [];
    const custom = id >= 230 && id <= 235;
    const out = {};
    for (const st of f.params) {
      const pid = st.attributes.param_id;
      if (!st.attributes.overridden || !fields[pid] || fixed.includes(pid)) continue;
      if (custom && pid === 13) continue; // a custom place has no tea temperature
      const pending = this._pending[st.entity_id];
      out[fields[pid]] = pending !== undefined ? pending : Number(st.state);
    }
    return out;
  }

  // Changed values can stay in the recipe (custom recipe) or in the profile (standard
  // drink), with or without pouring the drink - like "save" in the Coffee Link app.
  _saveBar(f) {
    const recipe = this._state("recipe");
    const id = Number(recipe?.attributes?.selected_beverage);
    if (!recipe || recipe.state === "unavailable" || !Number.isInteger(id) || f.pot) return "";
    // While saving, the bar stays (the reloaded values may already match).
    if (!this._saving && !Object.keys(this._savableChanges(f, id)).length) return "";
    const custom = id >= 230 && id <= 235;
    const off = f.running || !f.canBrew || this._saving ? "disabled" : "";
    // The pressed button shows what is going on; saving and brewing can take ~30 s.
    const label = (brew, text) =>
      this._saving === (brew ? "brew" : "save")
        ? this._spin(this._t(brew ? "sc_saving_brew" : "saving"))
        : `<span>${this._t(text)}</span>`;
    return `<div class="savebar">
      <div class="actions">
        <button class="btn ${this._saving === "save" ? "working" : ""}" data-act="save-changes" data-brew="0" aria-busy="${this._saving === "save"}" ${off}>${label(false, custom ? "sc_save" : "sc_save_profile")}</button>
        <button class="btn ${this._saving === "brew" ? "working" : ""}" data-act="save-changes" data-brew="1" aria-busy="${this._saving === "brew"}" ${off}>${label(true, "sc_save_brew")}</button>
      </div></div>`;
  }

  async _saveChanges(brew) {
    const recipe = this._state("recipe");
    const id = Number(recipe?.attributes?.selected_beverage);
    if (!recipe || !Number.isInteger(id) || this._saving) return;
    const changes = this._savableChanges(this._flags(), id);
    let service = "save_drink";
    let data = { device_id: this._found.deviceId, beverage: id, brew, ...changes };
    if (id >= 230 && id <= 235) {
      service = "save_recipe";
      data = {
        device_id: this._found.deviceId,
        slot: id - 229,
        name: recipe.state,
        icon: Number(recipe.attributes.option_icons?.[recipe.state] ?? 0),
        brew,
        ...changes,
      };
    }
    await this._action("_saving", brew ? "brew" : "save", service, data);
  }

  _brew(f) {
    const brew = this._state("brew_recipe");
    if (!brew) return "";
    const busy = this._busy.has(brew.entity_id);
    if (f.running) {
      const label = busy ? this._t("stopping") : this._t("stop");
      return `
      <div class="brew">
        <button class="btn big stop ${busy ? "working" : ""}" data-act="stop" data-entity="${brew.entity_id}" aria-busy="${busy}" ${busy ? "disabled" : ""}>
          <ha-icon icon="${busy ? "mdi:loading" : "mdi:stop"}" class="${busy ? "spin" : ""}"></ha-icon><span>${label}</span></button>
      </div>`;
    }
    const label = busy ? this._t("starting") : this._t("brew");
    const icon = busy ? "mdi:loading" : "mdi:coffee";
    const spin = busy ? "spin" : "";
    const enabled = f.canBrew && !busy && !this._saving;
    return `
      <div class="brew">
        <button class="btn primary big ${busy ? "working" : ""}" data-act="brew" data-entity="${brew.entity_id}" aria-busy="${busy}" ${enabled ? "" : "disabled"}>
          <ha-icon icon="${icon}" class="${spin}"></ha-icon><span>${label}</span></button>
        ${f.hint ? `<div class="hint center">${this._t(f.hint)}</div>` : ""}
      </div>`;
  }

  // Profiles as buttons. A profile still carrying the factory name ("<word> <slot>",
  // e.g. "Explorer 3" in slot 3) is not set up and is left out, except the active one.
  _profile() {
    const st = this._state("profile");
    if (!st) return "";
    const live = st.state !== "unavailable";
    const known = live ? { options: st.attributes.options, state: st.state } : this._cache.profile;
    if (!known || !Array.isArray(known.options)) return "";
    const all = known.options;
    const showAll = this._config.show_default_profiles === true;
    const options = all.filter(
      (o, i) => showAll || o === known.state || !new RegExp(`^\\D+\\s*${i + 1}$`).test(String(o).trim())
    );
    if (!options.length) return "";
    const picking = this._picking[st.entity_id];
    const brewing = !live || this._state("brew_recipe")?.state === "on" || picking !== undefined;
    const buttons = options
      .map((o) => {
        const asked = picking === o;
        const sel = asked || (picking === undefined && o === known.state);
        const text = esc(this._hass.formatEntityState(st, o));
        return `<button class="seg-btn ${sel ? "on" : ""} ${asked ? "working" : ""}" role="radio" aria-checked="${sel}" aria-busy="${asked}" data-act="pick"
          data-entity="${st.entity_id}" data-value="${esc(o)}" ${brewing ? "disabled" : ""}>${asked ? this._spin(text) : text}</button>`;
      })
      .join("");
    return `<div class="section-title">${this._t("profile")}</div><div class="seg" role="radiogroup">${buttons}</div>`;
  }

  // `left`: the bar shows what is left (descaling, filter), so it needs attention when low;
  // otherwise it is a fill level (grounds container) that needs attention when high.
  _bar(tk, label, left = false) {
    const st = this._state(tk);
    if (!st || EMPTY.includes(st.state)) return "";
    const n = Math.min(100, Math.max(0, Number(st.state)));
    // a level of the machine: accent colour, and the warning colour once it needs attention
    const due = left ? n <= 10 : n >= 90;
    const color = due ? "var(--warning-color)" : "var(--accent-color)";
    return `<div class="meter"><div class="m-head"><span>${label}</span><span>${Math.round(n)} %</span></div>
      <div class="bar"><div style="width:${n}%;background:${color}"></div></div></div>`;
  }

  _fold(act, open, title, inner) {
    return `<div class="fold">
      <button class="fold-toggle" data-act="${act}" aria-expanded="${open}">
        <span>${title}</span><ha-icon icon="${open ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon></button>
      ${open ? inner : ""}</div>`;
  }

  _maintenance() {
    const bars =
      this._bar("stat_grounds_container_percentage", this._t("grounds")) +
      this._bar("stat_descale_remaining", this._t("descale"), true) +
      this._bar("stat_filter_remaining", this._t("filter"), true);
    const counter = (tk, label) => {
      const st = this._state(tk);
      return st && !EMPTY.includes(st.state)
        ? `<div class="kv"><span>${label}</span><span>${this._hass.formatEntityState(st)}</span></div>`
        : "";
    };
    const counters =
      counter("stat_total_beverages", this._t("total")) +
      counter("stat_descales", this._t("descales")) +
      counter("stat_water_total_quantity", this._t("water_total")) +
      counter("stat_aborted_beverages", this._t("aborted"));
    if (!bars && !counters) return "";
    return this._fold("toggle-maint", this._maintOpen, this._t("maintenance"), `${bars}${counters ? `<div class="kvs">${counters}</div>` : ""}`);
  }

  _settings() {
    const rows = [];
    for (const tk of ["setting_beep", "setting_energy_saving"]) {
      const st = this._state(tk);
      if (!st || st.state === "unavailable") continue;
      const on = st.state === "on";
      const busy = this._busy.has(st.entity_id);
      rows.push(`<div class="row"><div class="row-label">${this._label(st)}</div>
        <span class="waiting">${busy ? `<ha-icon icon="mdi:loading" class="spin"></ha-icon>` : ""}
        <button class="switch ${on ? "on" : ""}" data-act="toggle-switch" data-entity="${st.entity_id}" data-on="${on ? 1 : 0}"
          role="switch" aria-checked="${on}" aria-busy="${busy}" aria-label="${this._label(st)}" ${busy ? "disabled" : ""}><span></span></button></span></div>`);
    }
    for (const tk of ["setting_temperature", "setting_auto_off", "setting_water_hardness"]) {
      const st = this._state(tk);
      if (!st || st.state === "unavailable") continue;
      rows.push(`<div class="row"><div class="row-label">${this._label(st)}</div>${this._dropdown(st.entity_id)}</div>`);
    }
    const stamp = this._state("cremalink_statistics_updated");
    const fw = this._state("firmware_wifi_module");
    const info = [
      stamp && !EMPTY.includes(stamp.state)
        ? `<div class="kv"><span>${this._t("stats_updated")}</span><span>${this._hass.formatEntityState(stamp)}</span></div>`
        : "",
      fw && !EMPTY.includes(fw.state)
        ? `<div class="kv"><span>${this._t("firmware")}</span><span>${fw.state}</span></div>`
        : "",
    ].join("");
    if (!rows.length && !info) return "";
    return this._fold("toggle-settings", this._settingsOpen, this._t("settings"), `${rows.join("")}${info ? `<div class="kvs">${info}</div>` : ""}`);
  }

  // The stylesheet of the main card; the admin card builds on it.
  _css() {
    return `
        :host { display: block; container-type: inline-size; }
        ha-card { padding: 12px 14px; }
        ha-card.tile-card { padding: 6px 8px; }
        .tile { flex: 1; display: flex; align-items: center; gap: 10px; min-height: 44px; cursor: pointer; border-radius: var(--ha-card-border-radius, 12px); }
        .tile:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .t-icon { width: 40px; height: 40px; border-radius: 50%; flex: none; overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--disabled-color) 20%, transparent); color: var(--state-inactive-color); --mdc-icon-size: 24px; }
        .t-icon.on { background: color-mix(in srgb, var(--accent-color) 20%, transparent); color: var(--accent-color); }
        .t-icon .pic { width: 100%; height: 100%; object-fit: cover; }
        .t-icon ha-icon.pic { width: auto; height: auto; --mdc-icon-size: 24px; color: inherit; }
        .t-text { flex: 1; min-width: 0; }
        .t-name { font-size: 14px; font-weight: 500; line-height: 20px; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .t-state { font-size: 12px; line-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .t-bar { margin-top: 3px; height: 3px; border-radius: 2px; background: var(--divider-color); overflow: hidden; }
        .t-bar > div { height: 100%; background: var(--accent-color); }
        .tile .btn.icon-only { border-radius: 50%; flex: none; }
        .head { display: grid; grid-template-columns: 56px minmax(0, 1fr) auto; column-gap: 14px; align-items: center;
          padding: 10px 12px; border-radius: var(--ha-card-border-radius, 12px); background: var(--secondary-background-color); }
        .text { display: flex; flex-direction: column; min-width: 0; }
        .name { font-size: 14px; color: var(--secondary-text-color); line-height: 1.2; }
        .status { font-size: 22px; line-height: 1.2; font-weight: 600; }
        .sub { font-size: 12px; color: var(--secondary-text-color); }
        .pic { width: 100%; display: block; }
        .icon { --mdc-icon-size: 44px; color: var(--secondary-text-color); display: flex; justify-content: center; }
        .bar { grid-column: 1 / -1; margin-top: 8px; height: 6px; border-radius: 3px; background: var(--divider-color); overflow: hidden; }
        .bar div { height: 100%; border-radius: 3px; }

        .alarms { margin-top: 10px; padding: 8px 12px; border-radius: var(--ha-card-border-radius, 12px);
          border: 1px solid var(--warning-color); }
        .alarms-title { font-size: 13px; color: var(--secondary-text-color); margin-bottom: 4px; }
        .chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .chip { display: inline-flex; align-items: center; gap: 4px; font-size: 14px; color: var(--warning-color); }
        .chip ha-icon { --mdc-icon-size: 18px; }

        .main { display: grid; grid-template-columns: minmax(0, 1fr); column-gap: 16px; }
        .col:empty { display: none; }
        .section { margin-top: 14px; }
        .seg, .tabs { display: flex; margin-bottom: 8px; overflow: hidden; border: 1px solid var(--divider-color);
          border-radius: var(--ha-card-border-radius, 12px); }
        .tab, .seg-btn { all: unset; box-sizing: border-box; flex: 1 1 0; min-width: 0; min-height: 36px; padding: 0 10px;
          display: flex; align-items: center; justify-content: center; text-align: center; cursor: pointer;
          font-size: 14px; color: var(--secondary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tab + .tab, .seg-btn + .seg-btn { border-left: 1px solid var(--divider-color); }
        .tab { flex-direction: column; gap: 2px; padding: 6px 4px; min-height: 64px; font-size: 13px; }
        .tab ha-icon { --mdc-icon-size: 28px; flex: none; }
        .t-pic { width: 36px; height: 36px; object-fit: contain; flex: none; }
        .tab span { overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
        .tabs.icons .tab { min-height: 52px; }
        .tab:hover, .seg-btn:hover { background: var(--secondary-background-color); }
        .tab.on, .seg-btn.on { background: var(--primary-color); color: var(--text-primary-color); }
        .tab:focus-visible, .seg-btn:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
        .seg.sub { margin: -2px 0 8px; }
        .seg.sub .seg-btn { min-height: 34px; gap: 6px; }
        .seg.sub ha-icon { --mdc-icon-size: 18px; }
        .seg-btn[disabled] { opacity: .5; cursor: default; pointer-events: none; }
        @container (min-width: 620px) {
          .main { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
          .drinks { max-height: 340px; }
        }
        @container (max-width: 480px) {
          .tab { font-size: 12px; padding: 4px 2px; }
        }
        @container (max-width: 360px) {
          ha-card { padding: 10px; }
          .head { grid-template-columns: 44px minmax(0, 1fr) auto; column-gap: 10px; }
          .icon { --mdc-icon-size: 34px; }
          .status { font-size: 18px; }
          .drinks { grid-template-columns: repeat(auto-fill, minmax(78px, 1fr)); }
          .d-name { font-size: 11px; }
          .seg-btn { padding: 0 4px; font-size: 13px; }
        }
        .section-title { font-size: 14px; color: var(--secondary-text-color); margin-bottom: 6px; }
        .savebar { margin-top: 10px; }
        .savebar .actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
        .drinks { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 6px;
          max-height: 232px; overflow-y: auto; padding: 2px; }
        .drink { all: unset; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; padding: 8px 4px; min-height: 76px; text-align: center; cursor: pointer;
          border-radius: var(--ha-card-border-radius, 12px); border: 1px solid var(--divider-color);
          background: var(--card-background-color); color: var(--primary-text-color); }
        .drink:hover { background: var(--secondary-background-color); }
        .drink.sel { border-color: var(--primary-color); box-shadow: inset 0 0 0 1px var(--primary-color); background: var(--secondary-background-color); }
        .drink ha-icon { --mdc-icon-size: 26px; color: var(--secondary-text-color); }
        .drink.sel ha-icon { color: var(--primary-color); }
        .d-pic { width: 44px; height: 44px; object-fit: contain; }
        .d-name { font-size: 12px; line-height: 1.2; overflow-wrap: anywhere; display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .drink:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .drink[disabled] { opacity: .5; cursor: default; pointer-events: none; }

        .sliders { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; }
        .s-label { font-size: 13px; color: var(--secondary-text-color); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dot { display: inline-block; width: 8px; height: 8px; margin-left: 6px; border-radius: 50%; background: var(--accent-color, var(--primary-color)); vertical-align: middle; }
        .hint { font-size: 12px; color: var(--secondary-text-color); }
        .hint.center { text-align: center; margin-top: 6px; }

        select, .btn, .stepper { box-sizing: border-box; min-height: 44px; border-radius: var(--ha-card-border-radius, 12px);
          border: 1px solid var(--divider-color); background: var(--card-background-color);
          color: var(--primary-text-color); font: inherit; }
        select { width: 100%; padding: 0 8px; min-width: 0; text-overflow: ellipsis; }
        .stepper { display: flex; align-items: center; justify-content: space-between; overflow: hidden; }
        .stepper button { all: unset; box-sizing: border-box; width: 44px; align-self: stretch; display: flex;
          align-items: center; justify-content: center; cursor: pointer; color: var(--primary-text-color); }
        .stepper button:hover { background: var(--secondary-background-color); }
        .stepper .val { display: flex; align-items: baseline; justify-content: center; gap: 2px; min-width: 0;
          font-weight: 500; white-space: nowrap; }
        .stepper select.pick { appearance: none; -webkit-appearance: none; border: 0; background: transparent;
          min-height: 0; padding: 0; width: auto; flex: 1; min-width: 0; text-align: center; text-align-last: center;
          font-size: 15px; font-weight: 500; color: var(--primary-text-color); }
        .stepper input { all: unset; box-sizing: content-box; width: 4ch; text-align: right; font-size: 15px;
          color: var(--primary-text-color); user-select: text; -webkit-user-select: text; }
        .unit { font-size: 12px; color: var(--secondary-text-color); }
        .stepper ha-icon { --mdc-icon-size: 18px; }

        .btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 12px; cursor: pointer; }
        .btn.icon-only { width: 44px; padding: 0; }
        .btn:hover { background: var(--secondary-background-color); }
        .btn ha-icon { --mdc-icon-size: 20px; }
        .btn.primary { background: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary-color); }
        .btn.primary:hover { filter: brightness(1.08); }
        .btn.stop { background: var(--error-color); border-color: var(--error-color); color: var(--text-primary-color); }
        .btn.stop:hover { filter: brightness(1.08); }
        .btn.danger { color: var(--error-color); border-color: var(--error-color); }
        .btn.big { width: 100%; min-height: 48px; font-size: 16px; font-weight: 600; }
        .brew { margin-top: 14px; }
        button[disabled], select[disabled] { opacity: .4; cursor: default; pointer-events: none; }
        button.working[disabled], .drink.working[disabled], .slot.working:disabled { opacity: 1; }
        .waiting { display: inline-flex; align-items: center; gap: 6px; }
        .waiting ha-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
        button:focus-visible, select:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .spin { animation: none; } }

        .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 4px 0; }
        .row-label { font-size: 14px; flex: none; }
        .row select { max-width: 60%; }
        .switch { all: unset; box-sizing: border-box; width: 44px; height: 24px; border-radius: 12px; cursor: pointer;
          background: var(--divider-color); position: relative; flex: none; }
        .switch span { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%;
          background: var(--card-background-color); transition: left .15s; }
        .switch.on { background: var(--primary-color); }
        .switch.on span { left: 23px; }
        .switch:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }

        .fold { margin-top: 12px; padding: 4px 12px; border-radius: var(--ha-card-border-radius, 12px);
          background: var(--secondary-background-color); }
        .fold-toggle { all: unset; box-sizing: border-box; width: 100%; min-height: 40px; display: flex; align-items: center;
          justify-content: space-between; cursor: pointer; font-size: 14px; color: var(--secondary-text-color); }
        .fold-toggle:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .meter { padding: 4px 0 8px; }
        .m-head { display: flex; justify-content: space-between; font-size: 14px; }
        .meter .bar { margin-top: 4px; }
        .kvs { padding: 4px 0 8px; }
        .kv { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; padding: 2px 0; }
        .kv span:first-child { color: var(--secondary-text-color); }
        .msg { min-height: 1.2em; margin-top: 8px; font-size: 13px; color: var(--error-color); }
      `;
  }

  _render() {
    const mode = this._config.mode;
    const hide = this._hide;
    const f = this._flags();
    if (mode === "row") {
      this._paint(this._row(f));
      return;
    }
    let body = "";
    if (!hide.includes("header")) body += this._header(f);
    if (!hide.includes("alarms")) body += this._alarms(f);
    // Drinks, profile, sliders and the brew button are only of use while the machine is on;
    // in standby the header with its power button, warnings and maintenance are enough.
    if (mode !== "status" && !f.standby) {
      // The profile decides the drink order and the favourites, so it comes first.
      if (!hide.includes("profile")) {
        const p = this._profile();
        if (p) body += `<div class="section">${p}</div>`;
      }
      const left = hide.includes("recipes") ? "" : this._recipes(f);
      let right = hide.includes("sliders") ? "" : this._sliders(f);
      right += this._brew(f);
      right += this._msgHtml();
      body += `<div class="main"><div class="col">${left}</div><div class="col">${right}</div></div>`;
    }
    if (mode !== "control") {
      if (!hide.includes("maintenance")) body += this._maintenance();
    }
    // without the brew column (status mode, standby) the message goes to the end
    if (mode === "status" || f.standby) body += this._msgHtml();
    this._paint(body);
  }

  _paint(body) {
    // Keep the card's height and the drinks list's scroll position while the content is
    // rebuilt; otherwise Safari on iOS jumps the page to the card on every tap.
    const height = this.offsetHeight || 0;
    const keepTop = this.shadowRoot.querySelector(".drinks")?.scrollTop || 0;
    if (height && this.style) this.style.minHeight = `${height}px`;
    this.shadowRoot.innerHTML = `
      <style>${this._css()}</style>
      <ha-card class="${this._config.mode === "row" ? "tile-card" : ""}">${body}</ha-card>`;
    const list = this.shadowRoot.querySelector(".drinks");
    if (list && keepTop) list.scrollTop = keepTop;
    this._releaseHeight();
  }

  // Let go of the held height only once the new pictures have their size: a rebuilt <img>
  // (e.g. the machine picture, whose height follows its width) is 0 px high until decoded,
  // so releasing it a frame later made the card shrink and everything below it jump.
  _releaseHeight() {
    if (!this.style) return;
    const token = (this._heightToken = (this._heightToken || 0) + 1);
    const release = () => {
      if (token === this._heightToken) this.style.minHeight = "";
    };
    // lazy drink pictures have a fixed size (and off-screen ones never load): no need to wait
    const pending = [...this.shadowRoot.querySelectorAll("img")].filter(
      (img) => !img.complete && img.loading !== "lazy"
    );
    if (!pending.length) {
      if (typeof requestAnimationFrame === "function") requestAnimationFrame(release);
      else release();
      return;
    }
    const loaded = pending.map(
      (img) => new Promise((done) => {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      })
    );
    Promise.race([Promise.all(loaded), new Promise((done) => setTimeout(done, 1000))]).then(release);
  }
}

customElements.define("cremalink-card", CremalinkCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "cremalink-card",
  name: "Cremalink Coffee Machine",
  description: "Everyday use: status, warnings, drinks, sliders and brew button for coffee machines set up with cremalink-ha.",
});

// ---- admin card -----------------------------------------------------------
// A second card in the same file for things you rarely change. It reuses the
// main card's entity discovery, texts and drink pictures; for now it holds the
// favourites editor (drag and drop, plus buttons for the keyboard and for taps).

Object.assign(TEXT.en, {
  admin_title: "Manage",
  fav_section: "Favorites",
  fav_profile: "Profile {name}",
  fav_hint: "Drag the drinks into your order, the top one comes first on the machine.",
  fav_empty: "No favorites yet. Add one below.",
  fav_add: "Add a drink …",
  fav_save: "Send to the machine",
  fav_reset: "Reset",
  saving: "Saving …",
  fav_max: "More than 12 favorites won't fit.",
  asleep: "The machine is asleep. Wake it up for a moment.",
  fav_grip: "Drag to reorder",
  fav_up: "Move up",
  fav_down: "Move down",
  fav_remove: "Remove from favorites",
  sc_save: "Save in recipe",
  sc_save_brew: "Save & go",
  sc_save_profile: "Save in profile",
  sc_saving_brew: "Saving, then off it goes …",
  rec_deleting: "Deleting …",
  rec_loading: "Fetching the recipe …",
  rec_coffee: "Coffee",
  rec_milk: "Milk",
  rec_water: "Hot water",
  rec_coffee_ml: "Amount (ml)",
  rec_taste: "Strength",
  rec_milk_s: "Milk (s)",
  rec_froth: "Froth",
  rec_milk_first: "Milk first",
  rec_water_ml: "Amount (ml)",
  rec_need_ingredient: "It needs at least one ingredient.",
  rec_icons_more: "More pictures of the machine",
  rec_section: "Custom recipes",
  rec_hint: "Six places for your own drinks. Tap one.",
  rec_slot: "Place {n}",
  rec_empty: "empty",
  rec_name: "Name (up to 10 characters)",
  rec_icon: "Picture on the machine",
  rec_save: "Only save",
  rec_delete: "Delete",
  rec_delete_sure: "Sure? Tap again.",
  rec_close: "Close",
  rec_need_name: "Your recipe still needs a name.",
  ed_hide_custom: "Custom recipes",
  ed_name_admin: "Name",
  ed_device_id_admin: "Machine",
});
Object.assign(TEXT.de, {
  admin_title: "Verwalten",
  fav_section: "Favoriten",
  fav_profile: "Profil {name}",
  fav_hint: "Zieh die Getränke in deine Reihenfolge, das oberste steht an der Maschine vorn.",
  fav_empty: "Noch keine Favoriten. Füg unten eins hinzu.",
  fav_add: "Getränk hinzufügen …",
  fav_save: "Auf die Maschine schicken",
  fav_reset: "Zurücksetzen",
  saving: "Speichert …",
  fav_max: "Mehr als 12 Favoriten passen nicht rein.",
  asleep: "Die Maschine schläft. Weck sie kurz auf.",
  fav_grip: "Zum Sortieren ziehen",
  fav_up: "Nach oben",
  fav_down: "Nach unten",
  fav_remove: "Aus den Favoriten entfernen",
  sc_save: "Im Rezept speichern",
  sc_save_brew: "Speichern & los",
  sc_save_profile: "Im Profil speichern",
  sc_saving_brew: "Speichert, dann geht's los …",
  rec_deleting: "Lösche …",
  rec_loading: "Hole das Rezept …",
  rec_coffee: "Kaffee",
  rec_milk: "Milch",
  rec_water: "Heißwasser",
  rec_coffee_ml: "Menge (ml)",
  rec_taste: "Stärke",
  rec_milk_s: "Milch (s)",
  rec_froth: "Schaum",
  rec_milk_first: "Milch zuerst",
  rec_water_ml: "Menge (ml)",
  rec_need_ingredient: "Eine Zutat braucht's mindestens.",
  rec_icons_more: "Weitere Bilder der Maschine",
  rec_section: "Eigene Rezepte",
  rec_hint: "Sechs Plätze für deine eigenen Getränke. Tipp einen an.",
  rec_slot: "Platz {n}",
  rec_empty: "leer",
  rec_name: "Name (bis 10 Zeichen)",
  rec_icon: "Bild an der Maschine",
  rec_save: "Nur speichern",
  rec_delete: "Löschen",
  rec_delete_sure: "Sicher? Nochmal tippen.",
  rec_close: "Schließen",
  rec_need_name: "Dein Rezept braucht noch einen Namen.",
  ed_hide_custom: "Eigene Rezepte",
  ed_name_admin: "Name",
  ed_device_id_admin: "Maschine",
});

const MAX_FAVORITES = 12;
const ADMIN_SECTIONS = ["favorites", "custom", "settings", "maintenance"];
// The pictures of the machine's display, by symbol number (checked on an Eletta Explore).
const DISPLAY_PICTURES = {
  en: ["Cappuccino", "Espresso", "Latte Macchiato", "2x Espresso", "Caffè Latte", "Doppio+", "Hot milk", "Americano",
    "Cappuccino Doppio+", "Coffee", "Espresso Macchiato", "Flat White", "Hot water", "Cold milk", "Long coffee", "Steam",
    "Chocolate", "Cappuccino Reverse", "Espresso (small)", "Tea", "Cold coffee", "To-go cappuccino", "Cappuccino (variant 2)",
    "Cappuccino (variant 3)", "Cappuccino (variant 4)", "Cappuccino (variant 5)"],
  de: ["Cappuccino", "Espresso", "Latte Macchiato", "2x Espresso", "Caffè Latte", "Doppio+", "Heiße Milch", "Americano",
    "Cappuccino Doppio+", "Kaffee", "Espresso Macchiato", "Flat White", "Heißwasser", "Kalte Milch", "Long Coffee", "Dampf",
    "Schokolade", "Cappuccino Reverse", "Espresso (klein)", "Tee", "Kalter Kaffee", "To-Go-Cappuccino", "Cappuccino (Variante 2)",
    "Cappuccino (Variante 3)", "Cappuccino (Variante 4)", "Cappuccino (Variante 5)"],
};
const CUSTOM_BASE = 229; // custom recipe places 1-6 are drinks 230-235
// Limits of a custom place, from the machine's own descriptor (same for all six places).
// Switching an ingredient on starts at the minimum, like the app.
const CUSTOM = { coffee: [20, 180], water: [50, 300], milk: [5, 108], taste: [0, 5], froth: [0, 2] };
const APP_PICTURES = 20; // the app offers pictures 0-19; the machine shows 20-25 too

function fire(node, type, detail) {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

class CremalinkAdminCard extends CremalinkCard {
  constructor() {
    super();
    this._draft = null; // favourites being edited, as select options in order
    this._base = ""; // the machine's list the draft started from (JSON)
    this._drag = null;
    this._saving = false;
    // Sections are open by default; what you fold is remembered per browser,
    // separately from the main card.
    let open = {};
    try {
      open = JSON.parse(localStorage.getItem("cremalink-admin-card-open") || "{}") || {};
    } catch (e) {
      /* storage not available */
    }
    this._favOpen = open.fav !== false;
    this._customOpen = open.custom !== false;
    this._rSlot = null; // place being edited (1-6)
    this._rForm = {};
    this._rBusy = false;
    this._rLoading = false;
    this._rDeleteArmed = false;
    this._maintOpen = open.maint !== false;
    this._settingsOpen = open.settings !== false;
    const root = this.shadowRoot;
    root.addEventListener("click", (e) => {
      if (e.target.closest("[data-act='toggle-fav']")) {
        this._favOpen = !this._favOpen;
        this._saveOpen();
        this._refresh();
        return;
      }
      if (e.target.closest("[data-act='toggle-custom']")) {
        this._customOpen = !this._customOpen;
        this._saveOpen();
        this._refresh();
        return;
      }
      const rec = e.target.closest("[data-rec]");
      if (rec && !rec.disabled) return this._recAction(rec.dataset.rec, rec.dataset);
      const el = e.target.closest("[data-fav]");
      if (!el || el.disabled) return;
      const key = el.dataset.key;
      const act = el.dataset.fav;
      if (act === "up" || act === "down") this._move(key, act === "up" ? -1 : 1);
      if (act === "remove") this._draft = this._draft.filter((o) => o !== key);
      if (act === "reset") this._draft = JSON.parse(this._base || "[]");
      if (act === "save") return this._save();
      this._refresh();
    });
    root.addEventListener("input", (e) => {
      const f = e.target?.dataset?.recField;
      if (f && e.target.type !== "checkbox") this._rForm[f] = e.target.value;
    });
    root.addEventListener("change", (e) => {
      const f = e.target?.dataset?.recField;
      if (f && e.target.type === "checkbox") {
        this._rForm[f] = e.target.checked;
        e.target.blur();
        return this._refresh();
      }
      if (f) this._rForm[f] = e.target.value;
      if (e.target?.dataset?.fav !== "add" || !e.target.value) return;
      if (this._draft.length < MAX_FAVORITES && !this._draft.includes(e.target.value)) this._draft.push(e.target.value);
      e.target.blur(); // the card does not redraw under an open drop-down
      this._refresh();
    });
    root.addEventListener("pointerdown", (e) => this._dragStart(e));
    root.addEventListener("pointermove", (e) => this._dragMove(e));
    root.addEventListener("pointerup", (e) => this._dragEnd(e));
    root.addEventListener("pointercancel", (e) => this._dragEnd(e));
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: "hide",
          selector: {
            select: {
              multiple: true,
              mode: "list",
              options: ["title", "favorites", "custom", "settings", "maintenance"].map((v) => ({ value: v, label: uiText(`ed_hide_${v}`) })),
            },
          },
        },
        { name: "name", selector: { text: {} } },
        { name: "device_id", selector: { device: { filter: { integration: "cremalink_ha" } } } },
      ],
      computeLabel: (schema) => (schema.name === "hide" ? uiText("ed_hide") : uiText(`ed_${schema.name}_admin`)),
    };
  }

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 8;
  }

  setConfig(config) {
    if (config.sections !== undefined) {
      const ok =
        Array.isArray(config.sections) &&
        config.sections.length > 0 &&
        config.sections.every((x) => ADMIN_SECTIONS.includes(x)) &&
        new Set(config.sections).size === config.sections.length;
      if (!ok) throw new Error(`sections must list some of: ${ADMIN_SECTIONS.join(", ")} (each once)`);
    }
    this._config = { ...config, mode: "full" };
    this._found = null;
    this._sig = null;
    if (this._hass) this._update();
  }

  // The sections to show, in the order given by `sections` (default: all, in the usual order).
  get _sectionOrder() {
    const wanted = Array.isArray(this._config.sections) ? this._config.sections : ADMIN_SECTIONS;
    return wanted.filter((x) => !this._hide.includes(x));
  }

  // switches and selects of the settings: their errors are not the recipes' or favourites'
  _call(...args) {
    this._msgAt = null;
    return super._call(...args);
  }

  _select(...args) {
    this._msgAt = null;
    return super._select(...args);
  }

  // do not redraw under a finger that is dragging
  _update() {
    if (this._drag) return;
    super._update();
  }

  // The drinks that can be favourites, from the live select or the last known list.
  _known() {
    const st = this._state("recipe");
    if (!st) return null;
    const live = st.state !== "unavailable";
    const a = st.attributes;
    const known = live
      ? { options: a.options, ids: a.option_beverages, favorites: a.favorite_beverages, icons: a.option_icons }
      : this._cache.recipe;
    if (!known || !Array.isArray(known.options)) return null;
    return { st, live, options: known.options, ids: known.ids || {}, favorites: known.favorites || [], icons: known.icons || {} };
  }

  _saveOpen() {
    try {
      localStorage.setItem(
        "cremalink-admin-card-open",
        JSON.stringify({ fav: this._favOpen, custom: this._customOpen, maint: this._maintOpen, settings: this._settingsOpen })
      );
    } catch (e) {
      /* storage not available */
    }
  }

  _move(key, dir) {
    const i = this._draft.indexOf(key);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= this._draft.length) return;
    [this._draft[i], this._draft[j]] = [this._draft[j], this._draft[i]];
  }

  async _save() {
    const known = this._known();
    if (!known || this._saving) return;
    this._msgAt = "fav";
    const ids = this._draft.map((o) => known.ids[o]).filter((id) => Number.isInteger(id));
    await this._action("_saving", true, "set_favorites", { device_id: this._found.deviceId, favorites: ids });
  }

  // ---- custom recipes -----------------------------------------------------

  _slotName(known, n) {
    const id = CUSTOM_BASE + n;
    const option = known.options.find((o) => known.ids[o] === id);
    if (!option) return null;
    const name = this._hass.formatEntityState(known.st, option);
    return /^(custom|eigenes?)\s*\d*$/i.test(name.trim()) ? null : name;
  }

  _recAction(act, data) {
    const known = this._known();
    if (!known || this._rBusy) return;
    if (act === "open") return this._recOpen(Number(data.slot));
    if (act === "close") {
      this._rSlot = null;
      this._rDeleteArmed = false;
    } else if (act === "save" || act === "brew") {
      return this._recSave(known, act === "brew");
    } else if (act === "delete") {
      if (!this._rDeleteArmed) {
        this._rDeleteArmed = true;
        return this._refresh();
      }
      return this._recDelete(known);
    }
    this._refresh();
  }

  // Opens a place with what the machine holds now (read live by the integration).
  async _recOpen(n) {
    this._msgAt = "rec";
    this._rSlot = n;
    this._rDeleteArmed = false;
    this._rLoading = true;
    this._rForm = {};
    this._refresh();
    try {
      const res = await this._hass.callWS({
        type: "call_service",
        domain: "cremalink_ha",
        service: "get_recipe",
        service_data: { device_id: this._found.deviceId, slot: n },
        return_response: true,
      });
      const r = res?.response || {};
      this._rForm = {
        name: r.name || "",
        icon: String(r.icon ?? 12),
        coffeeOn: r.coffee > 0,
        coffee: String(r.coffee > 0 ? r.coffee : CUSTOM.coffee[0]),
        taste: String(r.taste ?? 3),
        milkOn: r.milk > 0,
        milk: String(r.milk > 0 ? r.milk : CUSTOM.milk[0]),
        froth: String(r.froth ?? 1),
        milkFirst: !!r.milk_first,
        waterOn: r.water > 0,
        water: String(r.water > 0 ? r.water : CUSTOM.water[0]),
      };
    } catch (err) {
      this._rSlot = null;
      this._error(err);
    } finally {
      this._rLoading = false;
      this._refresh();
    }
  }

  async _recSave(known, brew) {
    this._msgAt = "rec";
    const f = this._rForm;
    if (!known.live) return this._error(new Error(this._t("asleep")));
    if (!(f.name || "").trim()) return this._error(new Error(this._t("rec_need_name")));
    if (!f.coffeeOn && !f.milkOn && !f.waterOn) return this._error(new Error(this._t("rec_need_ingredient")));
    const data = {
      device_id: this._found.deviceId,
      slot: this._rSlot,
      name: f.name.trim(),
      icon: Number(f.icon),
      brew,
      coffee: f.coffeeOn ? Number(f.coffee) : 0,
      milk: f.milkOn ? Number(f.milk) : 0,
      water: f.waterOn ? Number(f.water) : 0,
    };
    if (f.coffeeOn) data.taste = Number(f.taste);
    if (f.milkOn) {
      data.froth = Number(f.froth);
      data.milk_first = !!f.milkFirst;
    }
    await this._recCall("save_recipe", data, brew ? "brew" : "save");
  }

  async _recDelete(known) {
    this._msgAt = "rec";
    if (!known.live) return this._error(new Error(this._t("asleep")));
    await this._recCall("delete_recipe", { device_id: this._found.deviceId, slot: this._rSlot }, "delete");
  }

  async _recCall(service, data, which) {
    if (await this._action("_rBusy", which || true, service, data)) {
      this._rSlot = null;
      this._rDeleteArmed = false;
      this._refresh();
    }
  }

  _customSection(known) {
    // Only while the machine is awake: it cannot confirm anything in standby.
    if (!known.live) return "";
    const lang = (this._hass?.language || "en").split("-")[0];
    const names = DISPLAY_PICTURES[lang] || DISPLAY_PICTURES.en;
    const places = [1, 2, 3, 4, 5, 6]
      .map((n) => {
        const name = this._slotName(known, n);
        const on = this._rSlot === n;
        const loading = on && this._rLoading;
        return `<button class="slot ${on ? "sel" : ""} ${loading ? "working" : ""}" data-rec="open" data-slot="${n}" aria-pressed="${on}" aria-busy="${loading}" ${this._rBusy || this._rLoading ? "disabled" : ""}>
          ${loading ? `<ha-icon icon="mdi:loading" class="spin"></ha-icon>` : `<span class="snum">${n}</span>`}<span class="sname">${name ? esc(name) : `<i>${this._t("rec_empty")}</i>`}</span></button>`;
      })
      .join("");
    let form = "";
    if (this._rSlot && this._rLoading) {
      form = `<p class="note">${this._t("rec_loading")}</p>`;
    } else if (this._rSlot) {
      const f = this._rForm;
      const filled = !!this._slotName(known, this._rSlot);
      const opt = (i, label) => `<option value="${i}" ${String(i) === String(f.icon) ? "selected" : ""}>${esc(label)}</option>`;
      const icons = `<select data-rec-field="icon">
        ${names.slice(0, APP_PICTURES).map((l, i) => opt(i, l)).join("")}
        <optgroup label="${this._t("rec_icons_more")}">${names.slice(APP_PICTURES).map((l, i) => opt(i + APP_PICTURES, l)).join("")}</optgroup></select>`;
      const num = (field, label, [lo, hi]) =>
        `<label>${this._t(label)}<input type="number" inputmode="numeric" min="${lo}" max="${hi}" data-rec-field="${field}" value="${esc(f[field] ?? "")}"></label>`;
      const pick = (field, label, [lo, hi]) =>
        `<label>${this._t(label)}<select data-rec-field="${field}">${Array.from({ length: hi - lo + 1 }, (_, k) => lo + k)
          .map((v) => `<option value="${v}" ${String(v) === String(f[field]) ? "selected" : ""}>${v}</option>`)
          .join("")}</select></label>`;
      const ingredient = (key, title, body) => `<div class="ingr">
        <label class="ingr-on"><input type="checkbox" data-rec-field="${key}On" ${f[key + "On"] ? "checked" : ""}> ${this._t(title)}</label>
        ${f[key + "On"] ? `<div class="ingr-body">${body}</div>` : ""}</div>`;
      const busy = this._rBusy;
      const off = busy ? "disabled" : "";
      // the pressed button shows a spinner and what it is doing
      const recBtn = (act, cls, text) =>
        `<button class="btn ${cls} ${busy === act ? "working" : ""}" data-rec="${act}" aria-busy="${busy === act}" ${off}>${
          busy === act ? this._spin(this._t(act === "delete" ? "rec_deleting" : act === "brew" ? "sc_saving_brew" : "saving")) : text
        }</button>`;
      form = `<div class="recform">
        <label>${this._t("rec_name")}<input type="text" maxlength="10" data-rec-field="name" value="${esc(f.name ?? "")}"></label>
        <label>${this._t("rec_icon")}${icons}</label>
        ${ingredient("coffee", "rec_coffee", num("coffee", "rec_coffee_ml", CUSTOM.coffee) + pick("taste", "rec_taste", CUSTOM.taste))}
        ${ingredient(
          "milk",
          "rec_milk",
          num("milk", "rec_milk_s", CUSTOM.milk) +
            pick("froth", "rec_froth", CUSTOM.froth) +
            `<label class="ingr-on"><input type="checkbox" data-rec-field="milkFirst" ${f.milkFirst ? "checked" : ""}> ${this._t("rec_milk_first")}</label>`
        )}
        ${ingredient("water", "rec_water", num("water", "rec_water_ml", CUSTOM.water))}
        ${this._msgAt === "rec" ? this._msgHtml() : ""}
        <div class="actions">
          ${recBtn("save", "primary", this._t("rec_save"))}
          ${recBtn("brew", "", this._t("sc_save_brew"))}
          ${filled ? recBtn("delete", "danger", this._rDeleteArmed ? this._t("rec_delete_sure") : this._t("rec_delete")) : ""}
          <button class="btn" data-rec="close" ${off}>${this._t("rec_close")}</button>
        </div></div>`;
    }
    return this._fold("toggle-custom", this._customOpen, this._t("rec_section"), `<p class="hint">${this._t("rec_hint")}</p><div class="slots">${places}</div>${form}`);
  }

  // ---- drag and drop (pointer events: works with mouse, pen and touch) -----

  _dragStart(e) {
    const grip = e.target.closest?.("[data-grip]");
    if (!grip || this._saving) return;
    const row = grip.closest(".fav");
    e.preventDefault();
    grip.setPointerCapture(e.pointerId);
    this._drag = { row, list: row.parentElement, startY: e.clientY, id: e.pointerId };
    row.classList.add("drag");
  }

  _dragMove(e) {
    const d = this._drag;
    if (!d || e.pointerId !== d.id) return;
    const place = () => (d.row.style.transform = `translateY(${e.clientY - d.startY}px)`);
    place();
    for (const dir of [-1, 1]) {
      for (;;) {
        const sib = dir < 0 ? d.row.previousElementSibling : d.row.nextElementSibling;
        if (!sib) break;
        const mid = d.row.getBoundingClientRect();
        const center = mid.top + mid.height / 2;
        const s = sib.getBoundingClientRect();
        const over = dir < 0 ? center < s.top + s.height / 2 : center > s.top + s.height / 2;
        if (!over) break;
        const before = d.row.offsetTop;
        d.list.insertBefore(d.row, dir < 0 ? sib : sib.nextElementSibling);
        d.startY += d.row.offsetTop - before; // keep the row under the pointer
        place();
      }
    }
  }

  _dragEnd(e) {
    const d = this._drag;
    if (!d || e.pointerId !== d.id) return;
    d.row.classList.remove("drag");
    d.row.style.transform = "";
    this._draft = [...d.list.children].map((li) => li.dataset.key);
    this._drag = null;
    this._refresh();
  }

  // ---- rendering -----------------------------------------------------------

  _render() {
    const known = this._known();
    const hide = this._hide;
    const profile = this._state("profile");
    const profileName = profile && profile.state !== "unavailable" ? profile.state : "";
    let favorites = "";
    let inner = "";
    if (!known) {
      inner = `<div class="note">${this._t("no_device")}</div>`;
    } else {
      const byId = Object.fromEntries(known.options.filter((o) => Number.isInteger(known.ids[o])).map((o) => [known.ids[o], o]));
      const machine = known.favorites.map((id) => byId[id]).filter(Boolean);
      const machineJson = JSON.stringify(machine);
      const edited = this._draft !== null && JSON.stringify(this._draft) !== this._base;
      if (this._draft === null || (machineJson !== this._base && !edited)) this._draft = [...machine];
      this._base = machineJson;
      const draft = this._draft.filter((o) => known.options.includes(o));
      const dirty = JSON.stringify(draft) !== machineJson;
      const rows = draft
        .map((o, i) => {
          const key = SYMBOL_DRINK[known.icons[o]] || o;
          const picture = this._drinkPicture(key);
          const visual = picture
            ? `<img class="pic" src="${picture}" alt="" loading="lazy">`
            : `<ha-icon class="pic" icon="${drinkIcon(key)}"></ha-icon>`;
          const k = esc(o);
          return `<li class="fav" data-key="${k}">
            <button class="grip" data-grip aria-label="${this._t("fav_grip")}" title="${this._t("fav_grip")}"><ha-icon icon="mdi:drag"></ha-icon></button>
            <span class="num">${i + 1}</span>${visual}<span class="fname">${esc(this._hass.formatEntityState(known.st, o))}</span>
            <button class="ib" data-fav="up" data-key="${k}" ${i === 0 ? "disabled" : ""} aria-label="${this._t("fav_up")}" title="${this._t("fav_up")}"><ha-icon icon="mdi:chevron-up"></ha-icon></button>
            <button class="ib" data-fav="down" data-key="${k}" ${i === draft.length - 1 ? "disabled" : ""} aria-label="${this._t("fav_down")}" title="${this._t("fav_down")}"><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button class="ib" data-fav="remove" data-key="${k}" aria-label="${this._t("fav_remove")}" title="${this._t("fav_remove")}"><ha-icon icon="mdi:close"></ha-icon></button>
          </li>`;
        })
        .join("");
      const free = known.options.filter((o) => Number.isInteger(known.ids[o]) && !draft.includes(o));
      const full = draft.length >= MAX_FAVORITES;
      const add = `<select data-fav="add" aria-label="${this._t("fav_add")}" ${full || !free.length || this._saving ? "disabled" : ""}>
          <option value="">${this._t("fav_add")}</option>
          ${free.map((o) => `<option value="${esc(o)}">${esc(this._hass.formatEntityState(known.st, o))}</option>`).join("")}</select>`;
      const canSave = dirty && known.live && !this._saving;
      const notes = [full ? this._t("fav_max") : "", !known.live ? this._t("asleep") : ""].filter(Boolean).join(" ");
      const favInner = `<p class="hint">${this._t("fav_hint")}</p>
        ${draft.length ? `<ol class="favs">${rows}</ol>` : `<p class="note">${this._t("fav_empty")}</p>`}
        <div class="addrow">${add}</div>
        ${notes ? `<p class="note">${notes}</p>` : ""}
        ${this._msgAt === "fav" ? this._msgHtml() : ""}
        <div class="actions">
          <button class="btn primary ${this._saving ? "working" : ""}" data-fav="save" aria-busy="${!!this._saving}" ${canSave ? "" : "disabled"}>${this._saving ? this._spin(this._t("saving")) : this._t("fav_save")}</button>
          <button class="btn" data-fav="reset" ${dirty && !this._saving ? "" : "disabled"}>${this._t("fav_reset")}</button>
        </div>`;
      favorites = this._fold("toggle-fav", this._favOpen, this._t("fav_section"), favInner);
    }
    // Was the message already shown next to the buttons that caused it?
    const inline =
      (this._msgAt === "fav" && !!known) ||
      (this._msgAt === "rec" && !!known?.live && !!this._rSlot && !this._rLoading);
    const parts = { favorites, custom: known ? this._customSection(known) : "", settings: known ? this._settings() : "", maintenance: known ? this._maintenance() : "" };
    const body = known ? this._sectionOrder.map((k) => parts[k] || "").join("") : "";
    const titleHtml = hide.includes("title")
      ? ""
      : `<div class="title">${esc(this._config.name || this._t("admin_title"))}</div>
        <div class="sub">${profileName ? this._t("fav_profile", { name: esc(profileName) }) : ""}</div>`;
    this.shadowRoot.innerHTML = `
      <style>
        ${this._css()}
        .title { font-size: 18px; font-weight: 600; line-height: 1.2; }
        .sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
        .hint, .note { font-size: 12px; color: var(--secondary-text-color); margin: 10px 0; }
        .favs { list-style: none; margin: 8px 0; padding: 0; }
        .fav { display: flex; align-items: center; gap: 8px; padding: 6px 8px; margin-bottom: 6px; border-radius: 10px;
          background: var(--secondary-background-color); position: relative; }
        .fav.drag { z-index: 2; box-shadow: 0 4px 14px rgba(0,0,0,.35); background: var(--card-background-color); outline: 2px solid var(--primary-color); }
        .grip { touch-action: none; cursor: grab; border: 0; background: transparent; color: var(--secondary-text-color);
          width: 44px; height: 44px; border-radius: 8px; display: grid; place-items: center; padding: 0; }
        .grip:hover, .ib:hover:not(:disabled) { background: var(--divider-color); }
        .num { width: 18px; text-align: right; font-size: 12px; color: var(--secondary-text-color); }
        .pic { width: 32px; height: 32px; object-fit: contain; --mdc-icon-size: 28px; flex: none; }
        .fname { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ib { border: 0; background: transparent; color: var(--primary-text-color); cursor: pointer; width: 44px; height: 44px;
          border-radius: 8px; display: grid; place-items: center; padding: 0; }
        .ib:disabled { opacity: .3; cursor: default; }
        .addrow select { width: 100%; padding: 10px; border-radius: 10px; border: 1px solid var(--divider-color);
          background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; }
        .actions { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
        .slots { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; margin: 8px 0; }
        .slot { display: flex; align-items: center; gap: 8px; padding: 10px; border-radius: 10px; border: 1px solid var(--divider-color);
          background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; cursor: pointer; text-align: left; }
        .slot.sel { outline: 2px solid var(--primary-color); }
        .slot:disabled { opacity: .5; cursor: default; }
        .snum { font-size: 12px; color: var(--secondary-text-color); }
        .sname { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .recform { display: grid; gap: 10px; margin-top: 8px; }
        .recform label { display: grid; gap: 4px; font-size: 12px; color: var(--secondary-text-color); }
        .recform input, .recform select { padding: 10px; border-radius: 10px; border: 1px solid var(--divider-color);
          background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; min-width: 0; }
        .ingr { border: 1px solid var(--divider-color); border-radius: 10px; padding: 8px 10px; }
        .ingr-on { display: flex !important; align-items: center; gap: 8px; color: var(--primary-text-color) !important; font-size: 14px !important; cursor: pointer; }
        .ingr-body { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; margin-top: 8px; }
        .msg { color: var(--error-color); font-size: 12px; min-height: 1em; margin-top: 8px; }
      </style>
      <ha-card>
        ${titleHtml}
        ${inner}
        ${body}
        ${inline ? "" : this._msgHtml()}
      </ha-card>`;
  }
}

customElements.define("cremalink-admin-card", CremalinkAdminCard);
window.customCards.push({
  type: "cremalink-admin-card",
  name: "Cremalink Machine Manager",
  description: "Rarely needed: favorite drinks (drag and drop), your own recipes, machine settings and maintenance of a coffee machine set up with cremalink-ha.",
});
