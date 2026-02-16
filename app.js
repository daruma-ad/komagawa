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
    name: "ブティック ヒサシ",
    category: "fashion",
    categoryName: "ファッション",
    description: "「洗練された上品なスタイリング」をテーマに様々なブランドの中からセレクトしたアイテムをそろえております。",
    hours: "10:00 - 20:00 (土日 19:00まで)",
    closed: "火曜日",
    image: "images/shop1_main.jpg",
    phone: "06-6697-2300",
    address: "大阪府大阪市東住吉区駒川 4-4-19",
    email: "kgftx902@ybb.ne.jp",
    website: "http://www.facebook.com/boutique.hisashi",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/shop1_gallery1.jpg", "images/shop1_gallery2.jpg", "images/shop1_gallery3.jpg"],
    longDescription: "「洗練された上品なスタイリング」をテーマに様々なブランドの中からセレクトしたアイテムをそろえております。ファッションのことなら何でもお気軽にご相談下さい。"
  },
  {
    id: 2,
    name: "キッチン天寅",
    category: "gourmet",
    categoryName: "グルメ",
    description: "皆様のご利用をお待ちしております。どうぞよろしくお願いします。",
    hours: "10:00 - 19:00",
    closed: "火曜日",
    image: "images/shop2_main.jpg",
    phone: "06-6696-7123",
    address: "大阪府大阪市東住吉区駒川5-23-31",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/shop2_main.jpg"],
    longDescription: "皆様のご利用をお待ちしております。どうぞよろしくお願いします。"
  },
  {
    id: 3,
    name: "ベビーセンターフクダ",
    category: "fashion",
    categoryName: "ファッション",
    description: "新生児から130cmまでのベビー、子供服...赤ちゃん用品を多数そろえております。",
    hours: "10:00 - 19:00",
    closed: "火曜日",
    image: "images/shop3_main.jpg",
    phone: "06-6699-4801",
    address: "大阪府大阪市東住吉区駒川5-22-15",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/shop3_gallery1.jpg", "images/shop3_gallery2.jpg", "images/shop3_gallery3.jpg"],
    longDescription: "新生児から130cmまでのベビー、子供服、肌着、子供用品、おもちゃ、三輪車、子供自転車、子供乗せ自転車等、赤ちゃん用品を多数そろえております。自転車、シルバーカーも多数取り扱っております。"
  },
  {
    id: 4,
    name: "JOLIE 駒川店",
    category: "fashion",
    categoryName: "ファッション",
    description: "着るだけでワクワクするデイリーウェアはもちろん、ハッピーになれるトレンドスタイルを提供するジョリー。",
    hours: "10:30 - 19:30",
    closed: "年始",
    image: "images/shop4_main.jpg",
    phone: "06-6691-4173",
    address: "大阪府大阪市東住吉区駒川5-8-5",
    email: "shopmaster@jolie08.com",
    website: "http://jolie08.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/shop4_gallery1.jpg", "images/shop4_gallery2.jpg"],
    longDescription: "着るだけでワクワクするデイリーウェアはもちろん、ハッピーになれるトレンドスタイルを提供するジョリー。オンラインやブログでも新作や定番ウェアをチェックできるので、是非アクセスしてみて！"
  },
  {
    id: 5,
    name: "きもの　だるまや",
    category: "fashion",
    categoryName: "ファッション",
    description: "呉服 晴着、七五三の子供の着物から振袖・訪問着・留袖などの礼装物、和装小物まで、呉服全般を取扱しております。",
    hours: "10:00 - 19:00",
    closed: "火曜日",
    image: "images/shop5_main.jpg",
    phone: "06-6692-2239",
    address: "大阪府大阪市東住吉区駒川5-8-8",
    website: "https://ameblo.jp/netkimono",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/shop5_gallery1.jpg", "images/shop5_gallery2.jpg"],
    longDescription: "呉服 晴着、七五三の子供の着物から振袖・訪問着・留袖などの礼装物、小紋、袖などのしゃれ物から和装小物まで、呉服全般を取扱しております。振袖、留袖、訪問着や七五三の着物レンタルも取り扱いしています。着物お手入れもしていますのでお気軽にお問い合わせ下さいませ！"
  },
  {
    id: 6,
    name: "カフェ 陽だまり",
    category: "gourmet",
    categoryName: "グルメ",
    description: "商店街の喧騒を忘れてほっと一息。手作りケーキとこだわりのコーヒーをご用意してお待ちしています。",
    hours: "8:00 - 17:00",
    closed: "月曜日",
    image: "images/gourmet.png",
    phone: "06-6789-0123",
    address: "大阪市東住吉区駒川4-8-3",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/gourmet.png", "images/hero.jpg"],
    longDescription: "サイフォンで淹れる香り高いコーヒーと、日替わりの手作りケーキセットが人気です。モーニングサービス（8:00〜11:00）も充実しています。"
  },
  {
    id: 7,
    name: "八百屋 旬鮮",
    category: "fresh",
    categoryName: "生鮮食品",
    description: "季節の野菜や果物をリーズナブルな価格で。地元農家さんからの直送野菜も人気です。",
    hours: "9:30 - 18:30",
    closed: "日曜日",
    image: "images/fresh-food.png",
    phone: "06-7890-1234",
    address: "大阪市東住吉区駒川4-3-9",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/fresh-food.png", "images/gourmet.png"],
    longDescription: "新鮮でおいしい野菜を、地域の皆様にお届けします。珍しい野菜の食べ方もお教えしますので、ぜひお立ち寄りください。"
  },
  {
    id: 8,
    name: "メンズショップ ダンディ",
    category: "fashion",
    categoryName: "ファッション",
    description: "カジュアルからビジネスまで、紳士服のことなら当店へ。スーツのオーダーメイドも承ります。",
    hours: "10:00 - 19:00",
    closed: "火曜日",
    image: "images/fashion.png",
    phone: "06-8901-2345",
    address: "大阪市東住吉区駒川5-4-6",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/fashion.png", "images/service.png"],
    longDescription: "ダンディな男性のためのトータルコーディネートをご提案。体型に合わせたオーダースーツは、着心地の良さで大変ご好評いただいております。"
  },
  {
    id: 9,
    name: "リラクゼーション 癒し堂",
    category: "beauty",
    categoryName: "美容・健康",
    description: "全身もみほぐし60分2,980円〜。お買い物の合間に疲れをリセットしませんか？",
    hours: "10:00 - 21:00",
    closed: "年中無休",
    image: "images/beauty.png",
    phone: "06-9012-3456",
    address: "大阪市東住吉区駒川4-6-7",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/beauty.png", "images/fashion.png"],
    longDescription: "技術力の高いスタッフが、コリ固まった体を丁寧にほぐします。女性スタッフも在籍しておりますので、女性のお客様も安心してご利用いただけます。"
  },
  {
    id: 10,
    name: "スマホ修理工房",
    category: "service",
    categoryName: "サービス",
    description: "画面割れ、バッテリー交換など、iPhone・Androidの修理ならお任せ。即日修理も可能です。",
    hours: "10:00 - 19:00",
    closed: "水曜日",
    image: "images/service.png",
    phone: "06-0123-4567",
    address: "大阪市東住吉区駒川5-8-2",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.0!2d135.5290147!3d34.6213475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzE2LjkiTiAxMzXCsDMxJzQ0LjUiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp",
    gallery: ["images/service.png", "images/fresh-food.png"],
    longDescription: "データそのまま、即日修理！水没復旧やデータ移行のサポートも行っています。スマホのことでお困りの際は、まずはご相談ください。"
  },
];

