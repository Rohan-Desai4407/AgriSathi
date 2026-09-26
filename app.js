// ================================================== //
// AGRISATHI CORE PLATFORM INTERACTION SCRIPT         //
// ================================================== //

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCharts();
  initImpactCounters();
  initMarketplaceTabs();
});

/* ================================================== */
/* 1. NAVIGATION & MOBILE DRAWER                      */
/* ================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const openAuthBtn = document.getElementById('openAuthBtn');
  const heroDashboardBtn = document.getElementById('heroDashboardBtn');

  // Compact navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });

  // Auth & CTA Click Handlers
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => openAuthModal('signup'));
  }
  if (openAuthBtn) {
    openAuthBtn.addEventListener('click', () => openAuthModal('signin'));
  }
  if (heroDashboardBtn) {
    heroDashboardBtn.addEventListener('click', () => openFullDashboardModal());
  }
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ================================================== */
/* 2. CHART.JS DATA VISUALIZATIONS                    */
/* ================================================== */
let soilChartInstance = null;
let marketChartInstance = null;

function initCharts() {
  // Chart 1: Dashboard Soil Moisture & Weather Trend
  const ctxSoil = document.getElementById('soilMoistureChart');
  if (ctxSoil) {
    soilChartInstance = new Chart(ctxSoil, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Soil Moisture (%)',
            data: [62, 65, 70, 68, 64, 68, 72],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#34D399',
            pointBorderColor: '#06130D',
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Ambient Temp (°C)',
            data: [26, 28, 29, 31, 28, 27, 28],
            borderColor: '#F59E0B',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: '#F59E0B',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94A3B8' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94A3B8' }
          }
        }
      }
    });
  }

  // Chart 2: Marketplace Price Movements
  const ctxMarket = document.getElementById('marketTrendChart');
  if (ctxMarket) {
    marketChartInstance = new Chart(ctxMarket, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Wheat (Vadodara)',
            data: [2320, 2380, 2410, 2450],
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            fill: true,
            tension: 0.3,
            borderWidth: 2.5
          },
          {
            label: 'Cotton (Rajkot)',
            data: [6950, 7050, 7120, 7200],
            borderColor: '#10B981',
            backgroundColor: 'transparent',
            tension: 0.3,
            borderWidth: 2.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94A3B8' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94A3B8' } }
        }
      }
    });
  }
}

/* ================================================== */
/* 3. AI FARM ASSISTANT CHAT ENGINE                   */
/* ================================================== */
const aiKnowledgeBase = {
  yellow: {
    text: "Yellowing leaves signal either nitrogen deficiency or slight under-watering. Based on your live telemetry data, your North Field soil moisture is 42%.",
    recs: [
      "💧 Increase drip irrigation cycle by 15-20 minutes after 5:00 PM.",
      "🌱 Apply organic nitrogen fertilizer during next fertigation cycle.",
      "🔍 Inspect undersides of leaves for early aphids or yellow spot fungi."
    ]
  },
  wheat: {
    text: "For wheat in the flowering stage, apply nitrogen-phosphorus booster prior to irrigation. Avoid chemical spray during high noon sun.",
    recs: [
      "⏰ Best application window: Early morning (6:00 AM - 8:00 AM).",
      "💧 Irrigate within 12 hours after booster distribution.",
      "🌾 Monitor flag leaf health for rust prevention."
    ]
  },
  rain: {
    text: "Current radar forecast predicts a 30% chance of light showers in Vadodara tomorrow afternoon (around 2:00 PM - 5:00 PM).",
    recs: [
      "🌧 Delay scheduled heavy drip irrigation until tomorrow evening.",
      "🚜 Postpone chemical pesticide spraying by 24 hours.",
      "🌊 Verify drainage channels around Block B tomato beds are clear."
    ]
  },
  cotton: {
    text: "Cotton market price in Rajkot APMC mandi is trending upward at ₹7,200 per quintal (+2.0% gain over last week).",
    recs: [
      "📈 Favorable selling window open for Grade A cotton.",
      "📦 List your harvest directly on AgriSathi Marketplace for direct buyer quotes.",
      "🚚 Verify direct transport options in marketplace modal."
    ]
  },
  default: {
    text: "Thank you for consulting AgriSathi AI! Our localized agricultural model recommends monitoring live field sensors and staying aligned with local APMC market trends.",
    recs: [
      "📊 Review field health telemetry on your Dashboard Control Center.",
      "💧 Verify soil moisture levels prior to next irrigation.",
      "👨‍🌾 Reach out to certified extension agronomists for soil testing."
    ]
  }
};

