const animateBackground = (movingBackground) => {
  const position = {
    current: 'Center',
    new: 'Center',
  }

  const animate = (e) => {
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
      startAnimate(movingBackground, position.new, position.current);
    }
  }

  const startAnimate = (movingBackground, to, from) => {
    document.body.removeEventListener('mousemove', animate);
    document.body.addEventListener('animationend', animateEnd, { once: true });
    movingBackground.style.animationName = `moveBackgroundTo${to}From${from}`;
  }

  const animateEnd = () => {
    position.current = position.new;
    document.body.addEventListener('mousemove', animate);
  }

  document.body.addEventListener('mousemove', animate);
}

export { animateBackground };