/* Mock data shaped after backend entities (chat, contact, deal, stage, agent, channel).
   Fields the API does not expose yet are marked // gap. */
window.DATA = (function () {
  const projects = {
    'sadeel':           { name: { en: 'Sadeel', ar: 'سديل' }, city: { en: 'Makkah', ar: 'مكة المكرمة' }, cc: 'SA', cur: 'SAR', kind: { en: 'Villas', ar: 'فلل' } },
    'jawharat-al-ruba': { name: { en: 'Jawharat Al Ruba', ar: 'جوهرة الربى' }, city: { en: 'East Riyadh', ar: 'شرق الرياض' }, cc: 'SA', cur: 'SAR', kind: { en: 'Villas', ar: 'فلل' } },
    'flamant':          { name: { en: 'Flamant', ar: 'فلامنت' }, city: { en: 'Al Khobar', ar: 'الخبر' }, cc: 'SA', cur: 'SAR', kind: { en: 'Apartments', ar: 'شقق' } },
    'stax':             { name: { en: 'Stax', ar: 'ستاكس' }, city: { en: 'Dubai', ar: 'دبي' }, cc: 'AE', cur: 'AED', kind: { en: 'Apartments', ar: 'شقق' } },
    'nile-view':        { name: { en: 'Nile View', ar: 'نايل فيو' }, city: { en: 'Benha', ar: 'بنها' }, cc: 'EG', cur: 'EGP', kind: { en: 'Apartments', ar: 'شقق' } },
  };

  const team = [
    { id: 'u1', name: { en: 'Ahmed Saleh', ar: 'أحمد صالح' }, role: 'admin' },
    { id: 'u2', name: { en: 'Layla Nasser', ar: 'ليلى ناصر' }, role: 'user' },
    { id: 'u3', name: { en: 'Hassan Ali', ar: 'حسن علي' }, role: 'user' },
    { id: 'u4', name: { en: 'Mona Fathy', ar: 'منى فتحي' }, role: 'user' },
  ];

  /* agent = AI persona + the pipeline holding its stages (backend domain term) */
  const agents = [
    { id: 'ag1', name: { en: 'Fahad · Social Sales', ar: 'فهد · مبيعات التواصل' }, service: 'SMAIA', persona: 'fahd',
      provider: 'google', model: 'gemini-2.5-flash', language: 'ar-SA', channels: ['whatsapp', 'instagram', 'telegram', 'messenger', 'email', 'discord'],
      project: 'stax', status: 'live', convs: 842, leads: 196, handoffs: 38 },
    { id: 'ag2', name: { en: 'Fahad · 3D Tour Concierge', ar: 'فهد · مرشد الجولات ثلاثية الأبعاد' }, service: 'Voomi', persona: 'fahd',
      provider: 'google', model: 'gemini-2.5-flash-native-audio', language: 'ar-SA', channels: ['tour'],
      project: 'sadeel', status: 'live', convs: 1264, leads: 311, handoffs: 12 },
    { id: 'ag3', name: { en: 'Nour · Phone Agent', ar: 'نور · وكيلة الهاتف' }, service: 'Calling', persona: 'nour',
      provider: 'google', model: 'gemini-2.5-flash-native-audio', language: 'ar-EG', channels: ['phone'],
      project: 'nile-view', status: 'live', convs: 407, leads: 118, handoffs: 21 },
  ];

  const stages = [
    { id: 's1', name: { en: 'Greeting', ar: 'الترحيب' }, desc: { en: 'Welcome, detect language & intent', ar: 'الترحيب وتحديد اللغة والاهتمام' },
      instruction: { en: 'Greet in Saudi Arabic unless the client writes in English. Ask which project interests them.', ar: 'رحّب باللهجة السعودية ما لم يكتب العميل بالإنجليزية، واسأله عن المشروع الذي يهمه.' },
      fu: { interval: 4, max: 2, prompt: { en: 'Gently check if they had a chance to look at the project.', ar: 'اسأل بلطف إن كان اطّلع على المشروع.' } }, knowledge: 6, actions: 0, rules: 1 },
    { id: 's2', name: { en: 'Qualification', ar: 'التأهيل' }, desc: { en: 'Budget, timeline, family size, financing', ar: 'الميزانية والتوقيت وحجم الأسرة والتمويل' },
      instruction: { en: 'Collect budget range, purchase timeline, preferred location and whether they need mortgage or MOH subsidy.', ar: 'اجمع نطاق الميزانية وموعد الشراء والموقع المفضل وحاجته للتمويل أو دعم سكني.' },
      fu: { interval: 24, max: 3, prompt: { en: 'Follow up on budget and timing, mention flexible payment plans.', ar: 'تابع بخصوص الميزانية والتوقيت واذكر خطط السداد المرنة.' } }, knowledge: 14, actions: 1, rules: 2 },
    { id: 's3', name: { en: 'Unit matching', ar: 'ترشيح الوحدات' }, desc: { en: 'Search inventory, send brochures & tours', ar: 'البحث في المخزون وإرسال الكتيبات والجولات' },
      instruction: { en: 'Use unit search before stating any price. Offer 2–3 matching units with a 3D tour link each.', ar: 'استخدم البحث قبل ذكر أي سعر، واعرض ٢–٣ وحدات مناسبة مع رابط جولة لكل منها.' },
      fu: { interval: 24, max: 3, prompt: { en: 'Share one new matching unit and ask for their opinion.', ar: 'شارك وحدة جديدة مناسبة واطلب رأيه.' } }, knowledge: 22, actions: 2, rules: 2 },
    { id: 's4', name: { en: 'Site visit', ar: 'حجز زيارة' }, desc: { en: 'Book a sales-center or virtual visit', ar: 'حجز زيارة لمركز المبيعات أو زيارة افتراضية' },
      instruction: { en: 'Propose two visit slots (avoid Friday prayer time). Confirm name and phone.', ar: 'اقترح موعدين للزيارة (تجنّب وقت صلاة الجمعة) وأكّد الاسم ورقم الجوال.' },
      fu: { interval: 12, max: 2, prompt: { en: 'Remind them of the visit and share the location pin.', ar: 'ذكّره بالموعد وأرسل موقع مركز المبيعات.' } }, knowledge: 5, actions: 1, rules: 1 },
    { id: 's5', name: { en: 'Handover', ar: 'التسليم للمبيعات' }, desc: { en: 'Pass qualified lead to a sales advisor', ar: 'تسليم العميل المؤهل لمستشار مبيعات' },
      instruction: { en: 'Summarize the lead and hand over to a human advisor. Stop replying automatically.', ar: 'لخّص بيانات العميل وسلّمه لمستشار مبيعات، وأوقف الرد الآلي.' },
      fu: { interval: 0, max: 0, prompt: { en: '', ar: '' } }, knowledge: 2, actions: 1, rules: 0 },
  ];

  const N = (en, ar) => ({ en, ar });
  /* chats joined with contact + deal for the prototype */
  const chats = [
    { id: 'c1', name: N('Abdullah Al-Qahtani', 'عبدالله القحطاني'), phone: '+966 55 812 4471', ch: 'whatsapp', project: 'sadeel', lang: 'ar',
      status: 'open', priority: 'high', ai: false, mins: 6, unread: 3, assigned: null, stage: 's4', ds: 'negotiation', budget: 2400000, unit: 'Model 4 · B-12',
      preview: 'أبغى أشوف الفيلا نموذج ٤ يوم الخميس بعد العصر', takeover: 'followups' },
    { id: 'c2', name: N('Noura Al-Harbi', 'نورة الحربي'), phone: '+966 50 334 9021', ch: 'instagram', project: 'jawharat-al-ruba', lang: 'ar',
      status: 'open', priority: 'normal', ai: true, mins: 2, unread: 1, assigned: 'u2', stage: 's3', ds: 'qualified', budget: 1850000, unit: 'Villa C · 4BR',
      preview: 'كم سعر الفيلا اللي فيها ٤ غرف؟' },
    { id: 'c3', name: N('Mohamed Hassan', 'محمد حسن'), phone: '+20 10 2231 7788', ch: 'phone', project: 'nile-view', lang: 'ar',
      status: 'open', priority: 'normal', ai: true, mins: 14, unread: 0, assigned: null, stage: 's2', ds: 'new', budget: 3200000, unit: 'Tower A · 3BR',
      preview: 'Call summary: asked about Nile-facing 3BR, wants installments over 7 years' },
    { id: 'c4', name: N('Fatima Al-Mansouri', 'فاطمة المنصوري'), phone: '+971 50 117 4402', ch: 'whatsapp', project: 'stax', lang: 'en',
      status: 'open', priority: 'normal', ai: true, mins: 21, unread: 0, assigned: 'u3', stage: 's3', ds: 'proposal', budget: 1650000, unit: 'T2-1407 · 2BR',
      preview: 'Can you send me the floor plan for the 2 bedroom?' },
    { id: 'c5', name: N('Khalid Al-Otaibi', 'خالد العتيبي'), phone: '+966 54 900 1276', ch: 'tour', project: 'flamant', lang: 'ar',
      status: 'open', priority: 'normal', ai: true, mins: 33, unread: 0, assigned: null, stage: 's3', ds: 'qualified', budget: 980000, unit: 'B3-F5-502',
      preview: 'Viewed 4 units in 3D tour · lead captured' },
    { id: 'c6', name: N('Reem Al-Shehri', 'ريم الشهري'), phone: '+966 56 772 0931', ch: 'telegram', project: 'sadeel', lang: 'ar',
      status: 'open', priority: 'high', ai: false, mins: 48, unread: 2, assigned: null, stage: 's2', ds: 'qualified', budget: 1900000, unit: 'Model 2',
      preview: 'هل يشمل السعر دعم سكني (MOH)؟', takeover: 'question' },
    { id: 'c7', name: N('Omar Farouk', 'عمر فاروق'), phone: '+20 11 4550 3319', ch: 'messenger', project: 'nile-view', lang: 'ar',
      status: 'pending', priority: 'low', ai: true, mins: 95, unread: 0, assigned: null, stage: 's1', ds: 'new', budget: 0, unit: '—',
      preview: 'السلام عليكم، فيه شقق متاحة قريب الكورنيش؟' },
    { id: 'c8', name: N('Sara Al-Dosari', 'سارة الدوسري'), phone: '+966 53 118 6620', ch: 'email', project: 'flamant', lang: 'en',
      status: 'open', priority: 'normal', ai: true, mins: 130, unread: 0, assigned: 'u2', stage: 's4', ds: 'proposal', budget: 1250000, unit: 'B1-F9-903',
      preview: 'Re: Visit confirmation — Saturday 11:00 works for us' },
    { id: 'c9', name: N('Yousef Al-Zahrani', 'يوسف الزهراني'), phone: '+966 55 604 2217', ch: 'whatsapp', project: 'jawharat-al-ruba', lang: 'ar',
      status: 'open', priority: 'urgent', ai: false, mins: 160, unread: 4, assigned: 'u1', stage: 's5', ds: 'negotiation', budget: 2750000, unit: 'Villa A-07',
      preview: 'جاهز أدفع العربون اليوم إذا ثبتّوا لي السعر', takeover: 'handover' },
    { id: 'c10', name: N('Hind Al-Suwaidi', 'هند السويدي'), phone: '+971 52 880 1943', ch: 'instagram', project: 'stax', lang: 'en',
      status: 'open', priority: 'normal', ai: true, mins: 240, unread: 0, assigned: null, stage: 's2', ds: 'new', budget: 1100000, unit: '—',
      preview: 'Is there a payment plan post-handover?' },
    { id: 'c11', name: N('Ahmed Abdelrahman', 'أحمد عبدالرحمن'), phone: '+20 12 7781 0045', ch: 'phone', project: 'nile-view', lang: 'ar',
      status: 'open', priority: 'high', ai: false, mins: 300, unread: 0, assigned: null, stage: 's3', ds: 'qualified', budget: 2600000, unit: 'Tower B · 2BR',
      preview: 'Call summary: wants to speak to a human about a corporate bulk purchase', takeover: 'question' },
    { id: 'c12', name: N('Lama Al-Ghamdi', 'لمى الغامدي'), phone: '+966 59 441 8820', ch: 'whatsapp', project: 'sadeel', lang: 'ar',
      status: 'open', priority: 'normal', ai: true, mins: 380, unread: 0, assigned: 'u4', stage: 's3', ds: 'proposal', budget: 2100000, unit: 'Model 6 · D-03',
      preview: 'تمام، أرسل لي الكتيب PDF' },
    { id: 'c13', name: N('Faisal Al-Mutairi', 'فيصل المطيري'), phone: '+966 50 902 3348', ch: 'tour', project: 'jawharat-al-ruba', lang: 'ar',
      status: 'open', priority: 'high', ai: false, mins: 620, unread: 1, assigned: null, stage: 's4', ds: 'negotiation', budget: 3100000, unit: 'Villa B-15',
      preview: 'Requested callback from sales manager', takeover: 'followups' },
    { id: 'c14', name: N('Mariam Khalil', 'مريم خليل'), phone: '+20 10 6612 9087', ch: 'whatsapp', project: 'nile-view', lang: 'ar',
      status: 'closed', priority: 'normal', ai: false, mins: 2900, unread: 0, assigned: 'u3', stage: 's5', ds: 'won', budget: 2950000, unit: 'Tower A-1102',
      preview: 'شكراً جزيلاً، تم توقيع العقد 🎉' },
  ];

  return { projects, team, agents, stages, chats };
})();
