/* ============================================
   駒川商店街 - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHamburger();
  initScrollReveal();
  initSmoothScroll();
});

/* --- Sticky Header with scroll effect --- */
function initHeader() {
  const header = document.getElementById('header');
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

/* --- Hamburger Menu --- */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  const navLinks = navMobile.querySelectorAll('.nav-mobile-link');

  function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';

    // Update aria
    hamburger.setAttribute('aria-expanded', isActive);
    hamburger.setAttribute('aria-label', isActive ? 'メニューを閉じる' : 'メニューを開く');
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMobile.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile.classList.contains('active')) {
      toggleMenu();
    }
  });
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    reveals.forEach(el => el.classList.add('visible'));
  }
}

/* --- Smooth Scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ===== SHOP DATA & LOGIC ===== */
// Mock Data for Shops
const shopsData = [
    {
        id: 1,
        name: "駒川コロッケ本舗",
        category: "gourmet",
        categoryName: "グルメ",
        description: "創業50年。秘伝のタレとホクホクのじゃがいもが自慢のコロッケ専門店。揚げたてをアツアツでどうぞ。",
        hours: "10:00 - 19:00",
        closed: "火曜日",
        image: "images/gourmet.png"
    },
    {
        id: 2,
        name: "魚広場 鮮魚店",
        category: "fresh",
        categoryName: "生鮮食品",
        description: "毎朝市場から直送される新鮮な魚介類を取り揃えています。お刺身の盛り合わせも承ります。",
        hours: "9:00 - 18:00",
        closed: "水曜日",
        image: "images/fresh-food.png"
    },
    {
        id: 3,
        name: "ブティック エレガンス",
        category: "fashion",
        categoryName: "ファッション",
        description: "大人の女性のためのセレクトショップ。トレンドを取り入れつつも、長く愛用できるアイテムを提案します。",
        hours: "10:00 - 18:00",
        closed: "不定休",
        image: "images/fashion.png"
    },
    {
        id: 4,
        name: "こまがわ整骨院",
        category: "beauty",
        categoryName: "美容・健康",
        description: "地域の皆様の健康をサポート。肩こり・腰痛など、お体の不調はお気軽にご相談ください。",
        hours: "9:00 - 12:30 / 15:00 - 19:30",
        closed: "日・祝",
        image: "images/beauty.png"
    },
    {
        id: 5,
        name: "クリーニング白洋",
        category: "service",
        categoryName: "サービス",
        description: "丁寧な仕上げが安くて早い！当日仕上げも可能です。お気に入りの洋服を大切にケアします。",
        hours: "8:30 - 19:00",
        closed: "木曜日",
        image: "images/service.png"
    },
    {
        id: 6,
        name: "カフェ 陽だまり",
        category: "gourmet",
        categoryName: "グルメ",
        description: "商店街の喧騒を忘れてほっと一息。手作りケーキとこだわりのコーヒーをご用意してお待ちしています。",
        hours: "8:00 - 17:00",
        closed: "月曜日",
        image: "images/gourmet.png"
    },
    {
        id: 7,
        name: "八百屋 旬鮮",
        category: "fresh",
        categoryName: "生鮮食品",
        description: "季節の野菜や果物をリーズナブルな価格で。地元農家さんからの直送野菜も人気です。",
        hours: "9:30 - 18:30",
        closed: "日曜日",
        image: "images/fresh-food.png"
    },
    {
        id: 8,
        name: "メンズショップ ダンディ",
        category: "fashion",
        categoryName: "ファッション",
        description: "カジュアルからビジネスまで、紳士服のことなら当店へ。スーツのオーダーメイドも承ります。",
        hours: "10:00 - 19:00",
        closed: "火曜日",
        image: "images/fashion.png"
    },
    {
        id: 9,
        name: "リラクゼーション 癒し堂",
        category: "beauty",
        categoryName: "美容・健康",
        description: "全身もみほぐし60分2,980円〜。お買い物の合間に疲れをリセットしませんか？",
        hours: "10:00 - 21:00",
        closed: "年中無休",
        image: "images/beauty.png"
    },
    {
        id: 10,
        name: "スマホ修理工房",
        category: "service",
        categoryName: "サービス",
        description: "画面割れ、バッテリー交換など、iPhone・Androidの修理ならお任せ。即日修理も可能です。",
        hours: "10:00 - 19:00",
        closed: "水曜日",
        image: "images/service.png"
    },
];

