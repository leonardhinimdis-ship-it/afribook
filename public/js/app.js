/**
 * AFRIBOOK - Client JavaScript Professionnel
 * Plateforme Réseau Social & Communautaire Africaine
 */

// ============================================================================
// 1. UTILISATEUR ACTIF & DONNÉES LOCALES ENRICHIES
// ============================================================================
let CURRENT_USER = {
  id: '00000000-0000-0000-0000-000000000001',
  full_name: 'Alexandre DJOMO',
  username: 'alexandredjomo',
  avatar_url: 'images/avatar-jeanpierre.jpg',
  is_verified: true,
  city: 'Yaoundé',
  country: 'Cameroun',
  bio: "Leader d'opinion & entrepreneur technologique panafricain. Ensemble pour une Afrique connectée ! 🇨🇲🌍"
};

const AFRI_GROUPS = [
  {
    id: 'grp-1',
    name: "Tech & Développeurs Afrique",
    category: 'Innovation',
    members: '14,2 K',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'grp-2',
    name: 'AgriTech & Éco-Innovations Sahel',
    category: 'Agriculture',
    members: '8,5 K',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'grp-3',
    name: 'E-commerce & Logistique Cameroun',
    category: 'Commerce',
    members: '6,1 K',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'grp-4',
    name: 'Diaspora & Investissement Afrique',
    category: 'Finance',
    members: '19,8 K',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  }
];

const AFRI_FRIENDS = [
  { name: 'Marie', subtitle: 'Yaoundé, Cameroun • En ligne', avatar: 'images/story-marie.jpg' },
  { name: 'Albert', subtitle: 'Douala, Cameroun • En ligne', avatar: 'images/story-albert.jpg' },
  { name: 'Diane', subtitle: 'Bafoussam, Cameroun • En ligne', avatar: 'images/story-diane.jpg' },
  { name: 'Aminata Diallo', subtitle: 'Dakar, Sénégal • Il y a 10m', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Koffi Mensah', subtitle: 'Abidjan, Côte d\'Ivoire • Il y a 1h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Samuel Eto\'o', subtitle: 'Douala, Cameroun • Compte vérifié', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
];

let AFRI_MARKETPLACE = [
  {
    id: 'prod-001',
    title: 'Kit Solaire Autonome 500W + Onduleur Hybride',
    price: 185000,
    currency: 'FCFA',
    city: 'Yaoundé',
    category: 'High-Tech',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    seller_name: 'Alexandre DJOMO',
    seller_avatar: 'images/avatar-jeanpierre.jpg',
    whatsapp: '+237699001122',
    condition: 'Neuf garanti 2 ans',
    verified: true
  },
  {
    id: 'prod-002',
    title: 'Tenue Wax Traditionnelle Bazin Riche Brodé Main',
    price: 45000,
    currency: 'FCFA',
    city: 'Dakar',
    category: 'Mode & Wax',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80',
    seller_name: 'Aminata Diallo',
    seller_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    whatsapp: '+221770001122',
    condition: 'Création artisanale',
    verified: true
  },
  {
    id: 'prod-003',
    title: 'Café Arabica Pur des Hauts Plateaux (Sac 5kg)',
    price: 22000,
    currency: 'FCFA',
    city: 'Douala',
    category: 'AgriBio',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80',
    seller_name: 'Samuel Kamga',
    seller_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    whatsapp: '+23769004455',
    condition: 'Récolte 2026',
    verified: true
  },
  {
    id: 'prod-004',
    title: 'Smartphone 5G Dual SIM 128Go + Forfait Data Offert',
    price: 95000,
    currency: 'FCFA',
    city: 'Abidjan',
    category: 'High-Tech',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    seller_name: 'Koffi Mensah',
    seller_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    whatsapp: '+225070022334',
    condition: 'Sous emballage scellé',
    verified: true
  }
];

const AFRI_VIDEOS = [
  {
    id: 'vid-1',
    title: 'Comment l’AgriTech transforme la culture du cacao au Cameroun',
    creator: 'Alexandre DJOMO',
    creator_avatar: 'images/avatar-jeanpierre.jpg',
    views: '42,8 K',
    duration: '03:45',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    category: 'AgriTech'
  },
  {
    id: 'vid-2',
    title: 'Paiement mobile Wave vs Orange Money : Démo des API en direct',
    creator: 'Koffi Mensah',
    creator_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    views: '28,1 K',
    duration: '05:12',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    category: 'FinTech'
  },
  {
    id: 'vid-3',
    title: 'Design UI Low-Data : Concevoir pour 50 Ko par page web',
    creator: 'Fatou Traoré',
    creator_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    views: '19,4 K',
    duration: '04:20',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    category: 'Design'
  }
];

// État global
let currentReaction = null;
let officialLikeCount = 12500;
let isDarkMode = false;
let isLowData = false;
let activeTab = 'feed';
let soundEnabled = true;
let storyTimer = null;
let postSelectedImageBase64 = null;

// ============================================================================
// 2. SYNTHÉTISEUR AUDIO WEB AUDIO API (EFFETS SONORES SUBTILS)
// ============================================================================
function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'pop') {
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'send') {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'bell') {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {}
}

// ============================================================================
// 3. INITIALISATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  loadSavedProfile();
  renderGroups();
  renderFriends();
  renderMarketplace();
  renderVideos();
  loadSavedPosts();
  loadChatsList();

  const savedMockup = localStorage.getItem('afribook_mockup_mode');
  if (savedMockup === 'true') {
    toggleMockupFrameMode();
  }
});

// ============================================================================
// 4. GESTION DU MODE SOMBRE & LOW-DATA
// ============================================================================
function initDarkMode() {
  const saved = localStorage.getItem('afribook_dark_mode');
  if (saved === 'true') {
    isDarkMode = true;
    document.body.classList.add('dark-mode');
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) toggle.checked = true;
  }
}

function toggleDarkMode(enabled) {
  isDarkMode = enabled;
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('afribook_dark_mode', isDarkMode);
  playSound('pop');
  showToast(isDarkMode ? 'Mode sombre activé 🌙' : 'Mode clair activé ☀️');
}

function toggleLowDataMode() {
  isLowData = !isLowData;
  const label = document.getElementById('lowDataLabel');
  const btn = document.getElementById('lowDataToggleBtn');

  if (isLowData) {
    document.body.classList.add('low-data-active');
    if (label) label.textContent = 'Data Éco : ON (-70%)';
    if (btn) btn.className = 'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#00d021] text-white border border-[#00d021] shadow-sm';
    playSound('pop');
    showToast('Mode Économie de Données actif ! ⚡');
  } else {
    document.body.classList.remove('low-data-active');
    if (label) label.textContent = 'Data Éco : OFF';
    if (btn) btn.className = 'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all';
    showToast('Mode haute résolution actif');
  }
}

