// AR JEWELLERY - Luxury Gold & Diamond Jewellery E-Commerce Application
// Theme: Professional White & Royal Gold | Language: 100% English

// Live Rates State (INR)
let rates = {
  gold24k: 8450,
  gold22k: 7750,
  gold18k: 6340,
  silver: 98
};

// Registered Users Database (Persistent in LocalStorage)
let usersDB = JSON.parse(localStorage.getItem('asma_users_db')) || [
  {
    name: "Priya Sharma",
    mobile: "9848012345",
    email: "priya.sharma99@gmail.com",
    password: "Priya@123",
    role: "customer"
  },
  {
    name: "S. Lakshmi Devi",
    mobile: "9876501234",
    email: "lakshmi.devi@gmail.com",
    password: "Lakshmi@123",
    role: "customer"
  }
];

// Current Logged-in User (Customer or Admin)
let currentUser = JSON.parse(localStorage.getItem('asma_current_user')) || null;

// Cart & Wishlist (Persistent in LocalStorage)
let cart = JSON.parse(localStorage.getItem('asma_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('asma_wishlist')) || [];
let appliedCoupon = null;

// Admin Session State
let isAdminLoggedIn = (currentUser && currentUser.role === 'admin') || false;

// Custom Products added by Admin/Seller
let customProducts = JSON.parse(localStorage.getItem('asma_custom_products')) || [];

// Orders Database (Persistent in LocalStorage)
let ordersDB = JSON.parse(localStorage.getItem('asma_orders_db')) || [
  {
    orderId: "ASMA-829104",
    customerName: "Priya Sharma",
    mobile: "9848012345",
    email: "priya.sharma99@gmail.com",
    address: "Flat 402, Royal Enclave, Banjara Hills, Hyderabad - 500034",
    items: [
      { id: "ASMA-102", name: "Divine Lakshmi Temple Choker Set", weight: 42.40, price: 360000, quantity: 1 }
    ],
    totalAmount: 360000,
    paymentMethod: "UPI (Google Pay)",
    status: "Hallmark Verified",
    orderDate: "Sep 28, 2026",
    month: "September 2026"
  },
  {
    orderId: "ASMA-719320",
    customerName: "K. Venkateswara Rao",
    mobile: "9988776655",
    email: "venkat.k@gmail.com",
    address: "Door 12-2-4, MG Road, Vijayawada - 520002",
    items: [
      { id: "ASMA-103", name: "Antique Nakshi Kada Bangles (Pair)", weight: 38.60, price: 325000, quantity: 1 }
    ],
    totalAmount: 325000,
    paymentMethod: "Cash on Delivery",
    status: "Delivered",
    orderDate: "Sep 15, 2026",
    month: "September 2026"
  }
];

// Admin Notifications (Persistent in LocalStorage)
let adminNotifications = JSON.parse(localStorage.getItem('asma_admin_notifications')) || [
  {
    id: "NOTIF-1727829104",
    orderId: "ASMA-829104",
    customerName: "Priya Sharma",
    customerMobile: "9848012345",
    customerEmail: "priya.sharma99@gmail.com",
    itemCount: 1,
    itemsSummary: "Divine Lakshmi Temple Choker Set (42.40g)",
    totalAmount: 360000,
    timestamp: "Sep 28, 2026, 04:30 PM",
    read: true
  }
];

// Base Product Catalog (100% English)
const baseProducts = [
  {
    id: "ASMA-101",
    name: "Royal Peacock Bridal Gold Haram",
    category: "bridal",
    weight: 52.80,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 12,
    originalMakingPct: 16,
    badge: "Bridal Pick",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    desc: "Grand traditional wedding haram sculpted with dancing peacocks, ruby stones, and South Sea hanging pearls."
  },
  {
    id: "ASMA-102",
    name: "Divine Lakshmi Temple Choker Set",
    category: "necklace",
    weight: 42.40,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 11,
    originalMakingPct: 15,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1611591475870-716d9a117560?auto=format&fit=crop&w=800&q=80",
    desc: "Intricately detailed antique temple choker featuring Goddess Lakshmi motifs and matching heavy jhumkas."
  },
  {
    id: "ASMA-103",
    name: "Antique Nakshi Kada Bangles (Pair)",
    category: "bangles",
    weight: 38.60,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 10,
    originalMakingPct: 14,
    badge: "Heritage",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
    desc: "Pair of solid handcrafted antique screw-open kadas with intricate floral filigree and temple embossing."
  },
  {
    id: "ASMA-104",
    name: "Classic Daily Wear Gold Bangles (Set of 4)",
    category: "bangles",
    weight: 26.20,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 8,
    originalMakingPct: 12,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
    desc: "Set of 4 lightweight precision machine-cut 22K gold bangles engineered for comfort and lasting shine."
  },
  {
    id: "ASMA-105",
    name: "Royal Polki & Emerald Bridal Haram",
    category: "bridal",
    weight: 64.50,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 13,
    originalMakingPct: 18,
    badge: "Luxury Pick",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    desc: "Majestic bridal masterpiece embellished with untreated Zambian emerald drops and uncut polki stones."
  },
  {
    id: "ASMA-106",
    name: "Chandbali Antique Pearl Jhumkas",
    category: "earrings",
    weight: 16.40,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 10,
    originalMakingPct: 14,
    badge: "Festive Pick",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    desc: "Graceful crescent chandbali earrings adorned with hanging natural pearls and ruby highlights."
  },
  {
    id: "ASMA-107",
    name: "Solitaire Cut Certified Diamond Ring",
    category: "rings",
    weight: 6.80,
    karat: 18,
    purity: "18K Gold + VVS1 Diamond",
    makingPct: 14,
    originalMakingPct: 18,
    badge: "Diamond Certified",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    desc: "18K yellow gold luxury ring set with a brilliant round cut IGI certified natural solitaire diamond."
  },
  {
    id: "ASMA-108",
    name: "Men's Royal Lion Crest Gold Ring",
    category: "rings",
    weight: 12.50,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 9,
    originalMakingPct: 13,
    badge: "Men's Special",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80",
    desc: "Heavy solid 22K gold signet ring featuring an intricately embossed royal lion emblem."
  },
  {
    id: "ASMA-109",
    name: "24K Lakshmi Ganesh Gold Coin (10 Grams)",
    category: "coins",
    weight: 10.00,
    karat: 24,
    purity: "999.9 Fine Pure Gold",
    makingPct: 2.5,
    originalMakingPct: 5,
    badge: "999 Pure",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
    desc: "Tamper-proof assay certified 24 Karat 999.9 pure minted gold coin for auspicious occasions and investment."
  },
  {
    id: "ASMA-110",
    name: "Traditional Kundan Floral Kasu Mala",
    category: "necklace",
    weight: 35.50,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 10,
    originalMakingPct: 14,
    badge: "Traditional",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    desc: "Auspicious Lakshmi kasu coins alternating with kundan floral motifs on a solid gold woven chain."
  },
  {
    id: "ASMA-111",
    name: "Swiss 24K Pure Gold Investment Bar (50g)",
    category: "coins",
    weight: 50.00,
    karat: 24,
    purity: "999.9 Bullion Mint",
    makingPct: 1.5,
    originalMakingPct: 3,
    badge: "Zero Wastage",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
    desc: "Government certified fine bullion gold bar engraved with unique serial number and assay certificate."
  },
  {
    id: "ASMA-112",
    name: "Classic Dual Strand Nallapusalu (Mangalsutra)",
    category: "necklace",
    weight: 18.20,
    karat: 22,
    purity: "22K BIS 916 Hallmark",
    makingPct: 9,
    originalMakingPct: 13,
    badge: "Auspicious",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    desc: "Sacred black beads intertwined with handmade gold beads and traditional double vatis for eternal blessings."
  }
];

// Combine base products + custom added seller products
function getAllProducts() {
  return [...baseProducts, ...customProducts];
}

// Currency Formatter (INR)
function formatINR(number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(number);
}

// Pricing calculation helper
function getProductPricing(item) {
  let rate = rates.gold22k;
  if (item.karat === 24) rate = rates.gold24k;
  if (item.karat === 18) rate = rates.gold18k;

  const rawGold = item.weight * rate;
  const makingCharges = rawGold * (item.makingPct / 100);
  const originalMaking = rawGold * ((item.originalMakingPct || (item.makingPct + 4)) / 100);
  
  const subtotal = rawGold + makingCharges;
  const gst = subtotal * 0.03;
  const finalPrice = Math.round(subtotal + gst);

  const originalSubtotal = rawGold + originalMaking;
  const originalFinal = Math.round(originalSubtotal + (originalSubtotal * 0.03));
  const savings = Math.max(0, originalFinal - finalPrice);

  return {
    rawGold: Math.round(rawGold),
    makingCharges: Math.round(makingCharges),
    gst: Math.round(gst),
    finalPrice,
    originalFinal,
    savings
  };
}

// ==========================================
// 1. GATEWAY & AUTHENTICATION FLOW
// ==========================================

function checkWelcomeGateway() {
  const modal = document.getElementById('authGatewayModal');
  const dismissed = sessionStorage.getItem('asma_gateway_dismissed');

  if (!currentUser && !dismissed && modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    switchGatewayView('customer-login');
  }
}

function dismissGatewayModal() {
  const modal = document.getElementById('authGatewayModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  sessionStorage.setItem('asma_gateway_dismissed', 'true');
}

function openAuthModal(initialView = 'customer-login') {
  const modal = document.getElementById('authGatewayModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  switchGatewayView(initialView);
}

function closeAuthModal() {
  const modal = document.getElementById('authGatewayModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function switchGatewayView(view) {
  const customerLoginBox = document.getElementById('viewCustomerLogin');
  const customerRegisterBox = document.getElementById('viewCustomerRegister');
  const adminLoginBox = document.getElementById('viewAdminLogin');

  const tabCustomer = document.getElementById('tabCustomerBtn');
  const tabAdmin = document.getElementById('tabAdminBtn');

  const errCust = document.getElementById('customerAuthError');
  const errAdmin = document.getElementById('adminAuthError');
  if (errCust) errCust.classList.add('hidden');
  if (errAdmin) errAdmin.classList.add('hidden');

  if (view === 'customer-login') {
    if (customerLoginBox) customerLoginBox.classList.remove('hidden');
    if (customerRegisterBox) customerRegisterBox.classList.add('hidden');
    if (adminLoginBox) adminLoginBox.classList.add('hidden');

    if (tabCustomer) {
      tabCustomer.classList.add('bg-white', 'text-amber-800', 'shadow-sm', 'border-b-2', 'border-amber-600');
      tabCustomer.classList.remove('text-stone-500');
    }
    if (tabAdmin) {
      tabAdmin.classList.remove('bg-white', 'text-amber-800', 'shadow-sm', 'border-b-2', 'border-amber-600');
      tabAdmin.classList.add('text-stone-500');
    }
  } else if (view === 'customer-register') {
    if (customerLoginBox) customerLoginBox.classList.add('hidden');
    if (customerRegisterBox) customerRegisterBox.classList.remove('hidden');
    if (adminLoginBox) adminLoginBox.classList.add('hidden');

    if (tabCustomer) {
      tabCustomer.classList.add('bg-white', 'text-amber-800', 'shadow-sm', 'border-b-2', 'border-amber-600');
      tabCustomer.classList.remove('text-stone-500');
    }
    if (tabAdmin) {
      tabAdmin.classList.remove('bg-white', 'text-amber-800', 'shadow-sm', 'border-b-2', 'border-amber-600');
      tabAdmin.classList.add('text-stone-500');
    }
  } else if (view === 'admin-login') {
    if (customerLoginBox) customerLoginBox.classList.add('hidden');
    if (customerRegisterBox) customerRegisterBox.classList.add('hidden');
    if (adminLoginBox) adminLoginBox.classList.remove('hidden');

    if (tabAdmin) {
      tabAdmin.classList.add('bg-white', 'text-amber-800', 'shadow-sm', 'border-b-2', 'border-amber-600');
      tabAdmin.classList.remove('text-stone-500');
    }
    if (tabCustomer) {
      tabCustomer.classList.remove('bg-white', 'text-amber-800', 'shadow-sm', 'border-b-2', 'border-amber-600');
      tabCustomer.classList.add('text-stone-500');
    }
  }
}

// Handle Customer Login
function handleCustomerLoginSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const identifier = form.loginIdentifier.value.trim().toLowerCase();
  const password = form.loginPassword.value;
  const errEl = document.getElementById('customerAuthError');

  const user = usersDB.find(u => 
    (u.email.toLowerCase() === identifier || u.mobile === identifier) && 
    u.password === password
  );

  if (!user) {
    if (errEl) {
      errEl.textContent = "Wrong credentials! Please enter your registered email/mobile and correct password.";
      errEl.classList.remove('hidden');
    }
    return;
  }

  setUserSession(user);
  closeAuthModal();
  showToast(`Welcome back, ${user.name}!`);
}

// Handle Customer Registration
function handleCustomerRegistrationSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.regFullName.value.trim();
  const mobile = form.regMobile.value.trim();
  const email = form.regEmail.value.trim().toLowerCase();
  const password = form.regPassword.value;
  const confirmPassword = form.regConfirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match! Please verify your password.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const existing = usersDB.find(u => u.email.toLowerCase() === email || u.mobile === mobile);
  if (existing) {
    alert("An account with this Email or Mobile Number is already registered! Please log in.");
    switchGatewayView('customer-login');
    return;
  }

  const newUser = {
    name,
    mobile,
    email,
    password,
    role: "customer",
    registeredAt: new Date().toISOString()
  };

  usersDB.push(newUser);
  localStorage.setItem('asma_users_db', JSON.stringify(usersDB));

  alert(`🎉 REGISTRATION SUCCESSFULLY COMPLETED!\n\nWelcome to AR JEWELLERY, ${name}!\nYour account has been registered with ${email}.\nYou can now explore our luxury collections, track orders, and set your preferences.`);

  setUserSession(newUser);
  closeAuthModal();
  showToast(`Account created! Welcome, ${name}!`);
}

// Handle Admin / Shop Owner Login
function handleAdminLoginSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const username = form.adminUser.value.trim();
  const password = form.adminPass.value;
  const errEl = document.getElementById('adminAuthError');

  if ((username === "AsmaGold" || username === "AsmaG" || username === "ARGold" || username === "ARG") && (password === "Asma@123" || password === "AR@123")) {
    isAdminLoggedIn = true;
    const adminUser = {
      name: "AR Jewellery Store Owner",
      role: "admin",
      email: "owner@arjewellery.com",
      mobile: "Store Owner Desk"
    };
    setUserSession(adminUser);
    closeAuthModal();
    openAdminPortal();
    showToast("Shop Owner Authenticated: Welcome to AR Jewellery!");
  } else {
    if (errEl) {
      errEl.textContent = "ACCESS DENIED: Invalid Admin User ID or Password!";
      errEl.classList.remove('hidden');
    }
  }
}

// Set active user session
function setUserSession(user) {
  currentUser = user;
  isAdminLoggedIn = (user && user.role === 'admin');
  localStorage.setItem('asma_current_user', JSON.stringify(user));
  updateUserUI();
}

function logoutUser() {
  currentUser = null;
  isAdminLoggedIn = false;
  localStorage.removeItem('asma_current_user');
  updateUserUI();
  closeAdminPortal();
  closeOrdersModal();
  closePreferencesModal();
  closeAddressModal();
  closeWishlistModal();
  const dropdown = document.getElementById('profileDropdownMenu');
  if (dropdown) dropdown.classList.add('hidden');
  showToast("Logged out successfully.");
}

// Update UI based on User Role (Customer vs Admin vs Guest)
function updateUserUI() {
  const guestBox = document.getElementById('headerGuestBox');
  const userBox = document.getElementById('headerUserBox');
  const userNameEl = document.getElementById('headerUserName');
  const userAvatarEl = document.getElementById('headerUserAvatar');
  const adminOwnerBar = document.getElementById('adminOwnerBar');

  if (currentUser) {
    if (guestBox) guestBox.classList.add('hidden');
    if (userBox) userBox.classList.remove('hidden');
    const firstName = currentUser.name.split(' ')[0];
    if (userNameEl) userNameEl.textContent = firstName;
    if (userAvatarEl) userAvatarEl.textContent = firstName.charAt(0).toUpperCase();

    if (currentUser.role === 'admin' && adminOwnerBar) {
      adminOwnerBar.classList.remove('hidden');
    } else if (adminOwnerBar) {
      adminOwnerBar.classList.add('hidden');
    }
  } else {
    if (guestBox) guestBox.classList.remove('hidden');
    if (userBox) userBox.classList.add('hidden');
    if (adminOwnerBar) adminOwnerBar.classList.add('hidden');
  }

  updateAdminNotificationUI();
}

function toggleProfileDropdown() {
  const menu = document.getElementById('profileDropdownMenu');
  if (menu) menu.classList.toggle('hidden');
}

// ==========================================
// 2. MY PROFILE BUTTON 1: "MY PREFERENCES"
// ==========================================
function openPreferencesModal() {
  const dropdown = document.getElementById('profileDropdownMenu');
  if (dropdown) dropdown.classList.add('hidden');

  const modal = document.getElementById('preferencesModal');
  if (!modal) return;

  const userKey = currentUser ? currentUser.email : 'guest';
  const prefs = JSON.parse(localStorage.getItem('asma_preferences_' + userKey)) || {
    goldKarat: '22',
    categories: ['bridal', 'necklace', 'bangles'],
    ringSize: '14',
    bangleSize: '2.4',
    dailyRateAlert: true,
    orderWhatsAppAlert: true,
    discountAlert: true
  };

  // Populate form
  const karatEl = document.querySelector(`input[name="prefKarat"][value="${prefs.goldKarat}"]`);
  if (karatEl) karatEl.checked = true;

  document.querySelectorAll('input[name="prefCategory"]').forEach(cb => {
    cb.checked = prefs.categories ? prefs.categories.includes(cb.value) : false;
  });

  const ringEl = document.getElementById('prefRingSize');
  if (ringEl && prefs.ringSize) ringEl.value = prefs.ringSize;

  const bangleEl = document.getElementById('prefBangleSize');
  if (bangleEl && prefs.bangleSize) bangleEl.value = prefs.bangleSize;

  const rateCb = document.getElementById('prefDailyRate');
  if (rateCb) rateCb.checked = prefs.dailyRateAlert !== false;

  const orderCb = document.getElementById('prefOrderAlert');
  if (orderCb) orderCb.checked = prefs.orderWhatsAppAlert !== false;

  const discCb = document.getElementById('prefDiscountAlert');
  if (discCb) discCb.checked = prefs.discountAlert !== false;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closePreferencesModal() {
  const modal = document.getElementById('preferencesModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleSavePreferences(e) {
  e.preventDefault();
  const form = e.target;
  const userKey = currentUser ? currentUser.email : 'guest';

  const goldKarat = form.prefKarat.value;
  const categories = Array.from(form.querySelectorAll('input[name="prefCategory"]:checked')).map(cb => cb.value);
  const ringSize = form.prefRingSize.value;
  const bangleSize = form.prefBangleSize.value;
  const dailyRateAlert = form.prefDailyRate.checked;
  const orderWhatsAppAlert = form.prefOrderAlert.checked;
  const discountAlert = form.prefDiscountAlert.checked;

  const updatedPrefs = {
    goldKarat,
    categories,
    ringSize,
    bangleSize,
    dailyRateAlert,
    orderWhatsAppAlert,
    discountAlert
  };

  localStorage.setItem('asma_preferences_' + userKey, JSON.stringify(updatedPrefs));
  closePreferencesModal();
  showToast("My Preferences saved successfully! ✨");
}

// ==========================================
// 3. MY PROFILE BUTTON 2: "MY ORDERS"
// ==========================================
function openOrdersModal() {
  const dropdown = document.getElementById('profileDropdownMenu');
  if (dropdown) dropdown.classList.add('hidden');

  const modal = document.getElementById('ordersModal');
  const container = document.getElementById('ordersListContainer');
  if (!modal || !container) return;

  const userOrders = currentUser 
    ? ordersDB.filter(o => o.email.toLowerCase() === currentUser.email.toLowerCase() || o.mobile === currentUser.mobile)
    : ordersDB;

  const ordersToShow = (userOrders.length > 0) ? userOrders : ordersDB;

  if (ordersToShow.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <div class="text-4xl mb-2">📦</div>
        <h4 class="font-serif font-bold text-stone-900 text-sm">No orders found yet</h4>
        <p class="text-xs text-stone-500 mt-1">Explore our exclusive collections and place your first royal order!</p>
      </div>
    `;
  } else {
    container.innerHTML = ordersToShow.map(ord => {
      return `
        <div class="bg-white border border-[#EADBBA] rounded-2xl p-5 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <span class="text-xs uppercase tracking-wider text-amber-800 font-bold">Order ID: ${ord.orderId}</span>
              <div class="text-[11px] text-stone-500 mt-0.5">Placed on: ${ord.orderDate} • Customer: ${ord.customerName}</div>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold ${
              ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
              ord.status === 'Hallmark Verified' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
              'bg-blue-100 text-blue-800 border border-blue-300'
            }">
              ● ${ord.status}
            </span>
          </div>

          <!-- Items list -->
          <div class="py-3 space-y-2">
            ${ord.items.map(item => `
              <div class="flex justify-between items-center text-xs">
                <span class="font-serif font-bold text-stone-900">${item.name} (${item.weight}g) × ${item.quantity || 1}</span>
                <span class="font-bold text-amber-800">${formatINR(item.price)}</span>
              </div>
            `).join('')}
          </div>

          <!-- Tracking Stepper -->
          <div class="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <span class="step-completed font-bold">✓ Confirmed</span>
            <span>⟶</span>
            <span class="${ord.status !== 'Pending' ? 'step-completed font-bold' : ''}">✓ BIS Hallmark</span>
            <span>⟶</span>
            <span class="${ord.status === 'Dispatched' || ord.status === 'Delivered' ? 'step-completed font-bold' : ''}">✓ Insured Transit</span>
            <span>⟶</span>
            <span class="${ord.status === 'Delivered' ? 'step-completed font-bold' : ''}">✓ Delivered</span>
          </div>

          <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <div class="text-xs text-stone-600">
              Total Paid: <span class="font-bold text-base text-stone-900">${formatINR(ord.totalAmount)}</span>
            </div>
            <button onclick="window.open('https://api.whatsapp.com/send?phone=919390011965&text=Namaste!%20Inquiring%20about%20Order%20${ord.orderId}', '_blank')" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition">
              <span>💬 Track via WhatsApp</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeOrdersModal() {
  const modal = document.getElementById('ordersModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// ==========================================
// 4. MY PROFILE BUTTON 3: "MANAGE ADDRESS"
// ==========================================
function getUserAddresses() {
  const userKey = currentUser ? currentUser.email : 'guest';
  let list = JSON.parse(localStorage.getItem('asma_addresses_' + userKey));
  if (!list || list.length === 0) {
    list = [
      {
        id: "ADDR-1",
        title: "Home",
        name: currentUser ? currentUser.name : "Priya Sharma",
        mobile: currentUser ? currentUser.mobile : "9848012345",
        street: "Flat 402, Royal Enclave, Road No. 12, Banjara Hills",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500034",
        isDefault: true
      }
    ];
    localStorage.setItem('asma_addresses_' + userKey, JSON.stringify(list));
  }
  return list;
}

function openAddressModal() {
  const dropdown = document.getElementById('profileDropdownMenu');
  if (dropdown) dropdown.classList.add('hidden');

  const modal = document.getElementById('addressModal');
  if (!modal) return;

  renderAddressList();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAddressModal() {
  const modal = document.getElementById('addressModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderAddressList() {
  const container = document.getElementById('addressListContainer');
  if (!container) return;

  const addresses = getUserAddresses();
  container.innerHTML = addresses.map(addr => {
    return `
      <div class="bg-white border ${addr.isDefault ? 'border-amber-500 shadow-md' : 'border-stone-200'} rounded-2xl p-4 relative">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${addr.isDefault ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-stone-100 text-stone-600'}">
              ${addr.title || 'Address'}
            </span>
            ${addr.isDefault ? '<span class="text-[10px] text-emerald-700 font-bold">● Default Shipping</span>' : ''}
          </div>
          <button onclick="deleteAddress('${addr.id}')" class="text-stone-400 hover:text-rose-600 text-xs p-1" title="Delete Address">
            🗑️
          </button>
        </div>

        <div class="text-xs font-bold text-stone-900">${addr.name}</div>
        <div class="text-[11px] text-stone-600 mt-1 leading-relaxed">
          ${addr.street}, ${addr.city}, ${addr.state} - <strong>${addr.pincode}</strong>
        </div>
        <div class="text-[11px] text-stone-500 mt-1">
          📞 ${addr.mobile}
        </div>

        ${!addr.isDefault ? `
          <button onclick="setDefaultAddress('${addr.id}')" class="mt-3 text-[11px] font-bold text-amber-800 hover:underline">
            Set as Default Address
          </button>
        ` : ''}
      </div>
    `;
  }).join('');
}

function handleAddAddressSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const userKey = currentUser ? currentUser.email : 'guest';

  const addresses = getUserAddresses();
  const newAddr = {
    id: "ADDR-" + Date.now(),
    title: form.addrTitle.value || "Home",
    name: form.addrName.value.trim(),
    mobile: form.addrMobile.value.trim(),
    street: form.addrStreet.value.trim(),
    city: form.addrCity.value.trim(),
    state: form.addrState.value.trim(),
    pincode: form.addrPincode.value.trim(),
    isDefault: addresses.length === 0
  };

  addresses.push(newAddr);
  localStorage.setItem('asma_addresses_' + userKey, JSON.stringify(addresses));

  form.reset();
  toggleAddAddressForm(false);
  renderAddressList();
  showToast("New delivery address added successfully! 📍");
}

function deleteAddress(addrId) {
  const userKey = currentUser ? currentUser.email : 'guest';
  let addresses = getUserAddresses();
  if (confirm("Are you sure you want to remove this address?")) {
    addresses = addresses.filter(a => a.id !== addrId);
    if (addresses.length > 0 && !addresses.some(a => a.isDefault)) {
      addresses[0].isDefault = true;
    }
    localStorage.setItem('asma_addresses_' + userKey, JSON.stringify(addresses));
    renderAddressList();
    showToast("Address removed.");
  }
}

function setDefaultAddress(addrId) {
  const userKey = currentUser ? currentUser.email : 'guest';
  const addresses = getUserAddresses();
  addresses.forEach(a => {
    a.isDefault = (a.id === addrId);
  });
  localStorage.setItem('asma_addresses_' + userKey, JSON.stringify(addresses));
  renderAddressList();
  showToast("Default delivery address updated.");
}

function toggleAddAddressForm(show = true) {
  const formBox = document.getElementById('addNewAddressFormContainer');
  const btn = document.getElementById('toggleAddAddressBtn');
  if (!formBox) return;

  if (show) {
    formBox.classList.remove('hidden');
    if (btn) btn.classList.add('hidden');
  } else {
    formBox.classList.add('hidden');
    if (btn) btn.classList.remove('hidden');
  }
}

// ==========================================
// 5. MY PROFILE BUTTON 4: "MY SAVED WISHLIST"
// ==========================================
function openWishlistModal() {
  const dropdown = document.getElementById('profileDropdownMenu');
  if (dropdown) dropdown.classList.add('hidden');

  const modal = document.getElementById('wishlistModal');
  const container = document.getElementById('wishlistItemsContainer');
  if (!modal || !container) return;

  const prods = getAllProducts();
  const wishItems = prods.filter(p => wishlist.includes(p.id));

  if (wishItems.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <div class="text-4xl mb-2">❤️</div>
        <h4 class="font-serif font-bold text-stone-900 text-sm">Your Wishlist is Empty</h4>
        <p class="text-xs text-stone-500 mt-1">Save your favourite harams, bangles, and rings to view them anytime!</p>
        <button onclick="closeWishlistModal(); document.getElementById('shopCatalog').scrollIntoView({behavior: 'smooth'});" class="mt-4 px-6 py-2.5 rounded-full bg-gold-btn text-white font-bold text-xs uppercase tracking-wider shadow">
          Explore Jewellery Catalog
        </button>
      </div>
    `;
  } else {
    container.innerHTML = wishItems.map(item => {
      const pricing = getProductPricing(item);
      return `
        <div class="flex items-center gap-4 p-4 bg-white border border-[#EADBBA] rounded-2xl shadow-sm">
          <img src="${item.image}" alt="${item.name}" class="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl border border-stone-200 shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="font-serif font-bold text-stone-900 text-xs sm:text-sm truncate">${item.name}</h4>
            <div class="text-[11px] text-stone-500 mt-0.5">${item.weight}g • ${item.purity}</div>
            <div class="text-sm font-black text-amber-800 font-serif mt-1">${formatINR(pricing.finalPrice)}</div>
          </div>
          <div class="flex flex-col gap-2 shrink-0">
            <button onclick="addToCart('${item.id}'); toggleWishlist('${item.id}'); openWishlistModal();" class="px-3 py-1.5 rounded-xl bg-gold-btn text-white font-bold text-xs shadow hover:shadow-md cursor-pointer">
              🛍️ Move to Bag
            </button>
            <button onclick="toggleWishlist('${item.id}'); openWishlistModal();" class="px-3 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold cursor-pointer">
              ✕ Remove
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeWishlistModal() {
  const modal = document.getElementById('wishlistModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// ==========================================
// 6. REAL-TIME ADMIN NOTIFICATIONS SYSTEM
// ==========================================

function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5
    osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.25); // D6
    
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {
    // Audio context may require user interaction
  }
}

function pushAdminOrderNotification(order) {
  const newNotif = {
    id: "NOTIF-" + Date.now(),
    orderId: order.orderId,
    customerName: order.customerName,
    customerMobile: order.mobile,
    customerEmail: order.email,
    itemCount: order.items.length,
    itemsSummary: order.items.map(it => `${it.name} (${it.weight}g)`).join(", "),
    totalAmount: order.totalAmount,
    timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    read: false
  };

  adminNotifications.unshift(newNotif);
  localStorage.setItem('asma_admin_notifications', JSON.stringify(adminNotifications));

  // Play audio chime
  playNotificationChime();

  // Update Admin UI counters & table
  updateAdminNotificationUI();

  // Show live toast if admin is active or anywhere on page
  showToast(`🚨 NEW ORDER ALERT: ${order.customerName} placed order #${order.orderId} for ${formatINR(order.totalAmount)}!`);
}

function updateAdminNotificationUI() {
  const unreadCount = adminNotifications.filter(n => !n.read).length;
  
  // Header badge on Owner Bar
  const badgeEl = document.getElementById('adminNotifBadge');
  if (badgeEl) {
    badgeEl.textContent = unreadCount;
    if (unreadCount > 0) {
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }
  }

  // Admin Hub Notification Feed
  const feedContainer = document.getElementById('adminNotificationFeed');
  if (!feedContainer) return;

  if (adminNotifications.length === 0) {
    feedContainer.innerHTML = `
      <div class="text-center py-6 text-stone-400 text-xs">
        No new order notifications yet.
      </div>
    `;
    return;
  }

  feedContainer.innerHTML = adminNotifications.map(notif => {
    return `
      <div class="p-3.5 rounded-xl border ${notif.read ? 'bg-white border-stone-200' : 'bg-amber-50/70 border-amber-300 shadow-sm'} flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div class="flex items-start gap-3">
          <span class="text-xl shrink-0 mt-0.5">${notif.read ? '📫' : '🔔'}</span>
          <div>
            <div class="flex items-center gap-2">
              <strong class="text-stone-900">${notif.customerName}</strong>
              <span class="text-stone-500">placed order <strong class="text-amber-800">#${notif.orderId}</strong></span>
              ${!notif.read ? '<span class="px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[9px] uppercase tracking-wider animate-pulse">New Order</span>' : ''}
            </div>
            <div class="text-[11px] text-stone-600 mt-1">
              🛍️ <strong>Items:</strong> ${notif.itemsSummary}
            </div>
            <div class="text-[11px] text-stone-500 mt-0.5">
              💰 Total: <strong class="text-stone-900">${formatINR(notif.totalAmount)}</strong> • 🕒 ${notif.timestamp} • 📞 ${notif.customerMobile}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
          ${!notif.read ? `
            <button onclick="markNotificationRead('${notif.id}')" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg text-[11px] border border-stone-300 transition">
              Mark Read
            </button>
          ` : `
            <span class="text-[11px] text-stone-400">Read</span>
          `}
          <button onclick="scrollToOrder('${notif.orderId}')" class="px-3 py-1 bg-gold-btn text-white font-bold rounded-lg text-[11px] shadow transition">
            View Order
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function markNotificationRead(notifId) {
  const notif = adminNotifications.find(n => n.id === notifId);
  if (notif) {
    notif.read = true;
    localStorage.setItem('asma_admin_notifications', JSON.stringify(adminNotifications));
    updateAdminNotificationUI();
  }
}

function markAllNotificationsRead() {
  adminNotifications.forEach(n => n.read = true);
  localStorage.setItem('asma_admin_notifications', JSON.stringify(adminNotifications));
  updateAdminNotificationUI();
  showToast("All notifications marked as read.");
}

function clearAllNotifications() {
  if (confirm("Are you sure you want to clear all order notifications?")) {
    adminNotifications = [];
    localStorage.setItem('asma_admin_notifications', JSON.stringify(adminNotifications));
    updateAdminNotificationUI();
    showToast("Notification feed cleared.");
  }
}

function scrollToOrder(orderId) {
  const el = document.getElementById('adminOrdersTableBody');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    showToast(`Showing order #${orderId}`);
  }
}

// Admin test notification trigger
function triggerTestOrderNotification() {
  const testOrder = {
    orderId: "ASMA-" + Math.floor(100000 + Math.random() * 900000),
    customerName: "S. Lakshmi Devi",
    mobile: "9876501234",
    email: "lakshmi.devi@gmail.com",
    items: [
      { id: "ASMA-101", name: "Royal Peacock Bridal Gold Haram", weight: 52.80, price: 448800, quantity: 1 }
    ],
    totalAmount: 448800
  };
  pushAdminOrderNotification(testOrder);
}

// ==========================================
// 7. ADMIN / SELLER PORTAL
// ==========================================
function openAdminPortal() {
  if (!isAdminLoggedIn) {
    openAuthModal('admin-login');
    return;
  }

  const portal = document.getElementById('adminPortalSection');
  if (!portal) return;

  portal.classList.remove('hidden');
  document.getElementById('home').classList.add('hidden');
  document.getElementById('shopCatalog').classList.add('hidden');
  document.getElementById('calculator').classList.add('hidden');

  renderAdminStats();
  renderAdminProductsTable();
  renderAdminOrdersTable();
  renderMonthlyReportTable();
  updateAdminNotificationUI();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeAdminPortal() {
  const portal = document.getElementById('adminPortalSection');
  if (!portal) return;

  portal.classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
  document.getElementById('shopCatalog').classList.remove('hidden');
  document.getElementById('calculator').classList.remove('hidden');
  renderProducts();
}

function renderAdminStats() {
  const totalRev = ordersDB.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = ordersDB.length;
  const totalProds = getAllProducts().length;

  const revEl = document.getElementById('adminStatRevenue');
  const ordEl = document.getElementById('adminStatOrders');
  const prodsEl = document.getElementById('adminStatProducts');

  if (revEl) revEl.textContent = formatINR(totalRev);
  if (ordEl) ordEl.textContent = totalOrders;
  if (prodsEl) prodsEl.textContent = totalProds;
}

function handleAddProductSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.prodName.value.trim();
  const category = form.prodCategory.value;
  const weight = parseFloat(form.prodWeight.value) || 10;
  const karat = parseInt(form.prodKarat.value, 10) || 22;
  const makingPct = parseFloat(form.prodMaking.value) || 10;
  const badge = form.prodBadge.value || "New Arrival";
  const image = form.prodImage.value.trim() || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80";
  const desc = form.prodDesc.value.trim() || "BIS 916 Hallmarked exclusive custom designed gold jewellery.";

  const newId = "ASMA-" + Math.floor(200 + Math.random() * 800);

  const newProduct = {
    id: newId,
    name,
    category,
    weight,
    karat,
    purity: `${karat}K BIS 916 Hallmark`,
    makingPct,
    originalMakingPct: makingPct + 4,
    badge,
    image,
    desc
  };

  customProducts.unshift(newProduct);
  localStorage.setItem('asma_custom_products', JSON.stringify(customProducts));

  form.reset();
  renderAdminProductsTable();
  renderAdminStats();
  renderProducts();
  showToast(`Product "${name}" published successfully!`);
}

function deleteCustomProduct(productId) {
  if (confirm("Are you sure you want to remove this item from the store?")) {
    customProducts = customProducts.filter(p => p.id !== productId);
    localStorage.setItem('asma_custom_products', JSON.stringify(customProducts));
    renderAdminProductsTable();
    renderAdminStats();
    renderProducts();
    showToast("Product removed successfully.");
  }
}

function renderAdminProductsTable() {
  const container = document.getElementById('adminProductsTableBody');
  if (!container) return;

  const prods = getAllProducts();
  container.innerHTML = prods.map(p => {
    const pricing = getProductPricing(p);
    const isCustom = customProducts.some(cp => cp.id === p.id);
    return `
      <tr class="border-b border-stone-200 hover:bg-amber-50/40 text-xs">
        <td class="py-3 px-4 flex items-center gap-3">
          <img src="${p.image}" class="w-10 h-10 object-cover rounded-lg border border-[#EADBBA]">
          <div>
            <div class="font-bold text-stone-900">${p.name}</div>
            <div class="text-[10px] text-stone-500">${p.id} • ${p.purity}</div>
          </div>
        </td>
        <td class="py-3 px-4 font-semibold text-stone-700 capitalize">${p.category}</td>
        <td class="py-3 px-4 font-bold text-stone-800">${p.weight.toFixed(2)}g</td>
        <td class="py-3 px-4 font-bold text-amber-800">${formatINR(pricing.finalPrice)}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            ${p.badge}
          </span>
        </td>
        <td class="py-3 px-4 text-right">
          ${isCustom ? `
            <button onclick="deleteCustomProduct('${p.id}')" class="px-2.5 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition">
              Delete
            </button>
          ` : `
            <span class="text-stone-400 text-[10px]">Base Catalog</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminOrdersTable() {
  const container = document.getElementById('adminOrdersTableBody');
  if (!container) return;

  container.innerHTML = ordersDB.map(o => {
    return `
      <tr class="border-b border-stone-200 hover:bg-amber-50/40 text-xs">
        <td class="py-3 px-4 font-bold text-amber-800">${o.orderId}</td>
        <td class="py-3 px-4">
          <div class="font-bold text-stone-900">${o.customerName}</div>
          <div class="text-[10px] text-stone-500">${o.mobile}</div>
        </td>
        <td class="py-3 px-4">
          ${o.items.map(it => `<div>${it.name} (${it.quantity || 1})</div>`).join('')}
        </td>
        <td class="py-3 px-4 font-bold text-stone-900">${formatINR(o.totalAmount)}</td>
        <td class="py-3 px-4">
          <select onchange="updateOrderStatus('${o.orderId}', this.value)" class="bg-white border border-[#EADBBA] rounded-lg p-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-600">
            <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Hallmark Verified" ${o.status === 'Hallmark Verified' ? 'selected' : ''}>Hallmark Verified</option>
            <option value="Dispatched" ${o.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const ord = ordersDB.find(o => o.orderId === orderId);
  if (ord) {
    ord.status = newStatus;
    localStorage.setItem('asma_orders_db', JSON.stringify(ordersDB));
    showToast(`Order ${orderId} updated to ${newStatus}`);
  }
}

function renderMonthlyReportTable() {
  const container = document.getElementById('adminMonthlyReportTableBody');
  if (!container) return;

  const months = ["September 2026", "August 2026"];
  container.innerHTML = months.map(m => {
    const monthlyOrders = ordersDB.filter(o => o.month === m);
    const count = monthlyOrders.length;
    const rev = monthlyOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const avg = count > 0 ? Math.round(rev / count) : 0;
    return `
      <tr class="border-b border-stone-200 text-xs">
        <td class="py-3 px-4 font-bold text-stone-900">${m}</td>
        <td class="py-3 px-4 font-bold text-stone-700">${count} Orders</td>
        <td class="py-3 px-4 font-bold text-amber-800">${formatINR(rev)}</td>
        <td class="py-3 px-4 text-stone-600">${formatINR(avg)}</td>
      </tr>
    `;
  }).join('');
}

function handleUpdateBullionRates(e) {
  e.preventDefault();
  const form = e.target;
  rates.gold24k = parseInt(form.rate24k.value, 10) || rates.gold24k;
  rates.gold22k = parseInt(form.rate22k.value, 10) || rates.gold22k;
  rates.gold18k = parseInt(form.rate18k.value, 10) || rates.gold18k;
  rates.silver = parseInt(form.rateSilver.value, 10) || rates.silver;

  updateRateDisplay();
  renderProducts();
  calculateGoldPrice();
  showToast("Live bullion rates updated across the store!");
}

// ==========================================
// 8. PRODUCT RENDERING & SHOPPING
// ==========================================
function updateRateDisplay() {
  const r22 = document.getElementById('rate22kGram');
  const r24 = document.getElementById('rate24kGram');
  const r18 = document.getElementById('rate18kGram');
  const rSil = document.getElementById('rateSilverGram');

  if (r22) r22.textContent = formatINR(rates.gold22k);
  if (r24) r24.textContent = formatINR(rates.gold24k);
  if (r18) r18.textContent = formatINR(rates.gold18k);
  if (rSil) rSil.textContent = formatINR(rates.silver);
}

function renderProducts() {
  const container = document.getElementById('productGrid');
  if (!container) return;

  const searchInput = document.getElementById('productSearch');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  const activeFilterBtn = document.querySelector('.filter-btn.active');
  const activeCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-category') : 'all';

  const sortSelect = document.getElementById('sortProducts');
  const sortBy = sortSelect ? sortSelect.value : 'featured';

  let prods = getAllProducts();

  if (activeCategory && activeCategory !== 'all') {
    prods = prods.filter(p => p.category === activeCategory);
  }

  if (query) {
    prods = prods.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  if (sortBy === 'price-asc') {
    prods.sort((a, b) => getProductPricing(a).finalPrice - getProductPricing(b).finalPrice);
  } else if (sortBy === 'price-desc') {
    prods.sort((a, b) => getProductPricing(b).finalPrice - getProductPricing(a).finalPrice);
  } else if (sortBy === 'weight-asc') {
    prods.sort((a, b) => a.weight - b.weight);
  } else if (sortBy === 'weight-desc') {
    prods.sort((a, b) => b.weight - a.weight);
  }

  const countDisplay = document.getElementById('productCountDisplay');
  if (countDisplay) {
    countDisplay.textContent = `Showing ${prods.length} exclusive certified gold jewellery designs`;
  }

  if (prods.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-lg font-serif font-bold text-stone-900">No matching jewellery designs found</h3>
        <p class="text-xs text-stone-500 mt-1">Try another keyword or filter by bridal harams, bangles, or gold coins.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = prods.map(item => {
    const pricing = getProductPricing(item);
    const inWish = wishlist.includes(item.id);

    return `
      <div class="product-card bg-white border border-[#EADBBA] rounded-2xl overflow-hidden flex flex-col justify-between group shadow-sm hover:border-amber-400">
        <!-- Image & Badges -->
        <div class="relative product-img-wrapper aspect-square bg-[#F8F5EE]">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy">
          
          <!-- Hallmark Tag -->
          <div class="absolute top-3 left-3 flex flex-col gap-1.5">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-amber-900 shadow border border-amber-300">
              ${item.badge}
            </span>
            <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-[#111827]/80 text-amber-300 backdrop-blur-sm">
              ${item.purity}
            </span>
          </div>

          <!-- Wishlist Heart Button -->
          <button 
            onclick="toggleWishlist('${item.id}')" 
            class="wishlist-btn ${inWish ? 'active' : ''} absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-stone-500 hover:text-rose-600 flex items-center justify-center transition shadow border border-stone-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>

        <!-- Details -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-serif font-bold text-stone-900 text-sm line-clamp-1 group-hover:text-amber-700 transition">
              ${item.name}
            </h3>
            
            <!-- Weight and Karat chips -->
            <div class="flex items-center gap-2 mt-2 text-[11px] text-stone-600">
              <span class="bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 font-semibold">
                ⚖ ${item.weight.toFixed(2)} Grams
              </span>
              <span class="bg-stone-100 px-2 py-0.5 rounded font-semibold text-stone-700">
                ${item.karat} Karat
              </span>
            </div>

            <!-- Price Breakdown -->
            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-lg font-black text-stone-900 font-serif">
                ${formatINR(pricing.finalPrice)}
              </span>
              <span class="text-xs text-stone-400 line-through">
                ${formatINR(pricing.originalFinal)}
              </span>
            </div>
            <div class="text-[10px] text-emerald-700 font-semibold mt-0.5">
              Save ${formatINR(pricing.savings)} (Special Making Charge ${item.makingPct}%)
            </div>
          </div>

          <!-- Buttons -->
          <div class="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
            <button 
              onclick="addToCart('${item.id}')" 
              class="flex-1 py-2 rounded-xl bg-gold-btn text-white font-bold text-xs uppercase tracking-wider transition shadow cursor-pointer gold-gleam">
              Add to Bag
            </button>
            <button 
              onclick="openProductModal('${item.id}')" 
              class="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition border border-stone-200 cursor-pointer"
              title="View Breakdown">
              🔍 Details
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  setTimeout(initScrollAnimations, 50);
}

// Smooth Scroll Reveal via IntersectionObserver
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up-init:not(.in-view)');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('in-view'));
  }
}

// Badge Elastic Pop Animation Helper
function triggerBadgePop(el) {
  if (!el) return;
  el.classList.remove('badge-pop');
  void el.offsetWidth; // Trigger DOM reflow
  el.classList.add('badge-pop');
}

// Wishlist Toggle
function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast("Removed from Wishlist");
  } else {
    wishlist.push(productId);
    showToast("Added to Wishlist ❤️");
  }
  localStorage.setItem('asma_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
  renderProducts();
}

function updateWishlistCount() {
  const el = document.getElementById('wishlistCountBadge');
  if (el) {
    el.textContent = wishlist.length;
    if (wishlist.length > 0) {
      el.classList.remove('hidden');
      triggerBadgePop(el);
    } else {
      el.classList.add('hidden');
    }
  }
}

// Cart Management
function addToCart(productId) {
  const prods = getAllProducts();
  const item = prods.find(p => p.id === productId);
  if (!item) return;

  const existing = cart.find(ci => ci.id === productId);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      weight: item.weight,
      karat: item.karat,
      purity: item.purity,
      makingPct: item.makingPct,
      image: item.image,
      quantity: 1
    });
  }

  localStorage.setItem('asma_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
  showToast(`Added ${item.name} to Bag`);
  toggleCartDrawer(true);
}

function updateCartQuantity(productId, delta) {
  const item = cart.find(ci => ci.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(ci => ci.id !== productId);
  }

  localStorage.setItem('asma_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function removeCartItem(productId) {
  cart = cart.filter(ci => ci.id !== productId);
  localStorage.setItem('asma_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
  showToast("Item removed from Bag");
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    badge.textContent = totalItems;
    if (totalItems > 0) {
      badge.classList.remove('hidden');
      triggerBadgePop(badge);
    } else {
      badge.classList.add('hidden');
    }
  }
}

function toggleCartDrawer(open = true) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (!drawer || !backdrop) return;

  if (open) {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    backdrop.classList.remove('hidden');
    renderCartDrawer();
  } else {
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');
    backdrop.classList.add('hidden');
  }
}

function renderCartDrawer() {
  const itemsContainer = document.getElementById('cartDrawerItems');
  const summaryContainer = document.getElementById('cartDrawerSummary');
  if (!itemsContainer || !summaryContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="text-center py-16 px-4">
        <div class="text-5xl mb-3">🛍️</div>
        <h4 class="font-serif font-bold text-stone-900 text-base">Your shopping bag is empty</h4>
        <p class="text-xs text-stone-500 mt-1">Explore our royal handcrafted jewellery and add your favourite pieces!</p>
        <button onclick="toggleCartDrawer(false)" class="mt-5 px-6 py-2.5 rounded-full bg-gold-btn text-white font-bold text-xs uppercase tracking-wider shadow">
          Explore Jewellery Catalog
        </button>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  let totalRaw = 0;
  let totalMaking = 0;
  let totalSavings = 0;

  itemsContainer.innerHTML = cart.map(item => {
    const pricing = getProductPricing(item);
    const itemTotal = pricing.finalPrice * item.quantity;
    totalRaw += pricing.rawGold * item.quantity;
    totalMaking += pricing.makingCharges * item.quantity;
    totalSavings += pricing.savings * item.quantity;

    return `
      <div class="flex gap-3 p-3 bg-white rounded-xl border border-stone-200">
        <img src="${item.image}" class="w-16 h-16 rounded-lg object-cover border border-[#EADBBA]">
        <div class="flex-1 flex flex-col justify-between">
          <div class="flex justify-between items-start">
            <div>
              <h5 class="font-serif font-bold text-stone-900 text-xs line-clamp-1">${item.name}</h5>
              <span class="text-[10px] text-stone-500">${item.weight}g • ${item.purity}</span>
            </div>
            <button onclick="removeCartItem('${item.id}')" class="text-stone-400 hover:text-rose-600 text-xs p-1">✕</button>
          </div>
          
          <div class="flex items-center justify-between mt-2">
            <span class="font-bold text-stone-900 text-xs">${formatINR(itemTotal)}</span>
            <div class="flex items-center border border-stone-300 rounded-lg">
              <button onclick="updateCartQuantity('${item.id}', -1)" class="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-bold">-</button>
              <span class="px-2 text-xs font-bold text-stone-900">${item.quantity}</span>
              <button onclick="updateCartQuantity('${item.id}', 1)" class="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-bold">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const subtotal = totalRaw + totalMaking;
  let discount = 0;
  if (appliedCoupon === 'AR10' || appliedCoupon === 'ASMA10') {
    discount = Math.round(totalMaking * 0.10);
  }
  const gst = Math.round((subtotal - discount) * 0.03);
  const grandTotal = subtotal - discount + gst;

  summaryContainer.innerHTML = `
    <div class="space-y-2 border-t border-stone-200 pt-4 text-xs">
      <!-- Promo Code Input -->
      <div class="flex gap-2 mb-3">
        <input 
          type="text" 
          id="promoInput" 
          placeholder="Enter Coupon (e.g. AR10)" 
          value="${appliedCoupon || ''}"
          class="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600 uppercase">
        <button 
          onclick="applyPromoCode()" 
          class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs">
          Apply
        </button>
      </div>

      <div class="flex justify-between text-stone-600">
        <span>Raw Bullion Value:</span>
        <span class="font-bold text-stone-800">${formatINR(totalRaw)}</span>
      </div>
      <div class="flex justify-between text-stone-600">
        <span>Crafting & Making Charges:</span>
        <span class="font-bold text-stone-800">${formatINR(totalMaking)}</span>
      </div>
      ${discount > 0 ? `
        <div class="flex justify-between text-emerald-700 font-semibold">
          <span>Promo Discount (${appliedCoupon}):</span>
          <span>-${formatINR(discount)}</span>
        </div>
      ` : ''}
      <div class="flex justify-between text-stone-600">
        <span>GST (3% as per Govt regulations):</span>
        <span class="font-bold text-stone-800">${formatINR(gst)}</span>
      </div>
      <div class="flex justify-between text-stone-600">
        <span>Insured Doorstep Delivery:</span>
        <span class="font-bold text-emerald-700">FREE</span>
      </div>

      <div class="flex justify-between text-sm font-black text-stone-900 border-t border-stone-200 pt-3">
        <span>Total Payable Amount:</span>
        <span class="text-base text-amber-800 font-serif">${formatINR(grandTotal)}</span>
      </div>

      <button 
        onclick="openCheckoutModal()" 
        class="w-full mt-4 py-3 rounded-xl bg-gold-btn text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer gold-gleam">
        <span>Proceed to Secure Checkout</span>
        <span>→</span>
      </button>
    </div>
  `;
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  const code = input ? input.value.trim().toUpperCase() : '';

  if (code === 'AR10' || code === 'ASMA10') {
    appliedCoupon = 'AR10';
    showToast("Coupon 'AR10' applied! 10% discount on making charges.");
  } else {
    appliedCoupon = null;
    showToast("Invalid coupon code. Try 'AR10'");
  }
  renderCartDrawer();
}

// Checkout Modal
function openCheckoutModal() {
  if (cart.length === 0) return;
  toggleCartDrawer(false);

  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  // Auto-fill from Default Address if available
  const addresses = getUserAddresses();
  const defAddr = addresses.find(a => a.isDefault) || addresses[0];

  const nameInp = document.getElementById('checkoutName');
  const mobileInp = document.getElementById('checkoutMobile');
  const emailInp = document.getElementById('checkoutEmail');
  const addressInp = document.getElementById('checkoutAddress');

  if (nameInp) nameInp.value = defAddr ? defAddr.name : (currentUser ? currentUser.name : '');
  if (mobileInp) mobileInp.value = defAddr ? defAddr.mobile : (currentUser ? currentUser.mobile : '');
  if (emailInp) emailInp.value = currentUser ? currentUser.email : '';
  if (addressInp && defAddr) {
    addressInp.value = `${defAddr.street}, ${defAddr.city}, ${defAddr.state} - ${defAddr.pincode}`;
  }

  // Populate saved address selector if multiple exist
  const selectorBox = document.getElementById('checkoutSavedAddressSelector');
  if (selectorBox && addresses.length > 0) {
    selectorBox.innerHTML = `
      <label class="block text-[11px] font-bold text-stone-600 mb-1">Pick From Your Saved Addresses:</label>
      <select onchange="applySavedAddressToCheckout(this.value)" class="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-2 text-xs text-stone-900 focus:outline-none mb-3">
        ${addresses.map((a, i) => `
          <option value="${a.id}" ${a.isDefault ? 'selected' : ''}>
            ${a.title} - ${a.name} (${a.city} - ${a.pincode})
          </option>
        `).join('')}
      </select>
    `;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function applySavedAddressToCheckout(addrId) {
  const addresses = getUserAddresses();
  const addr = addresses.find(a => a.id === addrId);
  if (!addr) return;

  const nameInp = document.getElementById('checkoutName');
  const mobileInp = document.getElementById('checkoutMobile');
  const addressInp = document.getElementById('checkoutAddress');

  if (nameInp) nameInp.value = addr.name;
  if (mobileInp) mobileInp.value = addr.mobile;
  if (addressInp) addressInp.value = `${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}`;
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Order Submission & Real-Time Notification Trigger
function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.custName.value.trim();
  const mobile = form.custMobile.value.trim();
  const email = form.custEmail.value.trim();
  const address = form.custAddress.value.trim();
  const payment = form.paymentMethod.value;

  const orderId = "AR-" + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = cart.reduce((sum, item) => sum + (getProductPricing(item).finalPrice * item.quantity), 0);

  const newOrder = {
    orderId,
    customerName: name,
    mobile,
    email,
    address,
    items: [...cart],
    totalAmount,
    paymentMethod: payment,
    status: "Confirmed",
    orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    month: "October 2026"
  };

  ordersDB.unshift(newOrder);
  localStorage.setItem('asma_orders_db', JSON.stringify(ordersDB));

  // TRIGGER REAL-TIME ADMIN NOTIFICATION
  pushAdminOrderNotification(newOrder);

  // Clear Cart
  cart = [];
  localStorage.setItem('asma_cart', JSON.stringify(cart));
  updateCartBadge();

  closeCheckoutModal();
  openSuccessModal(newOrder);
}

function openSuccessModal(order) {
  const modal = document.getElementById('successModal');
  if (!modal) return;

  const idEl = document.getElementById('successOrderId');
  const amtEl = document.getElementById('successOrderAmount');
  if (idEl) idEl.textContent = order.orderId;
  if (amtEl) amtEl.textContent = formatINR(order.totalAmount);

  const waBtn = document.getElementById('successWhatsAppBtn');
  if (waBtn) {
    const waText = `Namaste AR Jewellery!\n\nI just placed an order on your website:\n• Order ID: ${order.orderId}\n• Customer: ${order.customerName}\n• Total Amount: ${formatINR(order.totalAmount)}\n• Payment: ${order.paymentMethod}\n\nPlease share delivery dispatch tracking and hallmark certificate.`;
    waBtn.onclick = () => {
      window.open(`https://api.whatsapp.com/send?phone=919390011965&text=${encodeURIComponent(waText)}`, '_blank');
    };
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  launchGoldenConfetti();
}

function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Auspicious Golden Particle Celebration on Order Placement
function launchGoldenConfetti() {
  const colors = ['#D4AF37', '#FFD700', '#F59E0B', '#FDE68A', '#B45309', '#FFFBEB'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const flake = document.createElement('div');
    flake.className = 'gold-confetti-particle';
    const size = Math.random() * 8 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 1.8 + 2.2;
    const delay = Math.random() * 0.8;
    const isDiamond = Math.random() > 0.5;

    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.backgroundColor = color;
    flake.style.left = `${left}vw`;
    flake.style.top = `-20px`;
    flake.style.animationDuration = `${duration}s`;
    flake.style.animationDelay = `${delay}s`;
    flake.style.boxShadow = `0 0 8px ${color}`;
    if (isDiamond) {
      flake.style.transform = 'rotate(45deg)';
    } else {
      flake.style.borderRadius = '50%';
    }

    document.body.appendChild(flake);

    setTimeout(() => {
      flake.remove();
    }, (duration + delay + 0.5) * 1000);
  }
}

// Product Details Modal
function openProductModal(productId) {
  const prods = getAllProducts();
  const item = prods.find(p => p.id === productId);
  if (!item) return;

  const pricing = getProductPricing(item);
  const modal = document.getElementById('productDetailModal');
  const container = document.getElementById('productDetailContent');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Image Gallery -->
      <div class="relative rounded-2xl overflow-hidden aspect-square bg-[#F8F5EE] border border-[#EADBBA]">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-amber-900 border border-amber-300 shadow">
          ${item.badge}
        </span>
      </div>

      <!-- Info -->
      <div class="flex flex-col justify-between">
        <div>
          <span class="text-xs uppercase font-bold tracking-wider text-amber-800">${item.purity}</span>
          <h2 class="text-xl sm:text-2xl font-serif font-black text-stone-900 mt-1">${item.name}</h2>
          <p class="text-xs text-stone-600 mt-2 leading-relaxed">${item.desc}</p>

          <!-- Specifications Table -->
          <div class="mt-4 border border-stone-200 rounded-xl overflow-hidden text-xs">
            <div class="flex justify-between p-2.5 bg-stone-50 border-b border-stone-200">
              <span class="text-stone-500">Net Gold Weight:</span>
              <span class="font-bold text-stone-900">${item.weight.toFixed(2)} Grams</span>
            </div>
            <div class="flex justify-between p-2.5 border-b border-stone-200">
              <span class="text-stone-500">Purity Standard:</span>
              <span class="font-bold text-stone-900">${item.karat} Karat (BIS 916)</span>
            </div>
            <div class="flex justify-between p-2.5 bg-stone-50 border-b border-stone-200">
              <span class="text-stone-500">Making Charges:</span>
              <span class="font-bold text-stone-900">${item.makingPct}% of Gold Value</span>
            </div>
            <div class="flex justify-between p-2.5">
              <span class="text-stone-500">Certification:</span>
              <span class="font-bold text-emerald-700">100% Govt Certified Hallmarking</span>
            </div>
          </div>

          <!-- Price Display -->
          <div class="mt-5 p-4 rounded-xl bg-amber-50/60 border border-amber-200">
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-serif font-black text-stone-900">${formatINR(pricing.finalPrice)}</span>
              <span class="text-sm text-stone-400 line-through">${formatINR(pricing.originalFinal)}</span>
            </div>
            <div class="text-xs text-emerald-700 font-semibold mt-1">
              Inclusive of 3% GST & Insured Transit Coverage
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex gap-3">
          <button 
            onclick="addToCart('${item.id}'); closeProductModal();" 
            class="flex-1 py-3 rounded-xl bg-gold-btn text-white font-black text-xs uppercase tracking-wider shadow cursor-pointer">
            Add to Shopping Bag
          </button>
          <button 
            onclick="closeProductModal(); openWhatsAppQueryModal('Inquiring about ${item.name} (${item.weight}g, ${item.purity})');" 
            class="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer">
            <span>💬 WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProductModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Gold Price Calculator
function calculateGoldPrice() {
  const weightInput = document.getElementById('calcWeight');
  const karatInput = document.getElementById('calcKarat');
  const makingInput = document.getElementById('calcMaking');

  if (!weightInput || !karatInput || !makingInput) return;

  const weight = parseFloat(weightInput.value) || 0;
  const karat = parseInt(karatInput.value, 10);
  const makingPct = parseFloat(makingInput.value) || 0;

  const weightRange = document.getElementById('calcWeightRange');
  if (weightRange && document.activeElement === weightInput) {
    weightRange.value = weight;
  }

  let ratePerGram = rates.gold22k;
  if (karat === 24) ratePerGram = rates.gold24k;
  if (karat === 18) ratePerGram = rates.gold18k;

  const rawGold = weight * ratePerGram;
  const making = rawGold * (makingPct / 100);
  const subtotal = rawGold + making;
  const gst = subtotal * 0.03;
  const grandTotal = Math.round(subtotal + gst);

  const outRate = document.getElementById('outRatePerGram');
  const outRaw = document.getElementById('outRawGold');
  const outMaking = document.getElementById('outMakingCharges');
  const outGst = document.getElementById('outGstCharges');
  const outTotal = document.getElementById('outGrandTotal');

  if (outRate) outRate.textContent = formatINR(ratePerGram);
  if (outRaw) outRaw.textContent = formatINR(Math.round(rawGold));
  if (outMaking) outMaking.textContent = formatINR(Math.round(making));
  if (outGst) outGst.textContent = formatINR(Math.round(gst));
  if (outTotal) outTotal.textContent = formatINR(grandTotal);
}

// WhatsApp Query Modal
function openWhatsAppQueryModal(prefilledQuery = '') {
  const modal = document.getElementById('whatsappQueryModal');
  if (!modal) return;

  const nameInput = document.getElementById('waCustName');
  const mobileInput = document.getElementById('waCustMobile');
  const placeInput = document.getElementById('waCustPlace');
  const queryInput = document.getElementById('waCustQuery');

  if (currentUser) {
    if (nameInput && !nameInput.value) nameInput.value = currentUser.name || '';
    if (mobileInput && !mobileInput.value) mobileInput.value = currentUser.mobile || '';
  }

  if (queryInput) {
    queryInput.value = prefilledQuery || 'I would like to inquire about gold jewellery designs and today\'s live gold rate.';
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeWhatsAppQueryModal() {
  const modal = document.getElementById('whatsappQueryModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function setWaQueryPreset(presetText) {
  const queryInput = document.getElementById('waCustQuery');
  if (queryInput) {
    queryInput.value = presetText;
  }
}

function handleWhatsAppQuerySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('waCustName').value.trim();
  const mobile = document.getElementById('waCustMobile').value.trim();
  const place = document.getElementById('waCustPlace').value.trim();
  const query = document.getElementById('waCustQuery').value.trim() || 'General Jewellery Inquiry';

  if (!name || !mobile || !place) {
    alert("Please fill all mandatory fields: Customer Name, Mobile Number, and Place!");
    return;
  }

  // Greeting starts with "Hi Asma, ..."
  const waGreeting = `Hi Asma,\nI am contacting you from your website with an inquiry:\n\n• Name of the Customer: ${name}\n• Mobile Number: ${mobile}\n• Place: ${place}\n• Query: ${query}\n\nPlease assist me with details.`;

  // Destination WhatsApp number (passed internally, never exposed in text)
  const shopPhone = "919390011965";
  const url = `https://api.whatsapp.com/send?phone=${shopPhone}&text=${encodeURIComponent(waGreeting)}`;

  closeWhatsAppQueryModal();
  showToast("Opening WhatsApp chat with AR Jewellery...");
  window.open(url, '_blank');
}

// Toast notification helper
function showToast(msg) {
  const toast = document.getElementById('shopToast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 3500);
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  updateRateDisplay();
  updateWishlistCount();
  updateCartBadge();
  updateUserUI();
  renderProducts();
  renderCartDrawer();
  calculateGoldPrice();
  initScrollAnimations();

  setTimeout(checkWelcomeGateway, 400);

  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderProducts();
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-gold-btn', 'text-white');
        b.classList.add('bg-white', 'text-stone-700', 'border', 'border-stone-200');
      });
      btn.classList.add('active', 'bg-gold-btn', 'text-white');
      btn.classList.remove('bg-white', 'text-stone-700', 'border', 'border-stone-200');
      renderProducts();
    });
  });

  const sortSelect = document.getElementById('sortProducts');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      renderProducts();
    });
  }

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  const weightRange = document.getElementById('calcWeightRange');
  const weightInput = document.getElementById('calcWeight');
  if (weightRange && weightInput) {
    weightRange.addEventListener('input', () => {
      weightInput.value = weightRange.value;
      calculateGoldPrice();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCheckoutModal();
      closeSuccessModal();
      closeAuthModal();
      closeOrdersModal();
      closePreferencesModal();
      closeAddressModal();
      closeWishlistModal();
      closeWhatsAppQueryModal();
      toggleCartDrawer(false);
      const dropdown = document.getElementById('profileDropdownMenu');
      if (dropdown) dropdown.classList.add('hidden');
    }
  });

  window.addEventListener('click', (e) => {
    const userBox = document.getElementById('headerUserBox');
    const dropdown = document.getElementById('profileDropdownMenu');
    if (dropdown && !dropdown.classList.contains('hidden')) {
      if (userBox && !userBox.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    }
  });
});