// Initialize Shop Page Logic
document.addEventListener('DOMContentLoaded', () => {
  const shopGrid = document.getElementById('shopGrid');
  const shopDetailContainer = document.getElementById('shopDetailContainer');
  const categoryFilters = document.getElementById('categoryFilters');
  const searchInput = document.getElementById('shopSearchInput');
  const noResults = document.getElementById('noResults');

  // Check if we are on the shop detail page
  if (shopDetailContainer) {
    initializeShopDetailPage();
  }

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

  /* ===== SHOP DETAIL PAGE LOGIC ===== */
  function initializeShopDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const shopId = parseInt(urlParams.get('id'));

    const shop = shopsData.find(s => s.id === shopId);
    const container = document.getElementById('shopDetailContainer');

    if (!shop) {
      container.innerHTML = `
        <div class="container section-padding text-center" style="padding: 100px 0;">
            <h2>店舗が見つかりませんでした</h2>
            <p>お探しの店舗は削除されたか、URLが間違っている可能性があります。</p>
            <a href="shop.html" class="btn-primary" style="margin-top:20px; display:inline-block; background:var(--color-primary); color:white; padding:10px 20px; border-radius:5px; text-decoration:none;">店舗一覧に戻る</a>
        </div>
      `;
      return;
    }

    // Update Title
    document.title = `${shop.name} | 駒川商店街`;

    // Render Content
    container.innerHTML = `
        <!-- Hero Section -->
        <div class="shop-detail-hero">
            <img src="${shop.image}" alt="${shop.name}" class="shop-detail-bg">
            <div class="shop-detail-overlay container">
                <span class="shop-detail-category">${shop.categoryName}</span>
                <h1 class="shop-detail-title">${shop.name}</h1>
            </div>
        </div>

        <!-- Content Section -->
        <section class="shop-detail-content container">
            <a href="shop.html" class="back-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px;"><path d="m15 18-6-6 6-6"/></svg>
                店舗一覧に戻る
            </a>

            <div class="shop-info-grid">
                <!-- Left Column: Main Info -->
                <div class="shop-main-info">
                    <h2 class="section-title-sm" style="font-size:1.5rem; margin-bottom:20px; border-bottom:2px solid var(--color-accent); padding-bottom:10px; display:inline-block;">お店の紹介</h2>
                    <p class="shop-description">${shop.longDescription || shop.description}</p>

                    <h3 class="section-title-sm" style="font-size:1.3rem; margin-top:40px; margin-bottom:20px;">ギャラリー</h3>
                    <div class="shop-gallery-grid" id="detailGallery">
                        ${(shop.gallery || [shop.image]).map(img => `
                            <div class="shop-gallery-item">
                                <img src="${img}" alt="ギャラリー画像">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Right Column: Sidebar -->
                <div class="shop-info-sidebar">
                    <div class="info-row">
                        <div class="info-icon">🕒</div>
                        <div>
                            <span class="info-label">営業時間</span>
                            <span class="info-text">${shop.hours}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-icon">📅</div>
                        <div>
                            <span class="info-label">定休日</span>
                            <span class="info-text">${shop.closed}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-icon">📞</div>
                        <div>
                            <span class="info-label">電話番号</span>
                            <span class="info-text">${shop.phone || '06-0000-0000'}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-icon">📍</div>
                        <div>
                            <span class="info-label">住所</span>
                            <span class="info-text">${shop.address || '大阪市東住吉区駒川'}</span>
                        </div>
                    </div>

                    ${shop.email ? `
                    <div class="info-row">
                        <div class="info-icon">✉️</div>
                        <div>
                            <span class="info-label">メール</span>
                            <span class="info-text"><a href="mailto:${shop.email}">${shop.email}</a></span>
                        </div>
                    </div>` : ''}

                    ${shop.website ? `
                    <div class="info-row">
                        <div class="info-icon">🌐</div>
                        <div>
                            <span class="info-label">WEB</span>
                            <span class="info-text"><a href="${shop.website}" target="_blank" rel="noopener noreferrer">公式サイト</a></span>
                        </div>
                    </div>` : ''}

                    ${shop.mapUrl ? `
                    <div class="map-embed">
                         <iframe src="${shop.mapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- Related Shops Section -->
            <div class="related-shops">
                <h3 class="section-title-sm" style="margin-top:60px; margin-bottom:30px; text-align:center;">このお店を見た人はこちらもチェックしています</h3>
                <div class="shop-grid" id="relatedShopsGrid"></div>
            </div>
        </section>
    `;

    // Render Related Shops
    const relatedShops = shopsData.filter(s => s.category === shop.category && s.id !== shop.id).slice(0, 3);
    const relatedGrid = document.getElementById('relatedShopsGrid');

    if (relatedShops.length > 0) {
      relatedShops.forEach(related => {
        const card = document.createElement('a');
        card.href = `shop_detail.html?id=${related.id}`;
        card.className = 'shop-card';
        card.innerHTML = `
                <div class="shop-image-container">
                  <img src="${related.image}" alt="${related.name}" class="shop-image" loading="lazy">
                  <span class="shop-category-badge badge-${related.category}">${related.categoryName}</span>
                </div>
                <div class="shop-content">
                  <h3 class="shop-name">${related.name}</h3>
                  <p class="shop-description" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${related.description}</p>
                </div>
            `;
        relatedGrid.appendChild(card);
      });
    } else {
      document.querySelector('.related-shops').style.display = 'none';
    }

    // Initializes Lightbox for the rendered gallery
    initDetailLightbox();
  }

  function initDetailLightbox() {
    // Reuse the existing lightbox setup if possible, or simple implementation
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const galleryItems = document.querySelectorAll('.shop-gallery-item');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');

    if (!lightboxImg || !closeBtn) return; // Lightbox elements missing

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.innerText = "";
          lightbox.classList.add('active');
        }
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  function renderShops(shops) {
    shopGrid.innerHTML = '';

    if (shops.length === 0) {
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';

    shops.forEach(shop => {
      const card = document.createElement('a');
      card.href = `shop_detail.html?id=${shop.id}`;
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
          entry.target.classList.add('visible');
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