// ============================================================================
// 5. NAVIGATION PRINCIPALE PAR ONGLETS
// ============================================================================
function switchMainTab(tab) {
  activeTab = tab;

  // Masquer toutes les sections
  const sections = [
    'viewFeedSection', 'viewGroupsSection', 'viewFriendsSection',
    'viewMessagesSection', 'viewMenuSection', 'viewMarketplaceSection',
    'viewVideosSection', 'viewProfileSection'
  ];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  // Déselectionner les onglets
  const tabIds = ['feed', 'friends', 'videos', 'groups', 'marketplace', 'menu'];
  tabIds.forEach((t) => {
    const el = document.getElementById(`tab-${t}`);
    const mEl = document.getElementById(`m-tab-${t}`);
    if (el) el.classList.remove('active');
    if (mEl) {
      mEl.classList.remove('text-[#0047b3]');
      mEl.classList.add('text-slate-500');
    }
  });

  // Activer l'onglet sélectionné
  const currentTabBtn = document.getElementById(`tab-${tab}`);
  const currentMTabBtn = document.getElementById(`m-tab-${tab}`);
  if (currentTabBtn) currentTabBtn.classList.add('active');
  if (currentMTabBtn) {
    currentMTabBtn.classList.add('text-[#0047b3]');
    currentMTabBtn.classList.remove('text-slate-500');
  }

  // Afficher la section cible
  if (tab === 'feed') {
    document.getElementById('viewFeedSection').classList.remove('hidden');
  } else if (tab === 'groups') {
    document.getElementById('viewGroupsSection').classList.remove('hidden');
  } else if (tab === 'friends') {
    document.getElementById('viewFriendsSection').classList.remove('hidden');
  } else if (tab === 'messages') {
    document.getElementById('viewMessagesSection').classList.remove('hidden');
  } else if (tab === 'marketplace') {
    document.getElementById('viewMarketplaceSection').classList.remove('hidden');
    renderMarketplace();
  } else if (tab === 'videos') {
    document.getElementById('viewVideosSection').classList.remove('hidden');
    renderVideos();
  } else if (tab === 'profile') {
    document.getElementById('viewProfileSection').classList.remove('hidden');
  } else if (tab === 'menu') {
    const viewMenu = document.getElementById('viewMenuSection');
    if (viewMenu) viewMenu.classList.remove('hidden');
    showToast('Menu principal AfriBook');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// 6. RÉACTIONS FLOTTANTES STYLE FACEBOOK / AFRIBOOK
// ============================================================================
function showReactionDock(id) {
  const dock = document.getElementById(`reactionDock-${id}`);
  if (dock) dock.classList.remove('hidden');
}

function hideReactionDock(id) {
  const dock = document.getElementById(`reactionDock-${id}`);
  if (dock) dock.classList.add('hidden');
}

function selectReaction(postId, type) {
  hideReactionDock(postId);
  playSound('pop');

  const btn = document.getElementById(`likeBtnOfficial`);
  const textEl = document.getElementById(`officialLikeText`);
  const countEl = document.getElementById(`officialReactionsCount`);

  const reactionsMap = {
    like: { label: "J'aime", icon: 'fa-solid fa-thumbs-up', color: 'text-blue-600' },
    love: { label: "J'adore", icon: 'fa-solid fa-heart', color: 'text-red-600' },
    support: { label: "Solidarité", icon: 'fa-solid fa-handshake', color: 'text-emerald-600' },
    haha: { label: "Haha", icon: 'fa-solid fa-face-laugh-squint', color: 'text-amber-500' },
    wow: { label: "Wouah", icon: 'fa-solid fa-face-surprise', color: 'text-amber-500' },
    sad: { label: "Triste", icon: 'fa-solid fa-face-sad-tear', color: 'text-amber-500' },
    angry: { label: "Grrr", icon: 'fa-solid fa-face-angry', color: 'text-red-500' }
  };

  const sel = reactionsMap[type] || reactionsMap.like;

  if (currentReaction === type) {
    // Annulation
    currentReaction = null;
    btn.innerHTML = `<i class="fa-regular fa-thumbs-up text-sm"></i> <span id="officialLikeText">J'aime</span>`;
    btn.className = "w-full flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 text-slate-600 font-bold transition-all";
    countEl.textContent = '12,5 K';
  } else {
    currentReaction = type;
    btn.innerHTML = `<i class="${sel.icon} text-sm ${sel.color}"></i> <span id="officialLikeText" class="${sel.color}">${sel.label}</span>`;
    btn.className = `w-full flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 ${sel.color} font-bold transition-all`;
    countEl.textContent = '12,501';
    showToast(`Réaction ${sel.label} enregistrée ! ✨`);
  }
}

function toggleOfficialLike() {
  if (currentReaction) {
    selectReaction('official', currentReaction);
  } else {
    selectReaction('official', 'like');
  }
}

function toggleOfficialComments() {
  const box = document.getElementById('officialCommentsBox');
  box.classList.toggle('hidden');
  if (!box.classList.contains('hidden')) {
    document.getElementById('officialCommentInput').focus();
  }
}

function postOfficialComment() {
  const input = document.getElementById('officialCommentInput');
  const text = input.value.trim();
  if (!text) return;

  const list = document.getElementById('officialCommentsList');
  const commentEl = document.createElement('div');
  commentEl.className = 'bg-slate-50 p-2.5 rounded-xl animate-slide-down';
  commentEl.innerHTML = `<span class="font-bold text-slate-900">Alexandre DJOMO</span> : ${escapeHtml(text)}`;
  list.prepend(commentEl);

  input.value = '';
  playSound('send');
  showToast('Commentaire publié avec succès !');
}

function handleSharePost(postTitle) {
  playSound('pop');
  window.currentShareTitle = postTitle || "Publication officielle AfriBook";
  const modal = document.getElementById('shareModalOverlay');
  if (modal) modal.classList.remove('hidden');
}

function closeShareModal() {
  const modal = document.getElementById('shareModalOverlay');
  if (modal) modal.classList.add('hidden');
}

function shareToAfriBookFeed() {
  closeShareModal();
  const container = document.getElementById('dynamicFeedList');
  const postArticle = document.createElement('article');
  postArticle.className = 'bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 animate-slide-down';
  postArticle.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <img src="${CURRENT_USER.avatar_url}" class="w-10 h-10 rounded-full object-cover">
        <div>
          <div class="flex items-center gap-1.5">
            <h4 class="font-bold text-slate-900 text-sm">${CURRENT_USER.full_name}</h4>
            <i class="fa-solid fa-circle-check text-blue-600 text-xs"></i>
          </div>
          <p class="text-xs text-slate-400">À l'instant • 🔁 Repartagé</p>
        </div>
      </div>
      <button class="text-slate-400 p-1"><i class="fa-solid fa-ellipsis"></i></button>
    </div>
    <p class="text-slate-800 text-xs italic">« Fier de partager cette annonce avec toute la communauté AfriBook ! 🌍🇨🇲 »</p>
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
      <div class="flex items-center gap-2">
        <img src="images/logo-round.jpg" class="w-6 h-6 rounded-full object-cover">
        <span class="font-bold text-xs text-slate-900">AFRIBOOK Officiel</span>
      </div>
      <p class="text-xs text-slate-700">Ensemble pour une Afrique plus forte, plus unie et plus connectée ! 💚💙🌍</p>
    </div>
    <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
      <span>👍 3 réactions</span>
      <span>1 commentaire</span>
    </div>
  `;
  container.prepend(postArticle);
  playSound('send');
  showToast('Repartagé sur votre fil d\'actualité ! ✨');
}

function shareToWhatsApp() {
  closeShareModal();
  const text = encodeURIComponent("Rejoignez AfriBook - Le Réseau Social Panafricain : L'Afrique connectée au monde !");
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  showToast('Partage WhatsApp initié 📲');
}

function copyPostLink() {
  closeShareModal();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
  }
  playSound('pop');
  showToast('Lien copié dans le presse-papier ! 📋');
}

function shareInMessenger() {
  closeShareModal();
  switchMainTab('messages');
  const chatInput = document.getElementById('chatTextInput');
  chatInput.value = "Regarde cette publication sur AfriBook : L'Afrique connectée au monde !";
  chatInput.focus();
}

// ============================================================================
// 7. CARROUSEL & LECTEUR DE STORIES INTERACTIF COMPLET
// ============================================================================
function viewStory(name, imgSrc, caption) {
  playSound('pop');
  const modal = document.getElementById('storyViewerModal');
  const avatar = document.getElementById('storyViewerAvatar');
  const authorName = document.getElementById('storyViewerName');
  const meta = document.getElementById('storyViewerMeta');
  const image = document.getElementById('storyViewerImage');
  const captionEl = document.getElementById('storyViewerCaption');
  const bar = document.getElementById('storyProgressBarFill');

  avatar.src = imgSrc;
  authorName.textContent = name;
  meta.textContent = `${name === 'Yaoundé' ? 'Cameroun' : 'Yaoundé'} • il y a 2h`;
  image.src = imgSrc;
  captionEl.textContent = caption || `En direct avec ${name} sur AfriBook ! ✨🇨🇲`;

  modal.classList.remove('hidden');

  // Animation de la barre de progression (5s)
  bar.style.width = '0%';
  setTimeout(() => { bar.style.width = '100%'; }, 50);

  clearTimeout(storyTimer);
  storyTimer = setTimeout(() => {
    closeStoryViewer();
  }, 5000);
}

function closeStoryViewer() {
  clearTimeout(storyTimer);
  document.getElementById('storyViewerModal').classList.add('hidden');
}

function reactToStory(emoji) {
  playSound('pop');
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = emoji;
  heart.style.left = `${Math.floor(20 + Math.random() * 60)}%`;
  document.getElementById('storyViewerModal').appendChild(heart);

  setTimeout(() => { heart.remove(); }, 1200);
  showToast(`Réaction ${emoji} envoyée !`);
}

function sendStoryReply() {
  const input = document.getElementById('storyReplyInput');
  const text = input.value.trim();
  if (!text) return;

  playSound('send');
  showToast('Réponse envoyée en message direct ! 💬');
  input.value = '';
}

function openCreateStoryModal() {
  document.getElementById('createStoryModal').classList.remove('hidden');
}

function closeCreateStoryModal() {
  document.getElementById('createStoryModal').classList.add('hidden');
}

function submitNewStory(event) {
  event.preventDefault();
  const caption = document.getElementById('storyCaptionInput').value.trim();
  const fileInput = document.getElementById('storyFileInput');

  let mediaUrl = 'images/avatar-jeanpierre.jpg';
  if (fileInput.files && fileInput.files[0]) {
    mediaUrl = URL.createObjectURL(fileInput.files[0]);
  }

  playSound('send');
  closeCreateStoryModal();
  showToast('Votre Story a été ajoutée avec succès ! 🌟');

  // Ouvrir immédiatement la nouvelle story
  viewStory('Alexandre DJOMO', mediaUrl, caption);
}

// ============================================================================
// 8. MARKETPLACE AFRIBOOK PANAFRICAIN
// ============================================================================
function renderMarketplace(category = 'all', city = 'all') {
  const container = document.getElementById('marketplaceProductsGrid');
  if (!container) return;

  let filtered = AFRI_MARKETPLACE;
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (city !== 'all') {
    filtered = filtered.filter(p => p.city.toLowerCase() === city.toLowerCase());
  }

  container.innerHTML = filtered.map(p => `
    <div onclick="openProductDetailModal('${p.id}')" class="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between cursor-pointer">
      <div class="relative h-44 overflow-hidden bg-slate-100">
        <img src="${p.image}" class="w-full h-full object-cover">
        <span class="absolute top-2.5 left-2.5 bg-black/75 text-white font-black text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
          ${p.price.toLocaleString('fr-FR')} ${p.currency}
        </span>
        <span class="absolute top-2.5 right-2.5 bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
          <i class="fa-solid fa-shield-halved"></i> Vérifié
        </span>
      </div>
      <div class="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-[10px] font-bold uppercase text-[#0047b3] bg-blue-50 px-2 py-0.5 rounded-full">${p.category}</span>
          <h4 class="font-bold text-slate-900 text-xs sm:text-sm mt-1.5 line-clamp-1">${escapeHtml(p.title)}</h4>
          <p class="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <i class="fa-solid fa-location-dot text-red-500"></i> ${p.city} • ${p.condition}
          </p>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 overflow-hidden">
            <img src="${p.seller_avatar}" class="w-6 h-6 rounded-full object-cover">
            <span class="text-[11px] text-slate-700 font-semibold truncate">${p.seller_name}</span>
          </div>
          <button onclick="event.stopPropagation(); contactSeller('${p.whatsapp}', '${escapeHtml(p.title)}')" class="px-3 py-1.5 rounded-xl bg-[#00d021] hover:bg-emerald-600 text-white font-bold text-xs shadow flex items-center gap-1 transition-transform active:scale-95">
            <i class="fa-brands fa-whatsapp"></i> Contacter
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterMarketplace(category) {
  playSound('pop');
  const buttons = document.querySelectorAll('.market-cat-btn');
  buttons.forEach(b => {
    b.classList.remove('active', 'bg-blue-100', 'text-[#0047b3]', 'font-bold');
    b.classList.add('bg-slate-100', 'text-slate-700');
  });
  if (event && event.target) {
    event.target.classList.add('active', 'bg-blue-100', 'text-[#0047b3]', 'font-bold');
    event.target.classList.remove('bg-slate-100', 'text-slate-700');
  }
  const city = document.getElementById('marketCityFilter').value;
  renderMarketplace(category, city);
}

function filterMarketplaceByCity(city) {
  playSound('pop');
  const activeBtn = document.querySelector('.market-cat-btn.active');
  const cat = activeBtn ? activeBtn.textContent.replace(/[^\w\s-&]/gi, '').trim() : 'all';
  renderMarketplace(cat === 'Tout' ? 'all' : cat, city);
}

function contactSeller(whatsapp, title) {
  playSound('pop');
  openChatWith('Alexandre DJOMO', 'images/avatar-jeanpierre.jpg');
  const chatInput = document.getElementById('chatTextInput');
  chatInput.value = `Bonjour, je suis intéressé par votre annonce : "${title}". Est-elle toujours disponible ?`;
  chatInput.focus();
}

function openSellProductModal() {
  document.getElementById('sellProductModal').classList.remove('hidden');
}

function closeSellProductModal() {
  document.getElementById('sellProductModal').classList.add('hidden');
}

function submitNewProduct(event) {
  event.preventDefault();
  const title = document.getElementById('prodTitleInput').value.trim();
  const price = Number(document.getElementById('prodPriceInput').value);
  const category = document.getElementById('prodCategoryInput').value;
  const city = document.getElementById('prodCityInput').value.trim();
  const whatsapp = document.getElementById('prodWhatsappInput').value.trim();
  const image = document.getElementById('prodImageInput').value.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';

  const newP = {
    id: 'prod-' + Date.now(),
    title,
    price,
    currency: 'FCFA',
    city,
    category,
    image,
    seller_name: CURRENT_USER.full_name,
    seller_avatar: CURRENT_USER.avatar_url,
    whatsapp,
    condition: 'Disponible immédiatement',
    verified: true
  };

  AFRI_MARKETPLACE.unshift(newP);
  playSound('send');
  closeSellProductModal();
  renderMarketplace();
  showToast('Votre article est désormais en ligne sur le Marketplace AfriBook ! 🛍️');
}

// ============================================================================
// 9. VIDÉOS REELS PANAFRICAINES
// ============================================================================
function renderVideos() {
  const container = document.getElementById('videosGridContainer');
  if (!container) return;

  container.innerHTML = AFRI_VIDEOS.map(v => `
    <div onclick="playVideoReel('${v.id}')" class="video-reel-card shadow-md">
      <img src="${v.thumbnail}" class="w-full h-full object-cover">
      <div class="reel-gradient absolute inset-0 p-3 flex flex-col justify-between text-white">
        <div class="flex items-center justify-between">
          <span class="bg-black/60 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <i class="fa-solid fa-eye text-red-500"></i> ${v.views}
          </span>
          <span class="bg-red-600 font-bold text-[10px] px-2 py-0.5 rounded-full">${v.duration}</span>
        </div>
        <div class="flex items-center justify-center">
          <div class="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white text-lg shadow-lg hover:scale-110 transition-transform">
            <i class="fa-solid fa-play ml-1"></i>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <img src="${v.creator_avatar}" class="w-6 h-6 rounded-full object-cover border border-white">
            <span class="text-xs font-bold truncate">${v.creator}</span>
          </div>
          <h4 class="text-xs font-semibold leading-tight line-clamp-2">${escapeHtml(v.title)}</h4>
        </div>
      </div>
    </div>
  `).join('');
}

let currentReelPlaying = true;

function playVideoReel(id) {
  const reel = AFRI_VIDEOS.find(v => v.id === id) || AFRI_VIDEOS[0];
  playSound('pop');
  const bg = document.getElementById('reelPlayerBg');
  if (bg) bg.src = reel.thumbnail;
  const avatar = document.getElementById('reelPlayerAvatar');
  if (avatar) avatar.src = reel.creator_avatar;
  const creator = document.getElementById('reelPlayerCreator');
  if (creator) creator.textContent = reel.creator;
  const title = document.getElementById('reelPlayerTitle');
  if (title) title.textContent = reel.title;
  const likes = document.getElementById('reelLikesCount');
  if (likes) likes.textContent = reel.views || '2.4K';
  
  currentReelPlaying = true;
  const playBtn = document.getElementById('reelPlayCenterBtn');
  if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  const modal = document.getElementById('reelViewerModal');
  if (modal) modal.classList.remove('hidden');
}

function closeReelViewer() {
  const modal = document.getElementById('reelViewerModal');
  if (modal) modal.classList.add('hidden');
}

function toggleReelPlay() {
  currentReelPlaying = !currentReelPlaying;
  playSound('pop');
  const btn = document.getElementById('reelPlayCenterBtn');
  if (currentReelPlaying) {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    showToast('Lecture du Reel en cours');
  } else {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play ml-1"></i>';
    showToast('Reel en pause');
  }
}

function reactToReel(btn) {
  playSound('pop');
  const heartIcon = btn.querySelector('i');
  if (heartIcon) heartIcon.classList.toggle('text-red-500');
  const countEl = document.getElementById('reelLikesCount');
  if (countEl) countEl.textContent = '2.4K+';
  showToast('Vous aimez ce Reel ! ❤️');
}

// ============================================================================
// 10. CRÉATION DE POST AVEC UPLOAD FICHIER LOCAL & APERÇU
// ============================================================================
function openPostModal(type) {
  document.getElementById('postModalOverlay').classList.remove('hidden');
  if (type === 'photo') {
    document.getElementById('postFileInput').click();
  } else {
    document.getElementById('newPostTextarea').focus();
  }
}

function closePostModal() {
  document.getElementById('postModalOverlay').classList.add('hidden');
  clearPostImagePreview();
}

function handlePostFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    postSelectedImageBase64 = e.target.result;
    document.getElementById('postImagePreview').src = postSelectedImageBase64;
    document.getElementById('postImagePreviewContainer').classList.remove('hidden');
    playSound('pop');
    showToast('Photo chargée avec succès !');
  };
  reader.readAsDataURL(file);
}

function clearPostImagePreview() {
  postSelectedImageBase64 = null;
  document.getElementById('postImagePreviewContainer').classList.add('hidden');
  document.getElementById('postFileInput').value = '';
  document.getElementById('newPostImageUrl').value = '';
}

function togglePostUrlInput() {
  document.getElementById('postUrlInputBox').classList.toggle('hidden');
}

function previewUrlImage(url) {
  if (url) {
    postSelectedImageBase64 = url;
    document.getElementById('postImagePreview').src = url;
    document.getElementById('postImagePreviewContainer').classList.remove('hidden');
  }
}

function submitNewPost(event) {
  event.preventDefault();
  const text = document.getElementById('newPostTextarea').value.trim();
  const imgUrl = postSelectedImageBase64 || document.getElementById('newPostImageUrl').value.trim();
  if (!text) return;

  const container = document.getElementById('dynamicFeedList');
  const postArticle = document.createElement('article');
  postArticle.className = 'bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 animate-slide-down';
  postArticle.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <img src="${CURRENT_USER.avatar_url}" class="w-10 h-10 rounded-full object-cover">
        <div>
          <div class="flex items-center gap-1.5">
            <h4 class="font-bold text-slate-900 text-sm">${CURRENT_USER.full_name}</h4>
            <i class="fa-solid fa-circle-check text-blue-600 text-xs"></i>
          </div>
          <p class="text-xs text-slate-400">À l'instant • 🌐 L'Afrique connectée</p>
        </div>
      </div>
      <button class="text-slate-400 p-1"><i class="fa-solid fa-ellipsis"></i></button>
    </div>
    <p class="text-slate-900 text-sm leading-relaxed">${escapeHtml(text)}</p>
    ${imgUrl ? `
      <div class="rounded-xl overflow-hidden shadow-sm max-h-96">
        <img src="${imgUrl}" class="w-full object-cover">
      </div>
    ` : ''}
    <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
      <span>👍 1 réaction</span>
      <span>0 commentaire</span>
    </div>
    <div class="pt-2 border-t border-slate-100 grid grid-cols-3 gap-1 text-xs">
      <button onclick="this.classList.toggle('text-blue-600'); playSound('pop');" class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
        <i class="fa-regular fa-thumbs-up"></i> J'aime
      </button>
      <button class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
        <i class="fa-regular fa-comment"></i> Commenter
      </button>
      <button onclick="handleSharePost()" class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
        <i class="fa-solid fa-share"></i> Partager
      </button>
    </div>
  `;

  container.prepend(postArticle);
  savePostToStorage({ text, imgUrl, author: CURRENT_USER.full_name, avatar: CURRENT_USER.avatar_url, time: "À l'instant" });
  document.getElementById('newPostTextarea').value = '';
  clearPostImagePreview();
  closePostModal();
  playSound('send');
  showToast('Publication partagée avec succès sur AfriBook ! 🚀');
}

// ============================================================================
// 11. GESTION DU PROFIL COMPLET
// ============================================================================
function openEditProfileModal() {
  document.getElementById('editModalName').value = CURRENT_USER.full_name;
  document.getElementById('editModalCity').value = CURRENT_USER.city;
  document.getElementById('editModalCountry').value = CURRENT_USER.country;
  document.getElementById('editModalBio').value = CURRENT_USER.bio;
  document.getElementById('editProfileModal').classList.remove('hidden');
}

function closeEditProfileModal() {
  document.getElementById('editProfileModal').classList.add('hidden');
}

function saveProfileChanges(event) {
  event.preventDefault();
  CURRENT_USER.full_name = document.getElementById('editModalName').value.trim();
  CURRENT_USER.city = document.getElementById('editModalCity').value.trim();
  CURRENT_USER.country = document.getElementById('editModalCountry').value.trim();
  CURRENT_USER.bio = document.getElementById('editModalBio').value.trim();

  // Mettre à jour l'en-tête de profil
  const nameEl = document.getElementById('profHeaderName');
  if (nameEl) nameEl.textContent = CURRENT_USER.full_name;
  const cityEl = document.getElementById('profHeaderCity');
  if (cityEl) cityEl.textContent = `${CURRENT_USER.city}, ${CURRENT_USER.country}`;
  const bioEl = document.getElementById('profHeaderBio');
  if (bioEl) bioEl.textContent = CURRENT_USER.bio;

  closeEditProfileModal();
  playSound('send');
  showToast('Profil mis à jour avec succès ! ✨');
}

// ============================================================================
// 12. NOTIFICATIONS INTERACTIVES
// ============================================================================
function toggleNotificationsDropdown() {
  const dd = document.getElementById('notificationsDropdownMenu');
  dd.classList.toggle('hidden');
  if (!dd.classList.contains('hidden')) {
    playSound('bell');
  }
}

function markAllNotificationsAsRead() {
  const badge = document.getElementById('notifBadgeTop');
  if (badge) badge.classList.add('hidden');
  const items = document.querySelectorAll('#notifListItems > div');
  items.forEach(item => item.classList.remove('bg-blue-50/50'));
  playSound('pop');
  showToast('Toutes les notifications sont marquées comme lues.');
}

// ============================================================================
// 13. MESSAGERIE INSTANTANÉE & NOTES VOCALES
// ============================================================================
function loadChatsList() {
  const list = document.getElementById('chatsListContainer');
  if (!list) return;

  list.innerHTML = AFRI_FRIENDS.slice(0, 3).map((f) => `
    <div onclick="openChatWith('${f.name}', '${f.avatar}')" class="p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
      <img src="${f.avatar}" class="w-9 h-9 rounded-full object-cover">
      <div class="flex-1 overflow-hidden">
        <h4 class="font-bold text-xs text-slate-900 truncate">${f.name}</h4>
        <p class="text-[10px] text-slate-400 truncate">Connecté(e) récemment</p>
      </div>
    </div>
  `).join('');

  openChatWith('Marie', 'images/story-marie.jpg');
}

function openChatWith(name, avatar) {
  switchMainTab('messages');
  document.getElementById('chatActiveName').textContent = name;
  document.getElementById('chatActiveAvatar').src = avatar;

  const box = document.getElementById('chatMessagesBox');
  box.innerHTML = `
    <div class="text-center text-[10px] text-slate-400 my-2">Début de la discussion avec ${name}</div>
    <div class="flex flex-col items-start">
      <div class="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm px-3 py-1.5 max-w-[80%] shadow-sm">
        Bonjour Alexandre ! J'ai vu la photo de Yaoundé sur AfriBook, magnifique ! 🇨🇲
      </div>
      <span class="text-[9px] text-slate-400 px-1 mt-0.5">14:20</span>
    </div>
    <!-- Note vocale reçue -->
    <div class="flex flex-col items-start">
      <div class="voice-note-card shadow-sm cursor-pointer" onclick="toggleVoiceNote(this)">
        <button class="w-8 h-8 rounded-full bg-[#0047b3] text-white flex items-center justify-center text-xs flex-shrink-0">
          <i class="fa-solid fa-play ml-0.5"></i>
        </button>
        <div class="voice-bars">
          <span class="voice-bar h-2"></span>
          <span class="voice-bar h-4"></span>
          <span class="voice-bar h-3"></span>
          <span class="voice-bar h-5"></span>
          <span class="voice-bar h-2"></span>
          <span class="voice-bar h-4"></span>
          <span class="voice-bar h-1"></span>
        </div>
        <span class="text-[11px] font-bold text-[#0047b3] ml-1">0:18</span>
      </div>
      <span class="text-[9px] text-slate-400 px-1 mt-0.5">Note vocale • 14:21</span>
    </div>
    <div class="flex flex-col items-end">
      <div class="bg-[#0047b3] text-white rounded-2xl rounded-br-sm px-3 py-1.5 max-w-[80%] shadow-sm">
        Merci beaucoup Marie ! L'Afrique connectée au monde est en marche. 🌍✨
      </div>
      <span class="text-[9px] text-slate-400 px-1 mt-0.5">14:22</span>
    </div>
  `;
}

function toggleVoiceNote(card) {
  playSound('pop');
  const btnIcon = card.querySelector('button i');
  const bars = card.querySelectorAll('.voice-bar');

  if (btnIcon.classList.contains('fa-play')) {
    btnIcon.className = 'fa-solid fa-pause';
    bars.forEach(b => b.classList.add('playing'));
    showToast('Lecture de la note vocale 🎙️');
    setTimeout(() => {
      btnIcon.className = 'fa-solid fa-play ml-0.5';
      bars.forEach(b => b.classList.remove('playing'));
    }, 4000);
  } else {
    btnIcon.className = 'fa-solid fa-play ml-0.5';
    bars.forEach(b => b.classList.remove('playing'));
  }
}

function sendChatMessage(event) {
  event.preventDefault();
  const input = document.getElementById('chatTextInput');
  const text = input.value.trim();
  if (!text) return;

  const box = document.getElementById('chatMessagesBox');
  const msg = document.createElement('div');
  msg.className = 'flex flex-col items-end animate-slide-down';
  msg.innerHTML = `
    <div class="bg-[#0047b3] text-white rounded-2xl rounded-br-sm px-3 py-1.5 max-w-[80%] shadow-sm">
      ${escapeHtml(text)}
    </div>
    <span class="text-[9px] text-slate-400 px-1 mt-0.5">À l'instant</span>
  `;
  box.appendChild(msg);
  input.value = '';
  box.scrollTop = box.scrollHeight;
  playSound('send');
  triggerSimulatedContactReply();
}

// ============================================================================
// 14. RENDU DES GROUPES & AMIS
// ============================================================================
function renderGroups() {
  const container = document.getElementById('groupsGridContainer');
  if (!container) return;

  container.innerHTML = AFRI_GROUPS.map((g) => `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between">
      <img src="${g.image}" class="h-28 w-full object-cover">
      <div class="p-3.5">
        <span class="text-[10px] font-bold text-[#0047b3] uppercase bg-blue-50 px-2 py-0.5 rounded-full">${g.category}</span>
        <h4 class="font-bold text-slate-900 text-xs sm:text-sm mt-1.5">${g.name}</h4>
        <p class="text-[11px] text-slate-500 mt-1">${g.members} membres</p>
        <button onclick="this.textContent = (this.textContent === 'Rejoint') ? 'Rejoindre' : 'Rejoint'; this.classList.toggle('bg-slate-100'); this.classList.toggle('text-slate-600'); playSound('pop');" class="mt-3 w-full py-1.5 bg-[#0047b3] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#003893] transition-colors">
          Rejoindre
        </button>
      </div>
    </div>
  `).join('');
}

function renderFriends() {
  const container = document.getElementById('friendsGridContainer');
  if (!container) return;

  container.innerHTML = AFRI_FRIENDS.map((f) => `
    <div class="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <img src="${f.avatar}" class="w-11 h-11 rounded-full object-cover">
        <div>
          <h4 class="font-bold text-xs sm:text-sm text-slate-900">${f.name}</h4>
          <p class="text-[10px] text-slate-500">${f.subtitle}</p>
        </div>
      </div>
      <button onclick="openChatWith('${f.name}', '${f.avatar}')" class="w-8 h-8 rounded-full bg-blue-50 text-[#0047b3] hover:bg-blue-100 flex items-center justify-center" title="Discuter">
        <i class="fa-solid fa-comment-dots text-xs"></i>
      </button>
    </div>
  `).join('');
}

// ============================================================================
// 15. TOAST & NOTIFICATIONS VISUELLES
// ============================================================================
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

function toggleMenuDrawer() {
  switchMainTab('menu');
}

function toggleMobileMenuDrawer() {
  switchMainTab('menu');
}

function toggleMobileSearch() {
  const query = prompt('Rechercher sur AfriBook :');
  if (query) showToast(`Recherche pour : "${query}"`);
}

function handleSearch(event) {
  if (event.key === 'Enter') {
    playSound('pop');
    showToast(`Résultats pour : "${event.target.value}"`);
  }
}

function handleLogout() {
  if (confirm('Voulez-vous vraiment vous déconnecter de votre compte AfriBook ?')) {
    playSound('pop');
    showToast('Déconnexion effectuée.');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================================================
// 16. SIMULATION DE RÉPONSES & NOTES VOCALES DANS LE CHAT
// ============================================================================
let recordingTimer = null;
let recordingSeconds = 0;

function startVoiceRecording() {
  playSound('pop');
  recordingSeconds = 0;
  const timerDisplay = document.getElementById('recordingTimerDisplay');
  if (timerDisplay) timerDisplay.textContent = '0:00';
  const bar = document.getElementById('chatRecordingBar');
  if (bar) bar.classList.remove('hidden');

  clearInterval(recordingTimer);
  recordingTimer = setInterval(() => {
    recordingSeconds++;
    const secStr = recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds;
    if (timerDisplay) timerDisplay.textContent = `0:${secStr}`;
  }, 1000);
}

function cancelVoiceRecording() {
  clearInterval(recordingTimer);
  const bar = document.getElementById('chatRecordingBar');
  if (bar) bar.classList.add('hidden');
  playSound('pop');
  showToast('Enregistrement vocal annulé');
}

function stopAndSendVoiceRecording() {
  clearInterval(recordingTimer);
  const bar = document.getElementById('chatRecordingBar');
  if (bar) bar.classList.add('hidden');
  const duration = recordingSeconds || 3;
  const secStr = duration < 10 ? `0${duration}` : duration;

  const box = document.getElementById('chatMessagesBox');
  const voiceMsg = document.createElement('div');
  voiceMsg.className = 'flex flex-col items-end animate-slide-down';
  voiceMsg.innerHTML = `
    <div class="voice-note-card shadow-sm cursor-pointer" onclick="toggleVoiceNote(this)">
      <button class="w-8 h-8 rounded-full bg-[#0047b3] text-white flex items-center justify-center text-xs flex-shrink-0">
        <i class="fa-solid fa-play ml-0.5"></i>
      </button>
      <div class="voice-bars">
        <span class="voice-bar h-2"></span>
        <span class="voice-bar h-5"></span>
        <span class="voice-bar h-3"></span>
        <span class="voice-bar h-4"></span>
        <span class="voice-bar h-2"></span>
        <span class="voice-bar h-5"></span>
        <span class="voice-bar h-1"></span>
      </div>
      <span class="text-[11px] font-bold text-[#0047b3] ml-1">0:${secStr}</span>
    </div>
    <span class="text-[9px] text-slate-400 px-1 mt-0.5">Note vocale envoyée • À l'instant</span>
  `;
  box.appendChild(voiceMsg);
  box.scrollTop = box.scrollHeight;
  playSound('send');
  showToast('Note vocale transmise ! 🎙️');

  triggerSimulatedContactReply();
}

function triggerSimulatedContactReply() {
  const activeName = (document.getElementById('chatActiveName') && document.getElementById('chatActiveName').textContent) || 'Marie';
  const replies = [
    `Bien reçu Alexandre ! Merci pour ce partage, c'est super inspirant. 🌍✨`,
    `Super initiative ! Je partage ça immédiatement avec mes contacts à Yaoundé. 🇨🇲`,
    `Parfait ! On reste connectés sur AfriBook, bonne continuation. 👍`,
    `Très clair Alexandre ! Discutons de ça lors du prochain webinaire tech africain. 🚀`
  ];
  const chosenReply = replies[Math.floor(Math.random() * replies.length)];

  setTimeout(() => {
    const box = document.getElementById('chatMessagesBox');
    if (!box) return;
    const replyEl = document.createElement('div');
    replyEl.className = 'flex flex-col items-start animate-slide-down';
    replyEl.innerHTML = `
      <div class="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm px-3 py-1.5 max-w-[80%] shadow-sm">
        ${escapeHtml(chosenReply)}
      </div>
      <span class="text-[9px] text-slate-400 px-1 mt-0.5">${activeName} • À l'instant</span>
    `;
    box.appendChild(replyEl);
    box.scrollTop = box.scrollHeight;
    playSound('pop');
  }, 1400);
}