function sendPresetQuery(queryText) {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.value = queryText;
    submitUserQuery();
  }
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') {
    submitUserQuery();
  }
}

function submitUserQuery() {
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  if (!chatInput || !chatInput.value.trim()) return;

  const userText = chatInput.value.trim();
  chatInput.value = '';

  // Append User Message
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const userMsgHTML = `
    <div class="message msg-user">
      <div class="msg-avatar">👨‍🌾</div>
      <div class="msg-bubble">
        <p>${escapeHTML(userText)}</p>
        <span class="msg-time">${timeStr}</span>
      </div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', userMsgHTML);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate AI Typing Response
  const typingHTML = `
    <div class="message msg-ai" id="typingIndicator">
      <div class="msg-avatar ai-avatar"><i data-lucide="sprout"></i></div>
      <div class="msg-bubble">
        <p><em>AgriSathi AI is analyzing field sensors and weather radar...</em></p>
      </div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', typingHTML);
  if (window.lucide) lucide.createIcons();
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    const typingElem = document.getElementById('typingIndicator');
    if (typingElem) typingElem.remove();

    // Determine Response based on keywords
    let responseData = aiKnowledgeBase.default;
    const lower = userText.toLowerCase();
    if (lower.includes('yellow') || lower.includes('leaves') || lower.includes('check')) responseData = aiKnowledgeBase.yellow;
    else if (lower.includes('wheat') || lower.includes('fertilizer')) responseData = aiKnowledgeBase.wheat;
    else if (lower.includes('rain') || lower.includes('vadodara') || lower.includes('weather')) responseData = aiKnowledgeBase.rain;
    else if (lower.includes('cotton') || lower.includes('rate') || lower.includes('market')) responseData = aiKnowledgeBase.cotton;

    const recsHTML = responseData.recs.map(r => `<div class="rec-item"><span>${r}</span></div>`).join('');

    const aiMsgHTML = `
      <div class="message msg-ai">
        <div class="msg-avatar ai-avatar"><i data-lucide="sprout"></i></div>
        <div class="msg-bubble">
          <p>${responseData.text}</p>
          <div class="ai-recommendations-box">
            <div class="rec-title"><i data-lucide="check-square"></i> Actionable AI Guidance:</div>
            <div class="rec-list">${recsHTML}</div>
          </div>
          <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', aiMsgHTML);
    if (window.lucide) lucide.createIcons();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 900);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ================================================== */
/* 4. CROP GROWTH TIMELINE TRACKER                    */
/* ================================================== */
const growthStageInfo = {
  1: "<strong>Seed & Germination Stage:</strong> Optimal soil hydration target is 75%. Soil temperature around 22°C. Root establishment active.",
  2: "<strong>Vegetative Stage:</strong> Rapid leaf canopy growth. High nitrogen requirement. Moisture target: 65%-70%.",
  3: "<strong>Flowering Stage (Current):</strong> Crop requires consistent moisture and phosphorus boost. AI predicts harvest readiness in 22 days.",
  4: "<strong>Harvest Stage:</strong> Reduce drip irrigation to allow grain drying. Monitor live APMC mandi rates on AgriSathi Marketplace."
};

function setGrowthStage(stageNum) {
  const steps = document.querySelectorAll('.t-step');
  const lines = document.querySelectorAll('.t-line');
  const desc = document.getElementById('growthStageDesc');

  steps.forEach((step, idx) => {
    step.classList.remove('step-done', 'step-active');
    if (idx + 1 < stageNum) {
      step.classList.add('step-done');
    } else if (idx + 1 === stageNum) {
      step.classList.add('step-active');
    }
  });

  lines.forEach((line, idx) => {
    line.classList.remove('line-done', 'line-active');
    if (idx + 1 < stageNum) {
      line.classList.add('line-done');
    } else if (idx + 1 === stageNum) {
      line.classList.add('line-active');
    }
  });

  if (desc && growthStageInfo[stageNum]) {
    desc.innerHTML = growthStageInfo[stageNum];
  }
}

/* ================================================== */
/* 5. MARKETPLACE CATEGORY FILTERING                  */
/* ================================================== */
function initMarketplaceTabs() {
  const tabs = document.querySelectorAll('#marketTabs .tab-btn');
  const cards = document.querySelectorAll('#marketGrid .market-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-cat');
      cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ================================================== */
/* 6. IMPACT COUNTER ANIMATIONS                       */
/* ================================================== */
function initImpactCounters() {
  const elements = document.querySelectorAll('.impact-val');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        if (target <= 0) {
          observer.unobserve(el);
          return;
        }
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString();
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  elements.forEach(el => observer.observe(el));
}

/* ================================================== */
/* 7. MODAL HANDLERS                                  */
/* ================================================== */
function openAuthModal(mode) {
  const modal = document.getElementById('authModal');
  const title = document.getElementById('authModalTitle');
  const sub = document.getElementById('authModalSub');
  if (title && sub) {
    if (mode === 'signup') {
      title.textContent = "Join AgriSathi Platform";
      sub.textContent = "Create your free farm profile & access AI field insights.";
    } else {
      title.textContent = "Welcome Back to AgriSathi";
      sub.textContent = "Sign in to manage field telemetry & market trades.";
    }
  }
  if (modal) {
    modal.classList.add('active');
    if (window.lucide) lucide.createIcons();
  }
}

function openBuyModal(cropName, price, seller, location) {
  const modal = document.getElementById('buyModal');
  document.getElementById('buyCropName').textContent = cropName;
  document.getElementById('buyCropPrice').textContent = price;
  document.getElementById('buySeller').textContent = seller;
  document.getElementById('buyLocation').textContent = location;
  if (modal) {
    modal.classList.add('active');
    if (window.lucide) lucide.createIcons();
  }
}

function openListProduceModal() {
  const modal = document.getElementById('listModal');
  if (modal) {
    modal.classList.add('active');
    if (window.lucide) lucide.createIcons();
  }
}

function openFullDashboardModal() {
  const modal = document.getElementById('fullDashModal');
  if (modal) {
    modal.classList.add('active');
    if (window.lucide) lucide.createIcons();
    setTimeout(initFullDashCharts, 100);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function handleAuthSubmit(e) {
  e.preventDefault();
  closeModal('authModal');
  alert("🎉 Success! Welcome to AgriSathi Control Center.");
}

function handleBuySubmit(e) {
  e.preventDefault();
  closeModal('buyModal');
  alert("🌾 Buy trade request sent directly to the farmer! They will contact you shortly.");
}

function handleListProduceSubmit(e) {
  e.preventDefault();
  closeModal('listModal');
  alert("✅ Your produce listing has been published live on AgriSathi Marketplace!");
}

function triggerIrrigationDemo() {
  alert("💧 Drip Irrigation Activated for Block B Tomato Field! Water pressure optimal at 2.4 bar.");
}

/* Initialize Full Dashboard Overlay Charts */
let fullDashChart1Inst = null;
let fullDashChart2Inst = null;

function initFullDashCharts() {
  const ctx1 = document.getElementById('fullDashChart1');
  if (ctx1 && !fullDashChart1Inst) {
    fullDashChart1Inst = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Block A (Wheat)', 'Block B (Tomato)', 'Block C (Cotton)', 'Block D (Rice)'],
        datasets: [{
          label: 'Soil Hydration (%)',
          data: [72, 42, 68, 80],
          backgroundColor: ['#10B981', '#F59E0B', '#10B981', '#06B6D4'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#94A3B8' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } }
        }
      }
    });
  }

  const ctx2 = document.getElementById('fullDashChart2');
  if (ctx2 && !fullDashChart2Inst) {
    fullDashChart2Inst = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Optimal Vigour', 'Water Deficit Alert', 'Growth Target Met'],
        datasets: [{
          data: [75, 15, 10],
          backgroundColor: ['#10B981', '#F59E0B', '#06B6D4'],
          borderColor: '#0B1E15',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#ECFDF5' } }
        }
      }
    });
  }
}
