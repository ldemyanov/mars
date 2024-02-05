import { setDateMask, setPeopleMask } from './input-mask';
import { runInitialGSAPanimations, openPageElement, closePageElement } from './gsap-animations';
import { resizeClipPath, resizeDecorLine } from './resize';
import { animateBackground } from './backgorund';
 
import '/styles.scss';

window.addEventListener('load', () => {
  const mainContent = document.querySelector('#mainContent');
  const movingBackground = document.querySelector('.starsback');
  const clipPath = document.querySelector('#clipPathMars');
  const burger = document.querySelector('.burger');
  const decorLine = document.querySelector('#decorLine');
  const decorLineEnd = document.querySelector('#decorLineEnd');
  const mainBlock = document.querySelector('.main');
  const textVideo = document.querySelector('.text-video');
  const headerBtn = document.querySelector('.header__btn');
  const serviceForm = document.querySelector('.service-form');
  const serviceCloseBtn = document.querySelector('.service-form__btn-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuBtnClose = document.querySelector('.mobile-menu__btn-close');

  const initJs = () => {
    resize();
    animateBackground(movingBackground);
    setMasksForForm('#dateFrom', '#dateTo', '#humansCount');

    window.addEventListener('resize', resize);

    let timelines = runInitialGSAPanimations();

    headerBtn.addEventListener('click', () => {
      timelines.forEach((tl) => tl.pause());
      openPageElement(mainContent, serviceForm, 'service-form_open');
    });

    serviceCloseBtn.addEventListener('click', () => {
      timelines = runInitialGSAPanimations();
      closePageElement(mainContent, serviceForm, 'service-form_open');
      resize()
    });

    burger.addEventListener('click', () => {
      timelines.forEach((tl) => tl.pause());
      openPageElement(mainContent, mobileMenu, 'mobile-menu_open');
    });

    mobileMenuBtnClose.addEventListener('click', () => {
      timelines = runInitialGSAPanimations();
      closePageElement(mainContent, mobileMenu, 'mobile-menu_open');
      resize();
    });
  }

  const resize = () => {
    resizeDecorLine(mainBlock, decorLine, decorLineEnd);
    resizeClipPath(clipPath, textVideo);
  }

  const setMasksForForm = (dateFrom, dateTo, humansCount) => {
    setDateMask(dateFrom);
    setDateMask(dateTo);
    setPeopleMask(humansCount);
  }

  initJs();
})
