import { gsap } from 'gsap';
import IMask from 'imask';
import './styles.scss'

window.addEventListener('load', () => {
  const movingBackground = document.querySelector('.starsback');
  const clipPath = document.querySelector('#clipPathMars');
  const burger = document.querySelector('.burger');
  const decorLine = document.querySelector('#decorLine');
  const decorLineEnd = document.querySelector('#decorLineEnd');
  const mainBlock = document.querySelector('.main');
  const textVideo = document.querySelector('.text-video');

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
    burger.addEventListener('click', toggleBurgerButton);
    runInitialGSAPanimations();
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

    clipPath.style.transform = `scale(${newWidth / clipPathDefaultWidth})`;
  }

  const toggleBurgerButton = () => {
    burger.classList.toggle('open');
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
    )
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

  // var maskOptions = {
  //   lazy: false, // <-- HERE
  //   mask: 'num €',
  //   blocks: {
  //     num: {
  //       mask: Number

  const setPeopleInput = (selector) => {
    IMask(
      document.querySelector(selector),
      {
        lazy: false,
        mask: 'num человек(а)',
        blocks: {
          num: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 20,
            autofix: 'pad',
            signed: true,
            placeholderChar: '#'
          }
        }
      }
    )
  }

  const setMasksForForms = () => {
    setDateMask('#dateFrom');
    setDateMask('#dateTo');
    setPeopleInput('#humansCount');
  }

  initJs();
})
