import './styles.scss'

window.addEventListener("load", () => {
  const movingBackground = document.querySelector('.perlinback');

  const position = {
    current: 'Center',
    new: 'Center',
  }

  const initJs = () => {
    resizeClipPath();
    document.body.addEventListener('mousemove', animateBackground);
    window.addEventListener('resize', resizeClipPath);
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
    const clipPath = document.querySelector('#clipPathMars');
    const newWidth = document.querySelector('.text-video').getBoundingClientRect().width;

    clipPath.style.transform = `scale(${newWidth / clipPathDefaultWidth})`;
  }

  initJs();
})