// ============================================================================
// 17. SONDAGES COMMUNAUTAIRES INTERACTIFS
// ============================================================================
function openPollModal() {
  const modal = document.getElementById('pollModalOverlay');
  if (modal) modal.classList.remove('hidden');
}

function closePollModal() {
  const modal = document.getElementById('pollModalOverlay');
  if (modal) modal.classList.add('hidden');
}

function submitNewPoll(event) {
  event.preventDefault();
  const question = document.getElementById('pollQuestionInput').value.trim();
  const opt1 = document.getElementById('pollOpt1Input').value.trim();
  const opt2 = document.getElementById('pollOpt2Input').value.trim();
  const opt3 = document.getElementById('pollOpt3Input').value.trim();
  if (!question || !opt1 || !opt2) return;

  const pollId = 'poll-' + Date.now();
  const options = [
    { text: opt1, votes: 14 },
    { text: opt2, votes: 31 }
  ];
  if (opt3) options.push({ text: opt3, votes: 12 });

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  const container = document.getElementById('dynamicFeedList');
  const postArticle = document.createElement('article');
  postArticle.className = 'bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 animate-slide-down';
  postArticle.id = pollId;

  postArticle.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <img src="${CURRENT_USER.avatar_url}" class="w-10 h-10 rounded-full object-cover">
        <div>
          <div class="flex items-center gap-1.5">
            <h4 class="font-bold text-slate-900 text-sm">${CURRENT_USER.full_name}</h4>
            <i class="fa-solid fa-circle-check text-blue-600 text-xs"></i>
          </div>
          <p class="text-xs text-slate-400">À l'instant • 📊 Sondage Communautaire</p>
        </div>
      </div>
      <button class="text-slate-400 p-1"><i class="fa-solid fa-ellipsis"></i></button>
    </div>
    <p class="text-slate-900 text-sm font-bold leading-relaxed">${escapeHtml(question)}</p>
    <div class="space-y-2 pt-1" id="${pollId}-options">
      ${options.map((opt, idx) => {
        const pct = Math.round((opt.votes / totalVotes) * 100);
        return `
          <div class="poll-option-btn" onclick="voteInPoll('${pollId}', ${idx})">
            <div class="poll-bar-fill" style="width: ${pct}%"></div>
            <span class="poll-option-label">
              <i class="fa-regular fa-circle-dot text-slate-400 text-xs"></i>
              ${escapeHtml(opt.text)}
            </span>
            <span class="poll-option-pct">${pct}%</span>
          </div>
        `;
      }).join('')}
    </div>
    <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
      <span id="${pollId}-total"><i class="fa-solid fa-users"></i> ${totalVotes} votes exprimés</span>
      <span>Sondage ouvert • AfriBook</span>
    </div>
  `;

  container.prepend(postArticle);
  closePollModal();
  playSound('send');
  showToast('Sondage communautaire publié avec succès ! 📊');
}

function voteInPoll(pollId, optionIndex) {
  playSound('pop');
  const pollEl = document.getElementById(pollId);
  if (!pollEl) return;
  const optBtns = pollEl.querySelectorAll('.poll-option-btn');
  optBtns.forEach((btn, idx) => {
    btn.classList.remove('border-blue-600', 'bg-blue-50/50');
    if (idx === optionIndex) {
      btn.classList.add('border-blue-600', 'bg-blue-50/50');
    }
  });
  showToast('Votre vote a été pris en compte ! 🗳️');
}

// ============================================================================
// 18. MODAL DÉTAILS PRODUIT MARKETPLACE
// ============================================================================
function openProductDetailModal(id) {
  const p = AFRI_MARKETPLACE.find(item => item.id === id);
  if (!p) return;
  playSound('pop');
  document.getElementById('detailProdImg').src = p.image;
  document.getElementById('detailProdPriceBadge').textContent = `${p.price.toLocaleString('fr-FR')} ${p.currency}`;
  document.getElementById('detailProdCategory').textContent = p.category;
  document.getElementById('detailProdCity').innerHTML = `<i class="fa-solid fa-location-dot text-red-500"></i> ${p.city} • ${p.condition}`;
  document.getElementById('detailProdTitle').textContent = p.title;
  document.getElementById('detailProdDesc').textContent = p.description || `Article vérifié et disponible à ${p.city}. Contactez le vendeur pour une remise en main propre sécurisée ou une expédition partout en Afrique.`;
  document.getElementById('detailProdSellerAvatar').src = p.seller_avatar;
  document.getElementById('detailProdSellerName').textContent = p.seller_name;

  const cleanWa = p.whatsapp ? p.whatsapp.replace(/[^0-9]/g, '') : '237699001122';
  const waMsg = encodeURIComponent(`Bonjour ${p.seller_name}, j'ai vu votre article "${p.title}" à ${p.price} ${p.currency} sur le Marketplace AfriBook. Est-il disponible ?`);
  document.getElementById('detailProdWhatsappBtn').onclick = () => {
    window.open(`https://api.whatsapp.com/send?phone=${cleanWa}&text=${waMsg}`, '_blank');
  };
  document.getElementById('detailProdChatBtn').onclick = () => {
    closeProductDetailModal();
    contactSeller(p.whatsapp, p.title);
  };

  document.getElementById('productDetailModal').classList.remove('hidden');
}

function closeProductDetailModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) modal.classList.add('hidden');
}

// ============================================================================
// 19. BASCULE MODE MAQUETTE SMARTPHONE
// ============================================================================
let isMockupFrameActive = false;

function toggleMockupFrameMode() {
  isMockupFrameActive = !isMockupFrameActive;
  const label = document.getElementById('mockupModeLabel');
  
  if (isMockupFrameActive) {
    document.body.classList.add('mockup-mode-active');
    if (label) label.textContent = 'Mode Web Dashboard';
    showToast('Vue Smartphone Maquette activée ! 📱');
  } else {
    document.body.classList.remove('mockup-mode-active');
    if (label) label.textContent = 'Mode Smartphone';
    showToast('Mode Web Dashboard activé ! 💻');
  }
  localStorage.setItem('afribook_mockup_mode', isMockupFrameActive);
  playSound('pop');
}

// ============================================================================
// 20. PERSISTANCE DES DONNÉES LOCALSTORAGE
// ============================================================================
function loadSavedProfile() {
  const saved = localStorage.getItem('afribook_user_profile');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.full_name === 'Jean Pierre MANGA' || parsed.full_name === 'Leonard Baalawé' || !parsed.full_name) {
        parsed.full_name = 'Alexandre DJOMO';
        parsed.username = 'alexandredjomo';
        localStorage.setItem('afribook_user_profile', JSON.stringify(parsed));
      }
      Object.assign(CURRENT_USER, parsed);
      const nameEl = document.getElementById('profHeaderName');
      if (nameEl) nameEl.textContent = CURRENT_USER.full_name;
      const handleEl = document.getElementById('profHeaderHandle');
      if (handleEl) handleEl.innerHTML = `@${CURRENT_USER.username} • <span id="profHeaderCity">${CURRENT_USER.city}, ${CURRENT_USER.country}</span>`;
      const cityEl = document.getElementById('profHeaderCity');
      if (cityEl) cityEl.textContent = `${CURRENT_USER.city}, ${CURRENT_USER.country}`;
      const bioEl = document.getElementById('profHeaderBio');
      if (bioEl) bioEl.textContent = CURRENT_USER.bio;
    } catch(e) {}
  }
}

