const resizeClipPath = (clipPath, textVideo) => {
  const clipPathDefaultWidth = 328.5;
  const newWidth = textVideo.getBoundingClientRect().width;

  textVideo.classList.add('text-video_loaded');
  clipPath.style.transform = `scale(${newWidth / clipPathDefaultWidth})`;
}

const resizeDecorLine = (mainBlock, decorLine, decorLineEnd) => {
  const newHeight = Math.min(mainBlock.getBoundingClientRect().height, 600);
  decorLine.setAttribute('d', `M4 3H6V${newHeight}H4V3Z`);
  decorLineEnd.setAttribute('cy', newHeight);
}

export { resizeClipPath, resizeDecorLine };