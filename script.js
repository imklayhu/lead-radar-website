/* Lead Radar 官网交互脚本（纯原生 JS，无依赖） */

// 移动端导航折叠
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // 点击菜单项后收起菜单
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 滚动时给导航加投影（增强视觉层次）
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 8 ? "0 4px 16px rgba(15, 23, 42, 0.06)" : "none";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// FAQ：同一时间只展开一个（details 互斥，提升浏览体验）
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// 数字滚动动画：成本亮点数字进入视口时播放
function animateCount(el) {
  const target = parseFloat(el.dataset.value);
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
  const suffix = el.dataset.suffix || "";
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("zh-CN")) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll("[data-counter]");
if ("IntersectionObserver" in window && counters.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => io.observe(c));
} else {
  counters.forEach((c) => {
    c.textContent = c.dataset.value;
  });
}