function savePostToStorage(post) {
  try {
    const saved = JSON.parse(localStorage.getItem('afribook_custom_posts') || '[]');
    saved.unshift(post);
    localStorage.setItem('afribook_custom_posts', JSON.stringify(saved.slice(0, 15)));
  } catch(e) {}
}

function loadSavedPosts() {
  try {
    const saved = JSON.parse(localStorage.getItem('afribook_custom_posts') || '[]');
    const container = document.getElementById('dynamicFeedList');
    if (!container || !saved.length) return;

    saved.forEach(post => {
      const postArticle = document.createElement('article');
      postArticle.className = 'bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3';
      postArticle.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <img src="${post.avatar}" class="w-10 h-10 rounded-full object-cover">
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="font-bold text-slate-900 text-sm">${post.author}</h4>
                <i class="fa-solid fa-circle-check text-blue-600 text-xs"></i>
              </div>
              <p class="text-xs text-slate-400">${post.time} • 🌐 L'Afrique connectée</p>
            </div>
          </div>
          <button class="text-slate-400 p-1"><i class="fa-solid fa-ellipsis"></i></button>
        </div>
        <p class="text-slate-900 text-sm leading-relaxed">${escapeHtml(post.text)}</p>
        ${post.imgUrl ? `
          <div class="rounded-xl overflow-hidden shadow-sm max-h-96">
            <img src="${post.imgUrl}" class="w-full object-cover">
          </div>
        ` : ''}
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>👍 2 réactions</span>
          <span>0 commentaire</span>
        </div>
        <div class="pt-2 border-t border-slate-100 grid grid-cols-3 gap-1 text-xs">
          <button onclick="this.classList.toggle('text-blue-600'); playSound('pop');" class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
            <i class="fa-regular fa-thumbs-up"></i> J'aime
          </button>
          <button class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
            <i class="fa-regular fa-comment"></i> Commenter
          </button>
          <button onclick="handleSharePost()" class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
            <i class="fa-solid fa-share"></i> Partager
          </button>
        </div>
      `;
      container.appendChild(postArticle);
    });
  } catch(e) {}
}

// ============================================================================
// 21. BANNIÈRE & INSTALLATION PWA
// ============================================================================
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('pwaInstallBanner');
  if (banner && !sessionStorage.getItem('pwa_dismissed')) {
    banner.classList.remove('hidden');
  }
});

function installPwaApp() {
  const banner = document.getElementById('pwaInstallBanner');
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('Application AfriBook en cours d\'installation ! 🎉');
      }
      deferredPrompt = null;
      if (banner) banner.classList.add('hidden');
    });
  } else {
    showToast('Pour installer sur smartphone : appuyez sur « Ajouter à l\'écran d\'accueil » 📲');
    if (banner) banner.classList.add('hidden');
  }
}

function dismissPwaBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.classList.add('hidden');
  sessionStorage.setItem('pwa_dismissed', 'true');
}

// Enregistrement PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('[PWA] Service Worker actif :', reg.scope))
      .catch((err) => console.log('[PWA] Service Worker indisponible :', err));
  });
}
