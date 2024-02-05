import { gsap } from 'gsap';
import IMask from 'imask';
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

  const position = {
    current: 'Center',
    new: 'Center',
  }

  const initJs = () => {
    setMasksForForms();
    resizeDecorLine();
    resizeClipPath();

    document.body.addEventListener('mousemove', animateBackground);
    window.addEventListener('resize', resizeClipPath);
    window.addEventListener('resize', resizeDecorLine);

    let timelines = runInitialGSAPanimations();

    headerBtn.addEventListener('click', () => {
      timelines.forEach((tl) => tl.pause());
      openPageElement(mainContent, serviceForm, 'service-form_open');
    });

    serviceCloseBtn.addEventListener('click', () => {
      timelines = runInitialGSAPanimations();
      closePageElement(mainContent, serviceForm, 'service-form_open');
    });

    burger.addEventListener('click', () => {
      timelines.forEach((tl) => tl.pause());
      openPageElement(mainContent, mobileMenu, 'mobile-menu_open');
    });

    mobileMenuBtnClose.addEventListener('click', () => {
      timelines = runInitialGSAPanimations();
      closePageElement(mainContent, mobileMenu, 'mobile-menu_open');
    });
  }

  const animateBackground = (e) => {
    const left = document.documentElement.clientWidth / 3;
    const right = left * 2;

    if (e.pageX < left) {
      position.new = 'Left';
    } else if (e.pageX < right) {
      position.new = 'Center';
    } else {
      position.new = 'Right';
    }

    if (
      position.current !== position.new
      && (position.current === 'Center' || position.new === 'Center')
    ) {
      startAnimate(position.new, position.current);
    }
  }

  const startAnimate = (to, from) => {
    console.log('animation');
    document.body.removeEventListener('mousemove', animateBackground);
    document.body.addEventListener('animationend', animateBackgroundEnd, { once: true });
    movingBackground.style.animationName = `moveBackgroundTo${to}From${from}`;
  }

  const animateBackgroundEnd = () => {
    position.current = position.new;
    document.body.addEventListener('mousemove', animateBackground);
  }

  const resizeClipPath = () => {
    const clipPathDefaultWidth = 328.5;
    const newWidth = textVideo.getBoundingClientRect().width;

    textVideo.classList.add('text-video_loaded');
    clipPath.style.transform = `scale(${newWidth / clipPathDefaultWidth})`;
  }

  const resizeDecorLine = () => {
    const newHeight = Math.min(mainBlock.getBoundingClientRect().height, 600);
    decorLine.setAttribute('d', `M4 3H6V${newHeight}H4V3Z`);
    decorLineEnd.setAttribute('cy', newHeight);
  }

  const runInitialGSAPanimations = () => {
    gsap.fromTo(
      '.line__svg',
      {
        height: '0%',
      },
      {
        height: '100%',
        duration: 1,
        onComplete: () => {
          document.querySelector('.line__svg').removeAttribute('style');
        }
      }
    );

    const tl = gsap.timeline();
    tl.fromTo(
      '.main__subtitle',
      {
        opacity: '0%',
      },
      {
        opacity: '100%',
        duration: 1,
        onComplete: () => {
          document.querySelector('.main__subtitle').removeAttribute('style');
        }
      }
    );

    tl.fromTo(
      '.text-video',
      {
        opacity: '0%',
      },
      {
        opacity: '100%',
        duration: 1,
        onComplete: () => {
          document.querySelector('.text-video').removeAttribute('style');
        }
      }
    );

    const tlForBack = gsap.timeline({ repeat: -1 });
    const xStore = { x: 0 };
    const moveX = (dx) => (xStore.x += dx, xStore.x);

    tlForBack.fromTo(
      '.perlinback',
      {
        backgroundPositionX: xStore.x,
        opacity: 0.15
      },
      {
        backgroundPositionX: moveX(100),
        opacity: 0.01,
        duration: 2.5,
        ease: 'none',
      },
    ).to(
      '.perlinback',
      {
        backgroundPositionX: moveX(100),
        opacity: 0.15,
        duration: 2.5,
        ease: 'none',
      },
    );

    return [tlForBack, tl];
  }

  const setDateMask = (selector) => {
    IMask(
      document.querySelector(selector),
      {
        mask: Date,
        lazy: false,
        autofix: true,
        blocks: {
          d: { mask: IMask.MaskedRange, placeholderChar: '#', from: 1, to: 31, maxLength: 2 },
          m: { mask: IMask.MaskedRange, placeholderChar: '#', from: 1, to: 12, maxLength: 2 },
          Y: { mask: IMask.MaskedRange, placeholderChar: '#', from: 1000, to: 2030, maxLength: 4 }
        }
      }
    )
  }

  const setPeopleInput = (selector) => {
    IMask(
      document.querySelector(selector),
      {
        lazy: false,
        mask: 'num человек(а)',
        blocks: {
          num: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 9,
            autofix: 'pad',
            signed: true,
            placeholderChar: '#'
          }
        }
      }
    )
  }

  const openPageElement = (targetPage, element, openClass) => {
    targetPage.style.display = "none";
    element.classList.add(openClass);
    gsap.fromTo(
      `.${openClass}`,
      {
        opacity: 0.5,
        top: -100,
        right: -100,
        borderBottomLeftRadius: 500,
      },
      {
        opacity: 1,
        top: 0,
        right: 0,
        duration: 1,
        borderBottomLeftRadius: 0,
      }
    );
  }

  const closePageElement = (targetPage, element, openClass) => {
    targetPage.style.display = "block";
    gsap.fromTo(
      `.${openClass}`,
      {
        opacity: 1,
        top: 0,
        right: 0,
        borderBottomLeftRadius: 0,
        borderBottomLeftRadius: 500,
      },
      {
        opacity: 0,
        top: -100,
        right: -100,
        duration: 1,
        onComplete: () => {
          element.removeAttribute('style');
          element.classList.remove(openClass);
        }
      }
    );
  }

  const setMasksForForms = () => {
    setDateMask('#dateFrom');
    setDateMask('#dateTo');
    setPeopleInput('#humansCount');
  }

  initJs();
})
