/* ===================================
   梅州金柚 - 乡村振兴高端电商网站
   脚本 main.js
   =================================== */

document.addEventListener('DOMContentLoaded', function() {

    /* ========== Toast通知系统 ========== */
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    var toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    function showToast(message, type) {
        type = type || 'info';
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        var icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        toast.innerHTML = '<span class="toast-icon">' + (icons[type] || '') + '</span><span>' + escapeHtml(message) + '</span>';
        toastContainer.appendChild(toast);
        toast.addEventListener('click', function() { dismissToast(toast); });
        var timer = setTimeout(function() { dismissToast(toast); }, 3000);
        function dismissToast(el) {
            if (!el.parentElement) return;
            clearTimeout(timer);
            el.style.opacity = '0';
            el.style.transform = 'translateY(-20px)';
            el.style.transition = 'opacity 0.3s, transform 0.3s';
            setTimeout(function() { if (el.parentElement) el.parentElement.removeChild(el); }, 300);
        }
        return toast;
    }

    function showConfirm(message, onConfirm, onCancel) {
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9998;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;';
        var dialog = document.createElement('div');
        dialog.style.cssText = 'background:#fff;border-radius:16px;padding:28px 32px;max-width:380px;width:90%;box-shadow:0 12px 40px rgba(0,0,0,0.22);text-align:center;';
        dialog.innerHTML = '<p style="font-size:16px;color:#333;margin:0 0 24px;">' + escapeHtml(message) + '</p>' +
            '<div style="display:flex;gap:12px;justify-content:center;">' +
                '<button class="btn-confirm-no" style="padding:10px 28px;border-radius:8px;font-size:15px;cursor:pointer;border:none;background:#f0f0f0;color:#666;">取消</button>' +
                '<button class="btn-confirm-yes" style="padding:10px 28px;border-radius:8px;font-size:15px;cursor:pointer;border:none;background:#3F6B3F;color:#fff;">确定</button>' +
            '</div>';
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        function closeOverlay() { if (overlay.parentElement) overlay.parentElement.removeChild(overlay); }
        dialog.querySelector('.btn-confirm-yes').addEventListener('click', function() { closeOverlay(); if (typeof onConfirm === 'function') onConfirm(); });
        dialog.querySelector('.btn-confirm-no').addEventListener('click', function() { closeOverlay(); if (typeof onCancel === 'function') onCancel(); });
        overlay.addEventListener('click', function(e) { if (e.target === overlay) { closeOverlay(); if (typeof onCancel === 'function') onCancel(); } });
    }

    /* ========== 导航滚动阴影 ========== */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ========== 移动端汉堡菜单 (增强版: 遮罩+侧滑) ========== */
    var hamburger = document.querySelector('.hamburger');
    var navMenu = document.querySelector('.nav-menu');

    var navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    if (hamburger && navMenu) {
        navMenu.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)';

        function openNav() {
            navMenu.classList.add('active');
            navMenu.style.transform = 'translateX(0)';
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            var spans = hamburger.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            }
        }

        function closeNav() {
            navMenu.classList.remove('active');
            navMenu.style.transform = 'translateX(100%)';
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            var spans = hamburger.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }

        hamburger.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) { closeNav(); } else { openNav(); }
        });

        navOverlay.addEventListener('click', closeNav);

        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeNav);
        });
    }

    /* ========== Hero 轮播 (首页) ========== */
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    if (heroSlides.length > 1 && heroDots.length > 1) {
        let currentSlide = 0;
        const totalSlides = heroSlides.length;

        function showSlide(index) {
            heroSlides.forEach(function(slide, i) {
                slide.classList.toggle('active', i === index);
            });
            heroDots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        heroDots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showSlide(index);
            });
        });

        // 自动轮播
        setInterval(function() {
            const next = (currentSlide + 1) % totalSlides;
            showSlide(next);
        }, 5000);
    }

    /* ========== 返回顶部按钮 ========== */
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ========== 商品数量选择器 ========== */
    const qtyMinus = document.querySelector('.qty-minus');
    const qtyPlus = document.querySelector('.qty-plus');
    const qtyInput = document.querySelector('.qty-input');
    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', function() {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) {
                qtyInput.value = val - 1;
            }
        });
        qtyPlus.addEventListener('click', function() {
            let val = parseInt(qtyInput.value) || 1;
            qtyInput.value = val + 1;
        });
    }

    /* ========== 商品规格选择 ========== */
    const specOptions = document.querySelectorAll('.spec-option');
    if (specOptions.length > 0) {
        specOptions.forEach(function(option) {
            option.addEventListener('click', function() {
                const parent = this.parentElement;
                parent.querySelectorAll('.spec-option').forEach(function(sib) {
                    sib.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    /* ========== 商品详情页 Tab 切换 ========== */
    const tabBtns = document.querySelectorAll('.tab-nav button');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-tab');
                tabBtns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                tabContents.forEach(function(content) {
                    content.classList.remove('active');
                    if (content.getAttribute('data-tab') === target) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    /* ========== 缩略图切换主图 ========== */
    const thumbs = document.querySelectorAll('.thumb-list .thumb');
    const mainImage = document.querySelector('.main-image img');
    if (thumbs.length > 0 && mainImage) {
        thumbs.forEach(function(thumb) {
            thumb.addEventListener('click', function() {
                const newSrc = this.querySelector('img').getAttribute('src');
                mainImage.setAttribute('src', newSrc);
                thumbs.forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');
            });
        });
    }

    /* ========== 图片懒加载 ========== */
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.setAttribute('src', img.getAttribute('data-src'));
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px'
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    /* ========== 首页数字滚动动画 ========== */
    const statNums = document.querySelectorAll('.about-stat .num');
    if (statNums.length > 0 && 'IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetNum = parseInt(el.getAttribute('data-target'));
                    const duration = 2000;
                    const startTime = performance.now();

                    function animateNum(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // easeOutExpo
                        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        const current = Math.floor(eased * targetNum);
                        el.textContent = current;
                        if (progress < 1) {
                            requestAnimationFrame(animateNum);
                        } else {
                            el.textContent = targetNum;
                        }
                    }

                    requestAnimationFrame(animateNum);
                    statObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNums.forEach(function(num) {
            statObserver.observe(num);
        });
    }

    /* ========== 表单提交模拟 ========== */
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 简单表单验证
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const message = this.querySelector('textarea[name="message"]');
            let isValid = true;

            if (name && name.value.trim() === '') {
                showFieldError(name, '请输入您的姓名');
                isValid = false;
            } else if (name) {
                clearFieldError(name);
            }

            if (email && email.value.trim() === '') {
                showFieldError(email, '请输入您的邮箱');
                isValid = false;
            } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showFieldError(email, '请输入有效的邮箱地址');
                isValid = false;
            } else if (email) {
                clearFieldError(email);
            }

            if (message && message.value.trim() === '') {
                showFieldError(message, '请输入您的留言内容');
                isValid = false;
            } else if (message) {
                clearFieldError(message);
            }

            if (isValid) {
                var submitBtn = this.querySelector('.btn-submit');
                var originalText = submitBtn.textContent;
                submitBtn.textContent = '提交中...';
                submitBtn.disabled = true;

                // 收集表单数据
                var formData = {
                    name: name ? name.value.trim() : '',
                    email: email ? email.value.trim() : '',
                    phone: (this.querySelector('input[name="phone"]') || {}).value || '',
                    subject: (this.querySelector('input[name="subject"]') || {}).value || '',
                    message: message ? message.value.trim() : ''
                };

                // 使用伪 API 提交（带 loading 延迟体验）
                if (window.API && window.API.submitContactForm) {
                    API.submitContactForm(formData).then(function(response) {
                        if (response.success) {
                            submitBtn.textContent = '提交成功 ✓';
                            submitBtn.style.background = '#3F6B3F';
                            showToast(response.message, 'success');
                            contactForm.reset();
                        } else {
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = '#D4380D';
                            showToast(response.message, 'error');
                        }
                        setTimeout(function() {
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 2500);
                    }).catch(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        showToast('网络异常，请稍后重试', 'error');
                    });
                } else {
                    // 回退到原逻辑
                    setTimeout(function() {
                        submitBtn.textContent = '提交成功 ✓';
                        submitBtn.style.background = '#3F6B3F';
                        showToast('感谢您的留言，我们将尽快回复！', 'success');
                        contactForm.reset();
                        setTimeout(function() {
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 2500);
                    }, 800);
                }
            }
        });
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#D4380D';
        // 移除旧错误信息
        const existing = field.parentElement.querySelector('.field-error');
        if (existing) existing.remove();
        const error = document.createElement('span');
        error.className = 'field-error';
        error.style.cssText = 'color:#D4380D; font-size:12px; margin-top:4px; display:block;';
        error.textContent = message;
        field.parentElement.appendChild(error);
    }

    function clearFieldError(field) {
        field.style.borderColor = '';
        const existing = field.parentElement.querySelector('.field-error');
        if (existing) existing.remove();
    }

    /* ========== 购物车系统 (localStorage) ========== */

    // 商品数据配置（按 data-product-id 索引）
    const PRODUCTS = {
        'pomelo-fresh-5':  { name: '梅州新鲜金柚 5斤装',  price: 68,  image: 'images/products/pomelo-fresh-1.webp' },
        'pomelo-fresh-8':  { name: '梅州新鲜金柚 8斤装',  price: 98,  image: 'images/products/pomelo-fresh-1.webp' },
        'pomelo-fresh-12': { name: '梅州新鲜金柚 12斤装', price: 138, image: 'images/products/pomelo-fresh-1.webp' },
        'pomelo-dry':      { name: '金柚果干',            price: 36,  image: 'images/products/pomelo-dry.webp' },
        'pomelo-tea':      { name: '金柚蜂蜜茶',          price: 58,  image: 'images/products/pomelo-tea.webp' },
        'pomelo-trial':    { name: '双果体验装',          price: 32,  image: 'images/products/pomelo-fresh-3.webp' },
        'gift-box-1':      { name: '金柚精品礼盒',        price: 168, image: 'images/products/gift-box-1.webp' },
    };

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('pomelo_cart')) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('pomelo_cart', JSON.stringify(cart));
        updateCartBadge();
    }

    function updateCartBadge() {
        const cart = getCart();
        const total = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
        // 更新所有购物车图标上的角标
        document.querySelectorAll('.nav-cart').forEach(function(el) {
            el.setAttribute('data-count', total);
            var badge = el.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                el.appendChild(badge);
            }
            badge.textContent = total;
            badge.style.display = total > 0 ? 'flex' : 'none';
        });
    }

    function addToCart(productData) {
        var cart = getCart();
        // 使用 名称+规格 作为唯一标识
        var key = productData.name + '|' + productData.spec;
        var existing = cart.find(function(item) {
            return (item.name + '|' + item.spec) === key;
        });
        if (existing) {
            existing.quantity += productData.quantity || 1;
        } else {
            productData.id = key;
            productData.quantity = productData.quantity || 1;
            cart.push(productData);
        }
        saveCart(cart);
        return cart;
    }

    // 加入购物车按钮（详情页）
    var addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // 获取商品信息
            var productCard = this.closest('.product-detail-layout') || this.closest('.product-card') || this.closest('.product-info');
            var productName, productPrice, productImage, productSpec, productPackaging;

            if (this.closest('.product-detail-layout') || this.closest('.product-info')) {
                // 商品详情页：从全局状态获取（动态渲染后的数据）
                var dp = window._currentDetailProduct;
                var ds = window._currentDetailState;
                if (dp) {
                    productName = ds.currentSpecText ? (dp.shortName + ' ' + ds.currentSpecText) : dp.name;
                    productPrice = ds.currentPrice || dp.price;
                    productImage = (dp.images && dp.images[0]) ? dp.images[0] : dp.image;
                    productSpec = ds.currentSpecText || '标准';
                    productPackaging = ds.currentPackagingText || '简装';
                } else {
                    // 回退到 DOM 抓取
                    var nameEl = document.querySelector('.product-info h1');
                    productName = nameEl ? nameEl.textContent.trim() : '梅州新鲜金柚';
                    var priceEl = document.querySelector('.product-detail-price .current');
                    productPrice = priceEl ? parseFloat(priceEl.textContent.replace('¥', '').trim()) : 68;
                    var imgEl = document.querySelector('.main-image img');
                    productImage = imgEl ? imgEl.getAttribute('src') : 'images/products/pomelo-fresh-1.webp';
                    var specEl = document.querySelector('.spec-options .spec-option.active');
                    productSpec = specEl ? specEl.textContent.trim() : '5斤装';
                    productPackaging = '简装';
                }
            } else if (this.closest('.product-card')) {
                // 商品卡片：从卡片获取
                var card = this.closest('.product-card');
                var nameEl = card.querySelector('h3');
                productName = nameEl ? nameEl.textContent.trim() : '梅州金柚';
                var priceEl = card.querySelector('.product-price .price');
                productPrice = priceEl ? parseFloat(priceEl.textContent.replace('¥', '').trim()) : 68;
                var imgEl = card.querySelector('img');
                productImage = imgEl ? imgEl.getAttribute('src') : '';
                productSpec = '标准';
                productPackaging = '简装';
            } else {
                return;
            }

            var qtyInput = document.querySelector('.qty-input');
            var quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

            var productData = {
                name: productName,
                price: productPrice,
                image: productImage,
                spec: productSpec,
                packaging: productPackaging,
                quantity: quantity
            };

            addToCart(productData);

            // 视觉反馈
            var originalHTML = this.innerHTML;
            var originalBg = this.style.background;
            var originalColor = this.style.color;
            this.innerHTML = '✓ 已加入购物车';
            this.style.background = '#3F6B3F';
            this.style.color = '#fff';

            var self = this;
            setTimeout(function() {
                self.innerHTML = originalHTML;
                self.style.background = originalBg;
                self.style.color = originalColor;
            }, 1500);
        });
    });

    // 购物车页面渲染
    function renderCartPage() {
        var cartContainer = document.querySelector('.cart-items-container');
        if (!cartContainer) return;

        var cart = getCart();
        var emptyEl = document.querySelector('.cart-empty');
        var tableEl = document.querySelector('.cart-table-wrap');
        var summaryEl = document.querySelector('.cart-summary');
        var checkoutBtn = document.querySelector('.btn-checkout');

        if (cart.length === 0) {
            if (emptyEl) emptyEl.style.display = 'block';
            if (tableEl) tableEl.style.display = 'none';
            if (summaryEl) summaryEl.style.display = 'none';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
            return;
        }

        if (emptyEl) emptyEl.style.display = 'none';
        if (tableEl) tableEl.style.display = 'block';
        if (summaryEl) summaryEl.style.display = 'block';
        if (checkoutBtn) checkoutBtn.style.display = 'flex';

        // 渲染表格
        var tbody = cartContainer.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';

        var subtotal = 0;
        cart.forEach(function(item, index) {
            subtotal += item.price * item.quantity;
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' +
                    '<div class="cart-product">' +
                        '<img src="' + item.image + '" alt="' + item.name + '" class="cart-product-img">' +
                        '<div class="cart-product-info">' +
                            '<h4>' + item.name + '</h4>' +
                            '<span class="cart-product-spec">' + item.spec + ' / ' + item.packaging + '</span>' +
                        '</div>' +
                    '</div>' +
                '</td>' +
                '<td>¥' + item.price.toFixed(2) + '</td>' +
                '<td>' +
                    '<div class="cart-qty">' +
                        '<button class="cart-qty-btn" data-action="minus" data-index="' + index + '">−</button>' +
                        '<input type="text" value="' + item.quantity + '" readonly class="cart-qty-input">' +
                        '<button class="cart-qty-btn" data-action="plus" data-index="' + index + '">+</button>' +
                    '</div>' +
                '</td>' +
                '<td class="cart-subtotal">¥' + (item.price * item.quantity).toFixed(2) + '</td>' +
                '<td><button class="cart-remove-btn" data-index="' + index + '">删除</button></td>';
            tbody.appendChild(tr);
        });

        // 更新汇总
        var shipping = subtotal >= 99 ? 0 : 15;
        var total = subtotal + shipping;
        document.querySelector('.cart-subtotal-val').textContent = '¥' + subtotal.toFixed(2);
        var shippingEl = document.querySelector('.cart-shipping-val');
        if (shippingEl) shippingEl.textContent = shipping === 0 ? '免运费' : '¥' + shipping.toFixed(2);
        document.querySelector('.cart-total-val').textContent = '¥' + total.toFixed(2);

        // 数量调整按钮
        tbody.querySelectorAll('.cart-qty-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var idx = parseInt(this.getAttribute('data-index'));
                var action = this.getAttribute('data-action');
                var cart = getCart();
                if (action === 'plus') {
                    cart[idx].quantity += 1;
                } else if (action === 'minus' && cart[idx].quantity > 1) {
                    cart[idx].quantity -= 1;
                }
                saveCart(cart);
                renderCartPage();
            });
        });

        // 删除按钮
        tbody.querySelectorAll('.cart-remove-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var idx = parseInt(this.getAttribute('data-index'));
                var cart = getCart();
                cart.splice(idx, 1);
                saveCart(cart);
                renderCartPage();
            });
        });
    }

    // 清空购物车
    var clearCartBtn = document.querySelector('.btn-clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            showConfirm('确定要清空购物车吗？', function() {
                localStorage.removeItem('pomelo_cart');
                updateCartBadge();
                renderCartPage();
                showToast('购物车已清空', 'success');
            });
        });
    }

    // 结算按钮 — 弹出确认弹窗
    var checkoutBtn = document.querySelector('.btn-checkout');
    var checkoutModal = document.getElementById('checkoutModal');
    var checkoutSuccess = document.getElementById('checkoutSuccess');
    var modalBody = document.getElementById('checkoutModalBody');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            var cart = getCart();
            if (cart.length === 0) {
                showToast('购物车是空的，请先添加商品。', 'warning');
                return;
            }
            // 构建订单商品列表
            var subtotal = 0;
            var html = '';
            cart.forEach(function(item) {
                var itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                html +=
                    '<div class="order-item">' +
                        '<img src="' + item.image + '" alt="' + item.name + '" class="order-item-img">' +
                        '<div class="order-item-info">' +
                            '<div class="order-item-name">' + item.name + '</div>' +
                            '<div class="order-item-spec">' + item.spec + ' / ' + item.packaging + ' × ' + item.quantity + '</div>' +
                        '</div>' +
                        '<div class="order-item-price">¥' + itemTotal.toFixed(2) + '</div>' +
                    '</div>';
            });
            var shipping = subtotal >= 99 ? 0 : 15;
            // 读取当前选择的优惠券
            var couponCode = getAppliedCouponCode();
            var couponDiscount = getCouponDiscount(couponCode, subtotal);
            var couponName = couponCode && couponDiscount > 0 ? (COUPON_DEFS[couponCode] ? COUPON_DEFS[couponCode].name : '优惠券') : '';
            var total = subtotal + shipping - couponDiscount;
            if (total < 0) total = 0;
            html += '<hr class="order-divider">';
            html += '<div class="order-summary-line"><span>商品小计</span><span>¥' + subtotal.toFixed(2) + '</span></div>';
            html += '<div class="order-summary-line"><span>运费</span><span>' + (shipping === 0 ? '免运费' : '¥' + shipping.toFixed(2)) + '</span></div>';
            if (couponDiscount > 0) {
                html += '<div class="order-summary-line" style="color:#D94A3A;"><span>优惠券（' + couponName + '）</span><span style="color:#D94A3A;">-¥' + couponDiscount.toFixed(2) + '</span></div>';
            }
            html += '<div class="order-summary-line total"><span>合计</span><span class="price">¥' + total.toFixed(2) + '</span></div>';
            modalBody.innerHTML = html;
            checkoutModal.classList.add('active');
        });
    }

    // 关闭确认弹窗
    function closeCheckoutModal() {
        if (checkoutModal) checkoutModal.classList.remove('active');
    }

    var closeBtn = document.getElementById('closeCheckoutModal');
    if (closeBtn) closeBtn.addEventListener('click', closeCheckoutModal);

    var cancelBtn = document.getElementById('cancelCheckout');
    if (cancelBtn) cancelBtn.addEventListener('click', closeCheckoutModal);

    // 点击遮罩关闭
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) closeCheckoutModal();
        });
    }

    // 确认下单 → 验证地址 → 保存订单 → 显示成功弹窗
    var confirmBtn = document.getElementById('confirmCheckout');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            var address = getSelectedAddress();
            if (!address) {
                showToast('请填写收货地址', 'warning');
                return;
            }
            // 按钮反馈：提交中
            this.textContent = '提交中…';
            this.disabled = true;
            var self = this;
            setTimeout(function() {
                // 恢复按钮状态
                self.textContent = '确认下单';
                self.disabled = false;

                // 保存订单
                var cart = getCart();
                var subtotal = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
                var shipping = subtotal >= 99 ? 0 : 15;
                var couponCode = getAppliedCouponCode();
                var couponDiscount = getCouponDiscount(couponCode, subtotal);
                var couponName = couponCode && couponDiscount > 0 ? (COUPON_DEFS[couponCode] ? COUPON_DEFS[couponCode].name : '') : '';
                var total = subtotal + shipping - couponDiscount;
                if (total < 0) total = 0;
                var order = {
                    orderNo: 'MZ' + Date.now().toString(36).toUpperCase(),
                    date: new Date().toISOString().slice(0, 10),
                    items: cart.slice(),
                    subtotal: subtotal,
                    shipping: shipping,
                    couponCode: couponCode,
                    couponName: couponName,
                    couponDiscount: couponDiscount,
                    total: total,
                    status: 'pending',
                    address: address
                };
                saveOrder(order);

                // 关闭确认弹窗
                closeCheckoutModal();
                // 清空购物车
                localStorage.removeItem('pomelo_cart');
                updateCartBadge();
                renderCartPage();
                // 显示成功弹窗
                if (checkoutSuccess) checkoutSuccess.classList.add('active');
            }, 800);
        });
    }

    // 关闭成功弹窗 → 跳转商城
    var closeSuccessBtn = document.getElementById('closeSuccess');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            if (checkoutSuccess) checkoutSuccess.classList.remove('active');
            window.location.href = 'shop.html';
        });
    }

    // 点击遮罩关闭成功弹窗
    if (checkoutSuccess) {
        checkoutSuccess.addEventListener('click', function(e) {
            if (e.target === checkoutSuccess) {
                checkoutSuccess.classList.remove('active');
            }
        });
    }

    // 初始化：更新角标 + 渲染购物车页
    updateCartBadge();
    renderCartPage();

    /* ========== 注入导航UI元素（搜索 + 用户） ========== */
    var navbarContainer = document.querySelector('.navbar .container');
    var navCartEl = document.querySelector('.nav-cart');
    if (navbarContainer && navCartEl) {
        // 搜索按钮 + 输入框
        var searchWrap = document.createElement('div');
        searchWrap.className = 'nav-search';
        searchWrap.innerHTML = '<button class="nav-search-btn" id="navSearchBtn" title="搜索">🔍</button>' +
            '<div class="search-input-wrap" id="searchInputWrap">' +
                '<input type="text" id="searchInput" placeholder="搜索金柚产品...">' +
                '<button class="nav-search-btn" id="searchCloseBtn" style="font-size:14px;">✕</button>' +
            '</div>' +
            '<div class="search-dropdown" id="searchDropdown"></div>';
        navbarContainer.insertBefore(searchWrap, navCartEl);

        // 用户区域
        var userArea = document.createElement('div');
        userArea.style.cssText = 'position:relative;display:flex;align-items:center;';
        userArea.id = 'userArea';
        navbarContainer.insertBefore(userArea, navCartEl);
    }

    /* ========== 商品搜索 ========== */
    var ALL_PRODUCTS = [
        { id: 'pomelo-fresh-5', name: '梅州新鲜金柚 5斤装', price: 68, image: 'images/products/pomelo-fresh-1.webp', category: 'fresh', keywords: '金柚 新鲜 5斤 柚子 水果 沙田柚' },
        { id: 'pomelo-fresh-8', name: '梅州新鲜金柚 8斤装', price: 98, image: 'images/products/pomelo-fresh-1.webp', category: 'fresh', keywords: '金柚 新鲜 8斤 柚子 水果 沙田柚' },
        { id: 'pomelo-fresh-12', name: '梅州新鲜金柚 12斤装', price: 138, image: 'images/products/pomelo-fresh-1.webp', category: 'fresh', keywords: '金柚 新鲜 12斤 柚子 水果 沙田柚' },
        { id: 'pomelo-dry', name: '金柚果干', price: 36, image: 'images/products/pomelo-dry.webp', category: 'snack', keywords: '果干 零食 金柚 休闲食品' },
        { id: 'pomelo-tea', name: '金柚蜂蜜茶', price: 58, image: 'images/products/pomelo-tea.webp', category: 'tea', keywords: '蜂蜜茶 饮品 金柚 养生 茶饮' },
        { id: 'pomelo-trial', name: '双果体验装', price: 32, image: 'images/products/pomelo-fresh-3.webp', category: 'trial', keywords: '体验 试吃 双果 金柚 新品尝鲜' },
        { id: 'gift-box-1', name: '金柚精品礼盒', price: 168, image: 'images/products/gift-box-1.webp', category: 'gift', keywords: '礼盒 精品 送礼 金柚 高端 节日' },
        { id: 'gift-box-2', name: '金柚臻品礼盒 豪华装', price: 258, image: 'images/products/gift-box-2.webp', category: 'gift', keywords: '礼盒 臻品 豪华 送礼 金柚 限量' },
        { id: 'gift-box-3', name: '精品礼盒3号 雅致装', price: 238, image: 'images/products/gift-box-3.webp', category: 'gift', keywords: '礼盒 雅致 时尚 送礼 金柚 新品' },
        { id: 'gift-corporate', name: '企业团购定制装', price: 388, image: 'images/products/gift-box-corporate.webp', category: 'gift', keywords: '企业 团购 定制 LOGO 批量 商务 送礼' },
        { id: 'gift-combo', name: '伴手礼组合装', price: 198, image: 'images/products/gift-combo.webp', category: 'gift', keywords: '伴手礼 组合 鲜果 果干 蜂蜜茶' },
        { id: 'pomelo-family-box', name: '金柚家庭装 8斤', price: 128, image: 'images/products/pomelo-family-box.webp', category: 'fresh', keywords: '家庭 8斤 实惠 金柚 新鲜' },
        { id: 'pomelo-selected-box', name: '金柚精选装 5斤', price: 78, image: 'images/products/pomelo-selected-box.webp', category: 'fresh', keywords: '精选 5斤 品质 金柚 新鲜' },
        { id: 'pomelo-jam', name: '金柚果酱 280g', price: 45, image: 'images/products/pomelo-jam.webp', category: 'jam', keywords: '果酱 手工 无添加 早餐 金柚' }
    ];

    var searchBtn = document.getElementById('navSearchBtn');
    var searchInputWrap = document.getElementById('searchInputWrap');
    var searchInput = document.getElementById('searchInput');
    var searchCloseBtn = document.getElementById('searchCloseBtn');
    var searchDropdown = document.getElementById('searchDropdown');

    if (searchBtn && searchInputWrap) {
        searchBtn.addEventListener('click', function() {
            searchInputWrap.classList.toggle('active');
            if (searchInputWrap.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
                searchDropdown.classList.remove('active');
            }
        });

        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function() {
                searchInputWrap.classList.remove('active');
                searchInput.value = '';
                searchDropdown.classList.remove('active');
            });
        }

        // 防抖搜索
        var searchTimeout;
        searchInput.addEventListener('input', function() {
            var query = this.value.trim().toLowerCase();
            if (query.length === 0) {
                searchDropdown.classList.remove('active');
                return;
            }
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                // 使用 API 搜索
                if (window.API && window.API.getProducts) {
                    API.getProducts({ search: query, limit: 8 }).then(function(results) {
                        renderSearchDropdown(results);
                    });
                } else {
                    // 回退到本地搜索
                    var results = [];
                    (window.POMELO_DB && window.POMELO_DB.list ? window.POMELO_DB.list : (typeof ALL_PRODUCTS !== 'undefined' ? ALL_PRODUCTS : [])).forEach(function(product) {
                        if (product.name.toLowerCase().indexOf(query) !== -1 || (product.keywords && product.keywords.toLowerCase().indexOf(query) !== -1)) {
                            results.push(product);
                        }
                    });
                    renderSearchDropdown(results);
                }
            }, 200);
        });

        function renderSearchDropdown(results) {
            if (results.length === 0) {
                searchDropdown.innerHTML = '<div class="search-dropdown-empty">未找到相关产品</div>';
            } else {
                var html = '';
                results.forEach(function(p) {
                    html += '<div class="search-dropdown-item" data-product-id="' + p.id + '">' +
                        '<img src="' + p.image + '" alt="' + p.name + '">' +
                        '<span class="search-item-name">' + p.name + '</span>' +
                        '<span class="search-item-price">¥' + p.price.toFixed(2) + '</span>' +
                    '</div>';
                });
                searchDropdown.innerHTML = html;
                searchDropdown.querySelectorAll('.search-dropdown-item').forEach(function(item) {
                    item.addEventListener('click', function() {
                        var pid = this.getAttribute('data-product-id');
                        window.location.href = 'product-detail.html?id=' + pid;
                    });
                });
            }
            searchDropdown.classList.add('active');
        }

        // 点击外部关闭搜索
        document.addEventListener('click', function(e) {
            if (!searchWrap.contains(e.target)) {
                searchInputWrap.classList.remove('active');
                searchDropdown.classList.remove('active');
            }
        });

        // 处理 URL 中的搜索参数
        var urlParams = new URLSearchParams(window.location.search);
        var searchQuery = urlParams.get('search');
        if (searchQuery) {
            searchInputWrap.classList.add('active');
            searchInput.value = searchQuery;
            searchInput.dispatchEvent(new Event('input'));
        }
    }

    /* ========== 用户系统 ========== */
    var currentUser = null;

    function getUser() {
        if (currentUser) return currentUser;
        try {
            var stored = JSON.parse(localStorage.getItem('pomelo_user'));
            if (stored && stored.email) { currentUser = stored; }
        } catch (e) { currentUser = null; }
        return currentUser;
    }

    function saveUser(user) {
        currentUser = user;
        localStorage.setItem('pomelo_user', JSON.stringify(user));
        updateUserUI();
    }

    function logoutUser() {
        currentUser = null;
        localStorage.removeItem('pomelo_user');
        updateUserUI();
        showToast('已退出登录', 'info');
    }

    function updateUserUI() {
        var user = getUser();
        var userAreaEl = document.getElementById('userArea');
        if (!userAreaEl) return;
        if (user) {
            var initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';
            userAreaEl.innerHTML = '<div class="user-avatar" id="userAvatar"><span class="avatar-text">' + initial + '</span></div><div class="user-dropdown" id="userDropdown"><a href="orders.html">📋 我的订单</a><a href="favorites.html">❤️ 我的收藏</a><div class="dropdown-divider"></div><button id="logoutBtn">🚪 退出登录</button></div>';
            var avatar = document.getElementById('userAvatar');
            if (avatar) {
                avatar.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var dd = document.getElementById('userDropdown');
                    if (dd) dd.classList.toggle('active');
                });
            }
            var logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var dd = document.getElementById('userDropdown');
                    if (dd) dd.classList.remove('active');
                    logoutUser();
                });
            }
        } else {
            userAreaEl.innerHTML = '<a href="favorites.html" class="nav-search-btn" title="我的收藏" style="font-size:16px;text-decoration:none;">❤️</a><button class="nav-search-btn" id="loginNavBtn" title="登录" style="font-size:18px;">👤</button>';
            var loginBtn = document.getElementById('loginNavBtn');
            if (loginBtn) loginBtn.addEventListener('click', openUserModal);
        }
    }

    // 关闭用户下拉菜单（点击外部）
    document.addEventListener('click', function(e) {
        var dd = document.getElementById('userDropdown');
        var av = document.getElementById('userAvatar');
        if (dd && dd.classList.contains('active') && av && !av.contains(e.target)) {
            dd.classList.remove('active');
        }
    });

    // 创建用户登录/注册弹窗
    (function createUserModal() {
        var overlay = document.createElement('div');
        overlay.className = 'user-modal-overlay';
        overlay.id = 'userModalOverlay';
        overlay.innerHTML = '<div class="user-modal">' +
            '<div class="user-modal-header">' +
                '<h3 id="userModalTitle">登录</h3>' +
                '<button class="user-modal-close" id="userModalClose">&times;</button>' +
            '</div>' +
            '<div class="user-modal-body">' +
                '<div class="form-group"><label>邮箱</label><input type="email" id="loginEmail" placeholder="请输入邮箱"></div>' +
                '<div class="form-group" id="loginPasswordGroup"><label>密码</label><input type="password" id="loginPassword" placeholder="请输入密码（6位以上）"></div>' +
                '<div class="form-group" id="registerNameGroup" style="display:none;"><label>昵称</label><input type="text" id="registerName" placeholder="请输入昵称"></div>' +
            '</div>' +
            '<div class="user-modal-footer">' +
                '<button class="btn btn-outline-green" id="userModalCancel">取消</button>' +
                '<button class="btn btn-primary" id="userModalSubmit">登录</button>' +
            '</div>' +
            '<div class="user-modal-switch"><span id="switchText">还没有账号？</span> <a id="switchMode">立即注册</a></div>' +
        '</div>';
        document.body.appendChild(overlay);

        var isLoginMode = true;

        window.openUserModal = function() {
            document.getElementById('userModalOverlay').classList.add('active');
            document.getElementById('userModalTitle').textContent = '登录';
            document.getElementById('loginPasswordGroup').style.display = '';
            document.getElementById('registerNameGroup').style.display = 'none';
            document.getElementById('userModalSubmit').textContent = '登录';
            document.getElementById('switchText').textContent = '还没有账号？';
            document.getElementById('switchMode').textContent = '立即注册';
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            var regNameEl = document.getElementById('registerName');
            if (regNameEl) regNameEl.value = '';
            isLoginMode = true;
        };

        function closeUserModal() {
            var modal = document.getElementById('userModalOverlay');
            if (modal) modal.classList.remove('active');
        }

        document.getElementById('userModalClose').addEventListener('click', closeUserModal);
        document.getElementById('userModalCancel').addEventListener('click', closeUserModal);
        document.getElementById('userModalOverlay').addEventListener('click', function(e) {
            if (e.target === document.getElementById('userModalOverlay')) closeUserModal();
        });

        document.getElementById('switchMode').addEventListener('click', function() {
            isLoginMode = !isLoginMode;
            if (isLoginMode) {
                document.getElementById('userModalTitle').textContent = '登录';
                document.getElementById('loginPasswordGroup').style.display = '';
                document.getElementById('registerNameGroup').style.display = 'none';
                document.getElementById('userModalSubmit').textContent = '登录';
                document.getElementById('switchText').textContent = '还没有账号？';
                document.getElementById('switchMode').textContent = '立即注册';
            } else {
                document.getElementById('userModalTitle').textContent = '注册';
                document.getElementById('loginPasswordGroup').style.display = '';
                document.getElementById('registerNameGroup').style.display = '';
                document.getElementById('userModalSubmit').textContent = '注册';
                document.getElementById('switchText').textContent = '已有账号？';
                document.getElementById('switchMode').textContent = '去登录';
            }
        });

        document.getElementById('userModalSubmit').addEventListener('click', function() {
            var submitBtn = document.getElementById('userModalSubmit');
            var email = document.getElementById('loginEmail').value.trim();
            var password = document.getElementById('loginPassword').value.trim();
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('请输入有效的邮箱地址', 'warning'); return;
            }
            if (!password || password.length < 6) {
                showToast('密码至少6位', 'warning'); return;
            }

            // Pseudo-backend: loading state + simulated network delay
            var originalText = submitBtn.textContent;
            submitBtn.textContent = '验证中...';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');

            var delay = 300 + Math.floor(Math.random() * 500); // 300-800ms

            setTimeout(function() {
                // ~8% chance of "server error" for realism
                if (Math.random() < 0.08) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');
                    showToast('服务器繁忙，请稍后重试', 'error');
                    return;
                }

                if (isLoginMode) {
                    var stored = {};
                    try { stored = JSON.parse(localStorage.getItem('pomelo_users') || '{}'); } catch(e) {}
                    var userData = stored[email];
                    if (!userData) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-loading');
                        showToast('账号不存在，请先注册', 'error');
                        return;
                    }
                    if (userData.password !== password) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-loading');
                        showToast('密码错误', 'error');
                        return;
                    }
                    saveUser({ name: userData.name, email: email });
                    closeUserModal();
                    showToast('登录成功，欢迎回来！', 'success');
                    // Reset button state after close
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');
                } else {
                    var name = document.getElementById('registerName').value.trim() || email.split('@')[0];
                    var users = {};
                    try { users = JSON.parse(localStorage.getItem('pomelo_users') || '{}'); } catch(e) {}
                    if (users[email]) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-loading');
                        showToast('该邮箱已注册，请直接登录', 'warning');
                        return;
                    }
                    users[email] = { name: name, password: password };
                    localStorage.setItem('pomelo_users', JSON.stringify(users));
                    saveUser({ name: name, email: email });
                    closeUserModal();
                    showToast('注册成功！', 'success');
                    // Reset button state after close
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');
                }
            }, delay);
        });
    })();

    // 初始化用户UI
    updateUserUI();

    /* ========== 欢迎弹窗（首页首次访问） ========== */
    (function initWelcomePopup() {
        // 仅在首页触发
        var path = window.location.pathname;
        var isIndex = path === '/' || path === '/index.html' || path.endsWith('/index.html') || path === '/index';
        if (!isIndex) return;

        // 检查是否已被永久关闭
        if (localStorage.getItem('pomelo_welcome_dismissed') === '1') return;

        // 延迟弹出，让页面先渲染
        setTimeout(function() {
            var overlay = document.createElement('div');
            overlay.className = 'welcome-overlay';
            overlay.id = 'welcomeOverlay';

            overlay.innerHTML =
                '<div class="welcome-modal">' +
                    '<button class="welcome-close" id="welcomeClose" title="关闭">&times;</button>' +
                    '<div class="welcome-header-img" id="welcomeHeaderImg">' +
                        '<img src="images/welcome-banner.webp" alt="梅州金柚欢迎横幅">' +
                    '</div>' +
                    '<div class="welcome-body">' +
                        '<h2>欢迎来到梅州金柚</h2>' +
                        '<p class="welcome-subtitle">乡村振兴 · 高端金柚电商示范平台</p>' +
                        '<div class="welcome-info-grid">' +
                            '<div class="welcome-info-card">' +
                                '<h4>⚙️ 技术栈</h4>' +
                                '<ul>' +
                                    '<li>HTML5 + CSS3 语义化布局</li>' +
                                    '<li>原生 JavaScript (ES5)</li>' +
                                    '<li>localStorage 数据持久化</li>' +
                                    '<li>伪 API 异步加载模拟</li>' +
                                    '<li>响应式设计 (Flex + Grid)</li>' +
                                    '<li>CSS 动画 & 过渡效果</li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="welcome-info-card">' +
                                '<h4>🛒 核心功能</h4>' +
                                '<ul>' +
                                    '<li>商品详情动态渲染 (14 SKU)</li>' +
                                    '<li>购物车 & 订单管理</li>' +
                                    '<li>用户注册 / 登录系统</li>' +
                                    '<li>商品收藏 & 浏览历史</li>' +
                                    '<li>优惠券 & 地址管理</li>' +
                                    '<li>商品评价 & 评分系统</li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="welcome-info-card">' +
                                '<h4>📐 页面结构</h4>' +
                                '<ul>' +
                                    '<li>首页 → 品牌展示 + 限时抢购</li>' +
                                    '<li>商城 → 分类筛选 + 商品网格</li>' +
                                    '<li>详情 → 规格选择 + Tab + 评价</li>' +
                                    '<li>礼盒 → 送礼场景专区</li>' +
                                    '<li>品牌 → 品牌故事 & 溯源</li>' +
                                    '<li>新闻 → 资讯列表 & 详情</li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="welcome-info-card">' +
                                '<h4>📦 数据管理</h4>' +
                                '<ul>' +
                                    '<li>POMELO_DB 统一产品数据库</li>' +
                                    '<li>API 异步模拟层 (延迟+容错)</li>' +
                                    '<li>骨架屏 → 异步渲染过渡</li>' +
                                    '<li>Toast 通知系统</li>' +
                                    '<li>实时感元素 (浏览/库存/购买)</li>' +
                                    '<li>联系表单后端验证模拟</li>' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +
                        '<div class="welcome-info-card full-width">' +
                            '<h4>🗂️ 技术架构</h4>' +
                            '<p style="text-align:center;line-height:2;">' +
                                '<code>product-data.js</code> (数据层) → <code>api.js</code> (伪API层, 模拟网络延迟) → <code>main.js</code> (UI渲染层)<br>' +
                                '全站 11 个 HTML 页面 · 1 个 CSS 样式文件 · 3 个 JS 脚本 · 纯静态部署' +
                            '</p>' +
                        '</div>' +
                        '<div class="welcome-author">' +
                            '<div class="author-name">电商251 · 潘益新</div>' +
                            '<div class="author-class">乡村振兴电商示范平台 | 课程作业展示项目</div>' +
                        '</div>' +
                        '<p class="welcome-disclaimer">⚠ 本网站内容仅供展示用途，不作为商业运营使用，不涉及任何真实交易。</p>' +
                    '</div>' +
                    '<div class="welcome-footer">' +
                        '<label class="dont-show-again">' +
                            '<input type="checkbox" id="welcomeDontShow"> 不再显示此弹窗' +
                        '</label>' +
                        '<button class="welcome-btn-enter" id="welcomeEnterBtn">进入网站</button>' +
                    '</div>' +
                '</div>';

            document.body.appendChild(overlay);

            // 关闭函数
            function closePopup() {
                overlay.classList.add('closing');
                setTimeout(function() {
                    if (overlay.parentElement) {
                        overlay.parentElement.removeChild(overlay);
                    }
                }, 250);
            }

            // 关闭按钮
            document.getElementById('welcomeClose').addEventListener('click', closePopup);

            // 点击遮罩关闭
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closePopup();
            });

            // 进入网站按钮
            document.getElementById('welcomeEnterBtn').addEventListener('click', function() {
                var dontShow = document.getElementById('welcomeDontShow');
                if (dontShow && dontShow.checked) {
                    localStorage.setItem('pomelo_welcome_dismissed', '1');
                }
                closePopup();
            });

            // ESC 关闭
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.getElementById('welcomeOverlay')) {
                    closePopup();
                }
            });

        }, 600);
    })();

    /* ========== 商城筛选系统 ========== */
    const shopGrid = document.querySelector('.shop-products-grid');
    const resultCount = document.querySelector('.result-count strong');
    const sortSelect = document.querySelector('.shop-header select');
    const priceMin = document.querySelector('.price-range input:first-of-type');
    const priceMax = document.querySelector('.price-range input:last-of-type');

    if (shopGrid) {
        // 获取所有商品卡片
        const productCards = Array.from(shopGrid.querySelectorAll('.product-card'));

        // "全部商品" 联动
        const allCatCheckbox = document.querySelector('.filter-cat[value="all"]');
        const catCheckboxes = document.querySelectorAll('.filter-cat:not([value="all"])');

        if (allCatCheckbox) {
            allCatCheckbox.addEventListener('change', function() {
                catCheckboxes.forEach(function(cb) {
                    cb.checked = this.checked;
                }.bind(this));
                applyFilters();
            });
        }

        catCheckboxes.forEach(function(cb) {
            cb.addEventListener('change', function() {
                // 取消全部选项
                if (!this.checked) {
                    allCatCheckbox.checked = false;
                } else {
                    // 检查是否所有分类都被选中
                    var allChecked = true;
                    catCheckboxes.forEach(function(c) {
                        if (!c.checked) allChecked = false;
                    });
                    if (allChecked) allCatCheckbox.checked = true;
                }
                applyFilters();
            });
        });

        // 排序下拉
        if (sortSelect) {
            sortSelect.addEventListener('change', applyFilters);
        }

        // 价格筛选
        var priceFilterTimeout;
        if (priceMin && priceMax) {
            priceMin.addEventListener('input', function() {
                clearTimeout(priceFilterTimeout);
                priceFilterTimeout = setTimeout(applyFilters, 400);
            });
            priceMax.addEventListener('input', function() {
                clearTimeout(priceFilterTimeout);
                priceFilterTimeout = setTimeout(applyFilters, 400);
            });
        }

        // 应用筛选按钮
        const filterBtn = document.querySelector('.btn-filter');
        if (filterBtn) {
            filterBtn.addEventListener('click', applyFilters);
        }

        function applyFilters() {
            // 获取选中的分类
            var selectedCats = [];
            if (!allCatCheckbox || !allCatCheckbox.checked) {
                catCheckboxes.forEach(function(cb) {
                    if (cb.checked) selectedCats.push(cb.value);
                });
            }
            // selectedCats 为空 = 显示全部

            // 获取价格范围
            var minPrice = priceMin && priceMin.value ? parseFloat(priceMin.value) : 0;
            var maxPrice = priceMax && priceMax.value ? parseFloat(priceMax.value) : Infinity;

            // 获取排序方式
            var sortType = sortSelect ? sortSelect.value : '默认排序';

            // 筛选
            var visibleCards = productCards.filter(function(card) {
                var cat = card.getAttribute('data-category');
                var price = parseFloat(card.getAttribute('data-price'));

                // 分类筛选
                if (selectedCats.length > 0 && selectedCats.indexOf(cat) === -1) {
                    return false;
                }

                // 价格筛选
                if (price < minPrice || price > maxPrice) {
                    return false;
                }

                return true;
            });

            // 排序
            if (sortType === '价格从低到高') {
                visibleCards.sort(function(a, b) {
                    return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
                });
            } else if (sortType === '价格从高到低') {
                visibleCards.sort(function(a, b) {
                    return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
                });
            }

            // 重新渲染
            var allCards = productCards.slice();
            // 按筛选后的顺序排列
            var hiddenCards = allCards.filter(function(c) { return visibleCards.indexOf(c) === -1; });

            // 显示/隐藏 + 重排
            visibleCards.forEach(function(card) {
                card.style.display = '';
                shopGrid.appendChild(card); // 移到末尾来重排
            });
            hiddenCards.forEach(function(card) {
                card.style.display = 'none';
            });

            // 更新计数
            if (resultCount) {
                resultCount.textContent = visibleCards.length;
            }

            // 有结果时确保分页可见，无结果时隐藏分页
            var pagination = document.querySelector('.pagination');
            if (pagination) {
                pagination.style.display = visibleCards.length > 0 ? '' : 'none';
            }
        }
    }

    /* ========== 新闻列表 hover 音效(视觉) ========== */
    // 无额外音效，纯CSS已覆盖hover效果

    /* ========== FAQ Accordion ========== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const parent = this.parentElement;
                const isActive = parent.classList.contains('active');

                // 关闭同容器内其他FAQ
                const container = parent.parentElement;
                container.querySelectorAll('.faq-item').forEach(function(item) {
                    item.classList.remove('active');
                });

                // 如果之前未打开，则打开
                if (!isActive) {
                    parent.classList.add('active');
                }
            });
        });
    }

    /* ========== 收藏功能 ========== */
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem('pomelo_favorites')) || [];
        } catch (e) { return []; }
    }

    function saveFavorites(favs) {
        localStorage.setItem('pomelo_favorites', JSON.stringify(favs));
    }

    function isFavorited(productId) {
        return getFavorites().indexOf(productId) !== -1;
    }

    function toggleFavorite(productId, btnEl) {
        var favs = getFavorites();
        var idx = favs.indexOf(productId);
        if (idx === -1) {
            favs.push(productId);
            saveFavorites(favs);
            if (btnEl) {
                btnEl.classList.add('active');
                var heart = btnEl.querySelector('.fav-heart');
                if (heart) {
                    heart.style.animation = 'none';
                    heart.offsetHeight;
                    heart.style.animation = 'heartPop 0.35s cubic-bezier(0.68,-0.55,0.265,1.55)';
                }
            }
            showToast('已加入收藏', 'success');
        } else {
            favs.splice(idx, 1);
            saveFavorites(favs);
            if (btnEl) btnEl.classList.remove('active');
            showToast('已取消收藏', 'info');
        }
        // 如果当前在收藏视图，刷新列表
        var urlParamsFavRefresh = new URLSearchParams(window.location.search);
        if (urlParamsFavRefresh.get('show') === 'favorites') {
            renderFavoritesView();
        }
        // 如果当前在收藏独立页面，刷新
        if (window.location.pathname.indexOf('favorites.html') !== -1) {
            setTimeout(renderFavoritesPage, 50);
        }
    }

    // 收藏视图（在商城页面展示）
    function renderFavoritesView() {
        var grid = document.querySelector('.shop-products-grid');
        if (!grid) return;
        var favs = getFavorites();
        var allCards = grid.querySelectorAll('.product-card');
        if (favs.length === 0) {
            allCards.forEach(function(c) { c.style.display = 'none'; });
            var existing = document.getElementById('favsEmpty');
            if (!existing) {
                var emptyDiv = document.createElement('div');
                emptyDiv.id = 'favsEmpty';
                emptyDiv.style.cssText = 'text-align:center;padding:60px 0;grid-column:1/-1;';
                emptyDiv.innerHTML = '<div style="font-size:64px;margin-bottom:16px;">💛</div><h3 style="color:#4a3020;margin-bottom:8px;">暂无收藏</h3><p style="color:#999;">快去商城逛逛，收藏心仪的商品吧！</p>';
                grid.parentElement.insertBefore(emptyDiv, grid);
            }
            var resultCountEl = document.querySelector('.result-count strong');
            if (resultCountEl) resultCountEl.textContent = '0';
            return;
        }
        var emptyEl = document.getElementById('favsEmpty');
        if (emptyEl) emptyEl.parentElement.removeChild(emptyEl);
        var visibleCount = 0;
        allCards.forEach(function(card) {
            var pid = resolveProductId(card);
            if (pid && favs.indexOf(pid) !== -1) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        var resultCountEl = document.querySelector('.result-count strong');
        if (resultCountEl) resultCountEl.textContent = visibleCount;
        var pagination = document.querySelector('.pagination');
        if (pagination) pagination.style.display = visibleCount > 0 ? '' : 'none';
    }

    // 收藏独立页面渲染（favorites.html）
    function renderFavoritesPage() {
        var grid = document.getElementById('favsGrid');
        if (!grid) return; // 不在收藏页
        var toolbar = document.getElementById('favToolbar');
        var emptyEl = document.getElementById('favsEmpty');
        var countEl = document.getElementById('favCount');
        var favs = getFavorites();

        // Update toolbar count
        if (countEl) countEl.textContent = favs.length;

        if (favs.length === 0) {
            // Show empty state
            if (toolbar) toolbar.style.display = 'none';
            if (emptyEl) emptyEl.style.display = '';
            grid.style.display = 'none';
            return;
        }

        // Show toolbar, hide empty
        if (toolbar) toolbar.style.display = 'flex';
        if (emptyEl) emptyEl.style.display = 'none';
        grid.style.display = '';

        // Build product cards from POMELO_DB
        var html = '';
        for (var i = 0; i < favs.length; i++) {
            var product = window.POMELO_DB && window.POMELO_DB.byId ? window.POMELO_DB.byId[favs[i]] : null;
            if (!product) {
                // Fallback: try to find in list
                if (window.POMELO_DB && window.POMELO_DB.list) {
                    for (var j = 0; j < window.POMELO_DB.list.length; j++) {
                        if (window.POMELO_DB.list[j].id === favs[i]) {
                            product = window.POMELO_DB.list[j];
                            break;
                        }
                    }
                }
            }
            if (product) {
                html += createProductCardHTML(product, false);
            }
        }

        grid.innerHTML = html;

        // Add remove buttons to each card
        var cards = grid.querySelectorAll('.product-card');
        cards.forEach(function(card) {
            var pid = card.getAttribute('data-product-id');
            if (!pid) return;

            // Remove button (X)
            var removeBtn = document.createElement('button');
            removeBtn.className = 'fav-remove-btn';
            removeBtn.title = '取消收藏';
            removeBtn.innerHTML = '✕';
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(pid, null);
                // Re-render favorites page
                setTimeout(renderFavoritesPage, 50);
            });
            card.style.position = 'relative';
            card.appendChild(removeBtn);
        });

        // Re-inject regular heart buttons and quick view
        injectCardButtons();

        // Fix product links
        setTimeout(function() {
            cards.forEach(function(card) {
                var pid = card.getAttribute('data-product-id');
                if (!pid) return;
                var links = card.querySelectorAll('a[href="product-detail.html"]');
                links.forEach(function(link) {
                    link.setAttribute('href', 'product-detail.html?id=' + encodeURIComponent(pid));
                });
            });
        }, 10);
    }

    // 给所有商品卡片注入收藏按钮和快速查看按钮
    function resolveProductId(card) {
        var pid = card.getAttribute('data-product-id');
        if (pid) return pid;
        // 从商品名称推断 product-id
        var nameEl = card.querySelector('h3');
        if (!nameEl) return null;
        var name = nameEl.textContent.trim();
        var nameMap = {
            '梅州新鲜金柚 5斤装': 'pomelo-fresh-5', '新鲜金柚 5斤装': 'pomelo-fresh-5',
            '梅州新鲜金柚': 'pomelo-fresh-5',
            '精选金柚 8斤家庭装': 'pomelo-fresh-8', '梅州新鲜金柚 8斤装': 'pomelo-fresh-8',
            '梅州新鲜金柚 12斤装': 'pomelo-fresh-12',
            '金柚精品礼盒 尊享装': 'gift-box-1', '金柚精品礼盒': 'gift-box-1',
            '精品礼盒 尊享装': 'gift-box-1',
            '金柚臻品礼盒 豪华装': 'gift-box-2',
            '精品礼盒3号 雅致装': 'gift-box-3',
            '金柚果干 100g×3袋': 'pomelo-dry', '金柚果干': 'pomelo-dry',
            '金柚蜂蜜茶 500g': 'pomelo-tea', '金柚蜂蜜茶': 'pomelo-tea',
            '双果体验装': 'pomelo-trial',
            '伴手礼组合装': 'gift-combo', '伴手礼组合装（团购）': 'gift-combo-bulk',
            '企业团购定制装': 'gift-corporate', '企业团购尊享装': 'gift-corporate',
            '金柚家庭装 8斤': 'pomelo-family-box',
            '金柚精选装 5斤': 'pomelo-selected-box',
            '金柚果酱 280g': 'pomelo-jam'
        };
        if (nameMap[name]) return nameMap[name];
        // 模糊匹配
        var keys = Object.keys(nameMap);
        for (var i = 0; i < keys.length; i++) {
            if (name.indexOf(keys[i]) !== -1 || keys[i].indexOf(name) !== -1) {
                return nameMap[keys[i]];
            }
        }
        return 'product-' + name.replace(/[^a-zA-Z0-9一-鿿]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    function injectCardButtons() {
        var allCards = document.querySelectorAll('.product-card');
        allCards.forEach(function(card) {
            var pid = resolveProductId(card);
            if (!pid) return;

            // 收藏按钮
            if (!card.querySelector('.btn-fav')) {
                var favBtn = document.createElement('button');
                favBtn.className = 'btn-fav' + (isFavorited(pid) ? ' active' : '');
                favBtn.setAttribute('data-product-id', pid);
                favBtn.title = '收藏';
                favBtn.innerHTML = '<span class="fav-heart">❤</span>';
                favBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(pid, this);
                });
                card.style.position = 'relative';
                card.appendChild(favBtn);
            }

            // 快速查看按钮
            if (!card.querySelector('.btn-qv')) {
                var qvBtn = document.createElement('button');
                qvBtn.className = 'btn-fav btn-qv';
                qvBtn.title = '快速查看';
                qvBtn.style.cssText = 'top:52px;';
                qvBtn.innerHTML = '👁';
                qvBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var nameEl = card.querySelector('h3');
                    var priceEl = card.querySelector('.product-price .price');
                    var imgEl = card.querySelector('img');
                    var tagEl = card.querySelector('.product-tag');
                    window.openQuickView({
                        id: pid,
                        name: nameEl ? nameEl.textContent.trim() : '梅州金柚',
                        price: priceEl ? parseFloat(priceEl.textContent.replace('¥','').trim()) : 68,
                        image: imgEl ? imgEl.getAttribute('src') : '',
                        tag: tagEl ? tagEl.textContent.trim() : '梅州精选',
                        description: '源自中国金柚之乡——广东梅州，新鲜采摘，产地直发。'
                    });
                });
                card.appendChild(qvBtn);
            }
        });
    }
    injectCardButtons();

    // 处理 URL show=favorites（商城页收藏视图）
    var urlParamsFavPage = new URLSearchParams(window.location.search);
    if (urlParamsFavPage.get('show') === 'favorites') {
        setTimeout(renderFavoritesView, 100);
    }

    // 处理收藏独立页面（favorites.html）
    if (window.location.pathname.indexOf('favorites.html') !== -1) {
        setTimeout(function() {
            renderFavoritesPage();
            // 清空收藏按钮
            var clearBtn = document.getElementById('btnClearFavs');
            if (clearBtn) {
                clearBtn.addEventListener('click', function() {
                    if (confirm('确定要清空所有收藏吗？此操作不可恢复。')) {
                        localStorage.setItem('pomelo_favorites', '[]');
                        showToast('已清空全部收藏', 'info');
                        renderFavoritesPage();
                    }
                });
            }
        }, 80);
    }

    /* ========== 快速查看弹窗 ========== */
    (function createQuickViewModal() {
        var overlay = document.createElement('div');
        overlay.className = 'quickview-overlay';
        overlay.id = 'quickviewOverlay';
        overlay.innerHTML = '<div class="quickview-modal">' +
            '<img class="quickview-image" id="qvImage" src="" alt="">' +
            '<div class="quickview-info">' +
                '<h3 class="quickview-name" id="qvName"></h3>' +
                '<span class="quickview-tag" id="qvTag"></span>' +
                '<div class="quickview-price"><span id="qvPrice"></span><span class="original" id="qvOrigPrice"></span></div>' +
                '<p class="quickview-desc" id="qvDesc"></p>' +
                '<div class="quickview-actions">' +
                    '<button class="btn btn-primary" id="qvAddCart">加入购物车</button>' +
                    '<a class="btn btn-outline-green" id="qvDetailLink">查看详情</a>' +
                '</div>' +
            '</div>' +
            '<button class="quickview-close" id="qvClose">&times;</button>' +
        '</div>';
        document.body.appendChild(overlay);

        document.getElementById('qvClose').addEventListener('click', function() {
            document.getElementById('quickviewOverlay').classList.remove('active');
        });
        document.getElementById('quickviewOverlay').addEventListener('click', function(e) {
            if (e.target === document.getElementById('quickviewOverlay')) {
                document.getElementById('quickviewOverlay').classList.remove('active');
            }
        });

        window.openQuickView = function(productData) {
            document.getElementById('qvImage').src = productData.image || '';
            document.getElementById('qvName').textContent = productData.name || '';
            document.getElementById('qvTag').textContent = productData.tag || '梅州精选';
            document.getElementById('qvPrice').textContent = '¥' + (productData.price || 0).toFixed(2);
            var origEl = document.getElementById('qvOrigPrice');
            if (productData.originalPrice && productData.originalPrice > productData.price) {
                origEl.textContent = '¥' + productData.originalPrice.toFixed(2);
                origEl.style.display = '';
            } else {
                origEl.style.display = 'none';
            }
            document.getElementById('qvDesc').textContent = productData.description || '源自中国金柚之乡——广东梅州，新鲜采摘，产地直发。';
            document.getElementById('qvDetailLink').href = 'product-detail.html?id=' + (productData.id || '');

            // 快速加入购物车
            var addBtn = document.getElementById('qvAddCart');
            var newAddBtn = addBtn.cloneNode(true);
            addBtn.parentElement.replaceChild(newAddBtn, addBtn);
            newAddBtn.addEventListener('click', function() {
                addToCart({
                    name: productData.name,
                    price: productData.price,
                    image: productData.image,
                    spec: productData.spec || '标准',
                    packaging: productData.packaging || '简装',
                    quantity: 1
                });
                showToast('已加入购物车', 'success');
                document.getElementById('quickviewOverlay').classList.remove('active');
            });

            document.getElementById('quickviewOverlay').classList.add('active');
        };
    })();

    /* ========== 商品评价系统 ========== */
    function getReviews(productId) {
        try {
            var all = JSON.parse(localStorage.getItem('pomelo_reviews')) || {};
            var reviews = all[productId];
            // 如果没有评价，自动播种20条模拟评价
            if (!reviews || reviews.length === 0) {
                reviews = seedReviews();
                all[productId] = reviews;
                localStorage.setItem('pomelo_reviews', JSON.stringify(all));
            }
            return reviews;
        } catch (e) { return []; }
    }

    // 播种20条模拟评价
    function seedReviews() {
        var seeds = window.POMELO_DB && window.POMELO_DB.reviewSeeds ? window.POMELO_DB.reviewSeeds : [];
        if (seeds.length === 0) return [];
        var now = new Date();
        var reviews = [];
        // 打乱种子顺序
        var shuffled = seeds.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = tmp;
        }
        for (var k = 0; k < shuffled.length; k++) {
            var s = shuffled[k];
            // 在过去90天内随机分布
            var daysAgo = Math.floor(Math.random() * 90);
            var reviewDate = new Date(now);
            reviewDate.setDate(reviewDate.getDate() - daysAgo);
            var m = reviewDate.getMonth() + 1;
            var d = reviewDate.getDate();
            var dateStr = reviewDate.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
            reviews.push({
                id: 200000 + k,
                userName: s.userName,
                rating: s.rating,
                content: s.content,
                date: dateStr
            });
        }
        // 按日期降序排列
        reviews.sort(function(a, b) { return b.date.localeCompare(a.date); });
        return reviews;
    }

    function saveReviews(productId, reviews) {
        var all = {};
        try { all = JSON.parse(localStorage.getItem('pomelo_reviews')) || {}; } catch(e) {}
        all[productId] = reviews;
        localStorage.setItem('pomelo_reviews', JSON.stringify(all));
    }

    function addReview(productId, review) {
        var reviews = getReviews(productId);
        review.id = Date.now();
        review.date = new Date().toISOString().slice(0, 10);
        reviews.unshift(review);
        saveReviews(productId, reviews);
        renderReviews(productId);
        showToast('评价发表成功！', 'success');
    }

    function renderStarRating(rating, readonly) {
        var html = '<div class="star-rating"' + (readonly ? ' data-readonly="true"' : '') + '>';
        for (var i = 1; i <= 5; i++) {
            var starClass = i <= rating ? 'star filled' : 'star empty';
            html += '<span class="' + starClass + '" data-value="' + i + '">★</span>';
        }
        html += '</div>';
        return html;
    }

    function bindStarInput(container) {
        var stars = container.querySelectorAll('.star');
        var hiddenInput = container.parentElement.querySelector('.review-rating-value');
        stars.forEach(function(star) {
            star.addEventListener('click', function() {
                var val = parseInt(this.getAttribute('data-value'));
                if (hiddenInput) hiddenInput.value = val;
                stars.forEach(function(s, idx) {
                    s.className = idx < val ? 'star filled' : 'star empty';
                });
            });
            star.addEventListener('mouseenter', function() {
                var val = parseInt(this.getAttribute('data-value'));
                stars.forEach(function(s, idx) {
                    if (idx < val) s.classList.add('filled');
                });
            });
            star.addEventListener('mouseleave', function() {
                var currentVal = hiddenInput ? parseInt(hiddenInput.value) || 0 : 0;
                stars.forEach(function(s, idx) {
                    s.className = idx < currentVal ? 'star filled' : 'star empty';
                });
            });
        });
    }

    function renderReviews(productId) {
        var section = document.querySelector('.review-section');
        if (!section) return;
        var reviews = getReviews(productId);
        var total = reviews.length;
        var avg = total > 0 ? reviews.reduce(function(s, r) { return s + r.rating; }, 0) / total : 0;
        var avgRounded = Math.round(avg * 10) / 10;

        // 评分分布
        var distribution = [0, 0, 0, 0, 0];
        reviews.forEach(function(r) { if (r.rating >= 1 && r.rating <= 5) distribution[r.rating - 1]++; });

        var html = '<div class="review-summary">' +
            '<div class="review-average">' +
                '<div class="review-big-number">' + avgRounded + '</div>' +
                '<div>' + renderStarRating(Math.round(avg), true) + '</div>' +
                '<div class="review-total-count">共 ' + total + ' 条评价</div>' +
            '</div>' +
            '<div class="review-bars">';
        for (var i = 5; i >= 1; i--) {
            var pct = total > 0 ? Math.round(distribution[i-1] / total * 100) : 0;
            html += '<div class="review-bar-row">' +
                '<span class="bar-label">' + i + '星</span>' +
                '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%;"></div></div>' +
                '<span class="bar-percent">' + pct + '%</span>' +
            '</div>';
        }
        html += '</div></div>';

        // 评价列表
        if (reviews.length === 0) {
            html += '<div class="review-empty">暂无评价，快来发表第一条评价吧！</div>';
        } else {
            reviews.forEach(function(r) {
                html += '<div class="review-card">' +
                    '<div class="review-card-header">' +
                        '<div class="review-avatar">' + (r.userName || '匿').charAt(0).toUpperCase() + '</div>' +
                        '<div>' +
                            '<div class="review-user-name">' + escapeHtml(r.userName || '匿名用户') + '</div>' +
                            '<div class="review-date">' + r.date + '</div>' +
                        '</div>' +
                    '</div>' +
                    renderStarRating(r.rating, true) +
                    '<div class="review-text">' + escapeHtml(r.content || '') + '</div>' +
                '</div>';
            });
        }

        // 评价表单
        var user = getUser();
        html += '<div class="review-form" id="reviewForm">' +
            '<h4>发表评价</h4>' +
            '<div class="review-form-rating"><span>评分：</span>' + renderStarRating(0, false) + '<input type="hidden" class="review-rating-value" value="0"></div>' +
            '<div class="form-group"><label>昵称</label><input type="text" id="reviewUserName" placeholder="请输入昵称" value="' + (user ? escapeHtml(user.name) : '') + '"></div>' +
            '<div class="form-group"><label>评价内容</label><textarea id="reviewContent" placeholder="分享您的使用体验..."></textarea></div>' +
            '<button class="btn-submit" id="submitReview">提交评价</button>' +
        '</div>';

        section.innerHTML = html;

        // 绑定星级评分交互
        var ratingContainer = section.querySelector('.review-form-rating .star-rating');
        if (ratingContainer) bindStarInput(ratingContainer);

        // 绑定提交按钮
        var submitBtn = section.querySelector('#submitReview');
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                var ratingInput = section.querySelector('.review-rating-value');
                var ratingVal = ratingInput ? parseInt(ratingInput.value) || 0 : 0;
                var userNameEl = section.querySelector('#reviewUserName');
                var contentEl = section.querySelector('#reviewContent');
                if (ratingVal === 0) { showToast('请先评分', 'warning'); return; }
                if (!contentEl || !contentEl.value.trim()) { showToast('请输入评价内容', 'warning'); return; }
                addReview(productId, {
                    rating: ratingVal,
                    userName: (userNameEl && userNameEl.value.trim()) ? userNameEl.value.trim() : '匿名用户',
                    content: contentEl.value.trim()
                });
            });
        }
    }

    /* ========================================================================
       动态商品详情页渲染 (Phase 4)
       ======================================================================== */

    // 当前详情页商品状态（供 addToCart 等读取）
    window._currentDetailProduct = null;
    window._currentDetailState = {
        selectedSpecs: {},       // { 'size': 0, 'packaging': 0 } — 每组的选中索引
        currentPrice: 0,
        currentSpecText: '',
        currentPackagingText: ''
    };

    /**
     * 生成产品卡片 HTML（Phase 3 复用）
     * @param {Object} product - 产品数据
     * @param {boolean} showFlash - 是否显示 flash 价格
     * @returns {string} HTML 字符串
     */
    function createProductCardHTML(product, showFlash) {
        var price = showFlash && product.flashPrice ? product.flashPrice : product.price;
        var originalPrice = showFlash && product.flashPrice ? product.originalPrice : product.originalPrice;
        var originalHTML = (originalPrice && originalPrice > price)
            ? '<span class="original">¥' + originalPrice.toFixed(2) + '</span>'
            : '';
        var tagHTML = product.tag ? '<span class="product-tag">' + escapeHtml(product.tag) + '</span>' : '';
        var detailURL = 'product-detail.html?id=' + encodeURIComponent(product.id);

        return '<div class="product-card" data-product-id="' + escapeHtml(product.id) + '" data-category="' + escapeHtml(product.category) + '" data-price="' + price + '">' +
            '<div class="product-card-image">' +
                '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" loading="lazy">' +
                (showFlash && product.flashPrice ? '<span class="flash-badge">限时抢购</span>' : '') +
            '</div>' +
            '<div class="product-card-body">' +
                tagHTML +
                '<h3>' + escapeHtml(product.name) + '</h3>' +
                '<div class="product-price">' +
                    '<span class="price">¥' + price.toFixed(2) + '</span>' +
                    originalHTML +
                '</div>' +
                '<a href="' + detailURL + '" class="btn-sm btn-primary">立即购买</a>' +
            '</div>' +
        '</div>';
    }

    /**
     * 渲染产品网格（带骨架屏 → 异步加载 → 替换）
     * @param {string} containerId - 容器元素 ID
     * @param {Promise} productsPromise - API 请求 Promise
     * @param {boolean} showFlash - 是否显示 flash 价格
     */
    function renderProductGrid(containerId, productsPromise, showFlash) {
        var container = document.getElementById(containerId);
        if (!container) return;

        productsPromise.then(function(products) {
            if (!products || products.length === 0) {
                container.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">暂无商品</p>';
                return;
            }
            var html = '';
            products.forEach(function(p) {
                html += createProductCardHTML(p, showFlash);
            });
            // 淡出 skeleton → 替换 → 淡入
            var cards = container.querySelectorAll('.skeleton-card, .product-card');
            cards.forEach(function(card, i) {
                card.style.transition = 'opacity 0.3s ease';
                card.style.opacity = '0';
            });
            setTimeout(function() {
                container.innerHTML = html;
                var newCards = container.querySelectorAll('.product-card');
                newCards.forEach(function(card, i) {
                    card.style.opacity = '0';
                    card.style.transition = 'opacity 0.35s ease';
                    setTimeout(function() {
                        card.style.opacity = '1';
                    }, i * 60);
                });
                // 重新注入卡片按钮（收藏、快速查看等）
                if (typeof injectCardButtons === 'function') injectCardButtons();
            }, 300);
        }).catch(function(err) {
            console.error('renderProductGrid error:', err);
            container.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">加载失败，请刷新重试</p>';
        });
    }

    /**
     * 获取产品 Tab 分组
     */
    function getProductTabGroup(product) {
        if (!product) return 'fresh';
        switch (product.tabGroup) {
            case 'gift': return 'gift';
            case 'processed': return 'processed';
            default: return 'fresh';
        }
    }

    /**
     * 替换模板占位符
     */
    function fillTemplate(template, product) {
        return template
            .replace(/\{name\}/g, product.name || '')
            .replace(/\{shortName\}/g, product.shortName || product.name || '')
            .replace(/\{price\}/g, '¥' + (product.price || 0).toFixed(2))
            .replace(/\{image\}/g, product.image || '')
            .replace(/\{description\}/g, product.description || '');
    }

    /**
     * 生成规格选择器 HTML
     */
    function buildSpecsHTML(specs) {
        if (!specs || !specs.length) return '';
        var html = '';
        specs.forEach(function(specGroup, gi) {
            html += '<div class="product-specs">' +
                '<h4>' + escapeHtml(specGroup.label) + '</h4>' +
                '<div class="spec-options" data-spec-group="' + gi + '">';
            specGroup.options.forEach(function(opt, oi) {
                var activeClass = opt.active ? ' active' : '';
                html += '<span class="spec-option' + activeClass + '" data-spec-group="' + gi + '" data-spec-option="' + oi + '" data-price="' + (opt.price || 0) + '" data-price-add="' + (opt.priceAdd || 0) + '">' + escapeHtml(opt.text) + '</span>';
            });
            html += '</div></div>';
        });
        return html;
    }

    /**
     * 计算当前选中规格的价格
     */
    function calcSpecPrice(specs, selectedSpecs) {
        var price = 0;
        if (!specs) return 0;
        specs.forEach(function(specGroup, gi) {
            var selIdx = selectedSpecs[gi] || 0;
            var opt = specGroup.options[selIdx];
            if (opt) {
                price += (opt.price || 0) + (opt.priceAdd || 0);
            }
        });
        return price;
    }

    /**
     * 获取当前选中规格文本
     */
    function getSelectedSpecText(specs, selectedSpecs) {
        if (!specs || !specs.length) return '标准';
        var firstGroup = specs[0];
        var selIdx = selectedSpecs[0] || 0;
        return (firstGroup.options[selIdx] && firstGroup.options[selIdx].text) || '标准';
    }

    function getSelectedPackagingText(specs, selectedSpecs) {
        if (!specs || specs.length < 2) return '简装';
        var pkgGroup = specs[1];
        var selIdx = selectedSpecs[1] || 0;
        return (pkgGroup.options[selIdx] && pkgGroup.options[selIdx].text) || '简装';
    }

    /**
     * 渲染 Tab 导航和内容
     */
    function buildTabsHTML(tabs, product) {
        if (!tabs || !tabs.length) return { nav: '', contents: '' };
        var navHTML = '';
        var contentsHTML = '';
        tabs.forEach(function(tab, i) {
            var activeClass = i === 0 ? ' active' : '';
            var tabId = 'detail-tab-' + i;
            navHTML += '<button class="' + activeClass + '" data-tab="' + tabId + '">' + escapeHtml(tab.title) + '</button>';
            contentsHTML += '<div class="tab-content' + activeClass + '" data-tab="' + tabId + '">' +
                fillTemplate(tab.content, product) +
            '</div>';
        });
        return { nav: navHTML, contents: contentsHTML };
    }

    /**
     * 渲染 FAQ
     */
    function buildFAQHTML(faqData) {
        if (!faqData || !faqData.length) return '';
        var html = '';
        faqData.forEach(function(item) {
            html += '<div class="faq-item">' +
                '<button class="faq-question">' + escapeHtml(item.q) + '<span class="arrow">▼</span></button>' +
                '<div class="faq-answer"><p>' + item.a + '</p></div>' +
            '</div>';
        });
        return html;
    }

    /**
     * 渲染推荐商品网格
     */
    function renderRecommendGrid(productId) {
        var container = document.getElementById('recommendGrid');
        if (!container) return;
        API.getRelatedProducts(productId, 4).then(function(products) {
            if (!products || !products.length) return;
            var html = '';
            products.forEach(function(p) {
                html += createProductCardHTML(p, false);
            });
            // 淡出 skeleton
            var skeletons = container.querySelectorAll('.skeleton-card');
            skeletons.forEach(function(s) { s.style.opacity = '0'; });
            setTimeout(function() {
                container.innerHTML = html;
                var cards = container.querySelectorAll('.product-card');
                cards.forEach(function(card, i) {
                    card.style.opacity = '0';
                    card.style.transition = 'opacity 0.35s ease';
                    setTimeout(function() { card.style.opacity = '1'; }, i * 60);
                });
                if (typeof injectCardButtons === 'function') injectCardButtons();
            }, 300);
        });
    }

    /**
     * 主渲染函数：根据 productId 渲染整个详情页
     */
    function renderProductDetail(productId) {
        var overlay = document.getElementById('detailLoadingOverlay');
        if (overlay) overlay.style.display = 'flex';

        API.getProductById(productId).then(function(product) {
            if (!product) {
                // 商品不存在
                if (overlay) overlay.style.display = 'none';
                var nameEl = document.getElementById('detailName');
                if (nameEl) nameEl.textContent = '商品不存在';
                var bcEl = document.getElementById('detailBreadcrumb');
                if (bcEl) bcEl.textContent = '未找到该商品';
                var gaEl = document.getElementById('detailThumbList');
                if (gaEl) gaEl.innerHTML = '';
                return;
            }

            // 保存当前产品状态
            window._currentDetailProduct = product;
            var selectedSpecs = {};
            product.specs.forEach(function(sg, gi) {
                sg.options.forEach(function(opt, oi) {
                    if (opt.active) selectedSpecs[gi] = oi;
                });
            });
            var currentPrice = product.price;
            window._currentDetailState = {
                selectedSpecs: selectedSpecs,
                currentPrice: currentPrice,
                currentSpecText: getSelectedSpecText(product.specs, selectedSpecs),
                currentPackagingText: getSelectedPackagingText(product.specs, selectedSpecs)
            };

            // 1. 页面标题
            document.title = product.shortName + ' - 商品详情 | 梅州金柚';
            var pageTitleEl = document.getElementById('detailPageTitle');
            if (pageTitleEl) pageTitleEl.textContent = product.shortName + ' - 商品详情 | 梅州金柚';

            // 2. 面包屑
            var bcEl = document.getElementById('detailBreadcrumb');
            if (bcEl) bcEl.textContent = product.shortName;

            // 3. 商品名 + 副标题
            var nameEl = document.getElementById('detailName');
            if (nameEl) nameEl.textContent = product.name;
            var subEl = document.getElementById('detailSubtitle');
            if (subEl) subEl.textContent = product.subtitle || '';

            // 4. 价格区域
            var priceArea = document.getElementById('detailPriceArea');
            if (priceArea) {
                var promoHTML = (product.originalPrice && product.originalPrice > product.price)
                    ? '<span style="margin-left:12px;padding:2px 10px;background:#D4380D;color:#fff;border-radius:10px;font-size:12px;">限时优惠</span>'
                    : '';
                priceArea.innerHTML =
                    '<span class="current"><span class="symbol">¥</span>' + product.price.toFixed(2) + '</span>' +
                    (product.originalPrice ? '<span class="original">¥' + product.originalPrice.toFixed(2) + '</span>' : '') +
                    promoHTML;
            }

            // 5. 主图 + 缩略图
            var mainImg = document.getElementById('detailMainImage');
            if (mainImg) {
                mainImg.src = product.images && product.images[0] ? product.images[0] : product.image;
                mainImg.alt = product.name;
            }
            var thumbList = document.getElementById('detailThumbList');
            if (thumbList && product.images && product.images.length) {
                var thumbHTML = '';
                product.images.forEach(function(img, i) {
                    var activeClass = i === 0 ? ' active' : '';
                    thumbHTML += '<div class="thumb' + activeClass + '"><img src="' + img + '" alt="' + product.name + '图' + (i + 1) + '" data-full="' + img + '"></div>';
                });
                thumbList.innerHTML = thumbHTML;

                // 绑定缩略图点击事件
                thumbList.querySelectorAll('.thumb').forEach(function(thumb) {
                    thumb.addEventListener('click', function() {
                        var fullSrc = this.querySelector('img').getAttribute('data-full');
                        if (fullSrc && mainImg) {
                            mainImg.src = fullSrc;
                        }
                        thumbList.querySelectorAll('.thumb').forEach(function(t) { t.classList.remove('active'); });
                        this.classList.add('active');
                    });
                });
            }

            // 6. 规格选择器
            var specsArea = document.getElementById('detailSpecsArea');
            if (specsArea) {
                specsArea.innerHTML = buildSpecsHTML(product.specs);

                // 绑定规格点击事件
                specsArea.querySelectorAll('.spec-option').forEach(function(opt) {
                    opt.addEventListener('click', function() {
                        var gi = parseInt(this.getAttribute('data-spec-group'));
                        var oi = parseInt(this.getAttribute('data-spec-option'));

                        // 更新选中状态
                        var groupEl = specsArea.querySelector('.spec-options[data-spec-group="' + gi + '"]');
                        if (groupEl) {
                            groupEl.querySelectorAll('.spec-option').forEach(function(o) { o.classList.remove('active'); });
                        }
                        this.classList.add('active');

                        // 更新状态
                        window._currentDetailState.selectedSpecs[gi] = oi;
                        window._currentDetailState.currentSpecText = getSelectedSpecText(product.specs, window._currentDetailState.selectedSpecs);
                        window._currentDetailState.currentPackagingText = getSelectedPackagingText(product.specs, window._currentDetailState.selectedSpecs);

                        // 更新价格
                        var optPrice = parseFloat(this.getAttribute('data-price')) || 0;
                        var optPriceAdd = parseFloat(this.getAttribute('data-price-add')) || 0;
                        if (optPrice > 0) {
                            // 遍历所有选中的规格，重新计算价格
                            var newPrice = product.price;
                            var allSpecs = product.specs;
                            var selSpecs = window._currentDetailState.selectedSpecs;
                            allSpecs.forEach(function(sg, sgi) {
                                var idx = selSpecs[sgi] || 0;
                                var selOpt = sg.options[idx];
                                if (selOpt && selOpt.price) newPrice = selOpt.price;
                                if (selOpt && selOpt.priceAdd) newPrice += selOpt.priceAdd;
                            });
                            window._currentDetailState.currentPrice = newPrice;
                            var currentEl = document.querySelector('#detailPriceArea .current');
                            if (currentEl) {
                                currentEl.innerHTML = '<span class="symbol">¥</span>' + newPrice.toFixed(2);
                            }
                        } else if (optPriceAdd > 0) {
                            var basePrice = product.price;
                            allSpecs = product.specs;
                            selSpecs = window._currentDetailState.selectedSpecs;
                            allSpecs.forEach(function(sg, sgi) {
                                var idx = selSpecs[sgi] || 0;
                                var selOpt = sg.options[idx];
                                if (selOpt && selOpt.price) basePrice = selOpt.price;
                            });
                            var extraPrice = basePrice + optPriceAdd;
                            allSpecs.forEach(function(sg, sgi) {
                                if (sgi !== gi) {
                                    var idx = selSpecs[sgi] || 0;
                                    var selOpt = sg.options[idx];
                                    if (selOpt && selOpt.priceAdd) extraPrice += selOpt.priceAdd;
                                }
                            });
                            window._currentDetailState.currentPrice = extraPrice;
                            currentEl = document.querySelector('#detailPriceArea .current');
                            if (currentEl) {
                                currentEl.innerHTML = '<span class="symbol">¥</span>' + extraPrice.toFixed(2);
                            }
                        }
                    });
                });
            }

            // 7. Tab 导航和内容
            var tabGroup = getProductTabGroup(product);
            var tabs = (window.POMELO_DB && window.POMELO_DB.tabTemplates)
                ? window.POMELO_DB.tabTemplates[tabGroup] || window.POMELO_DB.tabTemplates.fresh
                : [];
            var tabsResult = buildTabsHTML(tabs, product);

            var tabNavEl = document.getElementById('detailTabNav');
            if (tabNavEl) tabNavEl.innerHTML = tabsResult.nav;

            var tabContentsEl = document.getElementById('detailTabContents');
            if (tabContentsEl) tabContentsEl.innerHTML = tabsResult.contents;

            // 绑定 Tab 切换
            var allTabBtns = document.querySelectorAll('#detailTabNav button');
            var allTabContents = document.querySelectorAll('#detailTabContents .tab-content');
            allTabBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var targetTab = this.getAttribute('data-tab');
                    allTabBtns.forEach(function(b) { b.classList.remove('active'); });
                    this.classList.add('active');
                    allTabContents.forEach(function(tc) {
                        tc.classList.remove('active');
                        if (tc.getAttribute('data-tab') === targetTab) {
                            tc.classList.add('active');
                        }
                    });
                });
            });

            // 8. FAQ
            var faqData = (window.POMELO_DB && window.POMELO_DB.faqData)
                ? window.POMELO_DB.faqData[tabGroup] || window.POMELO_DB.faqData.fresh
                : [];
            var faqEl = document.getElementById('detailFAQ');
            if (faqEl) {
                faqEl.innerHTML = buildFAQHTML(faqData);
                // 绑定 FAQ 折叠
                faqEl.querySelectorAll('.faq-question').forEach(function(qBtn) {
                    qBtn.addEventListener('click', function() {
                        var answer = this.nextElementSibling;
                        if (answer) {
                            var isOpen = answer.style.maxHeight;
                            // 关闭所有
                            faqEl.querySelectorAll('.faq-answer').forEach(function(a) { a.style.maxHeight = null; });
                            faqEl.querySelectorAll('.faq-question').forEach(function(q) { q.classList.remove('open'); });
                            // 打开当前
                            if (!isOpen) {
                                answer.style.maxHeight = answer.scrollHeight + 'px';
                                this.classList.add('open');
                            }
                        }
                    });
                });
            }

            // 9. 推荐商品
            renderRecommendGrid(productId);

            // 10. 分享条
            var shareBar = document.getElementById('shareBar');
            if (shareBar) {
                shareBar.setAttribute('data-title', product.shortName + ' - 梅州金柚');
            }

            // 11. 评价初始化
            var reviewSection = document.getElementById('reviews');
            if (!reviewSection) {
                var faqWrap = document.getElementById('detailFAQWrap');
                if (faqWrap) {
                    reviewSection = document.createElement('div');
                    reviewSection.className = 'review-section container';
                    reviewSection.id = 'reviews';
                    reviewSection.style.cssText = 'max-width:1200px;margin:60px auto 0;';
                    faqWrap.parentElement.insertBefore(reviewSection, faqWrap.nextSibling);
                }
            }
            setTimeout(function() {
                renderReviews(productId);
            }, 300);

            // 12. 记录浏览历史
            if (typeof recordProductView === 'function') {
                recordProductView(product);
            } else {
                // 内联记录
                try {
                    var hist = JSON.parse(localStorage.getItem('pomelo_history') || '[]');
                    hist = hist.filter(function(h) { return h.id !== product.id; });
                    hist.unshift({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        time: Date.now()
                    });
                    localStorage.setItem('pomelo_history', JSON.stringify(hist.slice(0, 20)));
                } catch (e) {}
            }

            // 13. 隐藏加载蒙层
            if (overlay) {
                overlay.classList.add('hidden');
                setTimeout(function() {
                    overlay.style.display = 'none';
                }, 300);
            }

            // 14. 初始化实时感元素 (Phase 6)
            initDetailRealtime(product);

            // 15. 初始化购买通知 (Phase 6)
            initPurchaseToasts();

        }).catch(function(err) {
            console.error('renderProductDetail error:', err);
            if (overlay) overlay.style.display = 'none';
        });
    }

    /* ========================================================================
       实时感元素 (Phase 6)
       ======================================================================== */

    function initDetailRealtime(product) {
        var container = document.getElementById('detailRealtime');
        if (!container) return;

        var baseViewers = Math.floor(Math.random() * 10) + 5;
        var stock = product.stock || 100;

        container.innerHTML =
            '<span class="detail-realtime-item">🔥 <strong id="detailViewerCount">' + baseViewers + '</strong> 人正在浏览</span>' +
            (stock < 100
                ? '<span class="detail-realtime-item detail-realtime-stock">📦 库存紧张，仅剩 <strong id="detailStockCount">' + stock + '</strong> 件</span>'
                : '<span class="detail-realtime-item">📦 库存 <strong id="detailStockCount">' + stock + '</strong> 件</span>');

        // 浏览人数波动
        var viewerEl = document.getElementById('detailViewerCount');
        if (viewerEl) {
            setInterval(function() {
                var current = parseInt(viewerEl.textContent) || baseViewers;
                var delta = Math.floor(Math.random() * 7) - 3; // -3 ~ +3
                var next = Math.max(1, Math.min(30, current + delta));
                viewerEl.textContent = next;
            }, 4000 + Math.floor(Math.random() * 3000));
        }

        // 库存缓慢递减
        var stockEl = document.getElementById('detailStockCount');
        if (stockEl && stock < 300) {
            var stockInterval = setInterval(function() {
                var currentStock = parseInt(stockEl.textContent) || stock;
                if (currentStock > 1 && Math.random() < 0.4) {
                    currentStock -= 1;
                    stockEl.textContent = currentStock;
                    if (currentStock < 20) {
                        stockEl.parentElement.className = 'detail-realtime-item detail-realtime-stock';
                    }
                }
            }, 25000 + Math.floor(Math.random() * 15000));
        }
    }

    /**
     * 购买通知 Toast 系统
     */
    function initPurchaseToasts() {
        // 避免重复初始化
        if (window._purchaseToastsInited) return;
        window._purchaseToastsInited = true;

        var container = document.getElementById('purchaseToastContainer');
        if (!container) return;

        var names = ['王先生', '李女士', '张先生', '陈女士', '刘先生', '黄女士', '林先生', '吴女士', '周先生', '赵女士', '孙先生', '郑女士'];
        var locations = ['广州', '深圳', '上海', '北京', '杭州', '成都', '武汉', '南京', '重庆', '东莞', '佛山', '珠海'];

        function showRandomPurchase() {
            if (!window.POMELO_DB || !window.POMELO_DB.list) return;
            var products = window.POMELO_DB.list;
            var product = products[Math.floor(Math.random() * products.length)];
            var name = names[Math.floor(Math.random() * names.length)];
            var location = locations[Math.floor(Math.random() * locations.length)];
            var timeAgo = Math.floor(Math.random() * 30) + 1;

            var toast = document.createElement('div');
            toast.className = 'purchase-toast';
            toast.innerHTML = '<span class="toast-name">' + name + '</span>（' + location + '）' +
                timeAgo + '分钟前购买了 <span class="toast-product">' + product.shortName + '</span>';

            container.appendChild(toast);

            // 5秒后移除
            setTimeout(function() {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 5000);

            // 最多保留 3 条
            var allToasts = container.querySelectorAll('.purchase-toast');
            if (allToasts.length > 3) {
                allToasts[0].remove();
            }
        }

        // 首次延迟 10-20 秒出现
        setTimeout(function() {
            showRandomPurchase();
            // 之后每 30-90 秒
            setInterval(function() {
                showRandomPurchase();
            }, 30000 + Math.floor(Math.random() * 60000));
        }, 10000 + Math.floor(Math.random() * 10000));
    }

    /* ========================================================================
       运费免邮倒计时 (Phase 6)
       ======================================================================== */

    function initFreeShippingTimer() {
        var cartSummary = document.querySelector('.cart-summary');
        if (!cartSummary) return;
        // 检查是否已经有倒计时
        if (document.getElementById('freeShippingTimer')) return;

        var timerHTML = '<div id="freeShippingTimer" style="text-align:center;margin-top:8px;">' +
            '<span class="free-shipping-timer">⏱ 限时免运费活动进行中，满¥99即享免运费</span>' +
            '</div>';
        var totalRow = cartSummary.querySelector('.cart-summary-total');
        if (totalRow) {
            totalRow.insertAdjacentHTML('afterend', timerHTML);
        }
    }

    // 在购物车页面初始化免运费倒计时
    setTimeout(function() {
        initFreeShippingTimer();
    }, 100);

    // ==============================================

    // 在商品详情页初始化（动态渲染）
    var productDetailLayout = document.querySelector('.product-detail-layout');
    if (productDetailLayout) {
        var pidFromUrl = new URLSearchParams(window.location.search).get('id') || 'pomelo-fresh-5';
        // 延迟初始化，确保 skeleton 已渲染
        setTimeout(function() {
            renderProductDetail(pidFromUrl);
        }, 50);
    }

    /* ========== 限时闪购倒计时 ========== */
    function startCountdown(endTimeStr) {
        var hhEl = document.getElementById('countdown-hh');
        var mmEl = document.getElementById('countdown-mm');
        var ssEl = document.getElementById('countdown-ss');
        if (!hhEl || !mmEl || !ssEl) return;

        var endTime = new Date(endTimeStr).getTime();

        function pad(n) { return n < 10 ? '0' + n : '' + n; }

        function update() {
            var now = Date.now();
            var remaining = Math.max(0, Math.floor((endTime - now) / 1000));
            if (remaining === 0) {
                hhEl.textContent = '00';
                mmEl.textContent = '00';
                ssEl.textContent = '00';
                return;
            }
            var hh = Math.floor(remaining / 3600);
            var mm = Math.floor((remaining % 3600) / 60);
            var ss = remaining % 60;
            hhEl.textContent = pad(hh);
            mmEl.textContent = pad(mm);
            ssEl.textContent = pad(ss);
        }

        update();
        setInterval(update, 1000);
    }

    // 启动首页倒计时（24小时后结束）
    if (document.getElementById('countdown-hh')) {
        var endTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
        startCountdown(endTime.toISOString());
    }

    /* ========== 地址管理 ========== */
    function getAddresses() {
        try { return JSON.parse(localStorage.getItem('pomelo_addresses')) || []; } catch(e) { return []; }
    }

    function saveAddresses(addresses) {
        localStorage.setItem('pomelo_addresses', JSON.stringify(addresses));
    }

    var GUANGDONG_CITIES = {
        '广州市': ['天河区','越秀区','海珠区','荔湾区','白云区','番禺区','黄埔区','花都区','南沙区','增城区','从化区'],
        '深圳市': ['福田区','罗湖区','南山区','宝安区','龙岗区','龙华区','光明区','坪山区','盐田区'],
        '珠海市': ['香洲区','斗门区','金湾区'],
        '汕头市': ['龙湖区','金平区','濠江区','潮阳区','潮南区','澄海区','南澳县'],
        '佛山市': ['禅城区','南海区','顺德区','三水区','高明区'],
        '韶关市': ['浈江区','武江区','曲江区','乐昌市','南雄市','始兴县','仁化县','翁源县','新丰县','乳源瑶族自治县'],
        '湛江市': ['赤坎区','霞山区','坡头区','麻章区','廉江市','雷州市','吴川市','遂溪县','徐闻县'],
        '肇庆市': ['端州区','鼎湖区','高要区','四会市','广宁县','怀集县','封开县','德庆县'],
        '江门市': ['蓬江区','江海区','新会区','台山市','开平市','鹤山市','恩平市'],
        '茂名市': ['茂南区','电白区','高州市','化州市','信宜市'],
        '惠州市': ['惠城区','惠阳区','博罗县','惠东县','龙门县'],
        '梅州市': ['梅江区','梅县区','兴宁市','大埔县','丰顺县','五华县','平远县','蕉岭县'],
        '汕尾市': ['城区','陆丰市','海丰县','陆河县'],
        '河源市': ['源城区','紫金县','龙川县','连平县','和平县','东源县'],
        '阳江市': ['江城区','阳东区','阳春市','阳西县'],
        '清远市': ['清城区','清新区','英德市','连州市','佛冈县','阳山县','连山壮族瑶族自治县','连南瑶族自治县'],
        '东莞市': ['莞城街道','南城街道','东城街道','万江街道'],
        '中山市': ['石岐街道','东区街道','西区街道','南区街道'],
        '潮州市': ['湘桥区','潮安区','饶平县'],
        '揭阳市': ['榕城区','揭东区','普宁市','揭西县','惠来县'],
        '云浮市': ['云城区','云安区','罗定市','新兴县','郁南县']
    };

    // 注入地址区域到结算确认弹窗
    function injectAddressSection() {
        var modalBody = document.getElementById('checkoutModalBody');
        if (!modalBody) return;
        var existing = document.getElementById('addressSection');
        if (existing) return;

        var addresses = getAddresses();
        var addrSection = document.createElement('div');
        addrSection.id = 'addressSection';
        addrSection.style.cssText = 'margin-bottom:20px;';

        var html = '<h4 style="font-size:15px;font-weight:600;color:#4a3020;margin-bottom:12px;">📦 收货地址</h4>';

        if (addresses.length === 0) {
            html += '<div id="savedAddresses" style="margin-bottom:12px;"></div>';
            html += '<div class="address-form" id="addressForm">' +
                '<div class="form-group"><label><span class="required">*</span> 收货人</label><input type="text" id="addrName" placeholder="请输入收货人姓名"></div>' +
                '<div class="form-group"><label><span class="required">*</span> 手机号</label><input type="text" id="addrPhone" placeholder="请输入手机号"></div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label><span class="required">*</span> 城市</label><select id="addrCity"><option value="">请选择城市</option></select></div>' +
                    '<div class="form-group"><label><span class="required">*</span> 区/县</label><select id="addrDistrict"><option value="">请选择区/县</option></select></div>' +
                '</div>' +
                '<div class="form-group"><label><span class="required">*</span> 详细地址</label><input type="text" id="addrDetail" placeholder="街道、门牌号等"></div>' +
                '<label style="font-size:13px;color:#8b7355;display:flex;align-items:center;gap:6px;cursor:pointer;margin-top:4px;">' +
                    '<input type="checkbox" id="addrSaveDefault" checked> 保存为常用地址</label>' +
            '</div>';
        } else {
            html += '<div id="savedAddresses" style="margin-bottom:12px;">';
            addresses.forEach(function(addr, idx) {
                html += '<div class="address-card' + (idx === 0 ? ' selected' : '') + '" data-addr-idx="' + idx + '">' +
                    '<div class="address-card-name">' + escapeHtml(addr.name) + ' <span class="address-card-badge"' + (idx === 0 ? '' : ' style="display:none;"') + '>默认</span></div>' +
                    '<div class="address-card-phone">' + escapeHtml(addr.phone) + '</div>' +
                    '<div class="address-card-detail">' + escapeHtml(addr.city + ' ' + addr.district + ' ' + addr.detail) + '</div>' +
                '</div>';
            });
            html += '</div>';
            html += '<button class="btn btn-outline-green" id="showNewAddrForm" style="font-size:13px;">+ 使用新地址</button>';
            html += '<div class="address-form" id="addressForm" style="display:none;margin-top:16px;">' +
                '<div class="form-group"><label><span class="required">*</span> 收货人</label><input type="text" id="addrName" placeholder="请输入收货人姓名"></div>' +
                '<div class="form-group"><label><span class="required">*</span> 手机号</label><input type="text" id="addrPhone" placeholder="请输入手机号"></div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label><span class="required">*</span> 城市</label><select id="addrCity"><option value="">请选择城市</option></select></div>' +
                    '<div class="form-group"><label><span class="required">*</span> 区/县</label><select id="addrDistrict"><option value="">请选择区/县</option></select></div>' +
                '</div>' +
                '<div class="form-group"><label><span class="required">*</span> 详细地址</label><input type="text" id="addrDetail" placeholder="街道、门牌号等"></div>' +
                '<label style="font-size:13px;color:#8b7355;display:flex;align-items:center;gap:6px;cursor:pointer;margin-top:4px;">' +
                    '<input type="checkbox" id="addrSaveDefault" checked> 保存为常用地址</label>' +
            '</div>';
        }

        addrSection.innerHTML = html;
        modalBody.insertBefore(addrSection, modalBody.firstChild);

        // 城市选择器
        var citySelect = document.getElementById('addrCity');
        var districtSelect = document.getElementById('addrDistrict');
        if (citySelect) {
            Object.keys(GUANGDONG_CITIES).forEach(function(city) {
                var opt = document.createElement('option');
                opt.value = city;
                opt.textContent = city;
                citySelect.appendChild(opt);
            });
            citySelect.addEventListener('change', function() {
                var city = this.value;
                districtSelect.innerHTML = '<option value="">请选择区/县</option>';
                if (city && GUANGDONG_CITIES[city]) {
                    GUANGDONG_CITIES[city].forEach(function(dist) {
                        var opt = document.createElement('option');
                        opt.value = dist;
                        opt.textContent = dist;
                        districtSelect.appendChild(opt);
                    });
                }
            });
        }

        // 选择已保存地址
        addrSection.querySelectorAll('.address-card').forEach(function(card) {
            card.addEventListener('click', function() {
                addrSection.querySelectorAll('.address-card').forEach(function(c) {
                    c.classList.remove('selected');
                    var badge = c.querySelector('.address-card-badge');
                    if (badge) badge.style.display = 'none';
                });
                this.classList.add('selected');
                var badge = this.querySelector('.address-card-badge');
                if (badge) badge.style.display = '';
            });
        });

        // 显示新地址表单
        var showFormBtn = document.getElementById('showNewAddrForm');
        if (showFormBtn) {
            showFormBtn.addEventListener('click', function() {
                document.getElementById('addressForm').style.display = '';
                this.style.display = 'none';
                addrSection.querySelectorAll('.address-card').forEach(function(c) { c.classList.remove('selected'); });
            });
        }
    }

    // 获取选中的地址信息
    function getSelectedAddress() {
        var addrSection = document.getElementById('addressSection');
        if (!addrSection) return null;

        var selectedCard = addrSection.querySelector('.address-card.selected');
        if (selectedCard) {
            var idx = parseInt(selectedCard.getAttribute('data-addr-idx'));
            var addresses = getAddresses();
            return addresses[idx] || null;
        }

        // 从表单获取
        var nameEl = document.getElementById('addrName');
        var phoneEl = document.getElementById('addrPhone');
        var cityEl = document.getElementById('addrCity');
        var districtEl = document.getElementById('addrDistrict');
        var detailEl = document.getElementById('addrDetail');
        var saveCheck = document.getElementById('addrSaveDefault');

        if (!nameEl || !phoneEl || !cityEl || !districtEl || !detailEl) return null;
        var addr = {
            name: nameEl.value.trim(),
            phone: phoneEl.value.trim(),
            city: cityEl.value,
            district: districtEl.value,
            detail: detailEl.value.trim()
        };
        if (!addr.name || !addr.phone || !addr.city || !addr.district || !addr.detail) return null;

        if (saveCheck && saveCheck.checked) {
            var addresses = getAddresses();
            addresses.push(addr);
            saveAddresses(addresses);
        }
        return addr;
    }

    // 监听结算弹窗打开，注入地址区域
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            setTimeout(injectAddressSection, 50);
        });
    }

    /* ========== 订单系统 ========== */
    function getOrders() {
        try { return JSON.parse(localStorage.getItem('pomelo_orders')) || []; } catch(e) { return []; }
    }

    function saveOrder(order) {
        var orders = getOrders();
        orders.unshift(order);
        localStorage.setItem('pomelo_orders', JSON.stringify(orders));
    }

    function renderOrders() {
        var ordersList = document.getElementById('ordersList');
        var emptyEl = document.getElementById('ordersEmpty');
        if (!ordersList) return;

        var orders = getOrders();
        if (orders.length === 0) {
            if (emptyEl) emptyEl.style.display = 'block';
            ordersList.style.display = 'none';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        ordersList.style.display = 'block';

        var html = '';
        orders.forEach(function(order) {
            var statusMap = {
                'pending': '待发货',
                'shipped': '已发货',
                'delivered': '已签收',
                'cancelled': '已取消'
            };
            var statusText = statusMap[order.status] || '待发货';

            html += '<div class="order-card" style="background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.06);padding:24px;margin-bottom:20px;">' +
                '<div class="order-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0e8d8;flex-wrap:wrap;gap:8px;">' +
                    '<div><span style="font-size:14px;color:#999;">订单号：</span><span style="font-size:14px;font-weight:600;color:#4a3020;">' + escapeHtml(order.orderNo) + '</span></div>' +
                    '<div><span style="font-size:13px;color:#999;">' + escapeHtml(order.date) + '</span></div>' +
                    '<div><span style="color:#D4A843;font-weight:600;font-size:14px;">' + escapeHtml(statusText) + '</span></div>' +
                '</div>';

            order.items.forEach(function(item) {
                html += '<div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid #f8f6f0;">' +
                    '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.name) + '" style="width:64px;height:64px;border-radius:8px;object-fit:cover;background:#f5f5f5;">' +
                    '<div style="flex:1;">' +
                        '<div style="font-weight:600;color:#4a3020;margin-bottom:4px;">' + escapeHtml(item.name) + '</div>' +
                        '<div style="font-size:13px;color:#999;">' + escapeHtml(item.spec) + ' × ' + item.quantity + '</div>' +
                    '</div>' +
                    '<div style="font-weight:600;color:#D4380D;">¥' + item.price.toFixed(2) + '</div>' +
                '</div>';
            });

            var totalQty = order.items.reduce(function(s, i) { return s + i.quantity; }, 0);
            html += '<div style="display:flex;justify-content:flex-end;gap:16px;padding-top:16px;font-size:14px;flex-wrap:wrap;align-items:center;">' +
                '<span style="color:#999;">共 ' + totalQty + ' 件商品</span>' +
                (order.couponDiscount && order.couponDiscount > 0 ? '<span style="color:#D94A3A;">🎫 ' + escapeHtml(order.couponName || '优惠券') + ' -¥' + order.couponDiscount.toFixed(2) + '</span>' : '') +
                '<span style="color:#999;">合计：</span>' +
                '<span style="font-size:18px;font-weight:700;color:#D4380D;">¥' + order.total.toFixed(2) + '</span>' +
            '</div>';

            if (order.address) {
                html += '<div style="margin-top:12px;padding:10px 14px;background:#faf8f4;border-radius:8px;font-size:13px;color:#8b7355;">' +
                    '📦 ' + escapeHtml(order.address.name) + ' ' + escapeHtml(order.address.phone) + '　' +
                    escapeHtml(order.address.city + ' ' + order.address.district + ' ' + order.address.detail) +
                '</div>';
            }

            html += '</div>';
        });

        ordersList.innerHTML = html;
    }

    // 渲染订单页面
    renderOrders();

    /* ========== 骨架屏移除 ========== */
    function removeSkeletons() {
        var skeletons = document.querySelectorAll('.skeleton, .skeleton-card, .skeleton-text, .skeleton-image, .skeleton-title');
        skeletons.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s';
            setTimeout(function() {
                if (el.parentElement) el.parentElement.removeChild(el);
            }, 300);
        });
    }

    // 页面加载完成后移除骨架屏
    setTimeout(removeSkeletons, 600);

    /* ========== 初始化：设置当前高亮导航 ========== */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });

    /* ============================================================
       #1 悬浮客服侧边栏
       ============================================================ */
    (function injectServiceSidebar() {
        var sidebar = document.createElement('div');
        sidebar.className = 'service-sidebar';
        sidebar.innerHTML =
            '<a class="service-btn" id="svcKefu" title="在线客服">' +
                '<img src="images/icons/icon-service-avatar.webp" alt="客服" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'💬\';this.parentElement.style.fontSize=\'22px\';">' +
                '<span class="service-tip">在线客服</span>' +
            '</a>' +
            '<a class="service-btn" href="tel:400-888-6666" title="电话咨询">' +
                '<img src="images/icons/icon-phone2.webp" alt="电话" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'📞\';this.parentElement.style.fontSize=\'22px\';">' +
                '<span class="service-tip">400-888-6666</span>' +
            '</a>' +
            '<a class="service-btn" id="svcWechat" title="微信客服">' +
                '<img src="images/icons/icon-wechat.webp" alt="微信" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'💚\';this.parentElement.style.fontSize=\'22px\';">' +
                '<span class="service-tip">添加微信客服</span>' +
            '</a>' +
            '<a class="service-btn" href="contact.html" title="在线留言">' +
                '<img src="images/icons/icon-contact.webp" alt="留言" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'✉\';this.parentElement.style.fontSize=\'22px\';">' +
                '<span class="service-tip">在线留言</span>' +
            '</a>' +
            '<button class="service-btn service-btn-backtop" id="svcBackTop" title="返回顶部">' +
                '<span style="font-size:20px;color:#fff;">↑</span>' +
            '</button>';
        document.body.appendChild(sidebar);

        // 微信客服点击 → 复制微信号
        var wechatBtn = document.getElementById('svcWechat');
        if (wechatBtn) {
            wechatBtn.addEventListener('click', function(e) {
                e.preventDefault();
                navigator.clipboard.writeText('meizhoujinzhou').then(function() {
                    showToast('微信号已复制：meizhoujinzhou，请在微信中搜索添加', 'success');
                }).catch(function() {
                    showToast('微信号：meizhoujinzhou，请手动搜索添加', 'info');
                });
            });
        }

        // 在线客服 → 跳转联系页
        var kefuBtn = document.getElementById('svcKefu');
        if (kefuBtn) {
            kefuBtn.addEventListener('click', function() {
                window.location.href = 'contact.html';
            });
        }

        // 返回顶部按钮
        var backTopSvc = document.getElementById('svcBackTop');
        if (backTopSvc) {
            backTopSvc.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    })();

    /* ============================================================
       #2 免运费进度条 (购物车页)
       ============================================================ */
    function renderShippingProgress(subtotal) {
        var progressContainer = document.getElementById('shippingProgress');
        if (!progressContainer) return;
        var threshold = 99;
        var remaining = Math.max(0, threshold - subtotal);
        var pct = Math.min(100, Math.round(subtotal / threshold * 100));
        var reached = remaining === 0;

        if (reached) {
            progressContainer.innerHTML =
                '<div class="shipping-progress">' +
                    '<div class="shipping-progress-top">' +
                        '<img src="images/icons/badge-free-shipping.webp" alt="" onerror="this.style.display=\'none\'">' +
                        '<span class="shipping-progress-text"><span class="reached">🎉 已满足免运费条件！</span></span>' +
                    '</div>' +
                    '<div class="shipping-progress-bar">' +
                        '<div class="shipping-progress-fill reached" style="width:100%;"></div>' +
                    '</div>' +
                    '<div class="shipping-progress-labels">' +
                        '<span>¥0</span><span>¥99</span>' +
                    '</div>' +
                '</div>';
        } else {
            progressContainer.innerHTML =
                '<div class="shipping-progress">' +
                    '<div class="shipping-progress-top">' +
                        '<img src="images/icons/icon-delivery.webp" alt="" onerror="this.style.display=\'none\'">' +
                        '<span class="shipping-progress-text">再买 <strong>¥' + remaining.toFixed(2) + '</strong> 即可免运费（满¥99包邮）</span>' +
                    '</div>' +
                    '<div class="shipping-progress-bar">' +
                        '<div class="shipping-progress-fill" style="width:' + pct + '%;"></div>' +
                    '</div>' +
                    '<div class="shipping-progress-labels">' +
                        '<span>¥' + subtotal.toFixed(2) + '</span><span>¥99.00</span>' +
                    '</div>' +
                '</div>';
        }
    }

    // 在购物车页首次渲染时注入进度条并更新
    var originalRenderCartPage = renderCartPage;
    renderCartPage = function() {
        // 注入进度条容器
        var cartSummary = document.querySelector('.cart-summary');
        var existingProgress = document.getElementById('shippingProgress');
        if (cartSummary && !existingProgress) {
            var progressDiv = document.createElement('div');
            progressDiv.id = 'shippingProgress';
            cartSummary.parentElement.insertBefore(progressDiv, cartSummary);
        }
        // 调用原渲染函数
        originalRenderCartPage();
        // 更新进度条
        var cart = getCart();
        var subtotal = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
        var progressEl = document.getElementById('shippingProgress');
        if (progressEl) progressEl.style.display = cart.length > 0 ? '' : 'none';
        renderShippingProgress(subtotal);
        // 更新优惠券选择器 & 应用折扣
        refreshCartCoupons(subtotal);
    };

    /* 优惠券定义 */
    var COUPON_DEFS = {
        new10:  { discount: 10,  min: 0,   name: '新人无门槛券 ¥10' },
        full99: { discount: 15,  min: 99,  name: '满减券 ¥15（满¥99）' },
        full199:{ discount: 35,  min: 199, name: '大额满减券 ¥35（满¥199）' }
    };

    function getClaimedCoupons() {
        try { return JSON.parse(localStorage.getItem('pomelo_coupons')) || []; } catch(e) { return []; }
    }

    function getAppliedCouponCode() {
        var sel = document.getElementById('cartCouponSelect');
        return sel ? sel.value : '';
    }

    function getAvailableCoupons(subtotal) {
        var claimed = getClaimedCoupons();
        return claimed.filter(function(code) {
            var def = COUPON_DEFS[code];
            return def && subtotal >= def.min;
        });
    }

    function getCouponDiscount(code, subtotal) {
        if (!code) return 0;
        var def = COUPON_DEFS[code];
        if (!def) return 0;
        if (subtotal < def.min) return 0;
        return def.discount;
    }

    function refreshCartCoupons(subtotal) {
        var sel = document.getElementById('cartCouponSelect');
        if (!sel) return;

        var claimed = getClaimedCoupons();
        var prevValue = sel.value; // 保留之前选择的券

        // 重建选项
        sel.innerHTML = '<option value="" data-discount="0" data-min="0">不使用优惠券</option>';
        var hasAvailable = false;
        var prevStillValid = false;

        claimed.forEach(function(code) {
            var def = COUPON_DEFS[code];
            if (!def) return;
            var usable = subtotal >= def.min;
            var label = def.name + (usable ? '' : '（差¥' + (def.min - subtotal).toFixed(2) + '）');
            var opt = document.createElement('option');
            opt.value = code;
            opt.textContent = label;
            opt.disabled = !usable;
            sel.appendChild(opt);
            if (usable) hasAvailable = true;
            if (code === prevValue && usable) prevStillValid = true;
        });

        // 恢复之前的选择，或自动选最优
        if (prevStillValid && prevValue) {
            sel.value = prevValue;
        } else {
            // 自动选择最优可用券（最大折扣）
            var bestCode = '';
            var bestDiscount = 0;
            claimed.forEach(function(code) {
                var def = COUPON_DEFS[code];
                if (!def) return;
                if (subtotal >= def.min && def.discount > bestDiscount) {
                    bestDiscount = def.discount;
                    bestCode = code;
                }
            });
            sel.value = bestCode;
        }

        // 未领券时显示引导提示
        var hint = document.getElementById('cartCouponHint');
        if (hint) {
            hint.style.display = claimed.length === 0 ? '' : 'none';
        }

        // 更新折扣显示 & 合计
        var discount = getCouponDiscount(sel.value, subtotal);
        var shipping = subtotal >= 99 ? 0 : 15;
        var total = subtotal + shipping - discount;
        if (total < 0) total = 0;

        var discountRow = document.querySelector('.cart-coupon-discount-row');
        var discountVal = document.querySelector('.cart-coupon-discount-val');
        if (discountRow && discountVal) {
            if (discount > 0) {
                discountRow.style.display = 'flex';
                discountVal.textContent = '-¥' + discount.toFixed(2);
            } else {
                discountRow.style.display = 'none';
            }
        }

        // 更新合计金额
        var totalVal = document.querySelector('.cart-total-val');
        if (totalVal) totalVal.textContent = '¥' + total.toFixed(2);
    }

    // 监听优惠券切换
    document.addEventListener('change', function(e) {
        if (e.target && e.target.id === 'cartCouponSelect') {
            var cart = getCart();
            var subtotal = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
            refreshCartCoupons(subtotal);
        }
    });

    // 供优惠券弹窗关闭时调用，刷新购物车优惠券选择器
    function refreshCartAfterCouponChange() {
        var sel = document.getElementById('cartCouponSelect');
        if (!sel) return; // 不在购物车页面，无需刷新
        var cart = getCart();
        var subtotal = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
        refreshCartCoupons(subtotal);
    }

    /* ============================================================
       #3 图片放大镜 (商品详情页)
       ============================================================ */
    function initMagnifier() {
        var mainImageContainer = document.querySelector('.main-image');
        if (!mainImageContainer) return;

        var mainImg = mainImageContainer.querySelector('img');
        if (!mainImg) return;

        // 创建放大镜镜片
        var lens = document.createElement('div');
        lens.className = 'magnifier-lens';
        mainImageContainer.appendChild(lens);

        // 创建放大结果
        var result = document.createElement('div');
        result.className = 'magnifier-result';
        mainImageContainer.appendChild(result);

        // 设置放大结果背景图（高清大图）
        function updateResultBg() {
            var src = mainImg.getAttribute('src');
            result.style.backgroundImage = 'url(' + src + ')';
            result.style.backgroundSize = (mainImg.naturalWidth * 2.5) + 'px ' + (mainImg.naturalHeight * 2.5) + 'px';
        }
        updateResultBg();
        mainImg.addEventListener('load', updateResultBg);

        function getCursorPos(e) {
            var rect = mainImg.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            return { x: x, y: y, w: rect.width, h: rect.height };
        }

        function moveMagnifier(e) {
            var pos = getCursorPos(e);
            var lensW = lens.offsetWidth;
            var lensH = lens.offsetHeight;

            var lx = pos.x - lensW / 2;
            var ly = pos.y - lensH / 2;

            lx = Math.max(0, Math.min(lx, pos.w - lensW));
            ly = Math.max(0, Math.min(ly, pos.h - lensH));

            lens.style.left = lx + 'px';
            lens.style.top = ly + 'px';
            lens.style.display = 'block';
            result.style.display = 'block';

            // 背景位置（2.5倍放大）
            var bgX = -(lx * 2.5) + result.offsetWidth / 2;
            var bgY = -(ly * 2.5) + result.offsetHeight / 2;
            result.style.backgroundPosition = bgX + 'px ' + bgY + 'px';
        }

        function hideMagnifier() {
            lens.style.display = 'none';
            result.style.display = 'none';
        }

        mainImageContainer.addEventListener('mousemove', moveMagnifier);
        mainImageContainer.addEventListener('mouseleave', hideMagnifier);

        // 移动端触摸支持
        mainImageContainer.addEventListener('touchmove', function(e) {
            e.preventDefault();
            moveMagnifier(e.touches[0]);
        }, { passive: false });
        mainImageContainer.addEventListener('touchend', hideMagnifier);
    }
    initMagnifier();

    /* ============================================================
       #4 加购飞入动画
       ============================================================ */
    function flyToCart(startEl) {
        var cartEl = document.querySelector('.nav-cart');
        if (!cartEl) return;

        var startRect = startEl.getBoundingClientRect();
        var cartRect = cartEl.getBoundingClientRect();

        var ball = document.createElement('div');
        ball.className = 'fly-ball';
        ball.style.left = (startRect.left + startRect.width / 2 - 12) + 'px';
        ball.style.top = (startRect.top + startRect.height / 2 - 12) + 'px';
        document.body.appendChild(ball);

        requestAnimationFrame(function() {
            ball.style.transition = 'all 0.6s cubic-bezier(0.17, 0.89, 0.42, 0.99)';
            ball.style.left = (cartRect.left + cartRect.width / 2 - 12) + 'px';
            ball.style.top = (cartRect.top + cartRect.height / 2 - 12) + 'px';
            ball.style.transform = 'scale(0.4)';
            ball.style.opacity = '0.6';
        });

        ball.addEventListener('transitionend', function() {
            if (ball.parentElement) ball.parentElement.removeChild(ball);
        });
        // 保底清除
        setTimeout(function() {
            if (ball.parentElement) ball.parentElement.removeChild(ball);
        }, 1000);
    }

    // 重写 addToCart 触发飞入动画
    var originalAddToCart = addToCart;
    addToCart = function(productData) {
        var result = originalAddToCart(productData);
        // 找到被点击的按钮
        var clickedBtn = document.querySelector('.btn-add-cart:hover') || document.querySelector('.btn-add-cart:active') || document.querySelector('.btn-add-cart:focus-visible');
        if (!clickedBtn) {
            // fallback: 找详情页或快速查看弹窗的可见按钮
            clickedBtn = document.querySelector('#qvAddCart') || document.querySelector('.detail-actions .btn-add-cart') || document.querySelector('.product-info .btn-add-cart');
        }
        if (clickedBtn) {
            flyToCart(clickedBtn);
        }
        return result;
    };

    // 快速查看弹窗中的加入购物车也支持飞入
    var qvAddCartBtn = document.getElementById('qvAddCart');
    if (qvAddCartBtn) {
        qvAddCartBtn.addEventListener('click', function() {
            setTimeout(function() {
                flyToCart(qvAddCartBtn);
            }, 50);
        });
    }

    /* ============================================================
       #6 优惠券弹窗
       ============================================================ */
    (function injectCouponModal() {
        var overlay = document.createElement('div');
        overlay.className = 'coupon-overlay';
        overlay.id = 'couponOverlay';
        overlay.innerHTML =
            '<div class="coupon-popup">' +
                '<div class="coupon-popup-header">' +
                    '<button class="coupon-close" id="couponClose">&times;</button>' +
                    '<h3>🎁 新人专享优惠</h3>' +
                    '<p>第一次来？领张券再逛吧！</p>' +
                '</div>' +
                '<div class="coupon-popup-body">' +
                    '<div class="coupon-card" data-coupon="new10">' +
                        '<div class="coupon-card-left type-green">' +
                            '<div class="coupon-amount"><small>¥</small>10</div>' +
                            '<div class="coupon-condition">无门槛</div>' +
                        '</div>' +
                        '<div class="coupon-card-right">' +
                            '<div class="coupon-name">新人无门槛券</div>' +
                            '<div class="coupon-desc">全场通用，新用户专享</div>' +
                            '<div class="coupon-expire">有效期：领券后7天内</div>' +
                        '</div>' +
                        '<span class="coupon-claimed-mark">✓ 已领取</span>' +
                    '</div>' +
                    '<div class="coupon-card" data-coupon="full99">' +
                        '<div class="coupon-card-left type-gold">' +
                            '<div class="coupon-amount"><small>¥</small>15</div>' +
                            '<div class="coupon-condition">满¥99</div>' +
                        '</div>' +
                        '<div class="coupon-card-right">' +
                            '<div class="coupon-name">满减券</div>' +
                            '<div class="coupon-desc">满¥99可用，囤货必备</div>' +
                            '<div class="coupon-expire">有效期：领券后30天内</div>' +
                        '</div>' +
                        '<span class="coupon-claimed-mark">✓ 已领取</span>' +
                    '</div>' +
                    '<div class="coupon-card" data-coupon="full199">' +
                        '<div class="coupon-card-left type-red">' +
                            '<div class="coupon-amount"><small>¥</small>35</div>' +
                            '<div class="coupon-condition">满¥199</div>' +
                        '</div>' +
                        '<div class="coupon-card-right">' +
                            '<div class="coupon-name">大额满减券</div>' +
                            '<div class="coupon-desc">满¥199可用，送礼首选</div>' +
                            '<div class="coupon-expire">有效期：领券后30天内</div>' +
                        '</div>' +
                        '<span class="coupon-claimed-mark">✓ 已领取</span>' +
                    '</div>' +
                '</div>' +
                '<div class="coupon-popup-footer">' +
                    '<button class="btn btn-primary" id="couponClaimAll">一键领取全部优惠券</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        function getClaimedCoupons() {
            try { return JSON.parse(localStorage.getItem('pomelo_coupons')) || []; } catch(e) { return []; }
        }

        function saveClaimedCoupon(code) {
            var claimed = getClaimedCoupons();
            if (claimed.indexOf(code) === -1) {
                claimed.push(code);
                localStorage.setItem('pomelo_coupons', JSON.stringify(claimed));
            }
        }

        function hasSeenCouponPopup() {
            try { return sessionStorage.getItem('pomelo_coupon_seen') === '1'; } catch(e) { return false; }
        }

        function markCouponSeen() {
            try { sessionStorage.setItem('pomelo_coupon_seen', '1'); } catch(e) {}
        }

        function refreshCouponCards() {
            var claimed = getClaimedCoupons();
            overlay.querySelectorAll('.coupon-card').forEach(function(card) {
                var code = card.getAttribute('data-coupon');
                if (claimed.indexOf(code) !== -1) {
                    card.classList.add('claimed');
                }
            });
        }

        function claimCoupon(code) {
            var claimed = getClaimedCoupons();
            if (claimed.indexOf(code) !== -1) return;
            saveClaimedCoupon(code);
            refreshCouponCards();
            var names = { new10: '新人无门槛券 ¥10', full99: '满减券 ¥15', full199: '大额满减券 ¥35' };
            showToast('已领取：' + (names[code] || code), 'success');
        }

        // 关闭按钮
        document.getElementById('couponClose').addEventListener('click', function() {
            overlay.classList.remove('active');
            markCouponSeen();
            refreshCartAfterCouponChange();
        });

        // 点击遮罩关闭
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                markCouponSeen();
                refreshCartAfterCouponChange();
            }
        });

        // 点击单个券领取
        overlay.querySelectorAll('.coupon-card').forEach(function(card) {
            card.addEventListener('click', function(e) {
                e.stopPropagation();
                var code = card.getAttribute('data-coupon');
                claimCoupon(code);
            });
        });

        // 一键领取
        document.getElementById('couponClaimAll').addEventListener('click', function() {
            var codes = ['new10', 'full99', 'full199'];
            codes.forEach(function(c) { claimCoupon(c); });
            var names = { new10: '¥10', full99: '¥15', full199: '¥35' };
            showToast('已领取全部3张优惠券（¥10 + ¥15 + ¥35），结算时自动抵扣', 'success');
            setTimeout(function() {
                overlay.classList.remove('active');
                markCouponSeen();
                refreshCartAfterCouponChange();
            }, 1200);
        });

        // 显示弹窗（仅首页首次，5秒后自动弹出）
        var isHomePage = currentPage === 'index.html' || currentPage === '';
        if (isHomePage && !hasSeenCouponPopup()) {
            setTimeout(function() {
                refreshCouponCards();
                overlay.classList.add('active');
            }, 5000);
        }

        // 同时暴露到全局，让商城页也可触发
        window.showCouponPopup = function() {
            refreshCouponCards();
            overlay.classList.add('active');
        };
    })();

    /* ============================================================
       #7 浏览历史记录
       ============================================================ */
    (function initBrowseHistory() {
        function getHistory() {
            try { return JSON.parse(localStorage.getItem('pomelo_history')) || []; } catch(e) { return []; }
        }

        function saveHistory(hist) {
            localStorage.setItem('pomelo_history', JSON.stringify(hist.slice(0, 20)));
        }

        // 记录当前商品详情页
        function recordProductView(product) {
            // 如果传入了产品对象（来自动态渲染），直接使用
            if (product && product.id) {
                var hist = getHistory();
                hist = hist.filter(function(h) { return h.id !== product.id; });
                hist.unshift({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || (product.images && product.images[0]),
                    time: Date.now()
                });
                saveHistory(hist);
                return;
            }

            // 回退：从 DOM 获取
            var isDetailPage = document.querySelector('.product-detail-layout');
            if (!isDetailPage) return;

            var nameEl = document.querySelector('.product-info h1');
            var priceEl = document.querySelector('.product-detail-price .current');
            var imgEl = document.querySelector('.main-image img');

            if (!nameEl) return;

            var product = {
                id: new URLSearchParams(window.location.search).get('id') || 'pomelo-fresh-5',
                name: nameEl.textContent.trim(),
                price: priceEl ? parseFloat(priceEl.textContent.replace('¥','').trim()) : 68,
                image: imgEl ? imgEl.getAttribute('src') : '',
                time: Date.now()
            };

            var hist = getHistory();
            // 去重（同名商品替换旧的）
            hist = hist.filter(function(h) { return h.id !== product.id; });
            hist.unshift(product);
            saveHistory(hist);
        }

        // 渲染浏览历史组件
        function renderHistorySection() {
            var container = document.getElementById('browseHistory');
            if (!container) return;
            var hist = getHistory();
            if (hist.length === 0) {
                container.innerHTML = '<div class="history-empty">还没有浏览记录，快去逛逛吧~</div>';
                return;
            }
            var html = '<div class="history-scroll">';
            hist.forEach(function(p) {
                var targetUrl = p.id ? 'product-detail.html?id=' + encodeURIComponent(p.id) : 'product-detail.html';
                html += '<a href="' + targetUrl + '" class="history-card">' +
                    '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
                    '<div class="history-card-body">' +
                        '<h4>' + p.name + '</h4>' +
                        '<div class="price">¥' + p.price.toFixed(2) + '</div>' +
                    '</div>' +
                '</a>';
            });
            html += '</div>';
            container.innerHTML = html;
        }

        recordProductView();

        // 在页面加载后查找历史容器并渲染
        setTimeout(function() {
            var histContainer = document.getElementById('browseHistory');
            if (histContainer) {
                renderHistorySection();
            }
        }, 300);
    })();

    /* ============================================================
       #8 社交分享按钮
       ============================================================ */
    (function injectShareButtons() {
        var containers = document.querySelectorAll('.share-bar-placeholder');
        if (containers.length === 0) return;

        containers.forEach(function(container) {
            var title = container.getAttribute('data-title') || document.title;
            var url = container.getAttribute('data-url') || window.location.href;

            container.innerHTML = '<span>分享到：</span>' +
                '<button class="share-btn share-wx" title="微信分享"><img src="images/icons/icon-share-wechat.webp" alt="微信" onerror="this.style.display=\'none\';this.parentElement.style.fontSize=\'18px\';this.parentElement.innerHTML=\'💚\'"></button>' +
                '<button class="share-btn share-link" title="复制链接"><img src="images/icons/icon-share-link.webp" alt="复制链接" onerror="this.style.display=\'none\';this.parentElement.style.fontSize=\'18px\';this.parentElement.innerHTML=\'🔗\'"></button>' +
                '<button class="share-btn share-poster" title="生成海报"><img src="images/icons/icon-share-poster.webp" alt="海报" onerror="this.style.display=\'none\';this.parentElement.style.fontSize=\'18px\';this.parentElement.innerHTML=\'🖼\'"></button>';

            container.querySelector('.share-wx').addEventListener('click', function() {
                navigator.clipboard.writeText(title + '\n' + url).then(function() {
                    showToast('链接已复制，可在微信中粘贴分享给好友', 'success');
                }).catch(function() {
                    showToast('分享标题：' + title + '，请截图分享', 'info');
                });
            });

            container.querySelector('.share-link').addEventListener('click', function() {
                navigator.clipboard.writeText(url).then(function() {
                    showToast('链接已复制到剪贴板', 'success');
                }).catch(function() {
                    showToast('链接：' + url, 'info');
                });
            });

            container.querySelector('.share-poster').addEventListener('click', function() {
                showToast('长按保存页面截图即可生成分享海报（演示功能）', 'info');
            });
        });
    })();

    /* ========== 修复产品链接：确保所有 product-detail.html 链接带 ?id= 参数 ========== */
    setTimeout(function() {
        document.querySelectorAll('a[href="product-detail.html"]').forEach(function(a) {
            var card = a.closest('.product-card');
            if (!card) return;
            var pid = card.getAttribute('data-product-id');
            if (!pid && typeof resolveProductId === 'function') {
                pid = resolveProductId(card);
                if (pid) card.setAttribute('data-product-id', pid);
            }
            if (pid) {
                a.setAttribute('href', 'product-detail.html?id=' + encodeURIComponent(pid));
                // 同时修复同一卡片内的其他链接
                var allLinks = card.querySelectorAll('a[href="product-detail.html"]');
                allLinks.forEach(function(link) {
                    link.setAttribute('href', 'product-detail.html?id=' + encodeURIComponent(pid));
                });
            }
        });
    }, 100);

});
