/* ==========================================================================
   main.js — 全站交互脚本（无依赖，原生 JavaScript）
   仅包含必要交互：
     1. 移动端汉堡菜单
     2. 浅色 / 深色主题切换（含系统偏好跟随、localStorage 记忆）
     3. 页脚当前年份
     4. 联系表单的轻量前端校验与提示
   所有功能在 DOM 就绪后初始化，任一元素缺失都不会报错。
   ========================================================================== */

(function () {
  "use strict";

  /** localStorage 中保存主题偏好的键名 */
  var THEME_KEY = "personal-site-theme";

  /* ------------------------------------------------------------------
     工具函数
     ------------------------------------------------------------------ */

  /** 安全地读取 localStorage（隐私模式下可能抛错） */
  function readStoredTheme() {
    try {
      return window.localStorage.getItem(THEME_KEY);
    } catch (error) {
      return null;
    }
  }

  /** 安全地写入 localStorage */
  function storeTheme(theme) {
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      /* 忽略存储失败，不影响主题切换本身 */
    }
  }

  /** 系统是否偏好深色 */
  function systemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  /* ------------------------------------------------------------------
     1. 主题切换
     ------------------------------------------------------------------ */

  function initThemeToggle() {
    var root = document.documentElement;
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    if (!buttons.length) {
      return;
    }

    /** 同步按钮的无障碍状态 */
    function syncButtons(theme) {
      var isDark = theme === "dark";
      Array.prototype.forEach.call(buttons, function (button) {
        button.setAttribute("aria-pressed", isDark ? "true" : "false");
        button.setAttribute(
          "aria-label",
          isDark ? "切换到浅色主题" : "切换到深色主题"
        );
      });
    }

    /** 应用主题并写回存储 */
    function applyTheme(theme, persist) {
      if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
      } else {
        root.removeAttribute("data-theme");
      }
      if (persist) {
        storeTheme(theme);
      }
      syncButtons(theme);
    }

    // 以当前 DOM 上的状态为准（内联脚本已尽量在首屏前设好）
    var current =
      root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    syncButtons(current);

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        var next =
          root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next, true);
      });
    });

    // 用户未手动选择时，跟随系统偏好变化
    if (window.matchMedia) {
      var query = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function (event) {
        if (readStoredTheme()) {
          return; // 已手动选择，不再自动切换
        }
        applyTheme(event.matches ? "dark" : "light", false);
      };
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", onChange);
      } else if (typeof query.addListener === "function") {
        query.addListener(onChange); // 兼容旧版浏览器
      }
    }
  }

  /* ------------------------------------------------------------------
     2. 移动端汉堡菜单
     ------------------------------------------------------------------ */

  function initNavMenu() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) {
      return;
    }

    var DESKTOP_QUERY = "(min-width: 1024px)";

    function isDesktop() {
      return window.matchMedia && window.matchMedia(DESKTOP_QUERY).matches;
    }

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      // 按钮文案随状态变化，屏幕阅读器才能听懂
      toggle.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
    }

    function close() {
      setOpen(false);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // 点击菜单内链接后自动收起
    Array.prototype.forEach.call(menu.querySelectorAll("a"), function (link) {
      link.addEventListener("click", close);
    });

    // Esc 关闭并把焦点交还按钮
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        close();
        toggle.focus();
      }
    });

    // 点击菜单外部区域关闭
    document.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") !== "true") {
        return;
      }
      if (menu.contains(event.target) || toggle.contains(event.target)) {
        return;
      }
      close();
    });

    // 视口切回桌面端时收起移动菜单
    window.addEventListener("resize", function () {
      if (isDesktop() && toggle.getAttribute("aria-expanded") === "true") {
        close();
      }
    });
  }

  /* ------------------------------------------------------------------
     3. 页脚当前年份
     ------------------------------------------------------------------ */

  function initYear() {
    var nodes = document.querySelectorAll("[data-current-year]");
    if (!nodes.length) {
      return;
    }
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(nodes, function (node) {
      node.textContent = year;
    });
  }

  /* ------------------------------------------------------------------
     4. 联系表单提示（纯前端，不发送真实请求）
     ------------------------------------------------------------------ */

  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) {
      return;
    }

    var status = form.querySelector("[data-form-status]");
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    /** 在字段旁显示 / 清除错误 */
    function setFieldError(field, message) {
      var wrapper = field.closest(".form-field");
      if (!wrapper) {
        return;
      }
      var errorNode = wrapper.querySelector(".field-error");
      if (message) {
        wrapper.classList.add("has-error");
        field.setAttribute("aria-invalid", "true");
        if (errorNode) {
          errorNode.textContent = message;
        }
      } else {
        wrapper.classList.remove("has-error");
        field.removeAttribute("aria-invalid");
        if (errorNode) {
          errorNode.textContent = "";
        }
      }
    }

    /** 校验单个字段，返回是否通过 */
    function validateField(field) {
      var value = (field.value || "").trim();
      var type = field.getAttribute("data-validate") || field.type;

      if (field.required && value === "") {
        setFieldError(field, "请填写" + (field.getAttribute("data-label") || "此项") + "。");
        return false;
      }
      if (type === "email" && value !== "" && !EMAIL_RE.test(value)) {
        setFieldError(field, "邮箱格式好像不太对，请检查一下。");
        return false;
      }
      if (field.minLength > 0 && value !== "" && value.length < field.minLength) {
        setFieldError(field, "内容太短啦，至少 " + field.minLength + " 个字符。");
        return false;
      }
      setFieldError(field, "");
      return true;
    }

    var fields = Array.prototype.slice.call(
      form.querySelectorAll("input, textarea")
    );

    // 失焦时即时校验（提交前不打扰用户）
    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
      field.addEventListener("input", function () {
        var wrapper = field.closest(".form-field");
        if (wrapper && wrapper.classList.contains("has-error")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // 静态站点：不做后端提交

      var firstInvalid = null;
      fields.forEach(function (field) {
        var ok = validateField(field);
        if (!ok && !firstInvalid) {
          firstInvalid = field;
        }
      });

      if (firstInvalid) {
        if (status) {
          status.textContent = "还有几项需要补充，请检查标红的字段。";
          status.classList.add("is-visible");
        }
        firstInvalid.focus();
        return;
      }

      if (status) {
        status.textContent =
          "谢谢你的留言！这是静态演示表单，内容不会真的发送出去，欢迎直接发邮件给我。";
        status.classList.add("is-visible");
      }
      form.reset();
      fields.forEach(function (field) {
        setFieldError(field, "");
      });
    });
  }

  /* ------------------------------------------------------------------
     初始化
     ------------------------------------------------------------------ */

  function init() {
    initThemeToggle();
    initNavMenu();
    initYear();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
