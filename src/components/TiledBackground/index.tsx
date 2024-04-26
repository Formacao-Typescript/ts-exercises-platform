import React, { useEffect } from 'react';
import anime from 'animejs';
import { Container } from './styles';
import { createGrid, findClosestTile } from '@/utils/tilegrid';

interface Props {
  tileSize?: number;
}

const TiledBackground: React.FC<Props> = ({ tileSize = 50 }) => {
  const [isTileToggled, setIsTileToggled] = React.useState(false);
  const [isClickLocked, setIsClickLocked] = React.useState(false);

  const handleTileClick = (index: number, columns: number, rows: number) => {
    const toggled = !isTileToggled;
    anime({
      targets: '.tile',
      easing: 'easeOutExpo',
      // opacity: toggled ? 0 : 1,
      // border: toggled ? '' : '1px solid #fff',
      borderRadius: toggled ? ['0%', '50%'] : ['50%', '0%'],
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(tileSize, {
        grid: [columns, rows],
        from: index,
      }),
    });
    setIsTileToggled(!isTileToggled);
  };

  useEffect(() => {
    const wrapper = document.getElementById('tiles');

    window.onresize = () => createGrid(wrapper!, tileSize, handleTileClick);

    createGrid(wrapper!, tileSize, handleTileClick);

    return () => {
      window.onresize = null;
    };
  }, []);

  useEffect(() => {
    const cursor = document.getElementById('cursor')!;

    window.onclick = e => {
      if (isClickLocked) return;

      setIsClickLocked(true);
      const tiles = document.querySelectorAll('.tile');
      const closestTile = findClosestTile(tiles, e.clientX, e.clientY);
      const columns = Math.floor(window.innerWidth / tileSize);
      const rows = Math.floor(window.innerHeight / tileSize);

      handleTileClick(closestTile.index, columns, rows);

      cursor.style.opacity = '0';

      setTimeout(() => {
        setIsClickLocked(false);
      }, 3500);

      anime({
        targets: [cursor],
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 1000,
        delay: 2500,
      });
    };

    window.onmouseover = () => {
      cursor.style.visibility = 'visible';
    };
    window.onmouseout = () => {
      cursor.style.visibility = 'hidden';
    };
    window.onmousemove = e => {
      cursor.style.top = e.pageY + 'px';
      cursor.style.left = e.pageX + 'px';
    };

    return () => {
      window.onclick = null;
      window.onmouseover = null;
      window.onmouseout = null;
      window.onmousemove = null;
    };
  }, []);

  useEffect(() => {
    // Dispatch fake event to trigger background animation on page load
    window.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
  }, []);

  return (
    <Container>
      <div className="tiled-background">
        <div id="tiles"></div>
        <div id="cursor"></div>
      </div>
    </Container>
  );
};

export default TiledBackground;
