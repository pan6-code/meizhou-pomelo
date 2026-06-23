/**
 * product-data.js — 梅州金柚 统一产品数据库
 * 集中管理全部 14 个产品的完整信息，充当"后端数据库"
 * 加载顺序: 第1层（在 api.js 和 main.js 之前加载）
 */

(function() {
    'use strict';

    /* ========== 共享 Tab 模板 ========== */

    var freshTabs = [
        {
            title: '产品详情',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">{name}</h3>' +
                '<p>{description}</p>' +
                '<img src="images/products/detail-2.webp" alt="{shortName}展示" class="detail-image">' +
                '<p>金柚富含维生素C、柚皮苷、果胶等多种营养成分，具有清热润肺、化痰止咳、美容养颜等功效，是秋冬季节不可多得的时令佳果。</p>'
        },
        {
            title: '产地说明',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">原产地优势</h3>' +
                '<p>梅州地处北纬24°，属于亚热带季风气候区，年平均气温21℃，年降雨量1500mm以上，无霜期长达300天以上。独特的丘陵地貌和富硒红壤土为金柚种植提供了绝佳的天然条件。</p>' +
                '<img src="images/products/orchard.webp" alt="梅州金柚果园" class="detail-image">' +
                '<p>梅州金柚种植历史悠久，可追溯至明清时期。经过数百年的品种改良和种植技术积累，梅州金柚已形成独特的风味品质，获得"国家地理标志保护产品"认证。</p>' +
                '<p>我们的果园基地位于梅州核心产区，远离工业污染，采用生态种植方式，坚持使用有机肥料，引山泉水灌溉，确保每一颗金柚都是纯天然、无公害的绿色食品。</p>'
        },
        {
            title: '品质优势',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">品质优势</h3>' +
                '<p><strong>果肉品质：</strong>果肉晶莹饱满，汁水丰盈，可食率高达65%以上，糖度可达12°Bx以上，酸甜适口，风味浓郁。</p>' +
                '<img src="images/products/pomelo-fresh-2.webp" alt="金柚切开展示" class="detail-image">' +
                '<p><strong>严选标准：</strong>每颗金柚均经过人工筛选，仅选用果形端正、果皮光滑、重量达标的优质果实。从采摘到发货，经过三道品质检验流程。</p>' +
                '<p><strong>营养丰富：</strong>富含维生素C、维生素B族、钾、钙、镁等多种微量元素，以及柚皮苷等活性物质，营养价值极高。</p>'
        },
        {
            title: '包装物流',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">包装与物流</h3>' +
                '<p><strong>专业包装：</strong>采用食品级珍珠棉独立包裹 + 五层瓦楞纸箱，防震抗压，确保运输过程中果实完好无损。</p>' +
                '<img src="images/products/detail-3.webp" alt="包装发货" class="detail-image">' +
                '<p><strong>物流配送：</strong>合作顺丰速运，全国主要城市次日达/隔日达。冷链运输，全程温控，确保金柚新鲜到家。</p>' +
                '<p><strong>售后服务：</strong>收到货后如发现坏果，请于24小时内联系客服，我们承诺坏果包赔，让您购物无忧。</p>'
        },
        {
            title: '产品亮点',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">产品亮点</h3>' +
                '<div class="highlights-grid">' +
                '<div class="highlight-card"><div class="highlight-icon"><img src="images/icons/icon-origin.webp" alt="原产地"></div><h4>原产地直发</h4><p>梅州核心产区果园直供，从枝头到舌尖新鲜直达</p></div>' +
                '<div class="highlight-card"><div class="highlight-icon"><img src="images/icons/icon-eco.webp" alt="生态"></div><h4>生态种植</h4><p>富硒红壤土种植，山泉水灌溉，绿色无公害认证</p></div>' +
                '<div class="highlight-card"><div class="highlight-icon"><img src="images/icons/icon-quality.webp" alt="品质"></div><h4>品质严选</h4><p>三道品质检验流程，颗颗人工筛选，确保品质如一</p></div>' +
                '</div>'
        },
        {
            title: '果肉口感',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">果肉口感</h3>' +
                '<p>梅州金柚的果肉晶莹剔透，粒粒饱满如水晶。轻轻咬开，丰盈的汁水在口中迸发，清甜中带着微微的果酸，层次丰富、回味悠长。</p>' +
                '<p>果肉质地细腻柔软，入口即化，几乎感受不到纤维的存在。糖度可达12°Bx以上，酸甜比例恰到好处——不会甜得发腻，也不会酸得皱眉，是大自然最精妙的配比。</p>' +
                '<img src="images/products/detail-taste.webp" alt="金柚果肉口感" class="detail-image">' +
                '<p>无论是直接食用，还是榨汁、做沙拉、搭配甜品，梅州金柚都能展现出非凡的口感和风味。每一口都是对味蕾的温柔馈赠，让人一尝倾心。</p>'
        },
        {
            title: '采摘与发货',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">采摘与发货流程</h3>' +
                '<div class="process-steps">' +
                '<div class="process-step"><div class="step-icon"><img src="images/icons/icon-origin.webp" alt="采摘"></div><div class="step-num">1</div><h4>果园采摘</h4><p>清晨人工采摘，精选成熟度最佳的果实</p></div>' +
                '<div class="process-step"><div class="step-icon"><img src="images/icons/icon-quality.webp" alt="分选"></div><div class="step-num">2</div><h4>品质分选</h4><p>三道人工筛选+光电分选线精准分级</p></div>' +
                '<div class="process-step"><div class="step-icon"><img src="images/icons/icon-gift.webp" alt="包装"></div><div class="step-num">3</div><h4>精心包装</h4><p>珍珠棉独立包裹+五层瓦楞纸箱防震</p></div>' +
                '<div class="process-step"><div class="step-icon"><img src="images/icons/icon-logistics.webp" alt="发货"></div><div class="step-num">4</div><h4>冷链发货</h4><p>顺丰冷链配送，全程温控，新鲜到家</p></div>' +
                '</div>' +
                '<img src="images/products/detail-logistics.webp" alt="物流配送流程" class="detail-image">' +
                '<p>从果园到餐桌，每一个环节我们都严格把控。下单后24小时内发货，全国主要城市1-3天送达，确保您收到的是最新鲜的梅州金柚。</p>'
        },
        {
            title: '包装说明',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">包装说明</h3>' +
                '<p><strong>专业防护：</strong>每一颗金柚都使用食品级珍珠棉独立包裹，有效防止运输过程中的碰撞和挤压。外层采用五层高强度瓦楞纸箱，防震抗压，确保果实完好无损地送达您手中。</p>' +
                '<img src="images/products/detail-package.webp" alt="包装展示" class="detail-image">' +
                '<p><strong>简装说明：</strong>简装版采用环保牛皮纸箱+珍珠棉包裹，适合自食或家庭分享，经济实惠。</p>' +
                '<p><strong>礼盒包装：</strong>礼盒版采用高端金绿配色礼盒+丝绸内衬+精美手提袋，附赠品牌贺卡，是送礼的品质之选。</p>'
        },
        {
            title: '食用建议',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">食用建议</h3>' +
                '<p><strong>最佳食用时间：</strong>金柚在10月至次年2月为最佳赏味期。收到后建议在阴凉通风处放置2-3天，让果实稍微"回糖"，此时口感更甜更佳。</p>' +
                '<img src="images/products/detail-eat.webp" alt="食用场景" class="detail-image">' +
                '<p><strong>食用方法：</strong>用水果刀在柚皮上划十字，剥去外皮后掰开果肉即可食用。也可将果肉剥出做水果沙拉、搭配酸奶或冰淇淋，口感更丰富。</p>' +
                '<p><strong>储存建议：</strong>完整金柚适合在10-15℃阴凉通风处存放，可保存15-20天。剥开后的果肉建议密封冷藏，2天内食用完毕风味最佳。</p>' +
                '<p><strong>温馨提示：</strong>金柚性凉，脾胃虚寒者建议适量食用。金柚与部分药物可能产生相互作用，正在服药期间请咨询医生。</p>'
        }
    ];

    var giftTabs = [
        {
            title: '产品详情',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">{name}</h3>' +
                '<p>{description}</p>' +
                '<img src="{image}" alt="{name}" class="detail-image">' +
                '<p>精选梅州优质金柚，搭配精美礼盒包装，是节日送礼、商务馈赠、走亲访友的品质之选。每一份礼盒都承载着"金柚（佑）平安"的美好祝福。</p>'
        },
        {
            title: '礼盒展示',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">精美礼盒</h3>' +
                '<p>我们的礼盒设计融合了中国传统文化元素与现代美学理念。金绿配色象征丰收与尊贵，烫金工艺彰显品质，每一个细节都经过精心打磨。</p>' +
                '<img src="images/products/gift-box-1.webp" alt="礼盒展示" class="detail-image">' +
                '<p>礼盒内部采用丝绸内衬+独立卡槽设计，每一颗金柚都被妥善安放。搭配品牌手提袋和精美贺卡，送礼体面大方，让对方感受到您的用心与诚意。</p>' +
                '<img src="images/products/gift-scene-family.webp" alt="送礼场景" class="detail-image">'
        },
        {
            title: '包装规格',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">包装规格</h3>' +
                '<p><strong>外盒材质：</strong>采用高密度灰板裱糊艺术纸，表面覆亚膜，防潮耐磨，质感出众。</p>' +
                '<p><strong>内部结构：</strong>珍珠棉内托+独立卡槽，每颗金柚独立安放，防震抗压。</p>' +
                '<img src="images/products/detail-package.webp" alt="包装细节" class="detail-image">' +
                '<p><strong>配件清单：</strong>品牌手提袋×1、精美贺卡×1、产品介绍卡×1、食用指南×1。</p>' +
                '<p><strong>礼盒尺寸：</strong>根据规格不同，礼盒尺寸在35×25×15cm至45×35×20cm之间，具体以实际产品为准。</p>'
        },
        {
            title: '品质保障',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">品质保障</h3>' +
                '<p><strong>严选果实：</strong>礼盒中的每一颗金柚都经过三重筛选——果形筛选、重量筛选、外观筛选，确保果形端正、色泽金黄、无瑕疵。</p>' +
                '<img src="images/products/pomelo-fresh-2.webp" alt="品质严选" class="detail-image">' +
                '<p><strong>新鲜保证：</strong>礼盒订单优先采摘，从果园到包装不超过48小时，确保果实新鲜度。</p>' +
                '<p><strong>品质承诺：</strong>如收到礼盒后发现任何质量问题（坏果、破损），我们承诺免费补发或全额退款，让您送礼无忧。</p>'
        },
        {
            title: '送礼场景',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">送礼场景</h3>' +
                '<p><strong>🎁 节日送礼：</strong>春节、中秋、端午等传统佳节，金柚礼盒是最应景的健康好礼，"金柚"谐音"金佑"，寓意吉祥平安。</p>' +
                '<p><strong>💼 商务馈赠：</strong>高端金柚礼盒是企业商务送礼、客户答谢的理想选择，体面大方，彰显企业文化品味。</p>' +
                '<img src="images/products/gift-scene-business.webp" alt="商务送礼" class="detail-image">' +
                '<p><strong>🏠 走亲访友：</strong>逢年过节走亲访友，带上一份金柚礼盒，既健康又体面，传递美好祝福。</p>' +
                '<p><strong>🎊 员工福利：</strong>企业团购金柚礼盒作为员工节日福利，健康实用，深受员工喜爱。</p>'
        },
        {
            title: '物流配送',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">物流配送</h3>' +
                '<p><strong>配送方式：</strong>合作顺丰速运/京东物流，全国主要城市1-3天送达。礼盒产品采用加固外箱+气泡柱保护，确保礼盒完好无损。</p>' +
                '<img src="images/products/detail-logistics.webp" alt="物流配送" class="detail-image">' +
                '<p><strong>发货时效：</strong>工作日16:00前下单当天发货，16:00后次日发货。节假日正常发货（春节除外）。</p>' +
                '<p><strong>配送范围：</strong>全国范围配送（港澳台及偏远地区请咨询客服确认时效）。</p>'
        },
        {
            title: '定制服务',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">定制服务</h3>' +
                '<p><strong>企业LOGO定制：</strong>支持在礼盒、手提袋、贺卡上印制企业LOGO和祝福语，起订量50份起。</p>' +
                '<p><strong>贺卡定制：</strong>提供个性化贺卡定制服务，可手写祝福语，让您的心意更加独特。</p>' +
                '<p><strong>组合定制：</strong>支持多种产品组合搭配（鲜果+果干+蜂蜜茶），满足不同预算和场景需求。</p>' +
                '<p><strong>定制流程：</strong>联系客服 → 确认方案 → 设计打样 → 确认生产 → 发货配送，全程约5-7个工作日。</p>' +
                '<p style="margin-top:16px;color:#D9A441;">📞 定制咨询热线：400-888-6666</p>'
        },
        {
            title: '售后说明',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">售后说明</h3>' +
                '<p><strong>退换政策：</strong>收到商品后如发现质量问题（坏果、破损），请在24小时内拍照联系客服，我们承诺免费补发或全额退款。</p>' +
                '<p><strong>7天无理由：</strong>支持7天无理由退换货（商品未拆封、不影响二次销售）。</p>' +
                '<p><strong>发票开具：</strong>支持开具增值税普通发票和专用发票，请在订单备注中注明开票信息。</p>' +
                '<p><strong>客服渠道：</strong>在线客服（工作日9:00-21:00）、客服电话400-888-6666、微信客服（公众号搜索"梅州金柚"）。</p>'
        }
    ];

    var processedTabs = [
        {
            title: '产品详情',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">{name}</h3>' +
                '<p>{description}</p>' +
                '<img src="{image}" alt="{name}" class="detail-image">' +
                '<p>甄选梅州优质金柚为原料，经过精心加工制作而成，保留了金柚的天然营养与风味，是健康生活的品质之选。</p>'
        },
        {
            title: '原料产地',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">原料产地</h3>' +
                '<p>原料金柚产自中国"金柚之乡"——广东省梅州市。这里地处粤东北山区，气候温和、雨量充沛、日照充足，得天独厚的自然环境与富硒土壤为金柚的生长提供了最佳条件。</p>' +
                '<img src="images/products/orchard.webp" alt="梅州金柚果园" class="detail-image">' +
                '<p>我们只选用成熟度最佳、品质最优的金柚果实作为加工原料，从源头确保产品的高品质。每一批原料都经过严格的农残检测和品质检验，符合国家食品安全标准。</p>'
        },
        {
            title: '制作工艺',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">制作工艺</h3>' +
                '<p>采用现代化食品加工工艺，结合传统匠心手法，在保证食品安全的同时，最大程度锁住金柚的天然营养和独特风味。</p>' +
                '<img src="images/products/detail-3.webp" alt="制作工艺" class="detail-image">' +
                '<p><strong>严格品控：</strong>从原料清洗、加工处理到成品包装，全程在十万级净化车间完成。每一批次产品都经过微生物、重金属、农残等多项检测，合格后方可出厂。</p>' +
                '<p><strong>无添加承诺：</strong>不添加人工色素、香精和防腐剂，保留食材本真味道，让消费者吃得放心。</p>'
        },
        {
            title: '口感风味',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">口感风味</h3>' +
                '<p>承袭梅州金柚的天然清香，口感独特，风味浓郁。入口便能感受到金柚特有的清甜与芬芳，层次丰富，回味悠长。</p>' +
                '<img src="{image}" alt="{name}品尝" class="detail-image">' +
                '<p>无论是作为日常零食、下午茶搭配，还是馈赠亲友的健康好礼，{name}都能为您带来愉悦的味觉享受。</p>'
        },
        {
            title: '营养成分',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">营养成分</h3>' +
                '<p>金柚富含多种营养成分，是天然的健康食品：</p>' +
                '<p><strong>维生素C：</strong>每100g金柚含维生素C约40-60mg，有助于增强免疫力，促进胶原蛋白合成。</p>' +
                '<p><strong>柚皮苷：</strong>金柚特有的活性物质，具有抗氧化、抗炎等生物活性。</p>' +
                '<p><strong>膳食纤维：</strong>有助于促进肠道蠕动，改善消化功能。</p>' +
                '<p><strong>果胶：</strong>天然的水溶性膳食纤维，有助于降低胆固醇。</p>' +
                '<p><strong>钾、钙、镁：</strong>多种矿物质元素，维持身体正常代谢功能。</p>'
        },
        {
            title: '食用方法',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">食用方法</h3>' +
                '<p>开袋/开罐即食，方便快捷。也可根据个人喜好搭配其他食材，创造更多美味吃法：</p>' +
                '<img src="images/products/detail-eat.webp" alt="食用场景" class="detail-image">' +
                '<p>多种创意吃法等您来发现——搭配酸奶、涂抹面包、冲泡饮品、烘焙原料……让金柚的美味融入日常生活的每一个瞬间。</p>' +
                '<p><strong>温馨提示：</strong>开封后请尽快食用，以保持最佳风味。具体保存方法请参见"储存建议"。</p>'
        },
        {
            title: '包装规格',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">包装规格</h3>' +
                '<p><strong>包装材质：</strong>采用食品级安全包装材料，密封防潮，确保产品新鲜卫生。</p>' +
                '<img src="images/products/detail-package.webp" alt="包装展示" class="detail-image">' +
                '<p><strong>规格信息：</strong>具体规格请参见商品参数。所有包装均经过严格的质量检验，符合国家食品安全包装标准。</p>' +
                '<p><strong>外箱包装：</strong>快递发货时外加五层瓦楞纸箱，防震抗压，确保商品完好送达。</p>'
        },
        {
            title: '储存建议',
            content: '<h3 style="font-size:20px;color:#2F2419;margin-bottom:16px;">储存建议</h3>' +
                '<p><strong>未开封：</strong>请置于阴凉干燥处，避免阳光直射和高温环境，常温保存即可。具体保质期请参见产品包装上的标注。</p>' +
                '<p><strong>已开封：</strong>开封后请密封保存，置于冰箱冷藏（2-8℃），并尽快食用完毕，以保持最佳风味和品质。</p>' +
                '<p><strong>注意事项：</strong>请勿将产品置于潮湿环境中，开封后请用干净干燥的器具取用，避免水分进入导致变质。</p>' +
                '<p><strong>过敏提示：</strong>本产品含有金柚成分，对柑橘类水果过敏者请谨慎食用。</p>'
        }
    ];

    /* ========== FAQ 数据 ========== */

    var freshFAQ = [
        { q: '金柚适合送礼吗？', a: '非常适合！金柚谐音"金佑"，寓意吉祥、保佑平安，是节日送礼、商务礼赠、走亲访友的绝佳选择。我们提供精装礼盒和定制服务，欢迎访问<a href="gift.html" style="color:#D9A441;">礼盒专区</a>了解更多。' },
        { q: '金柚的最佳食用时间是什么时候？', a: '金柚在每年10月至次年2月为最佳赏味期。收到后建议在阴凉处放置2-3天后食用，此时果肉更甜，口感更佳。冷藏后食用风味更清爽。' },
        { q: '金柚的规格如何选择？', a: '5斤装约3-4个，适合2-3人家庭；8斤装约5-6个，适合4-5人家庭分享；12斤装约8-10个，适合聚会分享或集中送礼。建议根据食用人数和用途选择合适规格。' }
    ];

    var giftFAQ = [
        { q: '礼盒可以定制LOGO吗？', a: '可以的！我们支持企业LOGO定制服务，可在礼盒、手提袋、贺卡上印制。起订量50份起，定制周期约5-7个工作日。详情请咨询客服400-888-6666。' },
        { q: '礼盒的发货时效是多久？', a: '工作日16:00前下单当天发货，16:00后次日发货。全国主要城市1-3天送达。节假日正常发货（春节除外），礼盒采用加固包装确保完好。' },
        { q: '收到礼盒后有破损怎么办？', a: '如收到礼盒后发现破损或坏果，请在24小时内拍照联系客服，我们承诺免费补发或全额退款，让您送礼无忧。客服电话：400-888-6666。' }
    ];

    var processedFAQ = [
        { q: '产品的保质期是多久？', a: '不同产品保质期有所不同，具体请参见产品包装上的标注。一般在未开封状态下可保存6-12个月。开封后建议冷藏并尽快食用完毕。' },
        { q: '产品是否添加防腐剂？', a: '我们的深加工产品严格遵守无添加承诺，不添加人工色素、香精和防腐剂。通过先进的加工工艺和密封包装实现保质保鲜，让您吃得放心。' },
        { q: '适合送给老人和小孩吗？', a: '产品采用天然原料制作，营养丰富，老少皆宜。但建议老人和小孩适量食用，柑橘类过敏者请谨慎。如有特殊健康状况，建议咨询医生后再食用。' }
    ];

    /* ========== 产品定义 ========== */

    var products = [
        // ===== 新鲜金柚组 (fresh) =====
        {
            id: 'pomelo-fresh-5',
            name: '梅州新鲜金柚 5斤装',
            shortName: '梅州新鲜金柚',
            price: 68,
            originalPrice: 88,
            image: 'images/products/pomelo-fresh-1.webp',
            images: ['images/products/pomelo-fresh-1.webp', 'images/products/pomelo-fresh-2.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp'],
            category: 'fresh',
            tag: '爆款热卖',
            keywords: '金柚 新鲜 5斤 柚子 水果 沙田柚',
            subtitle: '产自中国金柚之乡 · 原产地直发 · 果园新鲜采摘',
            description: '梅州金柚，产自中国著名的"金柚之乡"——广东省梅州市。这里地处粤东北山区，气候温和、雨量充沛、日照充足，得天独厚的自然环境与富硒土壤为金柚的生长提供了最佳条件。每一颗梅州金柚都经过果农的精心培育，从开花到成熟历时9个月，自然成熟后人工采摘，确保果实达到最佳甜度和口感。果皮金黄亮泽，果肉晶莹剔透，清甜多汁，入口化渣，回味悠长。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '5斤装 (约3-4个)', price: 68, active: true },
                    { text: '8斤装 (约5-6个)', price: 98 },
                    { text: '12斤装 (约8-10个)', price: 138 }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '简装 (自食推荐)', active: true },
                    { text: '礼盒装 (送礼推荐)', priceAdd: 20 }
                ]}
            ],
            tabGroup: 'fresh',
            stock: 999,
            salesCount: 2580,
            rating: 4.9,
            relatedIds: ['gift-box-1', 'pomelo-dry', 'pomelo-tea', 'pomelo-trial']
        },
        {
            id: 'pomelo-fresh-8',
            name: '梅州新鲜金柚 8斤装',
            shortName: '梅州新鲜金柚',
            price: 98,
            originalPrice: 128,
            image: 'images/products/pomelo-fresh-2.webp',
            images: ['images/products/pomelo-fresh-2.webp', 'images/products/pomelo-fresh-1.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp'],
            category: 'fresh',
            tag: '优选',
            keywords: '金柚 新鲜 8斤 柚子 水果 沙田柚',
            subtitle: '产自中国金柚之乡 · 原产地直发 · 家庭分享首选',
            description: '梅州金柚8斤装，约5-6颗精选金柚，是家庭分享的最佳选择。每一颗金柚都经过严格筛选，果肉晶莹饱满，清甜多汁，入口化渣。8斤实惠装满足全家人一周的鲜果需求，让健康美味常伴左右。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '8斤装 (约5-6个)', price: 98, active: true },
                    { text: '5斤装 (约3-4个)', price: 68 },
                    { text: '12斤装 (约8-10个)', price: 138 }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '简装 (自食推荐)', active: true },
                    { text: '礼盒装 (送礼推荐)', priceAdd: 20 }
                ]}
            ],
            tabGroup: 'fresh',
            stock: 756,
            salesCount: 1820,
            rating: 4.8,
            relatedIds: ['pomelo-fresh-5', 'pomelo-fresh-12', 'pomelo-family-box', 'pomelo-trial']
        },
        {
            id: 'pomelo-fresh-12',
            name: '梅州新鲜金柚 12斤装',
            shortName: '梅州新鲜金柚',
            price: 138,
            originalPrice: 168,
            image: 'images/products/pomelo-fresh-3.webp',
            images: ['images/products/pomelo-fresh-3.webp', 'images/products/pomelo-fresh-1.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp'],
            category: 'fresh',
            tag: '超值',
            keywords: '金柚 新鲜 12斤 柚子 水果 沙田柚',
            subtitle: '产自中国金柚之乡 · 原产地直发 · 聚会分享首选',
            description: '梅州金柚12斤超值装，约8-10颗精选大果，适合聚会分享、集中采购或馈赠亲友。量大价优，每斤均价更低，是金柚爱好者的性价比之选。果园直供，新鲜到家。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '12斤装 (约8-10个)', price: 138, active: true },
                    { text: '5斤装 (约3-4个)', price: 68 },
                    { text: '8斤装 (约5-6个)', price: 98 }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '简装 (自食推荐)', active: true },
                    { text: '礼盒装 (送礼推荐)', priceAdd: 20 }
                ]}
            ],
            tabGroup: 'fresh',
            stock: 512,
            salesCount: 960,
            rating: 4.8,
            relatedIds: ['pomelo-fresh-8', 'pomelo-family-box', 'gift-box-1', 'pomelo-dry']
        },
        {
            id: 'pomelo-family-box',
            name: '金柚家庭装 8斤',
            shortName: '金柚家庭装',
            price: 128,
            originalPrice: 158,
            image: 'images/products/pomelo-family-box.webp',
            images: ['images/products/pomelo-family-box.webp', 'images/products/pomelo-fresh-2.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp'],
            category: 'fresh',
            tag: '家庭优选',
            keywords: '家庭 8斤 实惠 金柚 新鲜',
            subtitle: '8斤实惠装 · 约5-6个金柚 · 家庭分享首选',
            description: '金柚家庭装专为家庭用户设计，8斤实惠装约5-6个金柚，满足一家人一周的鲜果需求。精选优质金柚，果形饱满，清甜多汁。实惠的价格，不变的品质，让健康美味的梅州金柚成为您家庭的水果常备。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '8斤家庭装 (约5-6个)', price: 128, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '简装 (自食推荐)', active: true },
                    { text: '礼盒装 (送礼推荐)', priceAdd: 20 }
                ]}
            ],
            tabGroup: 'fresh',
            stock: 680,
            salesCount: 1450,
            rating: 4.7,
            relatedIds: ['pomelo-fresh-5', 'pomelo-fresh-8', 'pomelo-selected-box', 'pomelo-dry']
        },
        {
            id: 'pomelo-selected-box',
            name: '金柚精选装 5斤',
            shortName: '金柚精选装',
            price: 78,
            originalPrice: 98,
            image: 'images/products/pomelo-selected-box.webp',
            images: ['images/products/pomelo-selected-box.webp', 'images/products/pomelo-fresh-1.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp'],
            category: 'fresh',
            tag: '精选推荐',
            keywords: '精选 5斤 品质 金柚 新鲜',
            subtitle: '颗颗精选 · 果形饱满 · 品质严选新标准',
            description: '金柚精选装，每一颗都经过更严格的筛选标准——果形端正、果皮光滑、重量达标、色泽金黄。5斤装约3-4颗精选大果，品质升级但价格亲民，是追求品质生活的您的理想选择。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '5斤精选装 (约3-4个)', price: 78, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '简装 (自食推荐)', active: true },
                    { text: '礼盒装 (送礼推荐)', priceAdd: 20 }
                ]}
            ],
            tabGroup: 'fresh',
            stock: 430,
            salesCount: 890,
            rating: 4.9,
            relatedIds: ['pomelo-fresh-5', 'pomelo-family-box', 'gift-box-1', 'pomelo-trial']
        },
        {
            id: 'pomelo-trial',
            name: '双果体验装',
            shortName: '双果体验装',
            price: 32,
            originalPrice: 42,
            image: 'images/products/pomelo-fresh-3.webp',
            images: ['images/products/pomelo-fresh-3.webp', 'images/products/pomelo-fresh-1.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp'],
            category: 'fresh',
            tag: '尝鲜',
            keywords: '体验 试吃 双果 金柚 新品尝鲜',
            subtitle: '两颗精选金柚 · 尝鲜体验 · 品质见证',
            description: '第一次尝试梅州金柚？双果体验装是您的最佳选择！两颗精选金柚，让您以最低的成本感受梅州金柚的清甜多汁。相信品尝之后，您一定会爱上这份来自中国金柚之乡的天然美味。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '双果体验装 (2个)', price: 32, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '简装 (自食推荐)', active: true }
                ]}
            ],
            tabGroup: 'fresh',
            stock: 1200,
            salesCount: 3560,
            rating: 4.6,
            relatedIds: ['pomelo-fresh-5', 'pomelo-dry', 'pomelo-tea', 'pomelo-jam']
        },

        // ===== 礼盒组 (gift) =====
        {
            id: 'gift-box-1',
            name: '金柚精品礼盒 尊享装',
            shortName: '金柚精品礼盒',
            price: 168,
            originalPrice: 198,
            image: 'images/products/gift-box-1.webp',
            images: ['images/products/gift-box-1.webp', 'images/products/gift-box-2.webp', 'images/products/detail-3.webp', 'images/products/gift-scene-family.webp'],
            category: 'gift',
            tag: '送礼首选',
            keywords: '礼盒 精品 送礼 金柚 高端 节日',
            subtitle: '高端礼盒包装 · 送礼体面大方 · 4颗精选金柚',
            description: '金柚精品礼盒尊享装，甄选4颗优质大果，搭配高端金绿配色礼盒。丝绸内衬+精美手提袋+品牌贺卡，每一个细节都彰显品质与用心。金柚谐音"金佑"，寓意吉祥平安，是节日送礼、商务馈赠、走亲访友的绝佳之选。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '尊享装 (4颗精选大果)', price: 168, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '标准礼盒 (送礼推荐)', active: true }
                ]}
            ],
            tabGroup: 'gift',
            stock: 350,
            salesCount: 2100,
            rating: 4.9,
            relatedIds: ['gift-box-2', 'gift-box-3', 'gift-combo', 'pomelo-fresh-5']
        },
        {
            id: 'gift-box-2',
            name: '金柚臻品礼盒 豪华装',
            shortName: '金柚臻品礼盒',
            price: 258,
            originalPrice: 298,
            image: 'images/products/gift-box-2.webp',
            images: ['images/products/gift-box-2.webp', 'images/products/gift-box-1.webp', 'images/products/detail-3.webp', 'images/products/gift-scene-family.webp'],
            category: 'gift',
            tag: '限量臻品',
            keywords: '礼盒 臻品 豪华 送礼 金柚 限量',
            subtitle: '甄选超大果 · 精工细作 · 限量发售 · 尊享品质',
            description: '金柚臻品礼盒豪华装，甄选6颗特级超大果，每一颗都代表梅州金柚的最高品质。豪华烫金礼盒搭配丝绸内衬、实木纹理手提箱和烫金贺卡，限量发售，是高端送礼和重要场合的品质之选。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '豪华装 (6颗特级超大果)', price: 258, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '豪华礼盒 (高端送礼)', active: true }
                ]}
            ],
            tabGroup: 'gift',
            stock: 120,
            salesCount: 680,
            rating: 5.0,
            relatedIds: ['gift-box-1', 'gift-box-3', 'gift-corporate', 'pomelo-fresh-12']
        },
        {
            id: 'gift-box-3',
            name: '精品礼盒3号 雅致装',
            shortName: '精品礼盒3号',
            price: 238,
            originalPrice: 288,
            image: 'images/products/gift-box-3.webp',
            images: ['images/products/gift-box-3.webp', 'images/products/gift-box-1.webp', 'images/products/detail-3.webp', 'images/products/gift-scene-family.webp'],
            category: 'gift',
            tag: '新品上市',
            keywords: '礼盒 雅致 时尚 送礼 金柚 新品',
            subtitle: '时尚设计 · 精致礼盒 · 6颗精选中果 · 送礼新选择',
            description: '精品礼盒3号雅致装，采用时尚简约设计风格，打破传统礼盒的厚重感。6颗精选中果搭配清新雅致的礼盒包装，适合年轻群体的审美偏好。品质不减，格调升级，是新一代送礼方式的优雅表达。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '雅致装 (6颗精选中果)', price: 238, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '雅致礼盒 (时尚送礼)', active: true }
                ]}
            ],
            tabGroup: 'gift',
            stock: 200,
            salesCount: 450,
            rating: 4.8,
            relatedIds: ['gift-box-1', 'gift-box-2', 'gift-combo', 'pomelo-selected-box']
        },
        {
            id: 'gift-corporate',
            name: '企业团购定制装',
            shortName: '企业团购定制装',
            price: 388,
            originalPrice: 468,
            image: 'images/products/gift-box-corporate.webp',
            images: ['images/products/gift-box-corporate.webp', 'images/products/gift-box-1.webp', 'images/products/detail-3.webp', 'images/products/gift-scene-business.webp'],
            category: 'gift',
            tag: '企业专供',
            keywords: '企业 团购 定制 LOGO 批量 商务 送礼',
            subtitle: '企业福利 · 商务送礼 · 支持LOGO定制 · 批量采购优惠',
            description: '企业团购定制装专为企业和机构设计，支持礼盒、手提袋、贺卡全方位LOGO定制。精选8颗优质大果，搭配高端定制礼盒。批量采购享受阶梯价格优惠（50份起订），是企业节日福利、客户答谢、商务馈赠的专业之选。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '定制装 (8颗优质大果)', price: 388, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '企业定制礼盒 (50份起订)', active: true }
                ]}
            ],
            tabGroup: 'gift',
            stock: 500,
            salesCount: 320,
            rating: 4.9,
            relatedIds: ['gift-box-1', 'gift-box-2', 'gift-combo', 'pomelo-family-box']
        },
        {
            id: 'gift-combo',
            name: '伴手礼组合装',
            shortName: '伴手礼组合装',
            price: 198,
            originalPrice: 238,
            image: 'images/products/gift-combo.webp',
            images: ['images/products/gift-combo.webp', 'images/products/gift-box-1.webp', 'images/products/pomelo-dry.webp', 'images/products/pomelo-tea.webp'],
            category: 'gift',
            tag: '伴手好礼',
            keywords: '伴手礼 组合 鲜果 果干 蜂蜜茶',
            subtitle: '金柚鲜果+果干+蜂蜜茶 · 一站式伴手礼方案',
            description: '伴手礼组合装将梅州金柚的三大明星产品一站配齐——新鲜金柚2颗、金柚果干100g×1袋、金柚蜂蜜茶500g×1罐。搭配精美伴手礼袋，是走亲访友、旅游伴手、日常小礼物的完美选择。丰富的产品组合让对方感受到您满满的诚意。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '组合装 (鲜果2颗+果干+蜂蜜茶)', price: 198, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '伴手礼袋 (送礼推荐)', active: true }
                ]}
            ],
            tabGroup: 'gift',
            stock: 280,
            salesCount: 1560,
            rating: 4.8,
            relatedIds: ['gift-box-1', 'pomelo-fresh-5', 'pomelo-dry', 'pomelo-tea']
        },

        // ===== 深加工食品组 (processed) =====
        {
            id: 'pomelo-dry',
            name: '金柚果干 100g×3袋',
            shortName: '金柚果干',
            price: 36,
            originalPrice: 45,
            image: 'images/products/pomelo-dry.webp',
            images: ['images/products/pomelo-dry.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp', 'images/products/detail-eat.webp'],
            category: 'snack',
            tag: '休闲零食',
            keywords: '果干 零食 金柚 休闲食品',
            subtitle: '低温烘焙 · 保留原香 · 健康零嘴 · 100g×3袋',
            description: '金柚果干选用梅州新鲜金柚为原料，采用低温烘焙工艺，保留金柚天然清香和营养。口感软糯有嚼劲，酸甜适中，不添加人工色素和防腐剂，是办公室零食、户外旅行、追剧休闲的健康之选。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '100g×3袋', price: 36, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '密封袋装', active: true }
                ]}
            ],
            tabGroup: 'processed',
            stock: 890,
            salesCount: 3200,
            rating: 4.7,
            relatedIds: ['pomelo-tea', 'pomelo-jam', 'pomelo-trial', 'pomelo-fresh-5']
        },
        {
            id: 'pomelo-tea',
            name: '金柚蜂蜜茶 500g',
            shortName: '金柚蜂蜜茶',
            price: 58,
            originalPrice: 72,
            image: 'images/products/pomelo-tea.webp',
            images: ['images/products/pomelo-tea.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp', 'images/products/detail-eat.webp'],
            category: 'tea',
            tag: '养生佳品',
            keywords: '蜂蜜茶 饮品 金柚 养生 茶饮',
            subtitle: '金柚与蜂蜜完美融合 · 清甜润喉 · 500g罐装',
            description: '金柚蜂蜜茶选用梅州金柚果肉与优质天然蜂蜜精心调配而成。金柚的清香与蜂蜜的甘甜完美融合，冲泡后清甜润喉、暖身养胃。每罐500g，是秋冬季节温暖身心的养生佳品，也是馈赠亲友的健康好礼。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '500g罐装', price: 58, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '玻璃罐装', active: true }
                ]}
            ],
            tabGroup: 'processed',
            stock: 650,
            salesCount: 2450,
            rating: 4.8,
            relatedIds: ['pomelo-dry', 'pomelo-jam', 'pomelo-fresh-5', 'gift-combo']
        },
        {
            id: 'pomelo-jam',
            name: '金柚果酱 280g',
            shortName: '金柚果酱',
            price: 45,
            originalPrice: 56,
            image: 'images/products/pomelo-jam.webp',
            images: ['images/products/pomelo-jam.webp', 'images/products/detail-1.webp', 'images/products/detail-2.webp', 'images/products/detail-eat.webp'],
            category: 'jam',
            tag: '手工制作',
            keywords: '果酱 手工 无添加 早餐 金柚',
            subtitle: '手工熬制 · 无添加 · 金柚清香 · 早餐好伴侣',
            description: '金柚果酱采用传统手工熬制工艺，精选梅州优质金柚果肉，搭配少量冰糖慢火熬煮。不添加人工色素、香精和防腐剂，保留了金柚最纯正的清香和营养。280g玻璃瓶装，涂抹面包、搭配酸奶、冲泡饮品皆宜，是健康早餐和下午茶的绝佳搭配。',
            specs: [
                { label: '规格', key: 'size', options: [
                    { text: '280g瓶装', price: 45, active: true }
                ]},
                { label: '包装', key: 'packaging', options: [
                    { text: '玻璃瓶装', active: true }
                ]}
            ],
            tabGroup: 'processed',
            stock: 520,
            salesCount: 1680,
            rating: 4.7,
            relatedIds: ['pomelo-dry', 'pomelo-tea', 'pomelo-trial', 'pomelo-fresh-5']
        }
    ];

    /* ========== 构建速查索引 ========== */

    var byId = {};
    products.forEach(function(p) {
        byId[p.id] = p;
    });

    /* ========== 分类映射 ========== */
    var categories = {
        'fresh': '新鲜金柚',
        'gift': '精品礼盒',
        'snack': '金柚果干',
        'tea': '金柚蜂蜜茶',
        'trial': '体验尝鲜',
        'jam': '金柚果酱',
        'family': '家庭优选',
        'selected': '精选推荐',
        'combo': '伴手组合'
    };

    /* ========== 种子评价数据（20条） ========== */
    var reviewSeeds = [
        { userName: '果农小张', rating: 5, content: '收到货很惊喜！金柚个头饱满，果皮金黄透亮，切开后果肉晶莹剔透，水分超足，甜中带一丝清酸，正是梅州金柚特有的风味。顺丰冷链隔天就到，包装很用心，每个柚子都有独立网套，没有一个碰伤的。会回购！' },
        { userName: '吃货小 Lily', rating: 5, content: '第二次买了，品质一如既往地好！这次买的8斤装，个头比上次还大，家里人都说好吃。柚子皮薄肉厚，剥开满屋子都是清香味，果肉脆嫩化渣，酸甜比完美。客服态度也超级好，物流很快。' },
        { userName: '老茶客王', rating: 4, content: '金柚蜂蜜茶很不错，冲出来颜色金黄透亮，柚香和蜂蜜的甜融合得恰到好处。冬天喝一杯暖暖的，喉咙很舒服。就是500g的量稍微少了点，希望能出大瓶装。包装很精致，送人也体面。' },
        { userName: '深圳张太', rating: 5, content: '礼盒装送领导的，包装高端大气，中国风设计很有品味。打开一看，四个金柚个头均匀，每个都有独立礼袋包装，还配了产品手册和检测报告，非常专业。领导收到后专门发微信夸这个柚子好吃，送礼倍有面子！' },
        { userName: '健康饮食家', rating: 5, content: '金柚果干太好吃了吧！没有添加糖，就是金柚本身的自然甜味，软糯有嚼劲，每一片都很厚实。下午茶时间来几片，解馋又健康。独立小包装很方便携带，办公室囤了好几袋，同事们都在问链接。' },
        { userName: '广州阿明', rating: 4, content: '作为梅州人，在外地能吃到家乡的金柚真的很幸福。口感基本还原了现摘的味道，新鲜度高。扣一星是因为这次有个柚子稍微小了一点，但整体品质还是不错的。希望品控能更稳定一些。' },
        { userName: '北漂小李', rating: 5, content: '来北京后很少吃到这么正宗的金柚了。抱着试试的心态下单，没想到完全超出预期！每个柚子都有1.5斤以上，果肉饱满多汁，酸甜适口。准备过年再囤几箱寄回老家，让爸妈也尝尝。' },
        { userName: '蜜柚控', rating: 4, content: '第三次回购了，品质一直很稳定。这次的柚子感觉比上批更甜一些，可能是季节到了。包装、物流、售后各方面都做得不错，能看出是用心在做品牌。希望以后能出更多金柚衍生品。' },
        { userName: '上海滩吃货', rating: 5, content: '果酱惊艳到我了！开盖就是浓郁的柚子清香，抹在吐司上酸甜开胃，果肉颗粒感很足，不是那种全是糖浆的劣质果酱。配料表很干净，给孩子吃也放心。已经安利给整个妈妈群了哈哈。' },
        { userName: '茶语人生', rating: 3, content: '整体还不错，但有几个小问题：一是物流比预期慢了一天，二是其中一个柚子表皮有轻微斑点（虽然不影响食用）。客服态度挺好的，给了优惠券补偿。希望物流和品控能改进。' },
        { userName: '水果猎人', rating: 5, content: '作为一个吃遍全国柚子的人，梅州金柚确实名不虚传！果肉晶莹似玉，入口清甜多汁，回甘悠长，比福建蜜柚多了一份清雅。这次买的精选装，每个都超过2斤，性价比很高。强烈推荐！' },
        { userName: '宝妈小周', rating: 5, content: '宝贝很喜欢吃这个柚子！果肉细腻好嚼，不像有些柚子纤维很粗。酸甜适中不伤牙，维C丰富，秋天吃正好润肺。会继续回购家庭装的，全家一起补充维C～物流包装都很到位。' },
        { userName: '白领阿杰', rating: 4, content: '同事推荐的这个品牌，说比超市买的好吃。抱着怀疑的态度下单，结果真香了。特别是那个果干，上班犯困的时候来一包，提神又解馋。就是价格小贵，做活动的时候多囤点。' },
        { userName: '退休老陈', rating: 5, content: '儿女在网上买的，说是有机的梅州金柚。吃了大半辈子柚子，这个品质确实少见。果肉脆嫩，甜而不腻，回味清香。包装也很严实，老人家力气小也能轻松打开。孩子们孝顺，买这么好的柚子给我，心里暖。' },
        { userName: '美食博主小熊', rating: 5, content: '专门买来做柚子茶的，这个金柚的果皮精油含量很足，削皮的时候满屋都是清香。果肉做茶底，果皮糖渍后做配料，做出来的柚子茶比奶茶店的好喝一百倍！品质真的没话说。' },
        { userName: '异地求学小王', rating: 4, content: '想家了在网上下单买梅州金柚，收到的时候真的快哭了，就是家乡的味道。柚子新鲜度没得说，果肉清甜多汁。唯一的遗憾是邮费有点贵，毕竟学生党钱包有限。希望能有学生优惠～' },
        { userName: '品质生活家', rating: 5, content: '买过很多品牌的柚子礼盒，梅州金柚这个是最满意的。从包装设计到产品品质，都透着一股匠心精神。每个柚子都像艺术品一样被对待，送礼自用两相宜。特别是那个品牌手册，里面的品牌故事很打动人。' },
        { userName: '健身达人Ray', rating: 5, content: '健身后喜欢吃柚子补充维C和膳食纤维，梅州金柚成了我的首选。低卡高纤，酸甜解渴，比吃蛋白棒舒服多了。果干也是健身好搭档，天然无添加，增肌减脂期的健康零食。已经回购无数次。' },
        { userName: '家乡味道', rating: 4, content: '客家人看到梅州金柚就忍不住下单了。品质确实好，能吃出来是精心挑选的果子。物流包装都很到位，每个柚子都用泡沫网套保护。虽然价格比其他平台贵一点，但这个品质值得。支持家乡品牌！' },
        { userName: '挑剔买家老李', rating: 3, content: '实事求是的评价：柚子品质中上，但也没有宣传的那么惊艳。可能是我期望值太高了。个头大小不太均匀，希望商家在分级上能更严格一些。不过客服服务态度确实好，这点值得肯定。整体4分水平。' }
    ];

    /* ========== 暴露全局 ========== */
    window.POMELO_DB = {
        list: products,
        byId: byId,
        categories: categories,
        tabTemplates: {
            fresh: freshTabs,
            gift: giftTabs,
            processed: processedTabs
        },
        faqData: {
            fresh: freshFAQ,
            gift: giftFAQ,
            processed: processedFAQ
        },
        reviewSeeds: reviewSeeds
    };

})();
