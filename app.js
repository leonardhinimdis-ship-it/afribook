/**
 * AFRIBOOK - Client JavaScript
 * Logique de l'application adaptée à la maquette officielle
 */

// Utilisateur actif selon la maquette : Jean Pierre MANGA
const CURRENT_USER = {
  id: 'user-jean-pierre-manga',
  full_name: 'Jean Pierre MANGA',
  username: 'jeanpierremanga',
  avatar_url: 'images/avatar-jeanpierre.jpg',
  is_verified: true,
  city: 'Yaoundé',
  country: 'Cameroun'
};

// Données des groupes
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

// Données des amis
const AFRI_FRIENDS = [
  { name: 'Marie', subtitle: 'Yaoundé, Cameroun • En ligne', avatar: 'images/story-marie.jpg' },
  { name: 'Albert', subtitle: 'Douala, Cameroun • En ligne', avatar: 'images/story-albert.jpg' },
  { name: 'Diane', subtitle: 'Bafoussam, Cameroun • En ligne', avatar: 'images/story-diane.jpg' },
  { name: 'Aminata Diallo', subtitle: 'Dakar, Sénégal • Il y a 10m', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Koffi Mensah', subtitle: 'Abidjan, Côte d\'Ivoire • Il y a 1h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Samuel Eto\'o', subtitle: 'Douala, Cameroun • Compte vérifié', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
];

// État de l'application
let officialLiked = false;
let officialLikeCount = 12500;
let isDarkMode = false;
let isLowData = false;
let activeTab = 'feed';

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  renderGroups();
  renderFriends();
  loadChatsList();
});

// ============================================================================
// 1. GESTION DU MODE SOMBRE (DARK MODE)
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
  showToast(isDarkMode ? 'Mode sombre activé 🌙' : 'Mode clair activé ☀️');
}

// ============================================================================
// 2. GESTION DU MODE ÉCONOMIE DE DONNÉES (LOW-DATA)
// ============================================================================
function toggleLowDataMode() {
  isLowData = !isLowData;
  const label = document.getElementById('lowDataLabel');
  const btn = document.getElementById('lowDataToggleBtn');

  if (isLowData) {
    document.body.classList.add('low-data-active');
    if (label) label.textContent = 'Data Éco : ON (-70%)';
    if (btn) btn.className = 'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#00d021] text-white border border-[#00d021] shadow-sm';
    showToast('Mode Économie de Données actif ! ⚡');
  } else {
    document.body.classList.remove('low-data-active');
    if (label) label.textContent = 'Data Éco : OFF';
    if (btn) btn.className = 'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all';
    showToast('Mode haute résolution actif');
  }
}

// ============================================================================
// 3. NAVIGATION PAR ONGLETS (STYLE APP MOBILE)
// ============================================================================
function switchMainTab(tab) {
  activeTab = tab;

  // Masquer toutes les sections
  document.getElementById('viewFeedSection').classList.add('hidden');
  document.getElementById('viewGroupsSection').classList.add('hidden');
  document.getElementById('viewFriendsSection').classList.add('hidden');
  document.getElementById('viewMessagesSection').classList.add('hidden');
  const viewMenu = document.getElementById('viewMenuSection');
  if (viewMenu) viewMenu.classList.add('hidden');

  // Désactiver tous les styles d'onglets
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

  if (tab === 'feed') {
    document.getElementById('viewFeedSection').classList.remove('hidden');
  } else if (tab === 'groups') {
    document.getElementById('viewGroupsSection').classList.remove('hidden');
  } else if (tab === 'friends') {
    document.getElementById('viewFriendsSection').classList.remove('hidden');
  } else if (tab === 'messages') {
    document.getElementById('viewMessagesSection').classList.remove('hidden');
  } else if (tab === 'menu') {
    if (viewMenu) viewMenu.classList.remove('hidden');
    showToast('Menu Jean Pierre MANGA');
  } else if (tab === 'videos' || tab === 'marketplace') {
    showToast(`Section ${tab.toUpperCase()} en cours de synchronisation...`);
    document.getElementById('viewFeedSection').classList.remove('hidden');
  }
}

