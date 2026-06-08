/* ============================================================
 * login.js - 登录页与用户专区脚本
 * ============================================================ */

(function() {
  'use strict';

  var loginBtn = document.getElementById('login-btn');
  var loginCard = document.getElementById('login-card');
  var userZone = document.getElementById('user-zone');
  var formError = document.getElementById('form-error');

  function showError(message) {
    if (formError) {
      formError.textContent = message;
    }
  }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem('tcm_user') || 'null');
    } catch (err) {
      return null;
    }
  }

  function getJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch (err) {
      return fallback;
    }
  }

  function showZone(user) {
    var footer = document.querySelector('.site-footer');
    var zoneUsername = document.getElementById('zone-username');

    if (loginCard) {
      loginCard.style.display = 'none';
    }

    if (footer) {
      footer.style.display = 'none';
    }

    if (userZone) {
      userZone.style.display = 'block';
    }

    if (zoneUsername) {
      zoneUsername.textContent = (user && (user.displayName || user.name)) || 'admin';
    }

    loadUserZone();
  }

  /*
   * handleLogin - 处理登录表单提交，验证账号密码（admin/admin），写入localStorage
   */
  function handleLogin() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var userValue = username ? username.value.trim() : '';
    var passwordValue = password ? password.value.trim() : '';

    if (!userValue || !passwordValue) {
      showError('账号和密码不能为空');
      return;
    }

    if (userValue === 'admin' && passwordValue === 'admin') {
      localStorage.setItem('tcm_user', JSON.stringify({
        name: userValue,
        displayName: userValue,
        loginTime: Date.now()
      }));
      showError('');
      showZone({ name: userValue, displayName: userValue });
      return;
    }

    if (loginCard) {
      loginCard.classList.add('shake');
      setTimeout(function() {
        loginCard.classList.remove('shake');
      }, 500);
    }

    showError('账号或密码错误，请输入 admin / admin');
  }

  function loadFavorites() {
    var favoritesList = document.getElementById('favorites-list');
    var favorites = getJson('tcm_favorites', []);
    var html = '';

    if (!favoritesList) {
      return;
    }

    if (!favorites.length) {
      favoritesList.innerHTML = '<p class="empty-hint">登录本草百科页，点击药材详情中的“收藏”按钮，即可在此查看。</p>';
      return;
    }

    html += '<ul style="list-style:disc;padding-left:20px;">';
    favorites.forEach(function(name) {
      html += '<li style="color:var(--color-deep);margin-bottom:4px;">' + name + '</li>';
    });
    html += '</ul>';
    favoritesList.innerHTML = html;
  }

  function loadConstitution() {
    var record = document.getElementById('constitution-record');
    var constitution = localStorage.getItem('tcm_constitution');

    if (!record) {
      return;
    }

    if (!constitution) {
      record.innerHTML = '<p class="empty-hint">完成养生保健页中的体质测试后，结果将自动保存于此。</p>';
      return;
    }

    record.innerHTML = '<p style="color:var(--color-deep);">' + constitution + '</p>';
  }

  function loadCheckin() {
    var streakEl = document.getElementById('streak-days');
    var checkinData = getJson('tcm_checkin', { lastDate: '', streak: 0 });

    if (streakEl) {
      streakEl.textContent = checkinData.streak;
    }
  }

  function loadNotes() {
    var notesArea = document.getElementById('notes-area');
    if (notesArea) {
      notesArea.value = localStorage.getItem('tcm_notes') || '';
    }
  }

  function loadUserZone() {
    loadFavorites();
    loadConstitution();
    loadCheckin();
    loadNotes();
  }

  function checkLoginState() {
    var user = getUser();
    if (user && user.name) {
      showZone(user);
    }
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && loginCard && loginCard.style.display !== 'none') {
      handleLogin();
    }
  });

  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('tcm_user');
      window.location.reload();
    });
  }

  var checkinBtn = document.getElementById('checkin-btn');
  if (checkinBtn) {
    checkinBtn.addEventListener('click', function() {
      var today = new Date().toDateString();
      var yesterday = new Date(Date.now() - 86400000).toDateString();
      var checkinData = getJson('tcm_checkin', { lastDate: '', streak: 0 });
      var streakEl = document.getElementById('streak-days');

      if (checkinData.lastDate === today) {
        alert('今日已打卡，明日再来。');
        return;
      }

      if (checkinData.lastDate === yesterday) {
        checkinData.streak += 1;
      } else {
        checkinData.streak = 1;
      }

      checkinData.lastDate = today;
      localStorage.setItem('tcm_checkin', JSON.stringify(checkinData));

      if (streakEl) {
        streakEl.textContent = checkinData.streak;
      }

      alert('打卡成功，已连续打卡 ' + checkinData.streak + ' 天。');
    });
  }

  var saveNotesBtn = document.getElementById('save-notes-btn');
  if (saveNotesBtn) {
    saveNotesBtn.addEventListener('click', function() {
      var notesArea = document.getElementById('notes-area');
      if (!notesArea) {
        return;
      }

      localStorage.setItem('tcm_notes', notesArea.value);
      alert('笔记已保存。');
    });
  }

  checkLoginState();
})();
