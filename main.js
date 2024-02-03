import './styles.scss'

window.addEventListener('load', () => {
  const movingBackground = document.querySelector('.perlinback');
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
    resizeDecorLine();
    resizeClipPath();
    document.body.addEventListener('mousemove', animateBackground);
    window.addEventListener('resize', resizeClipPath);
    window.addEventListener('resize', resizeDecorLine);
    burger.addEventListener('click', toggleBurgerButton);
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
    const newHeight = mainBlock.getBoundingClientRect().height;
    decorLine.setAttribute('d', `M4 3H6V${newHeight}H4V3Z`);
    decorLineEnd.setAttribute('cy', newHeight);
  }

  initJs();
})
