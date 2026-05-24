/* ============================================================
 * animation.js - 公共动效脚本
 * 功能：滚动触发入场动画（IntersectionObserver）、3D翻牌
 * ============================================================ */

(function() {
  'use strict';

  /* ============================================================
   * IntersectionObserver：滚动触发时间轴节点入场动画
   * ============================================================ */
  var observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        /* 动画只触发一次，进入后不再观察 */
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  /* 观察所有时间轴节点 */
  var timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(function(item) {
    observer.observe(item);
  });

  /* ============================================================
   * 通用滚动触发动画（适用于任何带 animate-on-scroll 类的元素）
   * ============================================================ */
  var scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  var animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(function(el) {
    scrollObserver.observe(el);
  });

})();
