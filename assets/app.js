/* VOOM Sales Agent — shared shell, i18n, formatting. Design prototype only. */
(function () {
  const store = {
    get(k, d) { try { const v = localStorage.getItem('voom.' + k); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('voom.' + k, v); } catch (e) {} },
  };

  const COMMON = {
    en: {
      brand: 'VOOM Sales', brand_sub: 'AI sales agents',
      tenant: 'Al Ruba Developments', plan: 'Enterprise · 3 AI agents',
      nav_main: 'Workspace', nav_config: 'Configure',
      nav_overview: 'Overview', nav_inbox: 'Inbox', nav_pipeline: 'Pipeline', nav_contacts: 'Contacts',
      nav_agents: 'AI Agents', nav_channels: 'Channels', nav_team: 'Team', nav_settings: 'Settings', soon: 'Next',
      svc_title: 'AI services', svc_tour: 'Voomi · 3D tours', svc_social: 'SMAIA · Messaging', svc_call: 'Nour · Phone',
      online: 'Online', degraded: '1 channel down',
      search_ph: 'Search contacts, deals, units…', api_map: 'API map', theme: 'Toggle theme', notifications: 'Notifications', menu: 'Menu',
      api_legend_ok: 'Backed by an existing endpoint', api_legend_gap: 'Needs a new endpoint / field',
      st_open: 'Open', st_pending: 'Pending', st_closed: 'Closed',
      pr_low: 'Low', pr_normal: 'Normal', pr_high: 'High', pr_urgent: 'Urgent',
      ds_new: 'New', ds_qualified: 'Qualified', ds_proposal: 'Proposal', ds_negotiation: 'Negotiation', ds_won: 'Won', ds_lost: 'Lost',
      ch_whatsapp: 'WhatsApp', ch_instagram: 'Instagram', ch_telegram: 'Telegram', ch_messenger: 'Messenger',
      ch_phone: 'Phone', ch_tour: '3D Tour', ch_email: 'Email', ch_discord: 'Discord',
      ai_on: 'AI handling', ai_off: 'Human', needs_human: 'Needs human', unassigned: 'Unassigned',
      view_all: 'View all', save: 'Save changes', cancel: 'Cancel', close: 'Close', edit: 'Edit', add: 'Add', delete: 'Delete',
      today: 'Today', last7: 'Last 7 days', last30: 'Last 30 days', last90: 'Last 90 days',
    },
    ar: {
      brand: 'فووم للمبيعات', brand_sub: 'وكلاء مبيعات بالذكاء الاصطناعي',
      tenant: 'الربى للتطوير العقاري', plan: 'باقة المؤسسات · ٣ وكلاء',
      nav_main: 'مساحة العمل', nav_config: 'الإعدادات والتهيئة',
      nav_overview: 'نظرة عامة', nav_inbox: 'صندوق المحادثات', nav_pipeline: 'مسار الصفقات', nav_contacts: 'العملاء',
      nav_agents: 'وكلاء الذكاء الاصطناعي', nav_channels: 'القنوات', nav_team: 'الفريق', nav_settings: 'الإعدادات', soon: 'قريباً',
      svc_title: 'خدمات الذكاء الاصطناعي', svc_tour: 'فومي · الجولات ثلاثية الأبعاد', svc_social: 'سمايا · المراسلة', svc_call: 'نور · الهاتف',
      online: 'يعمل', degraded: 'قناة متوقفة',
      search_ph: 'ابحث عن عميل أو صفقة أو وحدة…', api_map: 'خريطة الـ API', theme: 'تبديل المظهر', notifications: 'الإشعارات', menu: 'القائمة',
      api_legend_ok: 'مدعوم بواجهة موجودة', api_legend_gap: 'يحتاج واجهة أو حقل جديد',
      st_open: 'مفتوحة', st_pending: 'معلّقة', st_closed: 'مغلقة',
      pr_low: 'منخفضة', pr_normal: 'عادية', pr_high: 'عالية', pr_urgent: 'عاجلة',
      ds_new: 'جديد', ds_qualified: 'مؤهَّل', ds_proposal: 'عرض سعر', ds_negotiation: 'تفاوض', ds_won: 'تم البيع', ds_lost: 'خسارة',
      ch_whatsapp: 'واتساب', ch_instagram: 'إنستغرام', ch_telegram: 'تيليجرام', ch_messenger: 'ماسنجر',
      ch_phone: 'الهاتف', ch_tour: 'جولة ثلاثية الأبعاد', ch_email: 'البريد', ch_discord: 'ديسكورد',
      ai_on: 'يرد الذكاء الاصطناعي', ai_off: 'موظف', needs_human: 'يحتاج موظف', unassigned: 'غير مُسنَدة',
      view_all: 'عرض الكل', save: 'حفظ التغييرات', cancel: 'إلغاء', close: 'إغلاق', edit: 'تعديل', add: 'إضافة', delete: 'حذف',
      today: 'اليوم', last7: 'آخر ٧ أيام', last30: 'آخر ٣٠ يوماً', last90: 'آخر ٩٠ يوماً',
    },
  };

  const CH_ICON = { whatsapp: 'message-circle', instagram: 'camera', telegram: 'send', messenger: 'messages-square', phone: 'phone', tour: 'box', email: 'mail', discord: 'gamepad-2' };

  const NAV = [
    { group: 'nav_main', items: [
      { id: 'overview', href: 'index.html', icon: 'layout-dashboard', key: 'nav_overview' },
      { id: 'inbox', href: 'inbox.html', icon: 'inbox', key: 'nav_inbox', count: 5 },
      { id: 'pipeline', href: 'pipeline.html', icon: 'kanban', key: 'nav_pipeline' },
      { id: 'contacts', href: 'contacts.html', icon: 'users', key: 'nav_contacts' },
    ] },
    { group: 'nav_config', items: [
      { id: 'agents', href: 'agents.html', icon: 'bot', key: 'nav_agents' },
      { id: 'channels', href: 'channels.html', icon: 'radio-tower', key: 'nav_channels' },
      { id: 'team', href: 'team.html', icon: 'user-cog', key: 'nav_team' },
      { id: 'settings', href: 'settings.html', icon: 'settings', key: 'nav_settings' },
    ] },
  ];

  const App = {
    lang: store.get('lang', 'en'),
    theme: store.get('theme', ''),
    page: null,
    renderers: [],
    dict: { en: Object.assign({}, COMMON.en), ar: Object.assign({}, COMMON.ar) },

    digits: 'latn',
    nd(s) { return typeof s === 'string' && this.lang === 'ar' ? (this.digits === 'latn' ? s.replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x660) : s.replace(/[0-9]/g, (d) => String.fromCharCode(0x660 + +d))) : s; },
    t(key) { return this.nd((this.dict[this.lang] && this.dict[this.lang][key]) ?? this.dict.en[key] ?? key); },
    /* pick a localized field from an {en, ar} object or a plain string */
    L(v) { return this.nd(v && typeof v === 'object' ? (v[this.lang] ?? v.en) : v); },
    extend(dicts) { Object.assign(this.dict.en, dicts.en || {}); Object.assign(this.dict.ar, dicts.ar || {}); },
    onRender(fn) { this.renderers.push(fn); },

    locale() { return this.lang === 'ar' ? (this.digits === 'arab' ? 'ar-SA' : 'ar-SA-u-nu-latn') : 'en-US'; },
    n(v, opts) { return new Intl.NumberFormat(this.locale(), opts).format(v); },
    compact(v) { return this.n(v, { notation: 'compact', maximumFractionDigits: 1 }); },
    money(v, cur = 'SAR', compact = true) {
      return this.n(v, { style: 'currency', currency: cur, notation: compact ? 'compact' : 'standard', maximumFractionDigits: compact ? 2 : 0 });
    },
    pct(v, d = 0) { return this.n(v, { style: 'percent', maximumFractionDigits: d }); },
    ago(minutes) {
      const rtf = new Intl.RelativeTimeFormat(this.locale(), { numeric: 'auto', style: 'short' });
      if (minutes < 1) return this.lang === 'ar' ? 'الآن' : 'now';
      if (minutes < 60) return rtf.format(-Math.round(minutes), 'minute');
      if (minutes < 1440) return rtf.format(-Math.round(minutes / 60), 'hour');
      return rtf.format(-Math.round(minutes / 1440), 'day');
    },
    time(minutesAgo) {
      const d = new Date(Date.now() - minutesAgo * 60000);
      return new Intl.DateTimeFormat(this.locale(), { hour: 'numeric', minute: '2-digit' }).format(d);
    },
    date(d, opts = { day: 'numeric', month: 'short' }) { return new Intl.DateTimeFormat(this.locale(), opts).format(d); },
    hijri(d) { return new Intl.DateTimeFormat(this.lang === 'ar' ? (this.digits === 'arab' ? 'ar-SA-u-ca-islamic-umalqura' : 'ar-SA-u-ca-islamic-umalqura-nu-latn') : 'en-US-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(d); },
    initials(name) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p.replace(/^(Al-|ال)/, '')[0]).join('').toUpperCase(); },
    esc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },

    chBadge(ch, size = '') {
      return `<span class="ch ch-${ch} ${size}" title="${this.t('ch_' + ch)}" aria-label="${this.t('ch_' + ch)}"><i data-lucide="${CH_ICON[ch]}"></i></span>`;
    },
    statusBadge(ds) {
      const map = { new: 'info', qualified: 'brand', proposal: 'gold', negotiation: 'warn', won: 'ok', lost: 'danger' };
      const ico = { new: 'sparkle', qualified: 'badge-check', proposal: 'file-text', negotiation: 'handshake', won: 'trophy', lost: 'circle-x' };
      return `<span class="badge ${map[ds]}"><i data-lucide="${ico[ds]}"></i>${this.t('ds_' + ds)}</span>`;
    },
    aiBadge(on) {
      return on ? `<span class="badge ai"><i data-lucide="sparkles"></i>${this.t('ai_on')}</span>`
                : `<span class="badge outline"><i data-lucide="user"></i>${this.t('ai_off')}</span>`;
    },

    toast(msg) {
      let el = document.getElementById('toast');
      if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
      el.innerHTML = `<i data-lucide="check-circle-2"></i><span>${this.esc(msg)}</span>`;
      this.icons();
      el.classList.add('show');
      clearTimeout(this._tt); this._tt = setTimeout(() => el.classList.remove('show'), 2400);
    },

    icons() { if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } }); },

    shell() {
      const side = document.getElementById('sidebar');
      side.innerHTML = `
        <div class="brand">
          <div class="brand-mark"><i data-lucide="building-2"></i></div>
          <div><div class="brand-name">${this.t('brand')}</div><div class="brand-sub">${this.t('brand_sub')}</div></div>
        </div>
        <button class="tenant-switch" type="button" aria-label="${this.t('tenant')}">
          <span class="tenant-logo">AR</span>
          <span><span class="t-name">${this.t('tenant')}</span><span class="t-plan">${this.t('plan')}</span></span>
          <i class="chev" data-lucide="chevrons-up-down"></i>
        </button>
        ${NAV.map((g) => `
          <nav aria-label="${this.t(g.group)}">
            <div class="nav-label">${this.t(g.group)}</div>
            <div class="nav">
              ${g.items.map((it) => `
                <a href="${it.href}" class="${it.soon ? 'is-soon' : ''}" ${it.id === this.page ? 'aria-current="page"' : ''} ${it.soon ? 'aria-disabled="true" tabindex="-1"' : ''}>
                  <i data-lucide="${it.icon}"></i><span>${this.t(it.key)}</span>
                  ${it.count ? `<span class="count" aria-label="${it.count} ${this.t('needs_human')}">${it.count}</span>` : ''}
                  ${it.soon ? `<span class="soon">${this.t('soon')}</span>` : ''}
                </a>`).join('')}
            </div>
          </nav>`).join('')}
        <div class="side-foot">
          <div class="svc-card" data-api="GET /health (per service)">
            <h4>${this.t('svc_title')}</h4>
            <div class="svc"><span class="dot"></span>${this.t('svc_tour')}<span class="state">${this.t('online')}</span></div>
            <div class="svc"><span class="dot warn"></span>${this.t('svc_social')}<span class="state">${this.t('degraded')}</span></div>
            <div class="svc"><span class="dot"></span>${this.t('svc_call')}<span class="state">${this.t('online')}</span></div>
          </div>
        </div>`;

      const top = document.getElementById('topbar');
      const titleKey = document.body.dataset.title;
      const crumbKey = document.body.dataset.crumb;
      top.innerHTML = `
        <button class="icon-btn menu-btn" type="button" id="menuBtn" aria-label="${this.t('menu')}"><i data-lucide="menu"></i></button>
        <div class="page-title">${crumbKey ? `<span class="crumb">${this.t(crumbKey)}</span>` : ''}${this.t(titleKey)}</div>
        <label class="search"><i data-lucide="search"></i><span class="sr-only">${this.t('search_ph')}</span>
          <input type="search" placeholder="${this.t('search_ph')}"><kbd>Ctrl K</kbd></label>
        <button class="icon-btn api-toggle" type="button" id="apiBtn" aria-pressed="${document.body.classList.contains('show-api')}" title="${this.t('api_map')}" aria-label="${this.t('api_map')}"><i data-lucide="plug-zap"></i></button>
        <div class="lang-toggle" role="group" aria-label="Language">
          <button type="button" data-lang="en" aria-pressed="${this.lang === 'en'}" lang="en">EN</button>
          <button type="button" data-lang="ar" aria-pressed="${this.lang === 'ar'}" lang="ar">ع</button>
        </div>
        <button class="icon-btn hide-sm" type="button" id="themeBtn" aria-label="${this.t('theme')}" title="${this.t('theme')}"><i data-lucide="${this.isDark() ? 'sun' : 'moon'}"></i></button>
        <button class="icon-btn hide-sm" type="button" aria-label="${this.t('notifications')}"><i data-lucide="bell"></i><span class="pip"></span></button>
        <span class="avatar" title="Ahmed Saleh">AS</span>`;

      top.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => this.setLang(b.dataset.lang)));
      top.querySelector('#themeBtn').addEventListener('click', () => this.setTheme(this.isDark() ? 'light' : 'dark'));
      top.querySelector('#apiBtn').addEventListener('click', (e) => {
        const on = document.body.classList.toggle('show-api');
        e.currentTarget.setAttribute('aria-pressed', on);
        store.set('api', on ? '1' : '');
      });
      top.querySelector('#menuBtn').addEventListener('click', () => this.toggleNav(true));
    },

    toggleNav(open) {
      const side = document.getElementById('sidebar');
      let scrim = document.getElementById('navScrim');
      if (!scrim) {
        scrim = document.createElement('div'); scrim.id = 'navScrim'; scrim.className = 'scrim'; scrim.style.zIndex = 35;
        scrim.addEventListener('click', () => this.toggleNav(false)); document.body.appendChild(scrim);
      }
      side.classList.toggle('open', open); scrim.classList.toggle('open', open);
    },

    isDark() {
      if (this.theme) return this.theme === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    setTheme(t) { this.theme = t; store.set('theme', t); document.documentElement.setAttribute('data-theme', t); this.render(); },
    setLang(l) { this.lang = l; store.set('lang', l); this.render(); },

    applyStatic() {
      document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = this.t(el.dataset.i18n); });
      document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.setAttribute('placeholder', this.t(el.dataset.i18nPh)); });
      document.querySelectorAll('[data-i18n-label]').forEach((el) => { el.setAttribute('aria-label', this.t(el.dataset.i18nLabel)); });
    },

    render() {
      const html = document.documentElement;
      html.lang = this.lang; html.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
      if (this.theme) html.setAttribute('data-theme', this.theme);
      document.title = `${this.t(document.body.dataset.title)} · ${this.t('brand')}`;
      this.shell();
      this.applyStatic();
      this.renderers.forEach((fn) => fn());
      this.icons();
    },

    init(page) {
      this.page = page;
      const qs = new URLSearchParams(location.search);
      if (qs.get('lang') === 'ar' || qs.get('lang') === 'en') this.lang = qs.get('lang');
      if (qs.get('digits') === 'arab') this.digits = 'arab';
      if (qs.get('theme') === 'dark' || qs.get('theme') === 'light') this.theme = qs.get('theme');
      if (store.get('api', '') || qs.get('api')) document.body.classList.add('show-api');
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); document.querySelector('.search input')?.focus(); }
        if (e.key === 'Escape') { this.toggleNav(false); document.dispatchEvent(new CustomEvent('app:escape')); }
      });
      this.render();
    },
  };

  window.App = App;
})();
