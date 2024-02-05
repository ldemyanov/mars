import { gsap } from 'gsap';

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

export { runInitialGSAPanimations, openPageElement, closePageElement }