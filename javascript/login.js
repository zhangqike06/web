/* ============================================================
 * login.js - 登录页脚本
 * 功能：表单验证、趣味验证码（Canvas）、localStorage登录态、
 *        用户专区（收藏夹、体质档案、打卡日历、笔记）
 * ============================================================ */

(function() {
  'use strict';

  /* ============================================================
   * Canvas趣味验证码生成
   * ============================================================ */
  var captchaCanvas = document.getElementById('captcha-canvas');
  var captchaText = '';

  /**
   * generateCaptcha - 生成随机4位验证码并在Canvas上绘制
   */
  function generateCaptcha() {
    if (!captchaCanvas) return;

    var ctx = captchaCanvas.getContext('2d');
    var width = captchaCanvas.width;
    var height = captchaCanvas.height;

    /* 清空画布 */
    ctx.clearRect(0, 0, width, height);

    /* 生成随机4位字母数字组合 */
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    captchaText = '';
    for (var i = 0; i < 4; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    /* 背景 */
    ctx.fillStyle = 'rgba(243,248,254,0.8)';
    ctx.fillRect(0, 0, width, height);

    /* 干扰线 */
    for (var i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.strokeStyle = 'rgba(180,150,140,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    /* 干扰点 */
    for (var j = 0; j < 30; j++) {
      ctx.fillStyle = 'rgba(190,130,140,0.3)';
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
    }

    /* 绘制文字（每个字符独立旋转） */
    ctx.font = 'bold 22px Georgia,"Times New Roman","KaiTi",serif';
    for (var k = 0; k < captchaText.length; k++) {
      ctx.save();
      var x = 14 + k * 22;
      var y = 24 + Math.random() * 6;
      var angle = (Math.random() - 0.5) * 0.4;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = 'rgb(' +
        Math.floor(100 + Math.random() * 100) + ',' +
        Math.floor(50 + Math.random() * 80) + ',' +
        Math.floor(40 + Math.random() * 60) + ')';
      ctx.fillText(captchaText.charAt(k), 0, 0);
      ctx.restore();
    }
  }

  /* 初始生成验证码 */
  generateCaptcha();

  /* 点击验证码图片刷新 */
  if (captchaCanvas) {
    captchaCanvas.addEventListener('click', generateCaptcha);
  }

  /* 点击刷新按钮 */
  var captchaRefresh = document.getElementById('captcha-refresh');
  if (captchaRefresh) {
    captchaRefresh.addEventListener('click', generateCaptcha);
  }

  /* ============================================================
   * 登录表单处理
   * ============================================================ */
  var loginBtn  = document.getElementById('login-btn');
  var loginCard = document.getElementById('login-card');
  var formError = document.getElementById('form-error');

  /**
   * showError - 显示错误提示
   */
  function showError(msg) {
    if (formError) {
      formError.textContent = msg;
    }
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      var username = document.getElementById('username').value.trim();
      var password = document.getElementById('password').value.trim();
      var captchaInput = document.getElementById('captcha-input').value.trim().toUpperCase();

      /* 验证非空 */
      if (!username || !password) {
        showError('账号和密码不能为空');
        return;
      }

      /* 验证验证码 */
      if (captchaInput !== captchaText) {
        showError('验证码错误，请重新输入');
        generateCaptcha();
        return;
      }

      /* 验证账号密码 */
      if (username === 'admin' && password === 'admin') {
        /* 登录成功 */
        showError('');

        /* 保存登录状态到localStorage */
        localStorage.setItem('tcm_user', JSON.stringify({
          name: username,
          displayName: username,
          loginTime: Date.now()
        }));

        /* 显示登录成功并展示专区 */
        document.querySelector('.login-card').style.display = 'none';
        document.querySelector('.site-footer').style.display = 'none';
        document.getElementById('user-zone').style.display = 'block';
        var zoneUsername = document.getElementById('zone-username');
        if (zoneUsername) zoneUsername.textContent = username;

        loadUserZone();
      } else {
        /* 登录失败：卡片抖动动画 */
        if (loginCard) {
          loginCard.classList.add('shake');
          setTimeout(function() {
            loginCard.classList.remove('shake');
          }, 500);
        }
        showError('账号或密码错误，请输入 admin / admin');
        generateCaptcha();
      }
    });
  }

  /* 回车键登录 */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && loginCard && loginCard.style.display !== 'none') {
      if (loginBtn) loginBtn.click();
    }
  });

  /* ============================================================
   * 用户专区功能（localStorage）
   * ============================================================ */

  /**
   * loadUserZone - 加载用户专区的各项数据
   */
  function loadUserZone() {
    loadFavorites();
    loadConstitution();
    loadCheckin();
    loadNotes();
  }

  /* 页面加载时检查登录状态 */
  function checkLoginState() {
    var userData = localStorage.getItem('tcm_user');
    var parsedUser = null;
    if (userData) {
      try {
        parsedUser = JSON.parse(userData);
      } catch (err) {
        parsedUser = null;
      }

      /* 已登录，直接显示专区 */
      var loginCardEl = document.querySelector('.login-card');
      var footerEl = document.querySelector('.site-footer');
      var zoneEl = document.getElementById('user-zone');
      var zoneUsernameEl = document.getElementById('zone-username');
      if (loginCardEl) loginCardEl.style.display = 'none';
      if (footerEl) footerEl.style.display = 'none';
      if (zoneUsernameEl && parsedUser && parsedUser.name) {
        zoneUsernameEl.textContent = parsedUser.displayName || parsedUser.name;
      }
      if (zoneEl) {
        zoneEl.style.display = 'block';
        loadUserZone();
      }
    }
  }

  /* 退出登录 */
  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('tcm_user');
      window.location.reload();
    });
  }

  /* ============================================================
   * 草药收藏夹
   * ============================================================ */
  function loadFavorites() {
    var favoritesList = document.getElementById('favorites-list');
    if (!favoritesList) return;

    var favorites = JSON.parse(localStorage.getItem('tcm_favorites') || '[]');
    if (favorites.length === 0) {
      favoritesList.innerHTML = '<p class="empty-hint">登录本草百科页，点击药材详情中的"收藏"按钮，即可在此查看。</p>';
    } else {
      var html = '<ul style="list-style:disc;padding-left:20px;">';
      favorites.forEach(function(name) {
        html += '<li style="color:var(--color-deep);margin-bottom:4px;">' + name + '</li>';
      });
      html += '</ul>';
      favoritesList.innerHTML = html;
    }
  }

  /* ============================================================
   * 体质档案
   * ============================================================ */
  function loadConstitution() {
    var record = document.getElementById('constitution-record');
    if (!record) return;

    var constitution = localStorage.getItem('tcm_constitution');
    if (!constitution) {
      record.innerHTML = '<p class="empty-hint">完成养生保健页中的体质测试后，结果将自动保存于此。</p>';
    } else {
      record.innerHTML = '<p style="color:var(--color-deep);">' + constitution + '</p>';
    }
  }

  /* ============================================================
   * 每日打卡
   * ============================================================ */
  function loadCheckin() {
    var streakEl = document.getElementById('streak-days');
    if (!streakEl) return;

    var checkinData = JSON.parse(localStorage.getItem('tcm_checkin') || '{"lastDate":"","streak":0}');
    streakEl.textContent = checkinData.streak;
  }

  var checkinBtn = document.getElementById('checkin-btn');
  if (checkinBtn) {
    checkinBtn.addEventListener('click', function() {
      var today = new Date().toDateString();
      var checkinData = JSON.parse(localStorage.getItem('tcm_checkin') || '{"lastDate":"","streak":0}');
      var yesterday = new Date(Date.now() - 86400000).toDateString();

      if (checkinData.lastDate === today) {
        alert('今日已打卡，明日再来！');
        return;
      }

      if (checkinData.lastDate === yesterday) {
        checkinData.streak += 1;
      } else {
        checkinData.streak = 1;
      }

      checkinData.lastDate = today;
      localStorage.setItem('tcm_checkin', JSON.stringify(checkinData));

      var streakEl = document.getElementById('streak-days');
      if (streakEl) streakEl.textContent = checkinData.streak;

      alert('打卡成功！已连续打卡 ' + checkinData.streak + ' 天');
    });
  }

  /* ============================================================
   * 养生笔记
   * ============================================================ */
  function loadNotes() {
    var notesArea = document.getElementById('notes-area');
    if (!notesArea) return;

    var notes = localStorage.getItem('tcm_notes') || '';
    notesArea.value = notes;
  }

  var saveNotesBtn = document.getElementById('save-notes-btn');
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener('click', function() {
      var notesArea = document.getElementById('notes-area');
      if (!notesArea) return;
      localStorage.setItem('tcm_notes', notesArea.value);
      alert('笔记已保存！');
    });
  }

  /* ============================================================
   * 初始化：检查登录状态
   * ============================================================ */
  checkLoginState();

})();