// ============================================================================
// 4. PUBLICATION OFFICIELLE (LIKE, COMMENTAIRES, PARTAGE)
// ============================================================================
function toggleOfficialLike() {
  officialLiked = !officialLiked;
  const btn = document.getElementById('likeBtnOfficial');
  const countEl = document.getElementById('officialReactionsCount');

  if (officialLiked) {
    officialLikeCount++;
    btn.innerHTML = `<i class="fa-solid fa-thumbs-up text-sm text-[#0047b3]"></i> <span class="text-[#0047b3]">J'aime</span>`;
    countEl.textContent = '12,501';
    showToast('Vous avez aimé la publication ! 👍');
  } else {
    officialLikeCount--;
    btn.innerHTML = `<i class="fa-regular fa-thumbs-up text-sm"></i> <span>J'aime</span>`;
    countEl.textContent = '12,5 K';
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
  commentEl.innerHTML = `<span class="font-bold text-slate-900">Jean Pierre MANGA</span> : ${escapeHtml(text)}`;
  list.prepend(commentEl);

  input.value = '';
  showToast('Commentaire publié avec succès !');
}

function handleSharePost() {
  showToast('Lien de la publication copié ! Partage activé 🌍');
}

// ============================================================================
// 5. CRÉATION D'UNE NOUVELLE PUBLICATION PAR JEAN PIERRE MANGA
// ============================================================================
function openPostModal(type) {
  document.getElementById('postModalOverlay').classList.remove('hidden');
  if (type === 'photo') {
    document.getElementById('newPostImageUrl').focus();
  } else {
    document.getElementById('newPostTextarea').focus();
  }
}

function closePostModal() {
  document.getElementById('postModalOverlay').classList.add('hidden');
}

function submitNewPost(event) {
  event.preventDefault();
  const text = document.getElementById('newPostTextarea').value.trim();
  const imgUrl = document.getElementById('newPostImageUrl').value.trim();
  if (!text) return;

  const container = document.getElementById('dynamicFeedList');
  const postArticle = document.createElement('article');
  postArticle.className = 'bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 animate-slide-down';
  postArticle.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <img src="images/avatar-jeanpierre.jpg" class="w-10 h-10 rounded-full object-cover">
        <div>
          <div class="flex items-center gap-1.5">
            <h4 class="font-bold text-slate-900 text-sm">Jean Pierre MANGA</h4>
            <i class="fa-solid fa-circle-check text-blue-600 text-xs"></i>
          </div>
          <p class="text-xs text-slate-400">À l'instant • 🌐</p>
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
      <button onclick="this.classList.toggle('text-blue-600')" class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
        <i class="fa-regular fa-thumbs-up"></i> J'aime
      </button>
      <button class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
        <i class="fa-regular fa-comment"></i> Commenter
      </button>
      <button class="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 font-bold">
        <i class="fa-solid fa-share"></i> Partager
      </button>
    </div>
  `;

  container.prepend(postArticle);
  document.getElementById('newPostTextarea').value = '';
  document.getElementById('newPostImageUrl').value = '';
  closePostModal();
  showToast('Publication partagée avec succès sur AfriBook !');
}

// ============================================================================
// 6. STORIES INTERACTIVES
// ============================================================================
function viewStory(name, imgSrc) {
  showToast(`Story de ${name} affichée`);
}

function openCreateStoryModal() {
  showToast('Module de création de story ouvert !');
}

// ============================================================================
// 7. RENDU DES GROUPES & AMIS
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
        <button onclick="this.textContent = (this.textContent === 'Rejoint') ? 'Rejoindre' : 'Rejoint'; this.classList.toggle('bg-slate-100'); this.classList.toggle('text-slate-600');" class="mt-3 w-full py-1.5 bg-[#0047b3] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#003893] transition-colors">
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
// 8. MESSAGERIE INSTANTANÉE (CHAT DIRECT)
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
      <div class="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm px-3 py-1.5 max-w-[80%]">
        Bonjour Jean Pierre ! J'ai vu la photo de Yaoundé sur AfriBook, magnifique ! 🇨🇲
      </div>
      <span class="text-[9px] text-slate-400 px-1 mt-0.5">14:20</span>
    </div>
    <div class="flex flex-col items-end">
      <div class="bg-[#0047b3] text-white rounded-2xl rounded-br-sm px-3 py-1.5 max-w-[80%]">
        Merci beaucoup Marie ! L'Afrique connectée au monde est en marche. 🌍✨
      </div>
      <span class="text-[9px] text-slate-400 px-1 mt-0.5">14:22</span>
    </div>
  `;
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
    <div class="bg-[#0047b3] text-white rounded-2xl rounded-br-sm px-3 py-1.5 max-w-[80%]">
      ${escapeHtml(text)}
    </div>
    <span class="text-[9px] text-slate-400 px-1 mt-0.5">À l'instant</span>
  `;
  box.appendChild(msg);
  input.value = '';
  box.scrollTop = box.scrollHeight;
}

// ============================================================================
// 9. TOAST NOTIFICATIONS & UTILITAIRES
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
  showToast('Menu Jean Pierre MANGA affiché');
}

function toggleMobileMenuDrawer() {
  switchMainTab('menu');
}

function toggleNotificationsDropdown() {
  showToast('Notifications : 3 nouvelles interactions');
}

function toggleMobileSearch() {
  const query = prompt('Rechercher sur AfriBook :');
  if (query) showToast(`Recherche pour : "${query}"`);
}

function handleSearch(event) {
  if (event.key === 'Enter') {
    showToast(`Recherche de "${event.target.value}"`);
  }
}

function handleLogout() {
  if (confirm('Voulez-vous vraiment vous déconnecter de votre compte AfriBook ?')) {
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

// Enregistrement du Service Worker pour installation mobile PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('[PWA] Service Worker actif :', reg.scope))
      .catch((err) => console.log('[PWA] Service Worker indisponible :', err));
  });
}

// Gestion de la bannière d'installation PWA mobile
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showToast('📲 Touchez "Ajouter à l\'écran d\'accueil" pour installer l\'app !');
});