// Initialize Shop Page Logic
document.addEventListener('DOMContentLoaded', () => {
    const shopGrid = document.getElementById('shopGrid');
    const categoryFilters = document.getElementById('categoryFilters');
    const searchInput = document.getElementById('shopSearchInput');
    const noResults = document.getElementById('noResults');

    // Check if we are on the shop page by checking if shopGrid exists
    if (shopGrid) {
        initializeShopPage();
    }

    function initializeShopPage() {
        renderShops(shopsData);

        // Filter Buttons Logic
        const filterBtns = categoryFilters.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                filterShops(filter, searchInput.value);
            });
        });

        // Search Input Logic
        searchInput.addEventListener('input', (e) => {
            const activeFilterBtn = categoryFilters.querySelector('.filter-btn.active');
            const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
            filterShops(filter, e.target.value);
        });

        // Check URL params for initial filter (e.g., from footer links)
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('cat');
        if (catParam) {
            const targetBtn = categoryFilters.querySelector(`.filter-btn[data-filter="${catParam}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        }
    }

    function renderShops(shops) {
        shopGrid.innerHTML = '';

        if (shops.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        shops.forEach(shop => {
            const card = document.createElement('article');
            card.className = 'shop-card reveal';
            card.innerHTML = `
        <div class="shop-image-container">
          <img src="${shop.image}" alt="${shop.name}" class="shop-image" loading="lazy">
          <span class="shop-category-badge badge-${shop.category}">${shop.categoryName}</span>
        </div>
        <div class="shop-content">
          <h3 class="shop-name">${shop.name}</h3>
          <div class="shop-info-row">
            <span class="shop-info-icon">🕒</span>
            <span>${shop.hours}</span>
          </div>
          <div class="shop-info-row">
            <span class="shop-info-icon">📅</span>
            <span>定休日: ${shop.closed}</span>
          </div>
          <p class="shop-description">${shop.description}</p>
        </div>
      `;
            shopGrid.appendChild(card);
        });

        // Re-trigger animations for new elements if using the specific class
        const newElements = shopGrid.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        newElements.forEach(el => observer.observe(el));
    }

    function filterShops(category, searchText) {
        const search = searchText.toLowerCase().trim();

        const filtered = shopsData.filter(shop => {
            // Category Match
            const categoryMatch = category === 'all' || shop.category === category;

            // Search Match
            const searchMatch = shop.name.toLowerCase().includes(search) ||
                shop.description.toLowerCase().includes(search) ||
                shop.categoryName.includes(search);

            return categoryMatch && searchMatch;
        });

        renderShops(filtered);
    }
});

/* ===== GALLERY PAGE LOGIC ===== */
document.addEventListener('DOMContentLoaded', () => {
    const photoGrid = document.getElementById('photoGrid');
    const galleryFilters = document.getElementById('galleryFilters');
    const lightbox = document.getElementById('lightbox');

    // Check if we are on the gallery page
    if (photoGrid && lightbox) {
        initializeGallery();
    }

    function initializeGallery() {
        // 1. Filter Logic
        const filterBtns = galleryFilters.querySelectorAll('.filter-btn');
        const items = photoGrid.querySelectorAll('.photo-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active class toggle
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                items.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // 2. Lightbox Logic
        const lightboxImg = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const closeBtn = document.getElementById('lightboxClose');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        let currentIndex = 0;
        let visibleItems = [];

        // Update visible items list based on current filter
        function updateVisibleItems() {
            visibleItems = Array.from(items).filter(item => item.style.display !== 'none');
        }

        // Open Lightbox
        items.forEach((item) => {
            item.addEventListener('click', () => {
                updateVisibleItems();
                currentIndex = visibleItems.indexOf(item);
                if (currentIndex !== -1) {
                    showLightbox(currentIndex);
                }
            });
        });

        function showLightbox(index) {
            if (index < 0) index = visibleItems.length - 1;
            if (index >= visibleItems.length) index = 0;
            currentIndex = index;

            const item = visibleItems[index];
            const img = item.querySelector('img');
            const caption = item.querySelector('.photo-caption').innerText;

            lightboxImg.src = img.src;
            lightboxCaption.innerText = caption;
            lightbox.classList.add('active');
        }

        // Close Lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // Navigation
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightbox(currentIndex - 1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightbox(currentIndex + 1);
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') lightbox.classList.remove('active');
            if (e.key === 'ArrowLeft') showLightbox(currentIndex - 1);
            if (e.key === 'ArrowRight') showLightbox(currentIndex + 1);
        });
    }
});
