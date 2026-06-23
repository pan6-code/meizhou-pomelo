/**
 * api.js — 梅州金柚 伪后端 API 层
 * 封装所有数据访问为异步函数，模拟真实服务器的网络延迟
 * 加载顺序: 第2层（在 product-data.js 之后、main.js 之前加载）
 */

(function() {
    'use strict';

    var DB = window.POMELO_DB;

    if (!DB) {
        console.error('[API] POMELO_DB 未加载，请确保 product-data.js 先于 api.js 加载');
        return;
    }

    /**
     * 模拟网络延迟
     * @param {number} min - 最小毫秒
     * @param {number} max - 最大毫秒
     * @returns {Promise} 在随机延迟后 resolve
     */
    function delay(min, max) {
        var ms = Math.floor(Math.random() * (max - min + 1)) + min;
        return new Promise(function(resolve) {
            setTimeout(resolve, ms);
        });
    }

    /**
     * 浅拷贝对象（ES5 兼容）
     */
    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /* ========================================================================
     * 公开 API
     * ======================================================================== */

    var API = {};

    /**
     * 获取产品列表（支持筛选、搜索、排序）
     * @param {Object} filters - 可选筛选参数
     * @param {string} filters.category - 按分类筛选
     * @param {string} filters.search - 按关键词搜索
     * @param {string} filters.sortBy - 排序方式: 'price-asc' | 'price-desc' | 'sales' | 'default'
     * @param {number} filters.limit - 限制返回数量
     * @param {Array<string>} filters.ids - 按指定ID列表筛选
     * @returns {Promise<Array>} 产品列表
     */
    API.getProducts = function(filters) {
        filters = filters || {};
        return delay(200, 600).then(function() {
            var results = clone(DB.list);

            // 按分类筛选
            if (filters.category) {
                results = results.filter(function(p) {
                    return p.category === filters.category;
                });
            }

            // 按 ID 列表筛选
            if (filters.ids && filters.ids.length) {
                var idMap = {};
                filters.ids.forEach(function(id) { idMap[id] = true; });
                results = results.filter(function(p) {
                    return idMap[p.id];
                });
                // 保持 ID 列表的顺序
                results.sort(function(a, b) {
                    return filters.ids.indexOf(a.id) - filters.ids.indexOf(b.id);
                });
            }

            // 关键词搜索
            if (filters.search) {
                var query = filters.search.toLowerCase();
                results = results.filter(function(p) {
                    return p.name.toLowerCase().indexOf(query) !== -1 ||
                           (p.keywords && p.keywords.toLowerCase().indexOf(query) !== -1) ||
                           (p.shortName && p.shortName.toLowerCase().indexOf(query) !== -1) ||
                           (p.description && p.description.toLowerCase().indexOf(query) !== -1);
                });
            }

            // 排序
            if (filters.sortBy) {
                switch (filters.sortBy) {
                    case 'price-asc':
                        results.sort(function(a, b) { return a.price - b.price; });
                        break;
                    case 'price-desc':
                        results.sort(function(a, b) { return b.price - a.price; });
                        break;
                    case 'sales':
                        results.sort(function(a, b) { return (b.salesCount || 0) - (a.salesCount || 0); });
                        break;
                    case 'rating':
                        results.sort(function(a, b) { return (b.rating || 0) - (a.rating || 0); });
                        break;
                    // 'default' keeps the original order from DB.list
                }
            }

            // 截取
            if (filters.limit && filters.limit > 0) {
                results = results.slice(0, filters.limit);
            }

            return results;
        });
    };

    /**
     * 根据 ID 获取单个产品详情
     * @param {string} id - 产品 ID
     * @returns {Promise<Object|null>} 产品完整数据，不存在时返回 null
     */
    API.getProductById = function(id) {
        return delay(200, 500).then(function() {
            var product = DB.byId[id];
            if (!product) return null;
            return clone(product);
        });
    };

    /**
     * 获取相关推荐产品
     * @param {string} id - 当前产品 ID
     * @param {number} count - 推荐数量（默认 4）
     * @returns {Promise<Array>} 推荐产品列表
     */
    API.getRelatedProducts = function(id, count) {
        count = count || 4;
        return delay(150, 400).then(function() {
            var product = DB.byId[id];
            var results = [];

            if (product && product.relatedIds && product.relatedIds.length) {
                // 优先使用产品定义的关联推荐
                product.relatedIds.forEach(function(rid) {
                    if (DB.byId[rid] && rid !== id) {
                        results.push(clone(DB.byId[rid]));
                    }
                });
            }

            // 如果不够，从同分类补充
            if (results.length < count && product) {
                DB.list.forEach(function(p) {
                    if (results.length >= count) return;
                    if (p.id !== id && p.category === product.category && results.indexOf(p) === -1) {
                        // 检查是否已在结果中
                        var alreadyIn = results.some(function(r) { return r.id === p.id; });
                        if (!alreadyIn) {
                            results.push(clone(p));
                        }
                    }
                });
            }

            // 仍然不够，从热门产品补充
            if (results.length < count) {
                var sorted = clone(DB.list).sort(function(a, b) {
                    return (b.salesCount || 0) - (a.salesCount || 0);
                });
                sorted.forEach(function(p) {
                    if (results.length >= count) return;
                    if (p.id !== id) {
                        var alreadyIn = results.some(function(r) { return r.id === p.id; });
                        if (!alreadyIn) {
                            results.push(clone(p));
                        }
                    }
                });
            }

            return results.slice(0, count);
        });
    };

    /**
     * 获取限时抢购商品（首页 flash sale）
     * @returns {Promise<Array>} 抢购商品列表（含特价）
     */
    API.getFlashSaleProducts = function() {
        return delay(200, 400).then(function() {
            // 返回首页限时抢购的 4 款产品，价格替换为 flash 价
            var flashDeals = [
                { id: 'pomelo-fresh-5', flashPrice: 58, endTime: Date.now() + 3600000 },
                { id: 'gift-box-1', flashPrice: 148, endTime: Date.now() + 3600000 },
                { id: 'pomelo-dry', flashPrice: 29.9, endTime: Date.now() + 3600000 },
                { id: 'pomelo-tea', flashPrice: 48, endTime: Date.now() + 3600000 }
            ];
            return flashDeals.map(function(deal) {
                var product = clone(DB.byId[deal.id]);
                if (product) {
                    product.flashPrice = deal.flashPrice;
                    product.flashEndTime = deal.endTime;
                }
                return product;
            }).filter(Boolean);
        });
    };

    /**
     * 模拟提交联系表单
     * @param {Object} formData - { name, email, phone, subject, message }
     * @returns {Promise<Object>} { success: true/false, message: string }
     */
    API.submitContactForm = function(formData) {
        return delay(400, 700).then(function() {
            // 15% 概率模拟服务器繁忙
            if (Math.random() < 0.15) {
                return {
                    success: false,
                    message: '服务器繁忙，请稍后再试。如急需联系，请拨打客服电话 400-888-6666。',
                    code: 'SERVER_BUSY'
                };
            }

            // 模拟保存到 localStorage（"数据库"持久化）
            try {
                var submissions = JSON.parse(localStorage.getItem('pomelo_contact_submissions') || '[]');
                submissions.push({
                    id: 'msg_' + Date.now(),
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || '',
                    subject: formData.subject || '',
                    message: formData.message,
                    createdAt: new Date().toISOString()
                });
                // 只保留最近 100 条
                if (submissions.length > 100) {
                    submissions = submissions.slice(-100);
                }
                localStorage.setItem('pomelo_contact_submissions', JSON.stringify(submissions));
            } catch (e) {
                // localStorage 不可用时静默失败
            }

            return {
                success: true,
                message: '提交成功！感谢您的留言，我们将在1-2个工作日内回复您。',
                code: 'OK'
            };
        });
    };

    /**
     * 模拟邮件订阅
     * @param {string} email - 订阅邮箱
     * @returns {Promise<Object>} { success: true/false, message: string }
     */
    API.submitNewsletter = function(email) {
        return delay(300, 500).then(function() {
            // 简单邮箱格式校验
            if (!email || email.indexOf('@') === -1) {
                return {
                    success: false,
                    message: '请输入有效的邮箱地址。',
                    code: 'INVALID_EMAIL'
                };
            }

            // 保存订阅
            try {
                var subs = JSON.parse(localStorage.getItem('pomelo_newsletter_subs') || '[]');
                if (subs.indexOf(email) === -1) {
                    subs.push(email);
                    localStorage.setItem('pomelo_newsletter_subs', JSON.stringify(subs));
                }
            } catch (e) {}

            return {
                success: true,
                message: '订阅成功！感谢您的关注，我们将定期为您推送最新资讯和优惠信息。',
                code: 'OK'
            };
        });
    };

    /**
     * 获取网站统计数据（实时感数据源）
     * @returns {Promise<Object>} 统计数据
     */
    API.getSiteStats = function() {
        return delay(100, 300).then(function() {
            // 计算全站数据
            var totalSales = 0;
            var totalStock = 0;
            DB.list.forEach(function(p) {
                totalSales += (p.salesCount || 0);
                totalStock += (p.stock || 0);
            });

            return {
                totalProducts: DB.list.length,
                totalSales: totalSales,
                totalStock: totalStock,
                // 当前在线浏览人数（随机基数，实际使用时再 ± 波动）
                currentVisitors: Math.floor(Math.random() * 30) + 50,
                // 今日订单数（随机基数）
                todayOrders: Math.floor(Math.random() * 100) + 200
            };
        });
    };

    // 暴露到全局
    window.API = API;

})();
